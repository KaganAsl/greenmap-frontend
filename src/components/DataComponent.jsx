import React from "react";
import { closeIcon } from "../assets/icons";

const DataComponent = ({ marker, setSelectedMarker }) => {

  const handleWindowClose = () => {
    setSelectedMarker(null);
  }

  return (
    <div className="flex flex-col">

      <div className="flex items-end justify-end">
        <button
          className="py-2 rounded"
          onClick={handleWindowClose}
        >
          <img src={closeIcon.iconUrl}></img>
        </button>
      </div>

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