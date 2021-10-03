import { useEffect, useState } from "react";
import Game from './Game.js';
import Intro from './Intro.js';

const PlayTab = () => {

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
    })

    const playGame = () => {
        setPlaying(true);
    }

    return (
        <section className="play">
            {(playing) ? (
                <Game />
            ) : (
                <Intro playGame={playGame}/>
            )}
        </section>
    )
}

export default PlayTab;