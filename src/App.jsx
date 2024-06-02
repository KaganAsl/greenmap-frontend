import React, { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import HudComponent from "./components/HudComponent";
import WindowComponent from "./components/WindowComponent";
import instance from "./js/connection";
import LoginComponent from "./components/LoginComponent";
import MenuComponent from "./components/MenuComponent";
import {
  SelectedMarkerProvider,
  TempMarkerProvider,
  ReRenderProvider,
  useSelectedMarker,
  useTempMarker,
  useReRender,
  LoggedInProvider,
  useLoggedIn,
  RadiusProvider,
  CategoryProvider

} from "./components/Context";
import Cookies from "js-cookie";
import { HttpStatusCode } from "axios";

function App() {
  const [tempMarker, setTempMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [radius, setRadius] = useState(0);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    if (Cookies.get('GreenMap_AUTH') === undefined) {
      setLoggedIn(false);
      return;
    }

    instance.get("/session/checkSession", {
      headers: {
        "Authorization": `${Cookies.get('GreenMap_AUTH')}`,
      }
    })
    .then((response) => {
      if (response.status === 200) { // HttpStatusCode.Ok is typically 200
        setLoggedIn(true);
      } else {
        // Handle other status codes here
        console.error(`Unexpected status code: ${response.status}`);
        setLoggedIn(false);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) { // HttpStatusCode.Unauthorized is typically 401
        setLoggedIn(false);
      } else {
        // Log the error message for unexpected errors
        console.error(`Error checking session: ${error.message}`);
      }
    });
  }, []);

  return (
    <div>
      <SelectedMarkerProvider
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      >
        <TempMarkerProvider
          tempMarker={tempMarker}
          setTempMarker={setTempMarker}
        >
          <LoggedInProvider
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          >
            <CategoryProvider
              category={category}
              setCategory={setCategory} >
            <RadiusProvider radius={radius} setRadius={setRadius} >
            <ReRenderProvider reRender={reRender} setReRender={setReRender}>
              <HudComponent />
              <LoginComponent />

              <MenuComponent />
              {selectedMarker && <WindowComponent />}
              <MapComponent />
            </ReRenderProvider>
            </RadiusProvider>
            </CategoryProvider>
          </LoggedInProvider>
        </TempMarkerProvider>
      </SelectedMarkerProvider>
    </div>
  );
}

export default App;
