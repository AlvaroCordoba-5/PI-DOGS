import React from 'react'
import image from './image2.gif'
import Loading from './Loading.css'

export default function loading() {
  return (
      <div className="image">
    <img src={image} alt='Loading'/>
    </div>
  )
}

