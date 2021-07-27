const AdherentModel = require('../schema/models/adherent');

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
        console.log(err);
        res.status(200).send({ err })
    }
}