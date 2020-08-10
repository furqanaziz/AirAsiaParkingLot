const bcrypt = require('bcrypt');
const { createTokens } = require('../middlewares/jwt');
const { schema, values } = require('../constants');
const { db } = require('../services/firestore');

const login = async (req, res, next) => {
  try {
    const payload = req.body;
    const { error } = schema.LoginSchema.validate(payload, {
      abortEarly: false
    });
    if (error) {
      next(error);
      return;
    }
    const { email, password } = payload;
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot && snapshot.docs.length) {
      const user = snapshot.docs[0].data();
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (passwordMatched) {
        const tokens = createTokens({ email: user.email });
        // update user tokens
        const response = await db.collection('users').doc(snapshot.docs[0].id)
          .set({ ...user, token: tokens.token, refreshToken: tokens.refreshToken });
        console.log(response)
        res.send({
          tokens,
          email: user.email
        });
        return
      } else {
        res.status(400).send({
          error: "Invalid password for the email"
        })
        return
      }
    } else {
      res.status(400).send({
        error: "Invalid credentials for user"
      })
      return
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      message: error.message || 'Could not login',
    });
  }
}

const logout = async (req, res, next) => {
  try {
    const userSnapshot = await db.collection('users').where('email', '==', req.user.email).get();
    if (userSnapshot && userSnapshot.docs.length) {
      const user = userSnapshot.docs[0].data();
      const response = await db.collection('users').doc(userSnapshot.docs[0].id)
        .set({ ...user, token: null, refreshToken: null });
      if (response) {
        res.status(200).send({
          message: 'logout successfull'
        })
      }
    } else {
      res.status(400).send({
        error: "Error while loggin out"
      })
      return
    }
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).send({
      success: false,
      message: error.message || 'Could not logout',
    });
  }
}

module.exports = {
  login,
  logout
}