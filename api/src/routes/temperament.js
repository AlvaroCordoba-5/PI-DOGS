const { Router } = require('express');
const router = Router()
const {DataBase} = require('./Functions.js')




router.get('/',async(req ,res,next)=>{
  try{
    
    const temperamentDb =await DataBase()

 
    return res.status(200).json(temperamentDb)
} catch(error){
  next(error)
}
 })


 module.exports = router;