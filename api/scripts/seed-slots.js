const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { db } = require('../services/firestore');

// method to initialize slots in db
const seedParking = async () => {
  const slots = +(process.argv[2] || 150);
  const record = { alloted: false, car: null };
  try {
    for (let i = 1; i <= slots; i++) {
      await db.collection('slots').doc(`${i}`).set(record);
    }
    console.info(`Seeded ${slots} available slots`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = seedParking();
