const AdherentModel = require('../models/adherent');
const { addAdherentErrors, signInErrors } = require('../utils/errors.utils')
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.addAdherent = async(req, res) => {
    const { card, name, firstName, email, price, training } = req.body;

    try {
        const adherent = await AdherentModel.create({
            card,
            name,
            firstName,
            "link_photo": card + ".png",
            email,
            price,
            training,
            "active": false,
            "member": false,
            "code": null,
            "secret_code": null,
            "administrator": false,
            "superAdministrator": false
        });
        res.status(201).json({ adherent: adherent._id });
    } catch (err) {
        const errors = addAdherentErrors(err);
        res.status(200).json({ errors })
    }
}

module.exports.signIn = async(req, res) => {
    const { card, code } = req.body;

    try {
        const adherent = await AdherentModel.login(card, code.toString());
        const token = createToken(adherent._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ adherent: adherent._id })
    } catch (err) {
        const errors = signInErrors(err);
        res.status(200).json(errors);
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}