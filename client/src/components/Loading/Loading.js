import React from 'react'
import './Loading.css'

export default function loading({image,text}) {
  return (
    <React.Fragment>
      <div className="textloading">
     <h1>{text}</h1>
     </div>
      <div className="image">
        
       
        
    <img src={image} alt='Loading'/>
</div>
</React.Fragment>
  )
}

