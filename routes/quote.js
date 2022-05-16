const express = require('express');
const router = express.Router();

// get all
router.get('/list', function(req, res) {
    let sql = `SELECT quote.id, client, total, reduction, status, companyId, name FROM quote INNER JOIN company ON quote.companyId = company.id`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "quote lists retrieved successfully"
      })
    })
});

//get by id
router.get('/list/:id', function(req, res) {
    let sql = `SELECT * FROM quote WHERE id = ?`;
    let id=req.params.id;
    db.query(sql, id,function(err, data, fields) {
      if (err) throw err;
      res.json({
        status: 200,
        data,
        message: "quote element retrieved successfully"
      })
    })
});

// create
router.post('/new', function(req, res) {
    var getId;
    let sql = `INSERT INTO quote (client, total, reduction, status, companyId) VALUES (?)`;
    let sql2 = `INSERT INTO item (name, description, price, quantity, quoteId) VALUES (?)`;
    let data = [
      req.body.client,
      req.body.total,
      req.body.reduction,
      req.body.status,
      req.body.companyId
    ];
    items=[...req.body.items];
     db.query(sql, [data], function(err, data, fields) {
      for(let i=0;i<items.length;i++){
        let data2=[items[i].name, items[i].description, items[i].price, items[i].quantity, data.insertId];
        console.log(data2);
        db.query(sql2,[data2]); 
      }
      
      if (err) throw err;
      res.json({
        status: 200,
        message: "New quote added successfully"
      })
    })
    
});

// update
router.patch('/update/:id', (req,res)=>{
    let sql=`UPDATE quote SET client= ?, total= ?, reduction= ?, status= ?, companyId= ? WHERE id= ?`;
    let sql2=`UPDATE item SET name= ?, description= ?, price= ?, quantity= ?, quoteId= ? WHERE id= ?`;
    let sql3 = `INSERT INTO item (name, description, price, quantity, quoteId) VALUES (?)`;

    let data=[
        req.body.client,
        req.body.total,
        req.body.reduction,
        req.body.status,
        req.body.companyId,
        req.params.id
    ];
    items=[...req.body.items];
    db.query(sql, data, function(err, data, fields) {
      for(let i=0;i<items.length;i++){
        if(items[i].id === 0){
          let data2=[ items[i].name, items[i].description, items[i].price, items[i].quantity, req.params.id];
          db.query(sql3,[data2]);
        }else{
          let data3=[ items[i].name, items[i].description, items[i].price, items[i].quantity, req.params.id, items[i].id];
          db.query(sql2,data3);
        }
      }
        if (err) throw err;
        res.json({
          status: 200,
          message: "quote update successfully"
        })
    });
});
// delete

router.delete('/delete/:id', (req,res)=>{
    let sql=`DELETE FROM quote WHERE id = ?`;
    let id=req.params.id;
    db.query(sql, id, function(err, data, fields) {
        if (err) throw err;
        res.json({
          status: 200,
          message: "quote deleted successfully"
        })
      });
});

module.exports = router;