import styles from './landingPage.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';



function LandingPage() {
    // like: true, dislike: false
    const [swipe, setSwipe] = useState(true);
    const [curTitle, setCurTitle] = useState('');
    const [data, setData] = useState([]);
    const [vector, setVector] = useState([]);

    async function getIMG() {
        try {
            const args = {columns: 'img anime_id'};
            const docs = await axios.get('http://localhost:5777/read-images', {params: args});
            setCurTitle(docs.data[Math.floor(Math.random() * docs.data.length)]); // picks random title
            setData(docs.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function handleSwipe() {
        try {
            const {heap, keys} = (await axios.get('http://localhost:5777/calc-vectors', {params: {columns: 'anime_id vector', cur: curTitle, swipe: swipe}})).data;
            console.log(keys)
            setVector(heap.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(()=> {
        getIMG();
    }, []);

    useEffect(() => {

    }, [data])

    return (
        <div id  = {styles.page}>
            <div className = {styles.header}>
                <button >Profile</button>
                <button>Saved</button>
            </div>
            <div className = {styles.landing_body}>
                <div className = {styles.card_container}>
                    <div className = {styles.card}>
                        {
                            data.length !== 0 ? (
                                <img src = {`${curTitle.img}`} alt = 'anime' className = {styles.anime_pic}></img>
                            ) : (
                                <p>error loading image</p>
                            )
                        }
                    </div>
                    <button id = {styles.save_btn}></button>
                </div>
                <div className = {styles.btn_container}>
                    <button onClick={()=> {setSwipe(true); handleSwipe()}}>Like</button>
                    <button onClick={()=> {setSwipe(false); handleSwipe()}}>Pass</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;