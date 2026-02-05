import Board from "./Board"
import { useState, useEffect } from "react";
import GenerateFood from "./GenerateFood";

const GRID_SIZE = 15

function Game() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState('RIGHT');
    const [openModalGameover, setOpenModalGameover] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(300);
    const [playing, setPlaying] = useState(false);
    const score = Math.max(0, snake.length - 1);

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
                    setFood(GenerateFood(newSnake));
                    setSpeed((prevSpeed) => Math.max(50, prevSpeed - 5));
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
        if (gameOver) return
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
    }, [direction, gameOver]);

    function Replay() {
        setOpenModalGameover(false);
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 5, y: 5 });
        setDirection('RIGHT');
        setSpeed(300);
    }

    function startGame() {
        setPlaying(true);
        setGameOver(false);
    }

    return (
        <div className="bg-[#0A0A0A]" >
            <Board snake={snake} food={food} score={score} isPlaying={playing} onStart={startGame} />
            {openModalGameover ? <div className="absolute flex justify-center items-center w-screen h-screen z-20 top-0 bg-black bg-opacity-50">
                <div className="flex flex-col justify-center items-center bg-black w-1/4 h-1/3 rounded gap-5">
                    <p className="text-[#FF00FF] font-retro text-7xl">GAME OVER</p>
                    <p className="text-[#FF00FF] font-sans">Score : {score}</p>
                    <button onClick={Replay} className="rounded cursor-pointer border-2 p-2 border-[#27F52E] bg-[#27F52E] font-sans text-black hover:scale-110 hover:shadow-[0_0_15px_#27F52E] w-[150px]">Rejouer</button>
                </div>
            </div> : null}
        </div>
    )
}

export default Game;