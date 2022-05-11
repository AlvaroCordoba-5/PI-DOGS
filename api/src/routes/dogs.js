const { Router } = require('express');
const router = Router();
const {getApi,getAll} = require('./Functions.js');
const {Dog,Temperament} =require('../db')




router.get('/',async(req ,res,next)=> {
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
        const api = await getApi()
        
    

        if(idRaza){

       let dogsApi = api.filter(e => e.id == idRaza)
           
          var returnFoundDog = idRaza.length<10?dogsApi: [await Dog.findByPk(idRaza,{
                include:{
                    model:Temperament,
                    attributes:["name"],
                    through:{
                        attributes:[],
                    },
                },
            })
        ];

        }
            if(returnFoundDog.length){
                res.status(200).json(returnFoundDog)
            } else{
                res.status(404).send("Dog Not Found")
            }
       
    }catch(error){
        next(error)
    }
})




module.exports = router;