const express = require('express');
const app = express();
const port = 5777;
const {AddToDB} = require('./db.js')
const mongoose = require('mongoose')

//connect to mongodb
const dbURI = 'mongodb+srv://misfries603:nrPDhO63AAMW4Bl2@anime.nclmn.mongodb.net/anime_data?retryWrites=true&w=majority&appName=anime';

mongoose.connect(dbURI)
    .then(() => app.listen(port), console.log('running'))
    .catch((err) => console.log("err: ", err.message))
   

app.get('/', (req, res) => {
    res.send('server working');
});

app.get('/add-title', (req, res) => {
    const response = AddToDB('test-id2','test title2', 'testing2', 'more testing2', 'https://test2');
})

//fix this module bs tomorrow