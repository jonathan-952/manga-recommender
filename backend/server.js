import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 5777;
import cors from 'cors';
import {DB, animeSchema, vectorSchema} from './db.js';
import mongoose from 'mongoose';
import { findTitle } from './handlers/similarity.js';
app.use(express.json())
app.use(cors());

mongoose.connect(process.env.DBURI, {
})
    .then(() => {
        console.log('db connected successfully');
         console.log('MongoDB connection state:', mongoose.connection.readyState);
        return app.listen(port);
    })
    .then(() => console.log('server running'))
    .catch((err) => console.log("err: ", err.message))

app.post('/add-to-db', async (req, res) => {
    const {documents, modelName, model} = req.body;
    const instance = new DB(modelName, model);
    await instance.add(documents);
    res.send('successful');
})

app.get('/read-images', async (req, res) => {
    const {columns} = req.query;
    const instance = new DB('final_mal_dbs', animeSchema);
    try {
        const docs = await instance.find(columns);
        res.send(docs);
    } catch (err) {
        console.log(err.message);
    }
});

// get vectors, calc similarity and push dataset back to client
app.get('/calc-vectors', async (req, res) => {
    const {columns, cur, swipe} = req.query;
    try {
        const instance = new DB('anime_vectors', vectorSchema);
        const cur_vector = (await instance.find('anime_id', cur.anime_id, columns))[0];
        const docs = await instance.find(columns);
        const similar = await findTitle(docs, cur_vector, swipe);
        res.send(similar);

    } catch (err) {
        console.log(err.message);
    }
});
