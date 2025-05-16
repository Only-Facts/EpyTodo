module.exports = (req, res, next) => {
  const id = req.params.id;
  const { pool } = require('../config/db.mjs');

  if (id) {
    pool.execute(`
      SELECT *
      FROM todo
      WHERE id = ?
      `, [id], function (err, results, fields) {
      if (results.length > 0) {
        next();
      } else {
        res.status(404).json({ "msg": "Not found" });
      }
    });
  } else {
    res.status(500).json({ "msg": "internal server error" });
  }
};
