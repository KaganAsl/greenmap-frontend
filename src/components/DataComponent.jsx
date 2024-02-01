import React from 'react'

const DataComponent = ({marker}) => {
  return (
    <div className='flex flex-col'>
        <div className="mb-5">
        <h1 className="text-sm font-medium text-gray-600">Title</h1>
        <textarea disabled={true}  rows={2} value={marker.title} className="w-full resize-none  break-words overflow-y-auto"></textarea>
        </div>

        <div className="mb-5">
        <h1 className="text-sm font-medium text-gray-600">Title</h1>
        <textarea disabled={true} rows={8} value={marker.text} className="w-full disabled:* resize-none  break-words overflow-y-auto"></textarea>
        </div>

    </div>
  )
}

export default DataComponent