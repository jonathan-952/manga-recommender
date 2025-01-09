import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    anime_id: {
        type: Number,
    },
    title: {
        type: String,
    },
    synopsis: {
        type: String,
    },
    genres: {
        type: Array,
    },
    img: {
        type: String,
    },
    episodes: {
        type: Number,
    },
});

const Anime = mongoose.model('final_mal_db', animeSchema);
// change the structure so that we can add the queried data from the api to a list and insert all at once
// this will prevent request limiting
const AddToDB = async (documents) => {
    try {
        console.log('MongoDB connection state:', mongoose.connection.readyState);
        await Anime.insertMany(documents);
        console.log('saved successfully');
    } catch (err) {
        console.log(err.message)
    }
    
};

export default AddToDB;