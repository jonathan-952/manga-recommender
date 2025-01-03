const mongoose = require('mongoose')

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

const AddToDB = async (name, desc, genre, image) => {
    const entry = new Anime({
        title: name,
        synposis: desc,
        genres: genre,
        img: image,
    });

    entry.save()
    .then(() => console.log('saved sucessfully.'))
    .catch((err) => console.log(err.message))
};

module.exports = Anime, AddToDB;