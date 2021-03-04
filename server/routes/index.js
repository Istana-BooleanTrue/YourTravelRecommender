const router = require('express').Router();

const UserController = require('../controllers/UserController.js');
const DestController = require('../controllers/DestController.js');

const { authenticate } = require('../middlewares/auth.js');

router.post('/login', UserController.login);
router.post('/oAuth', UserController.loginGoogle);
router.post('/register', UserController.register);

router.use(authenticate);

router.get('/weather', DestController.getWeather)
router.get('/destination', DestController.showAll);
router.get('/destination/one', DestController.showOne);

module.exports = router;
