const GRID_SIZE = 15;

function useCollision() {
    function checkCollision({ head, snake }) {
        const hasSelfCollision = snake
            .slice(1)
            .some((cellSnake) => cellSnake.x === head.x && cellSnake.y === head.y);

        const hasWallCollision =
            head.x < 0 ||
            head.x >= GRID_SIZE ||
            head.y < 0 ||
            head.y >= GRID_SIZE;

        return hasSelfCollision || hasWallCollision;
    }
    return { checkCollision }
}
export default useCollision;