const express = require('express');

const Admin = require('../models/admin');

const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post( '/register' , ( req , res )=>{

    let data= req.body;
    let adm = new Admin(data);

    let salt = bcrypt.genSaltSync(10);
    let cyptedPass = bcrypt.hashSync(data.password , salt);

    adm.password =cyptedPass;
    adm.save()
    .then( 

        (result)=>{
        res.status(200).send(result)

        })
    .catch(
        
        (err)=>{
        res.status(400).send(err)
    
    })


})
router.post( '/login'   , ( req , res )=>{

        let data= req.body;

        Admin.findOne({ email:data.email})
        .then( 

        (result)=>{
        let validPass = bcrypt.compareSync(data.password , result.password);

        if(validPass ==false){
        res.status(401).send('email or password invalid')
}   
        else{
            let playload = {

                _id : result._id,
                fullname :result.fullname,
                email: result.email

            }
            let token= jwt.sign( playload , '123456789');

            res.status(200).send({ mytoken: token});
        }
        }
        )
    .catch(
        
        (err)=>{
        res.status(400).send(err)
    
    })



})








module.exports = router;