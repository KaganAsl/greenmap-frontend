
import {React, useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import {blueIcon, redIcon} from '../assets/icons'
import { useSelectedMarker, useTempMarker } from './Context';
import instance from '../js/connection'
import * as L from "leaflet";
import { outerBounds } from '../js/utils';

function MapComponent({}) {

  const {selectedMarker, setSelectedMarker} = useSelectedMarker();
  const {tempMarker, setTempMarker} = useTempMarker();

  const [markers, setMarkers] = useState([]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };


  useEffect( () => {
    const fetchDataFromConnection = async () => {
      try {
        const response = await instance.get('/getAllPins');

        response.data.map( (item) => {
          const newMarker = {
            location: {
              lat: parseFloat(item.location.lat),
              lng: parseFloat(item.location.long),
            },
            user_ip: item.user_ip,
            title: item.title,
            text: item.text,
            photo_id: item.photo_id,
            id: item.location.ID,
          };
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        })
        return
      } catch (error) {
        console.error('Error fetching pins:', error);
        
      }
    };

    fetchDataFromConnection();

  }, [])


  const ClickMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        const newMarker = {
          location: {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          },
          user_ip: '',
          title: '',
          text: '',
          photo_id: '',
          id: Date.now(),
        };
        setTempMarker(newMarker);
        setSelectedMarker(newMarker)
      },
    });
  }

  const corner1 = L.latLng(outerBounds[0][0], outerBounds[0][1])
  const corner2 = L.latLng(outerBounds[1][0], outerBounds[1][1])
  

  return (
    <MapContainer
      center={[38.89958342598271, 35.04638671875001]}
      maxBoundsViscosity={1.0}
      maxBounds={L.latLngBounds(corner1, corner2)}
      boundsOptions={{padding: [50, 50]}}
      minZoom={6}
      zoom={7}
      maxZoom={16}
      className='h-screen w-screen z-0'
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.location}
          icon={redIcon}
          eventHandlers={{ click: () => handleMarkerClick(marker) }}
        >
        </Marker>
      ))}
      {tempMarker === null ? null : (
            <Marker
            key={tempMarker.id}
            position={tempMarker.location}
            icon={blueIcon}
            eventHandlers={{ click: () => handleMarkerClick(tempMarker) }}
          >
          </Marker>
      )}

      <ClickMarker />
    </MapContainer>
  );
}

export default MapComponent;