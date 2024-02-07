/*
    Ruta: /api/hospitals
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getHospitals )

router.post('/', [ validateJWT, check('name','El nombre del hospital es necesario').not().isEmpty(),validateFields ] ,createHospital )

router.put('/:id',
    [ 
        validateJWT, 
        check('id','Ese no es un id valido').isMongoId(),
        check('name','El nombre del hospital es necesario').not().isEmpty(),
        validateFields

    ], updateHospital)

router.delete('/:id', [validateJWT, check('id','Ese no es un id valido').isMongoId(), validateFields ], deleteHospital);



module.exports = router;