const express = require('express');

const Employe = require('../models/employe');

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
    let emp = new Employe(data);
    emp.image = filename
    emp.save()
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

    Employe.aggregate(
        [
        
            {
                $lookup:{
                    from:'departements',
                    localField:'idDep',
                    foreignField:'_id',
                    as:'dep'
                }
            }


        ]
    )
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
    let id = req.params.id;
    Employe.findOne({_id : id})
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
    let id = req.params.id;
    Employe.findByIdAndDelete({ _id : id})
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


router.put('/update/:id', upload.any('image'), (req,res)=>{
    let id = req.params.id;
    let newData = req.body;

    if(filename.length>0){
        newData.image = filename;
    }

    Employe.findByIdAndUpdate({_id : id} , newData)
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







module.exports = router;