
const tokenExtractor = (req, res, next) => {
  const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  const token = getTokenFrom(req)

  req.token = token
  next()
}

module.exports = {
  tokenExtractor
}