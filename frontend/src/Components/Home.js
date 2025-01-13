import React from 'react'
import AddNote from './AddNote'
import ViewNote from './ViewNote'

const Home = () => {
  return (
    <>
      <div className="container mt-3">
        <AddNote />
        <ViewNote />
      </div>
    </>
  )
}

export default Home
