import mongoose, { connect } from 'mongoose';
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
    geres: {
        type: Array,
    },
    img: {
        type: String,
    },
    episodes: {
        type: Number,
    },
});

const vectorSchema = new Schema({
    anime_id: {
        type: Number,
    },
    vector: {
        type: Array
    }
});

// change the structure so that we can add the queried data from the api to a list and insert all at once
// this will prevent request limiting

const readDB = async (db) => {
    try {
        let docs;i
        if (db === 'Vector') {
            docs = await Vector.find({}, 'vector anime_id');

        } else {
            docs = await Anime.find({}, 'img anime_id');

        }
        return docs;
    } catch (err) {
        console.log(err.message);
    }
}

class DB {
    constructor(modelName, model) {
        this.model =  mongoose.model(modelName, model);
    }
    async add(docs) {
        try {
            await this.model.insertMany(docs)
            console.log('saved successfully');
        } catch (err) {
            console.log(err.message);
        }
    }

    async delete(id) {
        try {
            await this.model.findByIdAndDelete(id);
            console.log('deleted successfully');
        } catch (err) {
            console.log(err.message);
        }
    }

    async find(param, data, fields) {
        try {
            // fields is a string you pass in specifying what columns you want to be returned
            if (!param || !data) {
                return await this.model.find({}, fields);
            }
            return await this.model.find({[param]: data}, `${fields}`);
           
        } catch (err) {
            console.log(err.message);
        }
    }

    async update(id, data) {
        try {
            // pass in data as obj ex: {param: data}
            await this.model.findByIdAndUpdate(id, data);
            console.log('updated successfully');
        } catch (err) {
            console.log(err.message);
        }
    }
}

export {readDB, DB, animeSchema, vectorSchema};