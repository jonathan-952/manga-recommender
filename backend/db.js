const mongoose = require('mongoose')
//connect to mongodb
const dbURI = 'mongodb+srv://jonathans9522:GSD0jDdiTdGe8rdN@db.7eyod.mongodb.net/?retryWrites=true&w=majority&appName=db';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('worked'))
    .catch((err) => console.log(err.message))
    
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    synposis: {
        type: String,
        required: false
    },
    genres: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
});

const Anime = mongoose.model('Anime', animeSchema);

module.exports = Anime;