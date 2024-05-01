import React from 'react'

function Loader() {
  return (
    <div>
       <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      <h2>Loading.....</h2>
    </div>
    </div>
  )
}

export default Loader
