const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ "msg": "Token is not valid" });
      }
      next();
    });
  } else {
    res.status(401).json({ "msg": "No token, authorization denied" });
  }
};
