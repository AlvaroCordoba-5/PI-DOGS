const { Router } = require('express');
// Importar todos los routers;
 const getDogs = require('./dogs.js');
 const getTemperaments= require('./temperament.js')
 const postDogs = require('./postDog.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/temperament',getTemperaments)
router.use('/dogs',getDogs)
router.use('/dog',postDogs)




module.exports = router;
