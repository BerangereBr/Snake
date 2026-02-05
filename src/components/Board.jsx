const GRID_SIZE = 15;
const CELL_SIZE = 30;

function Board({ snake, food, score }) {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-5">
            <div
                className='grid rounded shadow-[0px_0px_30px_2px_rgba(0,0,0,0.5)] shadow-[#FF00FF] rounded'
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE},${CELL_SIZE}px)`,
                    gridTemplateRows: `repeat(${GRID_SIZE},${CELL_SIZE}px)`,
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
                                border: '1px solid #616161',
                                backgroundColor: isSnake ? '#00A114' : isFood ? '#FF0000' : 'white',
                            }}>
                        </div>)
                })}
            </div >
            <div className='text-[#27F52E] text-4xl font-retro'>Score : {score}</div>
        </div>
    )
}

export default Board