const mongoose = require('mongoose');

const adherentSchema = new mongoose.Schema({
    card: {
        type: String,
        required: true,
        length: 13,
        unique: true
    },
    name: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 55
    },
    firstName: {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 55
    },
    link_photo: {
        type: String
    },
    email: {
        type: String
    },
    price: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'price'
    },
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'training'
    },
    active: {
        type: Boolean
    },
    member: {
        type: Boolean
    },
    code: {
        type: Number
    },
    secret_code: {
        type: Number
    },
    administrator: {
        type: Boolean
    },
    superAdministrator: {
        type: Boolean
    }
}, { collection: 'adherent', versionKey: false });

const AdherentModel = mongoose.model('adherent', adherentSchema);
module.exports = AdherentModel;