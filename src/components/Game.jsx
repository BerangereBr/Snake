import Board from "./Board"
import { useState, useEffect } from "react";
import GenerateFood from "./GenerateFood";
import pomme from "../assets/audio/pomme.mp3";
import gameoversound from "../assets/audio/gameoversound.mp3";
import startsound from "../assets/audio/startsound.mp3";

const GRID_SIZE = 15
const eatSound = new Audio(pomme);
const gameOverSound = new Audio(gameoversound);
const startSound = new Audio(startsound);

function Game() {
    const [snake, setSnake] = useState([{ x: 4, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState('RIGHT');
    const [openModalGameover, setOpenModalGameover] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(200);
    const [countdown, setCountdown] = useState(null);
    const [start, setStart] = useState(false);
    const score = Math.max(0, snake.length - 1);
    const playing = start && countdown === null && !gameOver;

    useEffect(() => {
        if (!playing || gameOver) return
        const interval = setInterval(() => {
            setSnake((prevSnake) => {

                const head = prevSnake[0];
                let newHead
                switch (direction) {
                    case "RIGHT":
                        newHead = { x: head.x + 1, y: head.y }
                        break
                    case "LEFT":
                        newHead = { x: head.x - 1, y: head.y }
                        break
                    case "UP":
                        newHead = { x: head.x, y: head.y - 1 }
                        break
                    case "DOWN":
                        newHead = { x: head.x, y: head.y + 1 }
                        break
                }

                const isEating = newHead.x === food.x && newHead.y === food.y;
                let newSnake = [newHead, ...prevSnake];

                if (isEating) {
                    eatSound.play();
                    setFood(GenerateFood(newSnake));
                    setSpeed((prevSpeed) => Math.max(50, prevSpeed - 2));
                } else {
                    newSnake.pop()
                }

                const hasSelfCollision = newSnake
                    .slice(1)
                    .some((cellSnake) => cellSnake.x === newHead.x && cellSnake.y === newHead.y);

                const hasWallCollision =
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE;

                if (hasSelfCollision || hasWallCollision) {
                    gameOverSound.play();
                    setOpenModalGameover(true);
                    setGameOver(true)
                    return prevSnake;
                }
                return newSnake
            })
        }, speed)
        return () => clearInterval(interval)
    }, [direction, food, gameOver, speed, playing]);

    useEffect(() => {
        if (!playing || gameOver) return
        function handleKey(e) {
            switch (e.key) {
                case "ArrowUp":
                    if (direction !== "DOWN") setDirection("UP")
                    break
                case "ArrowDown":
                    if (direction !== "UP") setDirection("DOWN")
                    break
                case "ArrowLeft":
                    if (direction !== "RIGHT") setDirection("LEFT")
                    break
                case "ArrowRight":
                    if (direction !== "LEFT") setDirection("RIGHT")
                    break
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [direction, gameOver, playing]);

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
        startSound.play();
    }

    useEffect(() => {
        if (countdown === null) return;

        const time = setTimeout(() => {
            setCountdown((prev) => prev > 0 ? prev - 1 : null);
        }, 1000)
        return () => clearTimeout(time);
    }, [countdown]);

    return (
        <div className="bg-black w-screen h-screen" >
            <Board snake={snake} food={food} score={score} playing={playing} onStart={startGame} countdown={countdown} openModalGameover={openModalGameover} />
            {openModalGameover ? <div className="absolute flex justify-center items-center w-screen h-screen z-20 top-0 bg-black bg-opacity-50">
                <div className="flex flex-col justify-center items-center bg-black w-1/2 h-1/3 lg:w-1/4 md:w-1/3 md:h-1/3 rounded gap-5 animate-gameover-spin">
                    <p className="text-[#FF00FF] font-retro text-6xl">GAME OVER</p>
                    <p className="text-[#FF00FF] font-sans">Score : {score}</p>
                    <button onClick={Replay} className="rounded cursor-pointer  p-2 bg-[#27F52E] font-retro text-black text-2xl lg:text-4xl hover:scale-110 hover:shadow-[0_0_15px_#27F52E] w-[120px] md:w-[150px]">Rejouer</button>
                </div>
            </div> : null}
        </div>
    )
}

export default Game;