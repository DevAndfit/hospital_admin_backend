/*
    Ruta: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controllers');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio con un minimo de 6 caracteres').isLength({ min: 6 }),
    validateFields
],
    createUser)

router.put('/:id', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio con un minimo de 6 caracteres').isLength({ min: 6 }),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validateFields,
],
    updateUser)

router.delete('/:id',validateJWT , deleteUser);

router.post('/login', )



module.exports = router;