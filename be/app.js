const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
mongoose.connect('mongodb://127.0.0.1:27017/blog');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('database connected');
})

const authMiddleware = require('./middleware/auth');

const commentRoute = require('./routes/commentRoute')
const blogRoute = require('./routes/blogRoute')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', commentRoute);
app.use('/', blogRoute);
app.listen(3003, () => {
    console.log('listen on port 3003')
})