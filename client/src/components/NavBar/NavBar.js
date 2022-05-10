import React from 'react'
import { Link } from "react-router-dom";
import './NavBar.css'




export default function SearchBar(){


return(

    <React.Fragment>



<div className="App">

<div className="Henry">
      <h1>Henry Dogs</h1>
 </div>    

  <div className="Search">
  <Link className="Searchlink" to='/Home'>Home</Link> 
  
<Link className="Searchlink" to='/CreateDog'>Create Dog</Link> 
</div>
   
 
 </div>



</React.Fragment>
)


}