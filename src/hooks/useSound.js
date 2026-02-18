import { useEffect, useRef } from "react";
import pomme from "../assets/audio/pomme.mp3";
import gameoversound from "../assets/audio/gameoversound.mp3";
import startsound from "../assets/audio/startsound.mp3";

function useSound({ sound }) {
    const eatSound = useRef(new Audio(pomme));
    const gameOverSound = useRef(new Audio(gameoversound));
    const startSound = useRef(new Audio(startsound));

    useEffect(() => {
        eatSound.current.muted = !sound;
        gameOverSound.current.muted = !sound;
        startSound.current.muted = !sound;
    }, [sound])

    const playEat = () => eatSound.current.play();
    const playGameOver = () => gameOverSound.current.play();
    const playStart = () => startSound.current.play();

    return { playEat, playGameOver, playStart };
}
export default useSound;