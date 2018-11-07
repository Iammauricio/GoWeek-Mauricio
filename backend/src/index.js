const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
    'mongodb://administrador:adm123@ds153593.mlab.com:53593/goweek-mauricio', 
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    
    return next();
})

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000,() => {
    console.log('Server started port 3000');
});