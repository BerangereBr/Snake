import { useEffect } from "react";
import GenerateFood from "../utils/generateFood";
import useCollision from "../utils/checkCollision";

function useSnakeMovement({ direction, food, gameOver, speed, playing, speedUp, score, setOpenModalGameover, setSnake, setFood, setGameOver, saveScore, playEat, playGameOver }) {
    const { checkCollision } = useCollision();

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
                    playEat();
                    setFood(GenerateFood(newSnake));
                    speedUp();
                } else {
                    newSnake.pop()
                }

                if (checkCollision({ head: newHead, snake: newSnake })) {
                    playGameOver();
                    setOpenModalGameover(true);
                    setGameOver(true)
                    saveScore(score);
                    return prevSnake;
                }
                return newSnake
            })
        }, speed)
        return () => clearInterval(interval)
    }, [direction, food, gameOver, speed, playing, speedUp, score, setSnake, setOpenModalGameover, setFood, setGameOver, saveScore, playEat, playGameOver, checkCollision]);
}

export default useSnakeMovement;