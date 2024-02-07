const { response } = require('express')
const { validationResult } = require('express-validator');
const Hospital = require('../models/hospital.model');
const mongoose = require('mongoose');


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

const updateHospital = async (req, res = response) => {

    //Recupecion de uid los de los parametros de la peticion
    const id = req.params.id
    const userId = req.uid;

    try {

        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) {
            return res.status(400).json({
                ok: false,
                msg: 'Parese que ese no es un id valido'
            }) 
        }

        //Busqueda del hospital en la db por el uid
        const hospitalDB = await Hospital.findById(id);
        //Manejo de error si el usuario no existe
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            })
        };

        //Actualizacion del usuario
        const newHospital = {
            ...req.body,
            user: userId
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, newHospital, {new:true});

        res.json({
            ok: true,
            msg: `${ hospitalDB.name } fue actualizado`,
            hospitalUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Algo salio mal'
        })
    }


 }

const deleteHospital = async (req, res = response) => {
    //Recupecion de uid los de los parametros de la peticion
    const id = req.params.id
    try {
        const isValid = mongoose.Types.ObjectId.isValid(id)
        if (!isValid) {
            return res.status(400).json({
                ok: false,
                msg: 'Parese que ese no es un id valido'
            }) 
        }
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese id'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:`${ hospitalDB.name } eliminado/a`,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, hable con el administrador'
        })  
    }
 }

const getHospital = async (req, res = response) => { }

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital,
    getHospital
}
