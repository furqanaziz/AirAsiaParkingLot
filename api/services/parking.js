const { db } = require('../services/firestore');
const helpers = require('../helpers')

// check if car exists in parking lot by its number
const existingCarNumber = async (car) => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', true).where('car.number', '==', car.number).get();
    return snapshot.docs.length || false;
  } catch (error) {
    console.log(error);
    throw new Error({
      success: false,
      message: error.message || 'Could not check car number',
    });
  }
}

// get nearest free slot for parking
const getNearestSpot = async () => {
  try {
    const slotsSnapshot = await db.collection('slots').where('alloted', '==', false).get();
    
    // sort slots to get nearest to the entry point
    const sortedSlots = helpers.serailizeSlots(slotsSnapshot);

    // return nearest slot if found else return false
    return sortedSlots.length ? sortedSlots[0] : false;
  } catch (error) {
    console.log(error);
    throw new Error({
      success: false,
      message: error.message || 'Could not check nearest spots',
    });
  }
}

module.exports = {
  existingCarNumber,
  getNearestSpot
}