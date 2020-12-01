const jwt = require('jsonwebtoken');

const authorizeDucky = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).send('Please log in to speak to roboducky.')

  jwt.verify(token, proxess.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).send('Invalid token!')
    req.duckyPayload = payload
    next()
  })
}

module.exports = authorizeDucky;