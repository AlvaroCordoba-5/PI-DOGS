import React from 'react'
import { useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {dogDetail} from '../../redux/action'
import { Link } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import './Detail.css'
import Loading from '../Loading/Loading.js'
import Footer from "../Footer/Footer.js"


export default function Detail(props) {
  
  const dispatch =useDispatch();

  useEffect(() => {
  dispatch(dogDetail(props.match.params.id))
},[dispatch])

  const dog = useSelector((state) => state.dogsDetail)
  
    return (

        <React.Fragment>
          <NavBar></NavBar>  
                 <div className='Detail'>
                    <div className='Button'>
                   <Link to='/Home'>Home</Link>
                     </div>
                      { dog.length > 0 ? 
                      <div className='DetailContainer'>
                      <div className="cardDetail">
                         
                          <img className='imgDetail' src={dog[0].image} alt='dog'/>        
                       </div>
                          <div className='info'>
                          <h3>{dog[0].name}</h3> 
                          <h3> Life Span: {dog[0].life}</h3>
                          <h4>{dog[0].api? dog[0].temperament : dog[0].temperaments?.map(e=> e.name + (' '))}</h4>
                          <h4>Weight Min: {dog[0].weight_min}</h4>
                          <h4>Weight Max: {dog[0].weight_max}</h4>
                          <h4>Height Min: {dog[0].height_min}</h4>
                          <h4>Height Max: {dog[0].height_max}</h4>
                        </div>

                         </div>
               
                      
                       
                    :<Loading/>
                      
                      }

                    </div>

                   
                    <Footer></Footer>


                 </React.Fragment>
    
  


  )
}


