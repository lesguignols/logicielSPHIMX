const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const adherentController = require('../controllers/adherent.controller');

//auth
router.post("/register", authController.addAdherent);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//adherent DB
router.get('/', adherentController.getAll);
router.get('/id/:id', adherentController.getInfo);
router.get('/card', adherentController.getByCard);
router.get('/name', adherentController.getByName);
router.get('/firstName', adherentController.getByFirstName);
router.get('/price', adherentController.getByPrice);
router.get('/training', adherentController.getByTraining);
router.get('/active', adherentController.getByActive);
router.get('/member', adherentController.getByMember);
router.get('/administrator', adherentController.getByAdministrator);
router.get('/superAdministrator', adherentController.getBySuperAdministrator);

//update adherent by ID
router.put('/updateCard/:id', adherentController.updateCard);
router.put('/updateName/:id', adherentController.updateName);
router.put('/updateFirstName/:id', adherentController.updateFirstName);
router.put('/updateLinkPhoto/:id', adherentController.updateLinkPhoto);
router.put('/updateEmail/:id', adherentController.updateEmail);
router.put('/updatePrice/:id', adherentController.updatePrice);
router.put('/updateTraining/:id', adherentController.updateTraining);
router.put('/updateActive/:id', adherentController.updateActive);
router.put('/updateMember/:id', adherentController.updateMember);
router.put('/updateCode/:id', adherentController.updateCode);
router.put('/updateSecretCode/:id', adherentController.updateSecretCode);
router.put('/updateAdministrator/:id', adherentController.updateAdministrator);
router.put('/updateSuperAdministrator/:id', adherentController.updateSuperAdministrator);

module.exports = router;