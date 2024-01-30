const { response } = require('express')
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req, res = response) => {

    const users = await User.find({}, '_id name email role google');
    const total = users.length;

    try {
        res.json({
            ok: true,
            total,
            users,
            uid: req.uid
           
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};

const createUser = async (req, res = response) => {

    //recuperacion de body de la peticion
    const { email, password } = req.body;

    try {
        //verificiacion de email en la bd
        const emailExist = await User.findOne({ email });
        //manejo de error si el email ya existe
        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        };
        //creacion del nuevo usuario
        const user = new User(req.body)
        //Encriptacion de contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        //Guardado del nuevo usuario en la bd
        await user.save();
        //Generacion de JWT
        const token = await generateJWT(user.id);
        //Respuesta de la peticion con el status y la informacion del nuevo usuario creado
        res.json({
            ok: true,
            user,
            
        })

    } catch (error) {
        //Manejo de error si hay un problema en el servidor
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

};

const updateUser = async (req, res = response) => {

    //TODO: validar token y comprobar si es el usuario correcto

    //Recupecion de uid los de los parametros de la peticion
    const uid = req.params.id
    // //Recuperacion de body de la peticion
    // const { _id, password, google, email, ...fields } = req.body;

    try {
        //Busqueda del usuario en la db por el uid
        const userDB = await User.findById(uid);
        //Manejo de error si el usuario no existe
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        };

        //Actualizacion del usuario
        const { password, google, role, email, ...fields } = req.body;
        //Verificacion del email en la bd vs el email de la request
        if (userDB.email !== email) {

            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        
        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, fields, {new:true});

        res.json({
            ok: true,
            userUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Algo salio mal'
        })
    }

};

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;
    
    try {

        const userDb = await User.findById(uid);
        if (!userDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        };
        
        const user = await User.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: `El usuario ${user.name} fue borrado con exito`,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inersperado, habla con el administrador'
        })
    }
    
};







module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,


}