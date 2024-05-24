import React, { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import HudComponent from "./components/HudComponent";
import WindowComponent from "./components/WindowComponent";
import instance from "./js/connection";
import {
  SelectedMarkerProvider,
  TempMarkerProvider,
  ReRenderProvider,
  useSelectedMarker,
  useTempMarker,
  useReRender,
} from "./components/Context";

function App() {
  const [tempMarker, setTempMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [reRender, setReRender] = useState(false);

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
          <ReRenderProvider reRender={reRender} setReRender={setReRender}>
            <HudComponent />
            {selectedMarker && <WindowComponent />}
            <MapComponent />
          </ReRenderProvider>
        </TempMarkerProvider>
      </SelectedMarkerProvider>
    </div>
  );
}

export default App;
