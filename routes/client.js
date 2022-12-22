const express = require('express');

const Client = require('../models/client');

const router = express.Router();






//upload image config
const multer = require('multer');

filename='';
const myStorage = multer.diskStorage({
    destination : './upload',
    filename: (req, file , redirection)=>{
        let fl = Date.now()+ '.' + file.mimetype.split('/')[1];
        filename=fl;
        redirection(null, fl);

    }
})

const upload = multer({storage: myStorage});



router.post('/ajout',upload.any('image'), (req,res)=>{

    let data = req.body;
    let cl = new Client(data);
    cl.image = filename
    cl.save()
        .then(
            (result)=>{
                filename = '';
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
    Client.find()
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

    Client.findById({ _id : myId})

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

    Client.findByIdAndDelete({ _id: myId})
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


router.put('/update/:id', upload.any('image') , (req,res)=>{
    myId = req.params.id;

    let newData = req.body;

    if(filename.length>0){
        newData.image = filename;
    }

    Client.findByIdAndUpdate({_id : myId} , newData)
        .then(
            (result)=>{
                filename='';
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