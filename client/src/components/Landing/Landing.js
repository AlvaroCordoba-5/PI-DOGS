import React from 'react';
import './Landing.css';
import { Link } from "react-router-dom";
//import DogPhoto from '../Landing/dogLanding.jpg'

export default function landing(){
//<img src={DogPhoto} alt="Dog" />
  return(

<React.Fragment>

<div className="Contenedor">

<h1>Welcome to Henry Dogs</h1>

 
 <Link to={"/Home"}>Home</Link> 

    
</div>

</React.Fragment>



  )

}