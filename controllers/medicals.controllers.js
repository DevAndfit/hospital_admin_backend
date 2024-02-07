const { response } = require('express')
const { validationResult } = require('express-validator');
const Medical = require('../models/medical.model');
const mongoose = require('mongoose');


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

const updateMedical = async (req, res = response) => {
     //Recupecion de uid los de los parametros de la peticion
     const id = req.params.id
     const userId = req.uid;
 
     try {
         const isValid = mongoose.Types.ObjectId.isValid(id)
         if ( !isValid ) {
             return res.status(400).json({
                 ok: false,
                 msg: 'Parese que ese no es un id valido'
             }) 
         }
 
         //Busqueda del hospital en la db por el uid
         const medicalDB = await Medical.findById(id);
         //Manejo de error si el usuario no existe
         if (!medicalDB) {
             return res.status(404).json({
                 ok: false,
                 msg: 'No existe un medico con ese id'
             })
         };
 
         //Actualizacion del usuario
         const newMedical = {
             ...req.body,
             user: userId
         }
 
         const medicalUpdated = await Medical.findByIdAndUpdate(id, newMedical, {new:true});
 
         res.json({
             ok: true,
             msg: `${ medicalDB.name } fue actualizado`,
             medicalUpdated
         })
         
     } catch (error) {
         console.log(error);
         res.status(500).json({
             ok:false,
             msg:'Algo salio malm hable con el administrador'
         })
     }
}

const deleteMedical = async (req, res = response) => {
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
            const medicalDB = await Medical.findById(id);
            if (!medicalDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un medico con ese id'
                })
            }
    
            await Medical.findByIdAndDelete(id);
    
            res.json({
                ok:true,
                msg:`${ medicalDB.name } eliminado/a`,
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error inesperado, hable con el administrador'
            })  
        }
}

const getMedical = (req, res = response) => {}

module.exports = {
    createMedical,
    updateMedical,
    deleteMedical,
    getMedical,
    getMedicals
}
