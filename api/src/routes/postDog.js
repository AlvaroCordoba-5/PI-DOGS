const { Router } = require('express');
const router = Router()
const {Dog,Temperament} =require('../db')


router.post('/',async(req,res,next)=>{
const {name,weight_min,weight_max,height_min,height_max, life,image,temperaments}=req.body

try{
    
    
   let dogCreated= await Dog.create({
        name,
        weight_min,
        weight_max,
        height_min,
        height_max, 
        life,
        image
   }
    )

    let temperamentDb = await Temperament.findAll({
    where :{name:temperaments}
    })

   


    /*for (let i = 0; i < temperaments.length; i++) {
        
        const addTemp = await Temperament.findAll({
          where: { name: temperaments[i] },
        });
        dogCreated.addTemperament(addTemp);
      }*/

   dogCreated.addTemperament(temperamentDb)

    res.send('Dog Created!')
}catch(e){ 
 next(e)
}
});


module.exports =router;