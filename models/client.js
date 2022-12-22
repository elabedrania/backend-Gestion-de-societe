const mongoose = require('mongoose');

const Client = mongoose.model('Cliens', {

    name : String,
    description : String,
    entreprise : String,
    titreProjet : String,
    image : String

}
)


module.exports = Client;