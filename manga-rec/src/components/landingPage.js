import styles from './landingPage.module.css';

function landingPage() {
    return (
        <div id  = {styles.page}>
            <div className = {styles.header}>
                <button>Profile</button>
                <button>Saved</button>
            </div>
            <div className = {styles.body}>
                <div className = {styles.card_container}>
                    <div className = {styles.card}></div>
                    <button id = {styles.save_btn}></button>
                </div>
                <div className = {styles.btn_container}>
                    <button>Like</button>
                    <button>Pass</button>
                </div>
            </div>
        </div>
    )
}

export default landingPage;