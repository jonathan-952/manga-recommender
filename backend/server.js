const express = require('express');
const app = express();
const port = 5777;
const mongoose = require('mongoose')

//connect to mongodb
const dbURI = 'mongodb+srv://misfries603:nrPDhO63AAMW4Bl2@anime.nclmn.mongodb.net/?retryWrites=true&w=majority&appName=anime';

mongoose.connect(dbURI)
    .then(() => app.listen(port), console.log('running'))
    .catch((err) => console.log("err: ", err.message))
   

app.get('/', (req, res) => {
    res.send('server working');
});

app.get('/add-title', (req, res) => {

})