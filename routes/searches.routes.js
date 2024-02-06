/*
    route: api/todo/:busqueda
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const {  getAll, getDocumentsCollections } = require('../controllers/searches.controllers');

const router = Router();

router.get( '/:search', validateJWT, getAll );
router.get( '/collection/:table/:search', validateJWT, getDocumentsCollections );


module.exports = router;