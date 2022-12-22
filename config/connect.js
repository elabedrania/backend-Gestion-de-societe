const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/final')
    .then(
        ()=>{
            console.log('connected to db :D');
        }
    )
    .catch(
        (err)=>{
            console.log(err);
        }
    )