const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = ( req, res = response, next ) => {

    //errores
    const errors = validationResult( req );
    //verificar si hay errores
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        }) 
    }

    next()

}

module.exports = {
    validateFields
}