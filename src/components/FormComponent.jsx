import React, {useState} from 'react'
import instance from '../js/connection'
import { useSelectedMarker, useTempMarker, useReRender } from './Context';

const FormComponent = ({formData, setFormData}) => {

    const {selectedMarker, setSelectedMarker} = useSelectedMarker();
    const {tempMarker, setTempMarker} = useTempMarker();
    const {reRender, setReRender} = useReRender();

    const [Error, setError] = useState('')

    const handleWindowClose = () => {
        setSelectedMarker(null);
      };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => {
          if (name.startsWith('location.')) {
            // Handle nested fields for location
            const locationField = name.split('.')[1];
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
        let latitudeString = formData.location.lat.toString()
        let longitudeString = formData.location.long.toString()

        let newFormData = formData
        newFormData.location.lat = latitudeString
        newFormData.location.long = longitudeString

        console.log(newFormData)

        setFormData(newFormData)

        const submitData = async (formData) => {
          try {
            const response = await instance.post('/pin/submitPin', formData);
            setError('')
            setSelectedMarker(null)
            setTempMarker(null)
            return response.data;
          } catch (error) {
            console.error('Error sending form data:', error);
            setError(error.response.data)
          }
        }
        submitData(formData)
        setReRender(!reRender)
    };

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex justify-between flex-col'>
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

            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-bold mb-2 text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            {/* Text Field */}
            <div className="mb-4">
              <label htmlFor="text" className="block text-sm font-bold mb-2 text-gray-700">
                Text
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                rows="4"
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            {/* Photo Field */}
            <div className="mb-4 hidden">
              <label htmlFor="photo" className="block text-sm font-bold mb-2 text-gray-700">
                Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>

            {/* Error Field */}
            <div className={"mb-4" + Error == '' ? 'hidden' : ''}>
            <label htmlFor="text" className="block text-sm font-bold mb-2 text-gray-700">
                {Error}
              </label>
            </div>

            <div className='flex justify-between'>
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                Save
                </button>

                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleWindowClose}
                >
                Close
                </button>
            </div>
          </form>
    </div>
  )
}

export default FormComponent
