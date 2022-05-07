import React,{useState} from 'react'
import {useEffect} from 'react'
import { Link ,useHistory } from "react-router-dom";
import { createDog,getAllTemperaments } from '../../redux/action';
import { useDispatch,useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import './CreateDog.css'

function validate(input){
  let errors={}
  if(!input.name){
    errors.name = 'name is requiere';
  }else if(!input.life){
    errors.life = 'life is requiere';
  }else if(input.height_min < 1){
    errors.height_min = 'minimum height must be greater than 1'
  }else if(input.height_max<input.height_min){
    errors.height_max = "height max can't be less than height min"
  }
  return errors;
}



export default function CreateDog() {
    const dispatch =useDispatch();
    const history = useHistory()
    const allTemperaments=useSelector((state) => state.temperaments);
    
    const[errors,setErrors]=useState({})
    const[input,setInput]=useState({
        name:"",
        image:"",
        temperaments:[],
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:"",
        life:""
    })

    useEffect(()=>{
      dispatch(getAllTemperaments())
    },[dispatch])

    const handleChange = (e)=>{
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
      setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
      }))
      
    }

    const handleSelect= (e)=>{
      setInput({
        ...input,
        temperaments:[...input.temperaments,e.target.value]
      })
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      dispatch(createDog(input))
      alert('Dog Created!')
      setInput({
        name:"",
        image:"",
        temperaments:[],
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:"",
        life:""

      })
      history.push('/Home')
    }

    const handleDelete=(el) => {
        setInput({
          ...input,
          temperaments: input.temperaments.filter(aux => aux !== el)
        })
    }

  return (
<React.Fragment>

<NavBar></NavBar>
<div className="Button">
<Link className='link ' to='/Home'>Home</Link> 
</div>

    

<div className='box'>
<form className='form' onSubmit={(e)=>handleSubmit(e)} >

    <h1>Create your Dog</h1>
     <div className='inputs'>   
         <input className='input'type='text' value={input.name} name ='name' placeholder='Name...' onChange={handleChange}/>
         {errors.name &&(
           <p>{errors.name}</p>
         )}

</div>

<div className='inputs'>
        
         <input className='input'type='text' value={input.life} name ='life' placeholder='Life Span...' onChange={handleChange}/>
         {errors.life &&(
           <p>{errors.life}</p>
         )}

</div>
<div className='inputs'>
         <input className='input' type='text' value={input.height_min} name ='height_min' placeholder='Height Min...'onChange={handleChange} />
         {errors.height_min &&(
           <p>{errors.height_min}</p>
         )}
</div>

<div className='inputs'>
         <input className='input' type='text' value={input.height_max} name ='height_max' placeholder='Height Max...' onChange={handleChange} />
         {errors.height_max &&(
           <p>{errors.height_max}</p>
         )}
</div>

<div className='inputs'>
         <input className='input' type='text' value={input.weight_min} name ='weight_min' placeholder='Weight Min...' onChange={handleChange} />

</div>
<div className='inputs'>
      
         <input className='input' type='text' value={input.weight_max} name ='weight_max' placeholder='Weight Max...' onChange={handleChange} />

</div>

<div className='inputs' >
         <input className='input' type='text' value={input.image} name ='image' placeholder='Image Url...' onChange={handleChange}/>

</div>

<div className='temcontainer'>

<div className='Temperament'>

  <h4>Choose one or more temperaments</h4>
    <select onChange={(e)=>handleSelect(e)} >
{
    allTemperaments && allTemperaments.map(e=>{
        return(
       
           
        <option  key ={e.id} value={e.name} >{e.name}</option>
        ) })
}
 </select>
 <div className="contTemp">
 {input.temperaments.map(el=>
  <div className="delete">
   <p>{el}</p>
   <button class='but'onClick={()=>handleDelete(el)}>x</button>
  </div>)}
  </div>
  </div>
 
 </div>
 <button class='bot' type='submit'>Create Dog</button>

 </form>


</div>

    
    
    </React.Fragment>
  )
}

