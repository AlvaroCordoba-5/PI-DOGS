import React from 'react'
import{useState,useEffect} from 'react'
import {getDogDetail,getAllDogs} from '../../redux/action'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import './NavBar.css'




export default function SearchBar(){
const dispatch=useDispatch();

const [name,setName]=useState("")


useEffect(()=>{
  dispatch(getAllDogs()); 
},[dispatch])


const handleInputChange=(e)=>{
  e.preventDefault();
  setName(e.target.value)
}

const handleSubmit=(e)=>{
  e.preventDefault();
  dispatch(getDogDetail(name))
  setName("")
}

return(

    <React.Fragment>
<div className="container">


<div className="App">

<div className="Henry">
      <h1>Henry Dogs</h1>
 </div>    

  <div className="Search">
  <div>
<Link to='/CreateDog'>Crear Dog</Link> 
</div>

<form>
  <div>
  <label>
    
      Search Dog
    <input type="text" name="name" value={name} placeholder="SearchDog..." onChange={(e)=>handleInputChange(e)} />
  </label>
  <input type="submit" value="Search" onClick={(e)=>handleSubmit(e)}/>
   </div>
</form>

  
   </div>
 
 </div>

</div>

</React.Fragment>
)


}