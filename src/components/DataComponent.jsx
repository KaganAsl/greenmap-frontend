import React from "react";

const DataComponent = ({ marker, setSelectedMarker}) => {

  const handleWindowClose = () => {
    setSelectedMarker(null);
  }


  return (
    <div className="flex flex-col">
          <div className="mb-5">
        <h1 className="text-sm font-medium text-gray-600">Category</h1>
        <textarea
          disabled={true}
          rows={1}
          value={marker.category.type}
          className="w-full resize-none  break-words overflow-y-auto"
        ></textarea>
      </div>

      <div className="mb-5">
        <h1 className="text-sm font-medium text-gray-600">Title</h1>
        <textarea
          disabled={true}
          rows={2}
          value={marker.title}
          className="w-full resize-none  break-words overflow-y-auto"
        ></textarea>
      </div>

      <div className="mb-5">
        <h1 className="text-sm font-medium text-gray-600">Title</h1>
        <textarea
          disabled={true}
          rows={8}
          value={marker.text}
          className="w-full disabled:* resize-none  break-words overflow-y-auto"
        ></textarea>
      </div>

      <div className="mb-5">
        <img src={`http://localhost:8080/api/v1/images/getFile?ID=${marker.photo.id}`} alt="marker" className="w-full" />
      </div>

      <div className="mb-5">
      <button
            className="bg-custom-green hover:bg-custom-green-hover text-white font-bold py-2 px-4 rounded"
            onClick={handleWindowClose}
          >
            Close
          </button>
      </div>
    </div>
  );
};

export default DataComponent;
