const express = require('express');
const router = express.Router();

// get all
router.get('/list', function(req, res) {
    let sql = `SELECT * FROM company`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "company lists retrieved successfully"
      })
    })
});

//get by id
router.get('/list/:id', function(req, res) {
    let sql = `SELECT * FROM company WHERE id = ?`;
    let id=req.params.id;
    db.query(sql, id,function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "company element retrieved successfully"
      })
    })
});

// create
router.post('/new', function(req, res) {
    let sql = `INSERT INTO company (name, address, zipcode, country) VALUES (?)`;
    let data = [
      req.body.name,
      req.body.address,
      req.body.zipcode,
      req.body.country
    ];
    db.query(sql, [data], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        oobjet:[data],
        message: "New company added successfully"
      })
    })
});

// update
router.patch('/update/:id', (req,res)=>{
    let sql=`UPDATE company SET name= ?, address= ?, zipcode=?, country=? WHERE id= ?`;
    let data=[
        req.body.name,
        req.body.address,
        req.body.zipcode,
        req.body.country,
        req.params.id
    ];
    db.query(sql, data, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          message: "company update successfully"
        })
    });
});
// delete

router.delete('/delete/:id', (req,res)=>{
    let sql=`DELETE FROM company WHERE id = ?`;
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