const { response } = require('express')
const Users = require('../models/user.model')
const Hospitals = require('../models/hospital.model')
const Medicals = require('../models/medical.model')


const getAll = async (req, res = response) => {

    const search = req.params.search
    const regex = new RegExp(search, 'i')

    const [usuarios, medicos, hospitales] = await Promise.all([
        Users.find({ name: regex }),
        Medicals.find({ name: regex }),
        Hospitals.find({ name: regex })
    ])


    try {

        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, contacta al administrador'
        })
    }
}

const getDocumentsCollections = async (req, res = response) => {

    const table = req.params.table
    const search = req.params.search
    const regex = new RegExp(search, 'i')
    let data = [];

    try {
        switch (table) {
            case 'medicals':
                data = await Medicals.find({ name: regex })
                break;
            case 'hospitals':
                data = await Hospitals.find({ name: regex })
                break;
            case 'users':
                data = await Users.find({ name: regex })
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                })
        }

        res.json({
            ok: true,
            resultados: data
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, contacta al administrador'
        })
    }
}


module.exports = {
    getAll,
    getDocumentsCollections
}

