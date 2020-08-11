module.exports = {
  jwtMiddleware: require('./jwt').jwtMiddleware,
  getToken: require('./jwt').getToken,
  errorsMiddleware: require('./error')
}