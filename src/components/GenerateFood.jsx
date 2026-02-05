const GRID_SIZE = 15;

function GenerateFood(snake) {
    let newFood
    do {
        newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        }
    } while (
        snake.some(
            (cellSnake) =>
                cellSnake.x === newFood.x && cellSnake.y === newFood.y
        )
    )
    return newFood;
}

export default GenerateFood;