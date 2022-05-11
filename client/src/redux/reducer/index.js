import {GET_ALL_DOGS,GET_ALL_TEMPERAMENTS,GET_DOG_DETAIL,FILTER_BY_TEMPERAMENT,FILTER_BY_API_OR_DATABASE,ORDER_BY_ALPHABET,FILTER_BY_WEIGHT,CREATE_DOG,DOG_DETAIL,REMOVE_DETAIL } from '../action';

const initialState = {
  dogs: [],
  dogs2:[],
  temperaments:[],
  dogsDetail: [],
  
};

const rootReducer = (state = initialState, {type,payload}) => {
  switch
  (type)
  {
 case GET_ALL_DOGS:
   return{
   ...state,
   dogs:payload,
   dogs2:payload
 }
 case GET_ALL_TEMPERAMENTS:
   return{
     ...state,
     temperaments:payload
   }
 case GET_DOG_DETAIL:
  if(!payload){
    alert('this breed of dog does not exist')
    payload=state.dogs2
  }
  return{
    ...state, 
    dogs:payload
  }
case FILTER_BY_WEIGHT:
 
  const weight = payload === 'asc' ?
          state.dogs.sort(function (a,b) {
             return parseInt(a.weight_min) - parseInt(b.weight_min);
          }) :
          state.dogs.sort(function (a,b) {
              return parseInt(b.weight_max) - parseInt(a.weight_max);
          });
      return {
          ...state,
          dogs:weight
      }

   case FILTER_BY_TEMPERAMENT:
     const allDogs=state.dogs2;
     const DogsFiltered= allDogs.filter(e => e.temperament?.includes(payload))
    
    return {
       ...state,
       dogs:DogsFiltered
     }
     case FILTER_BY_API_OR_DATABASE:
      const dogs=state.dogs2;
      const DogsFiltered1= payload === "Api" ? dogs.filter(e => e.Api) : dogs.filter(e => !e.Api)
      return {
        ...state,
          dogs:DogsFiltered1
      }
case ORDER_BY_ALPHABET:
  const dogsName=state.dogs
  let sort = payload === 'acs' ?
  dogsName.sort(function (a,b){
    if(a.name > b.name){
      return 1;
    }
    if(b.name > a.name){
      return -1;
    }
    return 0;
    
  }):
  dogsName.sort(function (a,b){
    if(a.name > b.name){
      return -1;
    }
    if(b.name > a.name){
      return 1;
    }
    return 0;
  })
  return{
    ...state,
    dogs:sort


  }

case CREATE_DOG:
  return{
    ...state,
    dogs:payload
  }
  case DOG_DETAIL:
    return{
      ...state,
      dogsDetail:payload

    }
  case REMOVE_DETAIL:
    return{
  ...state,
  dogsDetail:[],
    }


default:return state
  }


};

export default rootReducer;
