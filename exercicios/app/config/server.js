let express = require('express');
let consign = require('consign')

let app=express();
app.set('view engine', 'ejs');
let bodyParser = require('body-parser')
app.set('views','./app/views');

app.use(bodyParser.urlencoded({extended:true}))

consign().include('app/routes').into(app);

consign({cwd:'app'}).include('routes').then('config/dbConnection.js').then('models').into(app)

module.exports= app;
