import React, { useEffect, useState } from "react";
import instance from "../js/connection";
import Cookies from "js-cookie";
import { useSelectedMarker, useTempMarker, useReRender } from "./Context";

const FormComponent = ({ formData, setFormData }) => {
  const { selectedMarker, setSelectedMarker } = useSelectedMarker();
  const { tempMarker, setTempMarker } = useTempMarker();
  const { reRender, setReRender } = useReRender();
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  const [Error, setError] = useState("");

  const handleWindowClose = () => {
    setSelectedMarker(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name.startsWith("location.")) {
        // Handle nested fields for location
        const locationField = name.split(".")[1];
        return {
          ...prevData,
          location: {
            ...prevData.location,
            [locationField]: value,
          },
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let latitudeString = formData.location.lat.toString();
    let longitudeString = formData.location.lng.toString();

    let newFormData = formData;
    newFormData.location.lat = latitudeString;
    newFormData.location.lng = longitudeString;

    newFormData.category_id = parseInt(newFormData.category_id);
    //let file = newFormData.photo;
    delete newFormData.photo;

    setFormData(newFormData);

    console.log("Form Data:", newFormData, file);

    const submitData = async (formData, file) => {
      try {
        const data = new FormData();
        data.append("Data", JSON.stringify(formData));
        data.append("File", file);

        const response = await instance.post("/pin/submitPin", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `${Cookies.get('GreenMap_AUTH')}`,
          },
        });
        console.log("Response:", response.data);
        setError("");
        setSelectedMarker(null);
        setTempMarker(null);
        return response.data;
      } catch (error) {
        console.error("Error sending form data:", error);
        setError(error.response.data);
      }
    };
    submitData(formData, file);
    setReRender(!reRender);
  };

  useEffect(() => {
    instance.get("/category/getAllCategories").then((response) => {
      console.log("Response:", response.data.Categories);
      setCategories(response.data.Categories);
    });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-between flex-col">
        {/* Hidden Fields */}
        <input
          type="hidden"
          id="locationLatitude"
          name="location.latitude"
          value={formData.location.lat}
        />
        <input
          type="hidden"
          id="locationLongitude"
          name="location.longitude"
          value={formData.location.long}
        />

        {/* Category Field */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-bold mb-2 text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category_id"
            value={formData.category}
            onChange={handleChange}
            required={true}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.type}
              </option>
            ))}
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Title Field */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-bold mb-2 text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            required={true}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Text Field */}
        <div className="mb-4">
          <label
            htmlFor="text"
            className="block text-sm font-bold mb-2 text-gray-700"
          >
            Text
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            required={true}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>


        {/* Photo Field */}
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block text-sm font-bold mb-2 text-gray-700"
          >
            Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>

        {/* Error Field */}
        <div className={"mb-4" + Error == "" ? "hidden" : ""}>
          <label
            htmlFor="text"
            className="block text-sm font-bold mb-2 text-gray-700"
          >
            {Error}
          </label>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-custom-green hover:custom-green-hover text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>

          <button
            className="bg-custom-green hover:bg-custom-green-hover text-white font-bold py-2 px-4 rounded"
            onClick={handleWindowClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
