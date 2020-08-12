const jwt = require('jsonwebtoken');
const { db } = require('../services/firestore');

const SECRET = process.env.JWT_TOKEN_SECRET;
const SECRET_REFRESH_TOKEN = process.env.JWT_UPDATE_TOKEN_SECRET;

// method to verify and check token in db
const jwtMiddleware = async (req, res, next) => {
  // get token from header
  const token = getToken(req);

  if (!token) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }

  try {
    const response = jwt.verify(token, SECRET);

    // check if the same token exists for the user logging in
    const tokenResponse = await db
      .collection('users')
      .where('email', '==', response.user.email)
      .where('token', '==', token)
      .get();

    // if user has different token, return error
    if (!tokenResponse || !tokenResponse.docs.length) {
      res.status(403).json({
        error: 'Invalid token',
      });
      return;
    }

    // attach verified token user with req
    req.user = response.user;
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }

  next();
};

// method to create token and refresh token
const createTokens = (user) => {
  // get required params
  const { id, email, type } = user;

  // configure and create tokens
  const token = jwt.sign(
    {
      user: { id, email, type },
    },
    SECRET,
    {
      expiresIn: '72h',
    }
  );
  const refreshToken = jwt.sign(
    {
      user: user.id,
    },
    SECRET_REFRESH_TOKEN,
    {
      expiresIn: '7d',
    }
  );

  return { token, refreshToken };
};

// method to get the token from header
function getToken(req) {
  // get authorization header from req
  const header = req.get('Authorization');
  if (!header) {
    return null;
  }

  // split it to get Bearer
  const parts = header.split(' ');
  if (parts.length !== 2) {
    return null;
  }
  const scheme = parts[0];
  const token = parts[1];
  if (/^Bearer$/i.test(scheme)) {
    return token;
  }
  return null;
}

module.exports = {
  jwtMiddleware,
  createTokens,
  getToken,
};
