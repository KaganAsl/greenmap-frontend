
import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import HudComponent from './components/HudComponent';
import WindowComponent from './components/WindowComponent';
import instance from './js/connection'
import { SelectedMarkerProvider, TempMarkerProvider, useSelectedMarker, useTempMarker } from './components/Context';



const markerStructure = {
  location: {
    lat: '',
    long:  '',
  },
  user_ip: '',
  title: '',
  text: '',
  photo_id: '',
  id: '',
}



function App() {

  const [tempMarker, setTempMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div>
      <SelectedMarkerProvider selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker}>
      <TempMarkerProvider tempMarker={tempMarker} setTempMarker={setTempMarker}>
      <HudComponent />
      {selectedMarker && <WindowComponent />}
      <MapComponent  />
      </TempMarkerProvider>
      </SelectedMarkerProvider>
    </div>
  );
}

export default App;
