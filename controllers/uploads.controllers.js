const { response } = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { updateImg } = require('../helpers/update-img');

const Medical = require('../models/medical.model');
const Hospital = require('../models/hospital.model');
const User = require('../models/user.model');


const fileUpload = async (req, res = response) => {

    const validTypes = ['hospitals', 'medicals', 'users'];
    const type = req.params.type;
    const id = req.params.id;
    let validId = false

    try {
        //Validacion que sea un tipo valido
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es un medico, usuario u hospital'
            });
        };
        //Validacion que sea un id valido
        switch (type) {
            case 'hospitals':
                validId = await Hospital.findById(id);
                break;
            case 'medicals':
                validId = await Medical.findById(id);
                break;
            case 'users':
                validId = await User.findById(id);
                break;
        }
        if (!validId) {
            
            return res.status(400).json({
                ok: false,
                msg: `No es un id de ${type} valido`
            })
        }

        // Validacion de que exista un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el archivo'
            })
        };
        // Procesar la imagen
        const file = req.files.img;
        const nameSplit = file.name.split('.');
        const extensionFile = nameSplit[nameSplit.length - 1];
        //Validar extension
        const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        if (!validExtensions.includes(extensionFile)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension valida'
            })
        }
        // Generar nombre del archivo
        const fileName = `${uuidv4()}.${extensionFile}`

        //Path para guardar la imagen
        const path = `./uploads/${type}/${fileName}`;

        //Mover la imagen
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: "Error al mover la imagen"
                })
            }

            //Actualizar base de datos....
            updateImg(type, id, fileName, validId)

            res.json({
                ok: true,
                msg: `el archivo ${fileName} fue subido con exito`
            })
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        })
    }

}

const getImg = async (req, res = response) => {

    try {
        const type = req.params.type;
        const img = req.params.img;
        const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);
        
        // image par default
        if (fs.existsSync(pathImg)) {
            res.sendFile(pathImg); 
        }else {
            const pathImg = path.join(__dirname, `../uploads/not-available.jpg`);
            res.sendFile(pathImg);
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        })
    }

}


module.exports = {
    fileUpload,
    getImg,
}