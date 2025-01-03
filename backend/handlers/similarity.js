const csv = require('csv-parser');
const fs = require('fs');
const similarity = require('compute-cosine-similarity');

async function getUnigueGenres(filename, column) {
    let genres = new Set();
    return new Promise((resolve, reject) => {
        fs.createReadStream(filename, {highWaterMark: 16 * 1024}) 
        .pipe(csv())
        .on('data', (data) => {
            const split_list = data[column].split(',').map(item => item.trim());
            split_list.forEach(element => genres.add(element));
        })
        .on('end', () => {
            resolve(genres);
        })
        .on('error', (err) => {
            console.error('Error:', err.message);
        });
    })
    
}

async function getColumn(filename, column) {
    let genres = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filename, {highWaterMark: 16 * 1024}) 
        .pipe(csv())
        .on('data', (data) => {
            const split_list = data[column].split(',').map(item => item.trim());
            genres.push(split_list)
        })
        .on('end', () => {
            resolve(genres);
        })
        .on('error', (err) => {
            console.error('Error:', err.message);
        });
    })
}
async function cos_similarity() {
    const uniques = await getUnigueGenres('datasets/anime/anime-dataset-2023.csv', 'Genres')
    const genres = await getColumn('datasets/anime/anime-dataset-2023.csv', 'Genres')
    let results = [];

    for (const genre of genres) {
        let new_vector_space = new Array(22).fill(0);
        for (let i = 0; i < new_vector_space.length; i++) {
            if (genre.includes([...uniques][i])) {
                new_vector_space[i] = 1
            }
        }
        results.push(new_vector_space);
    }
    let vector = similarity(results[0], results[1])
    return results;
}

cos_similarity();

