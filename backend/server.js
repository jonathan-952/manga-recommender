import express from 'express';
const app = express();
const port = 5777;
import AddToDB from './db.js';
import mongoose from 'mongoose';
app.use(express.json())

//connect to mongodb
const dbURI = 'mongodb+srv://misfries603:nrPDhO63AAMW4Bl2@anime.nclmn.mongodb.net/anime_data?retryWrites=true&w=majority&appName=anime';

mongoose.connect(dbURI, {
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('db connected successfully');
         console.log('MongoDB connection state:', mongoose.connection.readyState);
        return app.listen(port);
    })
    .then(() => console.log('server running'))
    .catch((err) => console.log("err: ", err.message))

app.get('/', (req, res) => {
    res.send('server working');
});

app.post('/add-to-db', async (req, res) => {
    const documents = req.body;
    await AddToDB(documents);
    res.send('successful');
})

//fix this module bs tomorrow