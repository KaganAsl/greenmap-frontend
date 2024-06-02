import React, { useState, useContext, useEffect } from "react";
import FormComponent from "./FormComponent";
import DataComponent from "./DataComponent";
import { useSelectedMarker, useTempMarker } from "./Context";
import { FormDataStructure } from "../js/structures";

const WindowComponent = ({}) => {
  const { selectedMarker, setSelectedMarker } = useSelectedMarker();
  const { tempMarker, setTempMarker } = useTempMarker();

  const [formData, setFormData] = useState(
    new FormDataStructure(
      selectedMarker.location.lat ? selectedMarker.location.lat : "",
      selectedMarker.location.lng ? selectedMarker.location.lng : "",
      "",
      "",
      "",
      0,
      1,
    ),
  );

  useEffect(() => {
    setFormData(
      new FormDataStructure(
        selectedMarker.location.lat,
        selectedMarker.location.lng,
        "",
        "",
        "",
        0,
        1,
      ),
    );
  }, [selectedMarker]);

  return (
    <div className="flex justify-center sm:justify-end md:justify-end lg:justify-end inset-0 absolute items-end lg:items-center">
      <div
        className={
          "px-8 pt-6 pb-8 mb-4 m-2 md:px-8 md:pt-6 md:pb-8 md:mb-4 md:mr-3 bg-white border rounded-2xl shadow-md z-10 xs:w-[90vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw]  "
        }
      >
        <p className="mb-2 hidden">Marker ID: {selectedMarker.id}</p>
        <p className="mb-2 hidden">Latitude: {selectedMarker.location.lat}</p>
        <p className="mb-2 hidden">Longitude: {selectedMarker.location.long}</p>

        {tempMarker && tempMarker.id === selectedMarker.id ? (
          <FormComponent
            formData={formData}
            setFormData={setFormData}
            setSelectedMarker={setSelectedMarker}
            setTempMarker={setTempMarker}
          />
        ) : (
          <DataComponent marker={selectedMarker} setSelectedMarker={setSelectedMarker} />
        )}
      </div>
    </div>
  );
};

export default WindowComponent;
