const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Medical = require('../models/medical.model');
const fs = require('fs');


const deleteImg = (path) => {
    //Verificacion si el usuario ya tiene una imagen
    if (fs.existsSync(path)) {
        //Eliminar la imagen anterior
        fs.unlinkSync(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al eliminar el path anterior',
                })
            }
        });
    };
}

const updateImg = async (type, id, fileName, object) => {
    const oldPath = `./uploads/${type}/${object.img}`;

    switch (type) {
        case 'medicals':
            deleteImg(oldPath);
            object.img = fileName
            await object.save();
            return true;
        case 'hospitals':
            deleteImg(oldPath);
            object.img = fileName
            await object.save();
            return true;
        case 'users':
            deleteImg(oldPath);
            object.img = fileName
            await object.save();
            return true;
    }
}


module.exports = {
    updateImg
}