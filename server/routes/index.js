const router = require('express').Router();

const UserController = require('../controllers/UserController.js');
const DestController = require('../controllers/DestController.js');

const { authenticate } = require('../middlewares/auth.js');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authenticate);

router.get('/destination', DestController.showAll);

module.exports = router;
