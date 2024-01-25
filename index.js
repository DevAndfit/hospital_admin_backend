require('dotenv').config()
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/db');

//Crear servidor express
const app = express();

//cors
app.use(cors())

//conexion a la base de datos
dbConnection();

//rutas del servidor
app.get('/', (req, res) => {
    res.json({
        ok:true,
        msg:'hola mundo'
    })
})

app.listen(process.env.PORT, () => {`
    ${console.log('Servidor corriendo en el puerto ' + process.env.PORT)}
`})