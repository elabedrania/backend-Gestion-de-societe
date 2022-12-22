const express = require('express');
const cors = require('cors');

require('./config/connect');


const adminRoute = require('./routes/admin');
const clientRoute = require('./routes/client');
const departementRoute = require('./routes/departement');
const employeRoute = require('./routes/employe');
const app = express();
app.use(express.json());
app.use(cors());



app.use('/admin', adminRoute);
app.use('/client', clientRoute);
app.use('/departement', departementRoute);
app.use('/employe', employeRoute);

app.use('/getimage', express.static('./upload'));



app.listen( 3000, ()=>{
    console.log('server work hhhhhh :)');
})

