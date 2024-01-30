/*
    Ruta: /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio con un minimo de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    login);


module.exports = router;