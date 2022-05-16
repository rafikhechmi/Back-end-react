const express = require('express');
const router = express.Router();

// get all
router.get('/list', function(req, res) {
    let sql = `SELECT contact.id, firstName, lastName, email, phone, companyId, name FROM contact INNER JOIN company ON contact.companyId = company.id;`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "contact lists retrieved successfully"
      })
    })
});

//get by id
router.get('/list/:id', function(req, res) {
    let sql = `SELECT * FROM contact WHERE id = ?`;
    let id=req.params.id;
    db.query(sql, id,function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "contact element retrieved successfully"
      })
    })
});

// create
router.post('/new', function(req, res) {
    let sql = `INSERT INTO contact (firstName, lastName, email, phone, companyid) VALUES (?)`;
    let data = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.companyId
    ];
    db.query(sql, [data], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "New contact added successfully"
      })
    })
});

// update
router.patch('/update/:id', (req,res)=>{
    let sql=`UPDATE contact SET firstName= ?, lastName= ?, email=?, phone=?, companyid=? WHERE id= ?`;
    let data=[
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        req.body.companyId,
        req.params.id
    ];
    db.query(sql, data, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          message: "contact update successfully"
        })
    });
});
// delete

router.delete('/delete/:id', (req,res)=>{
    let sql=`DELETE FROM contact WHERE id = ?`;
    let id=req.params.id;
    db.query(sql, id, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          message: "company deleted successfully"
        })
      });
});

module.exports = router;