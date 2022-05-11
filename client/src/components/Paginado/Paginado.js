import React from 'react'
import './paginado.css'

export default function Paginado({dogsPerPage,allDogs,paginado}){
const pageNumbers=[]


for(let i=1 ; i<=Math.ceil(allDogs/dogsPerPage); i++){
    pageNumbers.push(i)
}

    return(

<nav >
    <ul className='paginad' >
        {pageNumbers && pageNumbers.map(number=>{
           return( <li className='li' key={number} >
            <button  className='boton'onClick={()=>paginado(number)}>{number}</button>
            </li>
        )})}
    </ul>

</nav>


)


}