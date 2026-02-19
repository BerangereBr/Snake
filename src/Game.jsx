import Board from "./components/Board"
import { useState, useCallback } from "react";
import useSnakeMovement from "./hooks/useSnakeMovement";
import useKeyBoardControls from "./hooks/useKeyBoardControls";
import useSound from "./hooks/useSound";
import useCountdown from "./hooks/useCountdown";

function Game() {
    const [snake, setSnake] = useState([{ x: 4, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState('RIGHT');
    const [openModalGameover, setOpenModalGameover] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(200);
    const [level, setLevel] = useState("EASY");
    const [countdown, setCountdown] = useState(null);
    const [start, setStart] = useState(false);
    const [sound, setSound] = useState(true);
    const { playEat, playGameOver, playStart } = useSound({ sound });
    const [hightScore, setHightScore] = useState([]);
    const [controls] = useState({
        "UP": ["ArrowUp", "z"],
        "DOWN": ["ArrowDown", "s"],
        "LEFT": ["ArrowLeft", "q"],
        "RIGHT": ["ArrowRight", "d"]
    });
    const score = Math.max(0, snake.length - 1);

    function saveScore(score) {
        setHightScore((prev) => {
            const updatedScores = [...prev, score].sort((a, b) => b - a);
            localStorage.setItem("score", JSON.stringify(updatedScores));
            return updatedScores;
        });
    }

    const playing = start && countdown === null && !gameOver;

    function chooseLevel(selectedLevel) {
        setLevel(selectedLevel);
    }

    const speedUp = useCallback(() => {
        if (level === "EASY") {
            setSpeed((prevSpeed) => Math.max(50, prevSpeed - 2));
        } else if (level === "HARD") {
            setSpeed((prevSpeed) => Math.max(25, prevSpeed - 10));
        }
    }, [level]);

    function changeDirection(nextDirection) {
        setDirection((current) => {
            if (
                (current === "UP" && nextDirection === "DOWN") ||
                (current === "DOWN" && nextDirection === "UP") ||
                (current === "LEFT" && nextDirection === "RIGHT") ||
                (current === "RIGHT" && nextDirection === "LEFT")
            ) {
                return current
            }
            return nextDirection
        })
    }

    function Reset() {
        setOpenModalGameover(false);
        setSnake([{ x: 4, y: 10 }]);
        setFood({ x: 5, y: 5 });
        setDirection('RIGHT');
        setSpeed(200);
    }

    function Replay() {
        Reset();
        setGameOver(false);
        setCountdown(null);
        setStart(false);
    }

    function startGame() {
        Reset();
        setGameOver(false);;
        setCountdown(3);
        setStart(true);
        playStart();
    }

    function toggleSound() {
        setSound((prev) => !prev);
    }

    useSnakeMovement({ direction, food, gameOver, speed, playing, speedUp, score, setSnake, setOpenModalGameover, setFood, setGameOver, setHightScore, saveScore, playEat, playGameOver });
    useKeyBoardControls({ gameOver, playing, controls, changeDirection });
    useCountdown({ countdown, setCountdown });

    return (
        <div className="bg-black w-screen h-screen" >
            <Board snake={snake} food={food} score={score} playing={playing} onStart={startGame} countdown={countdown} openModalGameover={openModalGameover} replay={Replay} onDirection={changeDirection} toggleSound={toggleSound} sound={sound} chooseLevel={chooseLevel} hightScore={hightScore} />
        </div>
    )
}

export default Game;