import axios from 'axios'


export const GET_ALL_DOGS="GET_ALL_DOGS";
export const GET_ALL_TEMPERAMENTS ="GET_ALL_TEMPERAMENTS";
export const GET_DOG_DETAIL="GET_DOG_DETAIL";
export const FILTER_BY_WEIGHT ="FILTER_BY_WEIGHT";
export const FILTER_BY_TEMPERAMENT ="FILTER_BY_TEMPERAMENT";
export const FILTER_BY_API_OR_DATABASE ="FILTER_BY_API_OR_DATABASE";
export const ORDER_BY_ALPHABET = "ORDER_BY_ALPHABET"
export const CREATE_DOG="CREATE_DOG";
export const DOG_DETAIL = "DOG_DETAIL"
export const REMOVE_DETAIL = "REMOVE_DETAIL";
export const WEIGHT_SEARCH = "WEIGHT_SEARCH";

export const getAllDogs = () => {
    return async function (dispatch) {
      const response= await axios.get('http://localhost:3001/dogs')
        .then(res => res.data)
        .catch(err => console.error(err))
        dispatch({type:GET_ALL_DOGS , payload:response})
      }
    }


    export const getAllTemperaments = () => {
      return async function (dispatch) {
        const response= await axios.get('http://localhost:3001/temperament')
          .then(res => res.data)
          .catch(err => console.error(err))
          dispatch({type:GET_ALL_TEMPERAMENTS , payload:response})
        }
      }

      export const getDogDetail= (name) => {
        return async function (dispatch) {
          const response= await axios.get(`http://localhost:3001/dogs/?name=${name}`)
            .then(res => res.data)
            .catch(err => console.error(err))
            dispatch({type:GET_DOG_DETAIL , payload:response})
          }
        }

export const FilterByWeight=(payload) =>{
  return{
    type:FILTER_BY_WEIGHT,
    payload
  }
}


        export const FilterByTemperament = (payload)=>{
      return {
               type:FILTER_BY_TEMPERAMENT,
               payload
      }

      }

      export const FilterApiOrDatabase = (payload)=>{
          
              return {
                       type:FILTER_BY_API_OR_DATABASE,
                       payload
              }
              }
        
         export const orderByAlphabet= (payload)=>{
                console.log(payload)
                      return {
                               type:ORDER_BY_ALPHABET,
                               payload
                      }
                      }
                
export const createDog=(payload)=>{
  return async function () {
    const res = await axios.post('http://localhost:3001/dog',payload);
    return res
}
}

export const dogDetail=(idRaza)=>{
  return async function (dispatch) {
   const response = await axios.get (`http://localhost:3001/dogs/${idRaza}`)
  .then(res =>res.data)
  .catch(err => console.error(err))
  dispatch({type:DOG_DETAIL , payload:response})
  }
}

export const removeDetail= ()=>{
        return {
                 type:REMOVE_DETAIL            
        }
        }   

      