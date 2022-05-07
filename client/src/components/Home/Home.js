import React from 'react';
import { useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getAllDogs,orderByAlphabet,FilterByWeight,getAllTemperaments,FilterByTemperament,FilterApiOrDatabase} from '../../redux/action'
import { Link } from "react-router-dom";
import Card from "../Card/Card.js"
import NavBar from '../NavBar/NavBar';
import Paginado from '../Paginado/Paginado';
import Footer from "../Footer/Footer.js"
import './Home.css'

export default function Home(){

const dispatch=useDispatch();
const allDogs = useSelector((state) => state.dogs);
const allTemperaments=useSelector((state) => state.temperaments);
const[orden,setOrden] =useState("");
const [currentPage,setCurrentPage]=useState(1);
const[dogsPerPage,setDogsPerPage]=useState(8);
const indexOfLastDog = currentPage * dogsPerPage
const indexOfFirstDog = indexOfLastDog - dogsPerPage
const currentDog = allDogs.slice(indexOfFirstDog,indexOfLastDog)

const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
}


useEffect(()=>{
    dispatch(getAllDogs()); 
},[dispatch])

useEffect(()=>{
    dispatch(getAllTemperaments())
  },[dispatch])
  

  function handleClick(e){
    e.preventDefault();
    dispatch(getAllDogs())
    setCurrentPage(1)
  }
  

const handleSort=(e)=>{
    e.preventDefault();
    dispatch(orderByAlphabet(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }
  
  const handleFilterW=(e)=>{
    e.preventDefault();
    dispatch(FilterByWeight(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }

  const handleFilterT=(e)=>{
    e.preventDefault();
    dispatch(FilterByTemperament(e.target.value))
    }
    
    const handleFilterA=(e)=>{
      e.preventDefault();
      dispatch(FilterApiOrDatabase(e.target.value))
      }
       
      
      

return(

<React.Fragment>

<NavBar></NavBar>  


<div className='filtros'>

<div className='Temperament'>

  
    <select onChange={(e)=>handleFilterT(e)}>
{
    allTemperaments && allTemperaments.map(e=>{
        return(
       
           
        <option key ={e.id} value={e.name}>{e.name}</option>
        ) })
}
 </select>
 </div>
 


<div>

<select onChange={(e)=>handleFilterA(e)}>

    <option value='Api'>Api</option>
    <option value='Data Base'>Data Base</option>
    
</select>
</div>


<div>

<select onChange={(e)=>handleSort(e)}>

<option value='acs'>Sort A-Z</option>
    <option value='des'>Sort Z-A</option>
    
</select>
</div>

<div>

<select onChange={(e)=>handleFilterW(e)}>
   
    <option value='asc'>Sort Weight Min</option>
    <option value='des'>Sort Weight Max</option>
</select>
</div>


<button onClick={e=>{handleClick(e)}}>Load dogs</button>

</div>







    



<div >
    <div className='container-card'>
{
    currentDog && currentDog.map(d=>{
    
        if(typeof d.id === "string"){
            if(d.temperaments.length >= 1){
                var temps = d.temperaments.map(c => c.name)
                return (
                    <Link to={"Home/" + d.id}>
                        <Card  name={d.name} height_min={d.height_min} weight_min={d.weight_min} temperaments={temps} image={d.image} key={d.id} id={d.id}  />
                    </Link>     
                )
            } 
            }                
            return (
                <Link to={"Home/" + d.id}>
                    <Card  name={d.name} height_min={d.height_min} weight_min={d.weight_min} temperaments={d.temperament} key={d.id} image={d.image} id={d.id}   />                            
                    </Link>    
                    )    
    })
}


</div>
 </div>
 <div className='paginado'>
    
    <Paginado 
    dogsPerPage={dogsPerPage}
     allDogs={allDogs.length}
     paginado={paginado} 
     />

</div>



 

</React.Fragment>


)


}