import { React, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { blueIcon, redIcon } from "../assets/icons";
import { useReRender, useSelectedMarker, useTempMarker, useRadius, useCategory } from "./Context";
import instance from "../js/connection";
import * as L from "leaflet";
import { outerBounds, calculateBounds } from "../js/utils";
import { MarkerStructure } from "../js/structures";
import { parse } from "postcss";
import Cookies from "js-cookie";

function MapComponent({}) {
  const { selectedMarker, setSelectedMarker } = useSelectedMarker();
  const { tempMarker, setTempMarker } = useTempMarker();
  const { reRender, setReRender } = useReRender();
  const { radius, setRadius } = useRadius();
  const { category, setCategory } = useCategory();
  const [userID, setUserID] = useState(0);

  const [markers, setMarkers] = useState([]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    const fetchDataFromConnection = async () => {
      try {
        const token = Cookies.get('GreenMap_AUTH');
        if (token !== undefined) {
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
            setUserID(0);
          });
        } else {
          setUserID(0);
        }

        instance.get("/pin/getAllPins").then((res) => {;
          const bounds = calculateBounds(radius)
          setMarkers([]);
          res.data.map((item) => {
            const newMarker = new MarkerStructure(
              parseFloat(item.location.lat),
              parseFloat(item.location.lng),
              item.user_ip,
              item.title,
              item.text,
              {
                id: item.photo.id,
                name: item.photo.name,
                link: item.photo.link,
              },
              item.id,
              item.category.id,
              item.category.type,
              item.user_id
            );
            if (radius !== 0 && radius.showMyPins !== 0 && newMarker.user_id !== undefined && userID !== 0 && newMarker.user_id === userID) {
              setMarkers((prevMarkers) => [...prevMarkers, newMarker.serialize()]);
              return;
            }

            if (radius !== 0 && radius.radius !== 0) {
              const isInside = newMarker.location.lat >= bounds[0][0] && newMarker.location.lat < bounds[1][0] && newMarker.location.lng >= bounds[0][1] && newMarker.location.lng < bounds[1][1];
              const isInCategory = parseInt(category) !== 0 && newMarker.category_id == parseInt(category) && markers && markers.length > 0;

              if (isInside && (isInCategory || parseInt(category) === 0)) {
                setMarkers((prevMarkers) => [...prevMarkers, newMarker.serialize()]);
              }
            } else if (parseInt(category) === 0 || (newMarker.category_id === parseInt(category))) {
              setMarkers((prevMarkers) => [...prevMarkers, newMarker.serialize()]);
            }
          });
        }).catch((error) => {
          console.error("Error fetching pins:", error);
        });
        return;
      } catch (error) {
        console.error("Error fetching pins:", error);
      }
    };

    fetchDataFromConnection();
  }, [reRender, tempMarker, selectedMarker, radius, category]);

  // In this component it uses tempMarker to show the marker tha t is being created
  // But inside the app selected marker is used to show the marker that is being created
  // So when selectedMarker is null, it means that the marker is not being created
  // So it sets the tempMarker to null

  // TODO: Refactor this to use only one state for the marker that is being created
  useEffect(() => {
    if (selectedMarker === null) {
      setTempMarker(null);
    }
  }, [selectedMarker]);

  const ClickMarker = () => {
    const map = useMapEvents({
      click: (e) => {
        const newMarker = new MarkerStructure(
          e.latlng.lat,
          e.latlng.lng,
          "",
          "",
          "",
          "",
          "",
          "",

        );
        setSelectedMarker(newMarker.serialize());
        setTempMarker(newMarker.serialize());
      },
    });
  };

  const corner1 = L.latLng(outerBounds[0][0], outerBounds[0][1]);
  const corner2 = L.latLng(outerBounds[1][0], outerBounds[1][1]);

  return (
    <MapContainer
      center={[38.89958342598271, 35.04638671875001]}
      maxBoundsViscosity={1.0}
      maxBounds={L.latLngBounds(corner1, corner2)}
      boundsOptions={{ padding: [50, 50] }}
      minZoom={6}
      zoom={7}
      maxZoom={16}
      className="h-screen w-screen z-0"
      zoomControl={false}
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
        ></Marker>
      ))}
      {tempMarker === null ? null : (
        <Marker
          key={tempMarker.id}
          position={tempMarker.location}
          icon={blueIcon}
          eventHandlers={{ click: () => handleMarkerClick(tempMarker) }}
        ></Marker>
      )}

      <ClickMarker />
    </MapContainer>
  );
}

export default MapComponent;
