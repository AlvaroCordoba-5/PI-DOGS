import React from 'react'
import './Card.css'

export default function Card({name,weight_min,temperaments,image}){
return(


<div className="card">

<div className="face front">

<img src={image} alt='img not found' width='200px' height='250px'/>
<h3>{name}</h3>
   </div> 
    <div className='face back'>
    <h2>{name}</h2>
   <h4>Temperaments: {temperaments}</h4>  
   <h4>Weight:{weight_min}</h4>
</div>
</div>


)


}