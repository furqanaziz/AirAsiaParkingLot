const jwt = require('jsonwebtoken');
const { db } = require('../services/firestore');

const SECRET = process.env.JWT_TOKEN_SECRET;
const SECRET_REFRESH_TOKEN = process.env.JWT_UPDATE_TOKEN_SECRET;

const jwtMiddleware = async (req, res, next) => {
  if (req.url.includes('login')) {
    return next();
  }
  const token = getToken(req);
  if (token) {
    try {
      const response = jwt.verify(token, SECRET);
      const tokenResponse = await db.collection('users')
        .where('email', '==', response.user.email).where('token', '==', token).get();
      if (!tokenResponse || !tokenResponse.docs.length) {
        res.status(403).json({
          error: 'Invalid token'
        })
        return;
      }
      req.user = response.user;
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }
  } else {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
  next();
};

const createTokens = user => {
  const { id, email, type } = user;
  const token = jwt.sign(
    {
      user: { id, email, type }
    },
    SECRET,
    {
      expiresIn: '72h'
    }
  );
  const refreshToken = jwt.sign(
    {
      user: user.id
    },
    SECRET_REFRESH_TOKEN,
    {
      expiresIn: '7d'
    }
  );
  return { token, refreshToken };
};

function getToken(req) {
  const header = req.get('Authorization');
  if (!header) {
    return null;
  }
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
  createTokens
};
