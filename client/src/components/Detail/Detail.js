import React from 'react'
import { useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {dogDetail} from '../../redux/action'
import NavBar from '../NavBar/NavBar';
import './Detail.css'
import Loading from '../Loading/Loading.js'
import imagen from './image2.gif'



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
                  
                      { dog.length > 0 ? 
                      <div className='DetailContainer'>
                      <div className="cardDetail">
                         
                          <img className='imgDetail' src={dog[0].image?dog[0].image:'https://i.pinimg.com/originals/28/1a/af/281aaf73c5b37d8be3b0ed20caade1c9.jpg'} alt='dog'/>        
                       </div>
                       
                          <div className='info'>
                          <h1>{dog[0].name}</h1> 
                          <div className='info2'>
                          <h4> Life Span: {dog[0].life}</h4>
                          <div className='detailtemp'>
                          <h4>{dog[0].Api? dog[0].temperament : dog[0].temperaments?.map(e=> e.name + (' ')).toString()}</h4>
                          </div>
                          <h4>Weight Min: {dog[0].weight_min}</h4>
                          <h4>Weight Max: {dog[0].weight_max}</h4>
                          <h4>Height Min: {dog[0].height_min}</h4>
                          <h4>Height Max: {dog[0].height_max}</h4>
                          </div>
                        </div>

                         </div>
               
                      
                       
                    :<Loading image={imagen}/>
                      
                      }

                    </div>

                   

                 </React.Fragment>
    
  


  )
}


