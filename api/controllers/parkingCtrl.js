const { db } = require('../services/firestore');
const helpers = require('../helpers');
const { schema } = require('../constants');
const parkingService = require('../services/parking');

// get all slots with details
const getAll = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').get();
    res.status(200).send(helpers.serailizeSlots(snapshot));
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).send(error);
  }
};

// get all available slots
const getAvailableSpots = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', false).get();
    res.status(200).send(helpers.serailizeSlots(snapshot));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not get available spots',
    });
  }
};

// get count of available slots
const getAvailableSpotsCount = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', false).get();
    res.status(200).send({ count: snapshot.docs.length });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not get count of available slots',
    });
  }
};

// get all alloted/parked slots
const getAllotedSpots = async (req, res, next) => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', true).get();
    res.status(200).send(helpers.serailizeSlots(snapshot));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send({
      success: false,
      message: error.message || 'Could not get available spots',
    });
  }
};

// park the car to a slot
const park = async (req, res, next) => {
  try {
    const payload = req.body;
    // validate fields for car
    const { error } = schema.CarParkSchema.validate(payload, {
      abortEarly: false,
    });

    if (error) {
      next(error);
      return;
    }
    // check if car number is already in the parking lot
    const alreadyParked = await parkingService.existingCarNumber(payload);
    if (alreadyParked) {
      res.status(400).send({ error: 'Car already parked' });
      return;
    }
    // get the nearest spot
    const nearestSlot = await parkingService.getNearestSpot();

    if (!nearestSlot) {
      // if all slots are filled, return
      res.status(400).send({ error: 'All slots filled' });
      return;
    }
    // add car details to the nearest slot
    await db.collection('slots').doc(nearestSlot.id).set({ alloted: true, car: payload });

    res.status(200).send({ id: nearestSlot.id });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not park',
    });
  }
};

// un park car from a slot
const unpark = async (req, res, next) => {
  try {
    // check for slot id in params
    if (!req.params.id) {
      res.status(400).send({ error: 'Required slot id in params' });
      return;
    }
    // check if such slot exists
    const slot = await db.collection('slots').doc(req.params.id.toString()).get();
    if (!slot || !slot.exists) {
      res.status(400).send({ error: 'No such slot in the parking' });
      return;
    }
    // un park the car from that slot
    await db.collection('slots').doc(slot.id).set({ alloted: false, car: null });

    // return freed car from the slot
    res.status(200).send({ car: slot.data().car });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not un park from slot',
    });
  }
};

// get car based on its fields
const getCar = async (req, res, next) => {
  try {
    // check for field and value of car
    if (!req.params.field || !req.params.value) {
      res.status(400).send({ error: 'Required field to query and its value in params' });
      return;
    }
    // get car(s) based on the params
    const snapshot = await db
      .collection('slots')
      .where(`car.${req.params.field}`, '==', req.params.value)
      .get();

    if (!snapshot || !snapshot.docs.length) {
      // return if there are no such cars
      res.status(400).send({ error: 'No such car(s) in the parking' });
      return;
    }
    res.status(200).send(helpers.getCarsFromSlots(helpers.serailizeSlots(snapshot)));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).send({
      success: false,
      error: error.message || 'Could not get cars based on the params',
    });
  }
};

module.exports = {
  getAll,
  getAvailableSpots,
  getAvailableSpotsCount,
  getAllotedSpots,
  park,
  unpark,
  getCar,
};
