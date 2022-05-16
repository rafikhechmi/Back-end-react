const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const companyRouter = require('./routes/company');
const contactRouter = require('./routes/contact');
const quoteRouter = require('./routes/quote');
const itemRouter = require('./routes/item');
const userRouter = require('./routes/user');


db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reactapi'
});

db.connect();

app.use(cors());
app.use(express.json());

app.use('/company', companyRouter);
app.use('/contact', contactRouter);
app.use('/quote', quoteRouter);
app.use('/item', itemRouter);
app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(process.env.PORT || 3001);