const express = require('express');
const router = express.Router();

router.post('/login', function(req, res) {
    let sql = `SELECT * FROM user WHERE userName=? AND passWord=?;`;
    let data = [
      req.body.userName,
      req.body.passWord,
    ];
    db.query(sql, data, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "login made successfully"
      })
    })
});

module.exports = router;