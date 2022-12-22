const express = require('express');

const Departement = require('../models/departement');

const router = express.Router();

router.post('/ajout', (req,res)=>{

    let data = req.body;
    let dep = new Departement(data);
    dep.save()

        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})


router.get('/all', (req,res)=>{
    
    Departement.find()
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})


router.get('/getById/:id', (req,res)=>{
    let myId = req.params.id;

    Departement.findById({ _id : myId})

        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})


router.delete('/delete/:id', (req,res)=>{
    let myId = req.params.id;

    Departement.findByIdAndDelete({ _id: myId})
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})


router.put('/update/:id', (req,res)=>{
    
    myId = req.params.id;

    let newData = req.body;

    Departement.findByIdAndUpdate({_id : myId} , newData)
        .then(
            (result)=>{
                res.send(result);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )
})







module.exports = router;