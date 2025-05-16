const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ "msg": "Token is not valid" });
      }
      req.user = user.email;
      next();
    });
  } else {
    res.status(401).json({ "msg": "No token, authorization denied" });
  }
};
