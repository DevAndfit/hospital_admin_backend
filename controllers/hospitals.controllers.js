const { response } = require('express')
const { validationResult } = require('express-validator');
const Hospital = require('../models/hospital.model');


const getHospitals = async (req, res = response) => {

    try {
        const hospitals = await Hospital.find().populate('user', 'name')

        return res.json({
            ok: true,
            hospitals
        })
    } catch (error) {

    }
}

const createHospital = async (req, res = response) => {

    // const { name } = req.body;
    const uid = req.uid;
    // todo: validar que el id del hospital sea un hospital valido en la base de datos
    const hospital = new Hospital({ user: uid, ...req.body });

    try {
       const hospitalDB = await hospital.save()
      

        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, hable con el administrador'
        })
    }
}

const updateHospital = (req, res = response) => { }

const deleteHospital = (req, res = response) => { }

const getHospital = (req, res = response) => { }

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
    getHospital
}
