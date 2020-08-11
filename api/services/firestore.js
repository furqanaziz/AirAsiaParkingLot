const admin = require('firebase-admin');
const serviceAccount = require('../constants/parkinglot-key.json');
let db;

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();
  // console.log(db)
} catch (error) {
  console.log(error);
}

module.exports = {
  db
}
