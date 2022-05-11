const axios = require('axios')
const {Dog,Temperament} =require('../db')

async function getApi(){
    try{
        const api = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY} ')
        const response = await api.data.map(e =>{
            return{
                id:e.id,
                name: e.name,
                temperament:e.temperament,
                life:e.life_span,
                weight_min: Number(e.weight.metric.slice(0,2)),
                weight_max: Number(e.weight.metric.slice(4)),
                height_min: Number(e.height.metric.slice(0,2)),
                height_max: Number(e.height.metric.slice(4)),
                image:e.image.url,
                Api:true
            }
        })
        return response
    }catch(err){
        console.log(err)
    }
  
}

async function getDb(){
return await Dog.findAll({
    include:{
        model:Temperament,
        attributes:['name'],
        through:{
            attributes:[],
        },

    }
}
)

}

async function getAll(){
    const api= await getApi();
const db = await getDb();
const getTotal=api.concat(db);


return getTotal
}

async function DataBase(){
    const get = await getAll()
    const temperaments = await get.map(e=>e.temperament)
    let split=temperaments.toString().split(',').map(e=> e.trim());
    
    let filtred = new Set(split);
 let result = [...filtred];
 let finalResult = result.filter(e => e.length > 1);



 finalResult.map(e => {
    if(e){
        Temperament.findOrCreate({
            where: {
                name: e
            }
        })
    }
})
const temps= await Temperament.findAll();

return temps

}





module.exports ={getAll,DataBase,getApi}