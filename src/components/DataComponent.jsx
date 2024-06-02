import React, { useEffect, useState } from "react";
import { closeIcon } from "../assets/icons";
import Cookies from "js-cookie";
import instance from "../js/connection";

const DataComponent = ({ marker, setSelectedMarker }) => {
  const [userID, setUserID] = useState(0);

  const handleWindowClose = () => {
    setSelectedMarker(null);
  }

  const handleDelete = () => {
    instance.get("/session/checkSession", {
      headers: {
        "Authorization": `${Cookies.get('GreenMap_AUTH')}`,
      }
    })
    .then((response) => {
      instance.post("/pin/deletePin", {
        pinID: marker.id,
        userID: userID,
      }).then((response) => {
        console.log(response);
        setSelectedMarker(null);
      }).catch((error) => {
        console.error("Error deleting pin:", error);
      });
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) { // HttpStatusCode.Unauthorized is typically 401
        setLoggedIn(false);
      } else {
        // Log the error message for unexpected errors
        console.error(`Error checking session: ${error.message}`);
      }
    });
  }

  useEffect(() => {
    const token = Cookies.get('GreenMap_AUTH');
    if (token === undefined) {
        return;
    }
    const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const usernameToken = atob(base64).split('_')[0];
    instance.get("/user/getUserByUsername", {
        params: {
            username: usernameToken,
        }
    }).then((response) => {
        setUserID(response.data.id);
    }
    ).catch((error) => {
        console.error("Error fetching user data:", error);
    });
  }, []);

  console.log(userID)

  return (
    <div className="flex flex-col">

      <div className={`flex items-end ${marker.user_id === userID && marker.user_id !== 0 ? "justify-between" : "justify-end"}`}>
        {marker.user_id === userID && marker.user_id !== 0 ? (
        <button
          className="py-2 rounded bg-red-500 text-white font-bold text-sm p-4"
          onClick={handleDelete}
        >
          Delete This Pin
        </button> ) : null}
        <button
          className="py-2 rounded"
          onClick={handleWindowClose}
        >
          <img src={closeIcon.iconUrl}></img>
        </button>
      </div>

      <hr className="my-2 border-t-4" />
      <div className="">
        <h1 className="font-bold text-2xl w-full h-10 mb-1 overflow-y-auto break-words">{marker.title}</h1>
      </div>

      <div className="">
        <h3 className="font-bold w-full h-10 overflow-y-auto break-words">{marker.category.type}</h3>
      </div>

      <div className="mb-7">
        <p className="w-full h-20 overflow-y-auto break-words">{marker.text}</p>
      </div>

      {marker.photo.id ? (
        <div className="mb-7">
          <img src={`http://localhost:8080/api/v1/images/getFile?ID=${marker.photo.id}`} alt="marker" className="w-full" />
        </div>
      ) : null}
    </div>
  );
};

export default DataComponent;