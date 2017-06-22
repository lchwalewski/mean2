const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

//Database
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('Connected to database' + config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//Routes
const user = require('./routes/user');
app.use('/user', user);

app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});