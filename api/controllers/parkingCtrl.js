const { db } = require('../services/firestore');
const helpers = require('../helpers');
const { schema } = require('../constants');
const parkingService = require('../services/parking');

// method to initialize slots in db
const seedParking = async (req, res, next) => {
  try {
    for (let i = 1; i <= 150; i++) {
      const id = "" + i;
      await db.collection('slots').doc(id)
        .set({ alloted: false, car: null });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error
    })
  }
}

const getAll = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').get();
    res.status(200).send(helpers.serailizeSlots(snapshot));
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).send(error);
  }
}

const getAvailableSpots = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', false).get();
    res.status(200).send(helpers.serailizeSlots(snapshot));
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not get available spots',
    });
  }
}

const getAvailableSpotsCount = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', false).get();
    res.status(200).send({ count: snapshot.docs.length });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not get count of available spots',
    });
  }
}

const getAllotedSpots = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', true).get();
    res.status(200).send(helpers.serailizeSlots(snapshot));
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      message: error.message || 'Could not get available spots',
    });
  }
}

const park = async (req, res, next) => {
  try {
    const payload = req.body;
    const { error } = schema.CarParkSchema.validate(payload, {
      abortEarly: false
    });
    if (error) {
      next(error);
      return;
    }
    // check if car exists
    const alreadyParked = await parkingService.existingCarNumber(payload);
    if (alreadyParked) {
      res.status(400).send({ error: 'Car already parked' });
      return
    }
    const nearestSpot = await parkingService.getNearestSpot();
    if (!nearestSpot) {
      res.status(400).send({ error: 'All spots filled' });
      return
    }
    await db.collection('slots').doc(nearestSpot.id)
      .set({ alloted: true, car: payload });
    res.status(200).send({ id: nearestSpot.id });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not park',
    });
  }
}

const unpark = async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ error: 'Required slot id in params' });
      return;
    }
    const slot = await db.collection('slots').doc(req.params.id.toString()).get();
    if (!slot) {
      res.status(400).send({ error: 'No such slot in the parking' });
      return;
    }
    await db.collection('slots').doc(slot.id)
      .set({ alloted: false, car: null });

    res.status(200).send({ car: slot.data().car });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not get available spots',
    });
  }
}

const getCar = async (req, res, next) => {
  try {
    if(!req.params.field || !req.params.value){
      res.status(400).send({ error: 'Required field to query and its value in params' });
      return;  
    }
    const snapshot = await db.collection('slots').where(`car.${req.params.field}`, '==', req.params.value).get();
    if (!snapshot || !snapshot.docs.length) {
      res.status(400).send({ error: 'No such car in the parking' });
      return;
    }
    res.status(200).send(helpers.getCarsFromSlots(helpers.serailizeSlots(snapshot)));
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not get available spots',
    });
  }
}

module.exports = {
  getAll,
  getAvailableSpots,
  getAvailableSpotsCount,
  getAllotedSpots,
  park,
  unpark,
  getCar,
  seedParking
}