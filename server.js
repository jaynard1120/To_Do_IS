const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use('/public',express.static('public'));
app.use(bodyParser.json());
const database = require('./db');
const Todorouter = require('./routes/todoRoute')
app.set('view engine','ejs')

// app.use(express.json);
app.use('/todoList',Todorouter);
database.connect();

app.listen(8000, console.log('App is listening at port 8000'));