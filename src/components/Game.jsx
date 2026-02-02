import Board from "./Board"
import { useState, useEffect } from "react";
import GenerateFood from "./GenerateFood";

function Game() {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState('RIGHT');

    useEffect(() => {
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
                    setFood(GenerateFood(newSnake))
                } else {
                    newSnake.pop()
                }
                const hasSelfCollision = newSnake
                    .slice(1)
                    .some((cellSnake) => cellSnake.x === newHead.x && cellSnake.y === newHead.y);
                if (hasSelfCollision) {
                    alert('GAME OVER')
                    return [{ x: 10, y: 10 }]
                }
                return newSnake
            })
        }, 200)
        return () => clearInterval(interval)
    }, [direction, food])

    useEffect(() => {
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
    }, [direction])

    return (
        <Board snake={snake} food={food} />
    )
}

export default Game;