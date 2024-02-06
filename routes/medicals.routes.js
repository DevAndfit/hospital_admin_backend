

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicals, createMedical, updateMedical, deleteMedical } = require('../controllers/medicals.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get( '/', validateJWT, getMedicals )

router.post('/', 
    [ 
        validateJWT, 
        check('name','El nombre es requerido').not().isEmpty(),
        check('hospital','Debe ser un id de hospital valido').isMongoId(),
        validateFields,
    ], 
    createMedical)

router.put('/:id', [], updateMedical)

router.delete('/:id', deleteMedical);



module.exports = router;