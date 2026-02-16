import { useState } from "react";

const GRID_SIZE = 15;
const CELL_SIZE = 30;

function Board({ snake, food, score, playing, onStart, countdown, openModalGameover, replay, onDirection }) {
    const [openModalSnakeGuide, setOpenModalSnakeGuide] = useState(true);

    return (
        <div className="relative flex flex-col justify-center items-center w-screen h-screen gap-10">
            <div
                className='grid rounded shadow-[0px_0px_40px_2px_#FF00FF] '
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
                    <div style={{
                        width: GRID_SIZE * CELL_SIZE,
                        height: GRID_SIZE * CELL_SIZE,
                    }}
                        className='absolute flex justify-center items-center text-[#27F52E] text-[200px] font-retro '>{countdown === 0 ? 'GO!' : countdown}</div>}
                {openModalGameover ? <div style={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE,
                }}
                    className="absolute flex justify-center items-center bg-black bg-opacity-50">
                    <div className="flex flex-col justify-center items-center bg-black max-h-[40vh] w-[80%] rounded gap-5 animate-gameover-spin p-5">
                        <p className="text-[#FF00FF] font-retro text-6xl text-center">GAME OVER</p>
                        <p className="text-[#FF00FF] font-sans">Score : {score}</p>
                        <button onClick={replay} className="rounded cursor-pointer  p-2 bg-[#27F52E] font-retro text-black text-4xl hover:scale-110 hover:shadow-[0_0_15px_#27F52E] w-[120px] md:w-[150px]">Rejouer</button>
                    </div>
                </div> : null}
            </div >
            <div className='text-[#27F52E] text-4xl font-retro'>Score : {score}</div>
            {openModalSnakeGuide && <div className="absolute flex justify-center items-center w-screen h-screen z-20 top-0 bg-black bg-opacity-50">
                <div className=" relative flex flex-col justify-center items-center bg-black p-5 max-h-[80vh] w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded gap-2">
                    <button onClick={() => { setOpenModalSnakeGuide(false) }} className="absolute top-5 right-5 rounded cursor-pointer px-2 bg-[#27F52E] font-sans text-black hover:scale-110 hover:shadow-[0_0_15px_#27F52E]">x</button>
                    <p className="text-[#FF00FF] text-4xl md:text-6xl font-retro">Snake</p>
                    <p className="font-sans text-white text-base md:text-xl text-justify">Utilisez les flèches du clavier ou ZQSD pour diriger le serpent et manger la nourriture. Chaque fois que vous mangez, le serpent grandit. Faites attention à ne pas vous mordre la queue ou à sortir des limites du plateau de jeu !</p>
                </div>
            </div>}
            <div className="grid grid-cols-3 gap-2">
                <button className=" bg-white col-start-2 cursor-pointer" onClick={() => onDirection("UP")}>up</button>
                <button className=" bg-white col-start-1 cursor-pointer" onClick={() => onDirection("LEFT")}>left</button>
                <button className=" bg-white cursor-pointer" onClick={() => onDirection("DOWN")}>down</button>
                <button className=" bg-white cursor-pointer" onClick={() => onDirection("RIGHT")}>right</button>
            </div>
        </div >
    )
}

export default Board