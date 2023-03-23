const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// encrypt lösenordet så att det inte riktiga lösenordet syns i databasen
UserSchema.pre('save', async function(next) {
    try {
        const salt = uuidv4();
        let userPass = await CryptoJS.AES.encrypt(this.password, salt)
        this.password = userPass;
        next();
    }
    catch (error) {
        next(error);
    }
})

// decrypt lösenordet från databasen så att det matchar med det användaren skriver in för att logga in

module.exports = mongoose.model('User', UserSchema)
