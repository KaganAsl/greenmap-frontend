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

} from "./components/Context";

function App() {
  const [tempMarker, setTempMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
            <ReRenderProvider reRender={reRender} setReRender={setReRender}>
              <HudComponent />
              <LoginComponent />
              <MenuComponent />
              {selectedMarker && <WindowComponent />}
              <MapComponent />
            </ReRenderProvider>
          </LoggedInProvider>
        </TempMarkerProvider>
      </SelectedMarkerProvider>
    </div>
  );
}

export default App;
