var express = require('express');
var router = express.Router();
const parkingCtrl = require('../controllers/parkingCtrl')

router.get('/', parkingCtrl.getAll);
router.get('/available', parkingCtrl.getAvailableSpots);
router.get('/available/count', parkingCtrl.getAvailableSpotsCount);
router.get('/alloted', parkingCtrl.getAllotedSpots);
router.post('/park', parkingCtrl.park);
router.post('/unpark/:id', parkingCtrl.unpark);
router.get('/car/:field/:value', parkingCtrl.getCar);

// seed method
router.post('/seed', parkingCtrl.seedParking);

module.exports = router;