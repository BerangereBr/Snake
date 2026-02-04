import '../styles/board.css';

const GRID_SIZE = 20;
const CELL_SIZE = 30;

function Board({ snake, food, score }) {
    return (
        <div className='container-board'>
            <div
                className='board'
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE},${CELL_SIZE}px)`,
                    gridTemplateRows: `repeat(${GRID_SIZE},${CELL_SIZE}px)`,
                    border: '2px solid black',
                }}>
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                    const x = index % GRID_SIZE
                    const y = Math.floor(index / GRID_SIZE)

                    let isSnake = snake.some(
                        (segment) => segment.x === x && segment.y === y
                    )
                    const isFood = food.x === x && food.y === y
                    return (
                        <div
                            key={index}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                border: '1px solid black',
                                backgroundColor: isSnake ? 'green' : isFood ? 'red' : 'white',
                            }}>
                        </div>)
                })}
            </div >
            <div className='board-score'>Score : {score}</div>
        </div>
    )
}

export default Board