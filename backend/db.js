const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animeSchema = new Schema({
    anime_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    img: {
        type: Array,
        required: true
    },
    episodes: {
        type: Number,
        required: false
    },
});

const Anime = mongoose.model('MAL_API', animeSchema);

const AddToDB = async (anime_id, name, desc, genre, image, ep) => {
    const entry = new Anime({
        anime_id: anime_id,
        title: name,
        synopsis: desc,
        genres: genre,
        img: image,
        episodes: ep
    });

    entry.save()
    .then(() => console.log('saved sucessfully.'))
    .catch((err) => console.log(err.message))
};

module.exports = {AddToDB};