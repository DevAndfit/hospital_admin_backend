/*
    route: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, getImg } = require('../controllers/uploads.controllers');

const router = Router();
router.use(expressFileUpload());

router.put( '/:type/:id', validateJWT, fileUpload );
router.get( '/:type/:img', getImg );


module.exports = router;