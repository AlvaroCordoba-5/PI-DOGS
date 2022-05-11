const { Router } = require('express');
const router = Router();
const {getAll} = require('./Functions.js');





router.get('/',async(req ,res)=> {
    try{
      const{name}=req.query;
const response= await getAll();

if(name){
    let dogName = await response.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    if(dogName.length){
        return res.status(200).send(dogName);
    }else{
       return res.status(400).send('Dog not found')
    }
}

         return res.status(200).send(response)
    }catch(err){
next(err)    }
})


router.get("/:idRaza", async (req, res,next) => {
    try{
        const {idRaza} = req.params
        const Dogs = await getAll()
        
        if(idRaza){
           
            let idFoundDog = Dogs.filter(e => e.id == idRaza)
            if(idFoundDog.length){
                res.status(200).json(idFoundDog)
            } else{
                res.status(404).send("Dog Not Found")
            }
        }
    } catch(error){
        next(error)
    }
})







module.exports = router;