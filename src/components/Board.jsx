const GRID_SIZE = 15;
const CELL_SIZE = 30;

function Board({ snake, food, score, playing, onStart, countdown, openModalGameover }) {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen gap-10">
            <div
                className='grid rounded shadow-[0px_0px_40px_2px_#FF00FF] mt-20'
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
                                backgroundColor: headSnake ? '#27F52E' : isSnake ? '#79FF3C' : isFood ? '#FF00FF' : 'white',
                            }}>
                        </div>)
                })}
            </div >
            <div className='text-[#27F52E] text-4xl font-retro'>Score : {score}</div>
            {!playing && countdown === null && openModalGameover === false &&
                <div style={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE,
                }}
                    className="absolute flex justify-center items-center bg-[#FF00FF]/30">
                    <button onClick={onStart}
                        className="rounded cursor-pointer pt-2 pb-2 pl-8 pr-8  bg-black font-retro text-5xl text-[#27F52E] hover:scale-110 hover:shadow-[0_0_15px_#27F52E]">Jouer
                    </button>
                </div>}
            {countdown !== null &&
                <div className='absolute top-50 text-[#27F52E] text-[200px] font-retro '>{countdown === 0 ? 'GO!' : countdown}</div>}
        </div >
    )
}

export default Board