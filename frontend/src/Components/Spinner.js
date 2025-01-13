import React from 'react'
import Loader from '../spinner.gif'

export default function Spinner(){
    return (
      <div className='text-center my-3'>
        <img src={Loader} alt="Loader" />
      </div>
    )
}
