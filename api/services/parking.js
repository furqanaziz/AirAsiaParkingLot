const { db } = require('../services/firestore');
const helpers = require('../helpers')

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

const getNearestSpot = async () => {
  try {
    const snapshot = await db.collection('slots').where('alloted', '==', false).get();
    const sortedSlots = helpers.serailizeSlots(snapshot);
    return sortedSlots.length ? sortedSlots[0] : false;
  } catch (error) {
    console.log(error);
    throw new Error({
      success: false,
      message: error.message || 'Could not check nearest spots',
    });
  }
}

// const get = async (car) => {
//   try {
//     const snapshot = await db.collection('slots').where('alloted', '==', true).where('car.number', '==', car.number).get();
//     return snapshot.docs.length || false;
//   } catch (error) {
//     console.log(error);
//     throw new Error({
//       success: false,
//       message: error.message || 'Could not check car number',
//     });
//   }
// }

module.exports = {
  existingCarNumber,
  getNearestSpot
}