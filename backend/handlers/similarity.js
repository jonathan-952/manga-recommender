import similarity from 'compute-cosine-similarity';
import axios from 'axios';

async function getUnigueGenres() {
    try {
        const res = await getGenres();
        let uniques = new Set()
        res.forEach(element => {
            element.genres.forEach(genre => {
                uniques.add(genre)
            });
        });
        return uniques;
    } catch (err) {
        console.log(err.message)
    }
}

async function getGenres() {
    try {
        const res = await axios.get('http://localhost:5777/read-db');
        return res.data

    } catch (err) {
        console.log(err.message)
    }    
}


async function cos_similarity() {
    try {
        const uniques = [...(await getUnigueGenres())];
        const anime = await getGenres();
        let entry = []
        for (const element of anime) {
            let vector_space = new Array(77).fill(0);
            for (let i = 0; i < vector_space.length; i++) {
                if (element.genres.includes(uniques[i])) {
                    vector_space[i] = 1
                }
            }
            entry.push({"anime_id": element.anime_id, "vector": vector_space})
        }
        console.log(entry)
    } catch (err) {
        console.log(err.message)
    }
    
}

cos_similarity();

