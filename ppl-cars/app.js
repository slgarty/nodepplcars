const express = require('express');
const api = require('./api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', api);

app.listen(4000, () => console.log('server started'));