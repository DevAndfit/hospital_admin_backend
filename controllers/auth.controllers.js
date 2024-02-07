const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
    //Recuperacion de los datos del body
    const { email, password } = req.body;

    try {
        //Verificacion de si el email existe en la base de datos
        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }
        //Verificacion de la contraseña en la base de datos
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }
        //Generacion de JWT
        const token = await generateJWT(userDB.id);


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, habla con el administrador'
        })
    }
};

const renewToken = async (req, res = response) => {

    const uid = req.uid;
  
    //Generacion de JWT
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    renewToken
}