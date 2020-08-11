const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createTokens } = require('../middlewares/jwt');
const { schema } = require('../constants');
const { db } = require('../services/firestore');
const { getToken } = require('../middlewares');

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
    const token = getToken(req);
    if (!token) {
      res.status(200).send({
        message: 'User already logged out'
      })
    }
    const jwtResponse = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    if (!jwtResponse || !jwtResponse.user) {
      res.status(200).send({
        message: 'User already logged out'
      })
    }
    const userSnapshot = await db.collection('users').where('email', '==', jwtResponse.user.email).get();
    if (userSnapshot && userSnapshot.docs.length) {
      const user = userSnapshot.docs[0].data();
      const response = await db.collection('users').doc(userSnapshot.docs[0].id)
        .set({ ...user, token: null, refreshToken: null });
      if (response) {
        res.status(200).send({
          message: 'logout successfull'
        })
      } else {
        res.status(500).send({
          error: 'Could not logout user'
        })
      }
    } else {
      res.status(400).send({
        error: "User not found with registered email"
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