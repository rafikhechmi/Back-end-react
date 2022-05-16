const express = require('express');
const router = express.Router();

// get all
router.get('/list/', function(req, res) {
    let sql = `SELECT * FROM item`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "item lists retrieved successfully"
      })
    })
});

//get by id
router.get('/list/:id', function(req, res) {
    let sql = `SELECT * FROM item WHERE quoteId = ?`;
    let id=req.params.id;
    db.query(sql, id,function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "item element retrieved successfully"
      })
    })
});

// create
router.post('/new', function(req, res) {
    let sql = `INSERT INTO item (name, description, price, quantity, quote_id) VALUES (?)`;
    let data = [
      req.body.name,
      req.body.description,
      req.body.price,
      req.body.quantity,
      req.body.quoteId
    ];
    db.query(sql, [data], function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        message: "New item added successfully"
      })
    })
});

// update
router.patch('/update/:id', (req,res)=>{
    let sql=`UPDATE item SET name= ?, description= ?, price=?, quantity=?, quote_id=? WHERE id= ?`;
    let data=[
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.quantity,
        req.body.quoteId,
        req.params.id
    ];
    db.query(sql, data, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          message: "item update successfully"
        })
    });
});
// delete

router.delete('/delete/:id', (req,res)=>{
    let sql=`DELETE FROM item WHERE id = ?`;
    let id=req.params.id;
    db.query(sql, id, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          message: "item deleted successfully"
        })
      });
});

module.exports = router;