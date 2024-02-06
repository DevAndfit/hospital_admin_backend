require('dotenv').config()
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/db');

//Crear servidor express
const app = express();

//cors
app.use(cors())

//Lectura y parseo del body

app.use(express.json());

//conexion a la base de datos
dbConnection();

//rutas del servidor
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/hospitals', require('./routes/hospitals.routes'));
app.use('/api/medicals', require('./routes/medicals.routes'));
app.use('/api/search', require('./routes/searches.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));


app.listen(process.env.PORT, () => {`
    ${console.log('Servidor corriendo en el puerto ' + process.env.PORT)}
`})