import React, { useEffect, useState } from "react";
import instance from "../js/connection";
import Cookies from "js-cookie";
import { useSelectedMarker, useTempMarker, useReRender } from "./Context";
import { edit2Icon, edit1Icon, imageIcon } from "../assets/icons";

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
            <option className="" value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.type}
              </option>
            ))}
          </select>
        </div>

        {/* Title Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="title"
            className="block absolute left-10 top-3 text-sm font-bold mb-2 text-gray-700"
          >
            Title
          </label>
          <img src={edit1Icon.iconUrl} alt="description" className="absolute left-2 top-2" />
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            required={true}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 border rounded-md w-full pt-6"
          />
        </div>

        {/* Text Field */}
        <div className="mb-4 relative">

          <label
            htmlFor="text"
            className="block absolute left-10 top-3 text-sm font-bold mb-2 text-gray-700"
          >
            Text
          </label>
          <img src={edit2Icon.iconUrl} alt="description" className="absolute left-2 top-2" />
          <textarea
            id="text"
            name="text"
            value={formData.text}
            required={true}
            onChange={handleChange}
            rows="4"
            className="mt-1 p-2 border rounded-md w-full pt-6"
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
          <label
            className="mt-1 p-2 border rounded-md w-full bg-white cursor-pointer inline-block"
          >
            <img src={imageIcon.iconUrl} alt="photo" className="inline-block mr-3" />
            Choose a file
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="hidden" // hide the default file input
            />
          </label>
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
