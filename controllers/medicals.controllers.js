const { response } = require('express')
const { validationResult } = require('express-validator');
const Medical = require('../models/medical.model');


const getMedicals = async (req, res = response) => {

    try {
        const medicals = await Medical.find().populate('user', 'name').populate('hospital', 'name');
        return res.json({
            ok: true,
            medicals
           
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, hable con el administrador'
        })   
    }
}

const createMedical = async (req, res = response) => {

    // const { name } = req.body;
    const uid = req.uid;
    const medical = new Medical({ user: uid, ...req.body });

    try {
       const medicalDB = await medical.save()

        res.json({
            ok: true,
            medical: medicalDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal, hable con el administrador'
        })
    }

}

const updateMedical = (req, res = response) => {}

const deleteMedical = (req, res = response) => {}

const getMedical = (req, res = response) => {}

module.exports = {
    createMedical,
    updateMedical,
    deleteMedical,
    getMedical,
    getMedicals
}
