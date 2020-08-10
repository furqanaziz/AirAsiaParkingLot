var express = require('express');
var router = express.Router();
const authCtrl = require('../controllers/authCtrl')

router.post('/login', authCtrl.login);
router.post('/logout', authCtrl.logout);

module.exports = router;