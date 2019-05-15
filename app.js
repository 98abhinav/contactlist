//importing modules
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var bodyparser = require('body-parser');

var swaggerUi = require('swagger-ui-express')
var swaggerDocument = require('./swagger.json');

var app = express();

var route = require('./routes/route');

//connect to mongodb

mongoose.connect('mongodb://localhost:27017/contactlist');

//on Connect
mongoose.connection.on('connected',()=>{
    console.log('Connected to database');
});

//on Error
mongoose.connection.on('error',(err)=>{
    (err) && console.log('Error in database connection');

});

//port no
const port = 3000;
//adding middleware -cors
app.use(cors());

//body -parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join('./','public')));

//use static /api in url
app.use('/api',route);

//use the swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//testing server
app.get('/',(req, res)=>{
    res.send('foobar');
})

//listen on port 3000
app.listen(port,()=>{
    console.log('Server started at port:'+port)
})