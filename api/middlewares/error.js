// serialize errors by Joi package
const serializeJoiError = error => {
  const details = error.details.reduce((acc, item) => {
    if (!acc[item.path[0]]) {
      acc[item.path[0]] = item.message;
    }
    return acc;
  }, {});
  return {
    success: false,
    message: details
  };
};

// app level error middleware
const errorsMiddleware = async (err, req, res, next) => {
  console.log('Server error:');
  // JWT auth errors
  if (err && err.status === 403) {
    res.status(403).json({ err: err.message });
    return;
  } else if (err.isJoi) {
    const errorDetails = serializeJoiError(err);
    res.status(422).json(errorDetails);
    return;
  }
  if (err.message) {
    res.status(422).json({ error: err.message });
    return;
  } else {
    res.sendStatus(err.statusCode || err.status || 500);
    return;
  }
  next();
};

module.exports = errorsMiddleware;
