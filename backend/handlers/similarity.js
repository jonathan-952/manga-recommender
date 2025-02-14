import similarity from 'compute-cosine-similarity';
import axios from 'axios';
import {Heap} from 'heap-js';

// adds every unique genre to a set
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

// gets genres from db
async function getGenres() {
    try {
        const res = await axios.get('http://localhost:5777/read-db');
        return res.data

    } catch (err) {
        console.log(err.message)
    }    
}

// calculated a vector for each title to every unique genre in the db
async function vector() {
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

        let counter = 0;
        while (counter < entry.length) {
            axios.post('http://localhost:5777/add-to-db', entry.slice(counter, counter + 50))
            await new Promise(resolve => setTimeout(resolve, 1000));
            counter += 50;
        }
    } catch (err) {
        console.log(err.message)
    }  
}

async function findTitle(vectors, cur, swipe) {
    const heapInstance = new Heap(swipe ? Heap.maxComparator : null)
    let heap = [];
    let keys = {};
 
    vectors.forEach((element) => {
        if (element.anime_id !== cur.anime_id) {
            const cos_similarity = similarity(cur.vector, element.vector)
            keys.element.anime_id = cos_similarity;
            heap.push(cos_similarity);
        }
    });
  
    heapInstance.init(heap);
    return {heap: heap, keys: keys};
}

export {findTitle};
