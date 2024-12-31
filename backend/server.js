const express = require('express');
const app = express();
const port = 3000;
const Anime = require('./db.js')

app.get('/', (req, res) => {
    res.send('server working');
});

app.get('/add-title', (req, res) => {

})
app.listen(port, () => {
    console.log('listening on port 3000');
});