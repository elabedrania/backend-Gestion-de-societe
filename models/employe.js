const mongoose = require('mongoose');
const objectId = require('mongodb').ObjectId;
const Employe = mongoose.model('Employe' , {

    name : String,
    lastName: String,
    tel: String,
    email: String,
    adresse: String,
    image: String,
    idDep : objectId
})

module.exports = Employe;