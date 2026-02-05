const GRID_SIZE = 15;
const CELL_SIZE = 30;

function Board({ snake, food, score, playing, onStart }) {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-10">
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
                    );
                    let headSnake = snake[0].x === x && snake[0].y === y;
                    isSnake = headSnake ? false : isSnake;
                    const isFood = food.x === x && food.y === y;
                    return (
                        <div
                            key={index}
                            style={{
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                border: '1px solid #DBDBDB',
                                backgroundColor: headSnake ? '#079C0C' : isSnake ? '#27F52E' : isFood ? '#FF0000' : 'white',
                            }}>
                        </div>)
                })}
            </div >
            <div className='text-[#27F52E] text-4xl font-retro'>Score : {score}</div>
            {!playing && <button onClick={onStart} className="rounded cursor-pointer border-2 p-2 border-[#27F52E] bg-[#27F52E] font-sans text-black hover:scale-110 hover:shadow-[0_0_15px_#27F52E] w-[150px]">Jouer</button>}
        </div>
    )
}

export default Board