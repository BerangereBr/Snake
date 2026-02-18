import { useEffect, useState } from "react";
import arrow from "../assets/images/arrow.png";
import soundOn from "../assets/images/soundOn.png";
import soundOff from "../assets/images/soundOff.png";

const GRID_SIZE = 15;
const CELL_SIZE = 30;
const CELL_SIZE_MOBILE = 20;
const SCREEN_SIZE = 1024;

function Board({ snake, food, score, playing, onStart, countdown, openModalGameover, replay, onDirection, toggleSound, sound, chooseLevel, hightScore }) {
    const [openModalSnakeGuide, setOpenModalSnakeGuide] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < SCREEN_SIZE);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < SCREEN_SIZE);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    })
    return (
        <div className="relative flex flex-col justify-center items-center w-screen h-screen gap-5">
            <div
                className='grid rounded shadow-[0px_0px_40px_2px_#FF00FF] '
                style={isMobile ?
                    {
                        gridTemplateColumns: `repeat(${GRID_SIZE},${CELL_SIZE_MOBILE}px)`,
                        gridTemplateRows: `repeat(${GRID_SIZE},${CELL_SIZE_MOBILE}px)`,
                    } :
                    {
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
                            style={isMobile ?
                                {
                                    width: CELL_SIZE_MOBILE,
                                    height: CELL_SIZE_MOBILE,
                                    border: '1px solid #DBDBDB',
                                    backgroundColor: headSnake ? '#27F52E' : isSnake ? '#79FF3C' : isFood ? '#FF00FF' : 'white',
                                } :
                                {
                                    width: CELL_SIZE,
                                    height: CELL_SIZE,
                                    border: '1px solid #DBDBDB',
                                    backgroundColor: headSnake ? '#27F52E' : isSnake ? '#79FF3C' : isFood ? '#FF00FF' : 'white',
                                }}>
                        </div>)
                })}
                {!playing && countdown === null && openModalGameover === false &&
                    <div style={isMobile ?
                        {
                            width: GRID_SIZE * CELL_SIZE_MOBILE,
                            height: GRID_SIZE * CELL_SIZE_MOBILE,
                        } : {
                            width: GRID_SIZE * CELL_SIZE,
                            height: GRID_SIZE * CELL_SIZE,
                        }}
                        className="absolute flex justify-center items-center bg-[#FF00FF]/30">
                        <button onClick={onStart}
                            className="rounded cursor-pointer pt-2 pb-2 pl-8 pr-8  bg-black font-retro text-5xl text-[#27F52E] hover:scale-110 hover:shadow-[0_0_15px_#27F52E]">Jouer
                        </button>
                    </div>}
                {countdown !== null &&
                    <div style={isMobile ?
                        {
                            width: GRID_SIZE * CELL_SIZE_MOBILE,
                            height: GRID_SIZE * CELL_SIZE_MOBILE,
                        } :
                        {
                            width: GRID_SIZE * CELL_SIZE,
                            height: GRID_SIZE * CELL_SIZE,
                        }}
                        className='absolute flex justify-center items-center text-[#27F52E] text-[200px] font-retro '>{countdown === 0 ? 'GO!' : countdown}</div>}
                {openModalGameover ? <div style={isMobile ?
                    {
                        width: GRID_SIZE * CELL_SIZE_MOBILE,
                        height: GRID_SIZE * CELL_SIZE_MOBILE,
                    } :
                    {
                        width: GRID_SIZE * CELL_SIZE,
                        height: GRID_SIZE * CELL_SIZE,
                    }}
                    className="absolute flex justify-center items-center bg-black bg-opacity-50">
                    <div className="flex flex-col justify-center items-center bg-black max-h-[40vh] w-[80%] rounded gap-5 animate-gameover-spin p-5">
                        <p className="text-[#FF00FF] font-retro text-6xl text-center">GAME OVER</p>
                        <p className="text-[#FF00FF] font-sans">Score : {score}</p>
                        <div className="flex gap-5">
                            <button className=" bg-[#27F52E] cursor-pointer rounded p-2 hover:scale-110 font-retro text-2xl hover:shadow-[0_0_15px_#27F52E]" onClick={() => { chooseLevel("EASY"); replay() }}>easy</button>
                            <button className=" bg-[#27F52E] cursor-pointer rounded p-2 hover:scale-110 font-retro text-2xl hover:shadow-[0_0_15px_#27F52E]" onClick={() => { chooseLevel("HARD"); replay() }}>hard</button>
                        </div>
                    </div>
                </div> : null}
            </div >
            <div className='text-[#27F52E] text-4xl font-retro'>Score : {score}</div>
            {hightScore[0] !== undefined && <p className="text-[#27F52E] font-retro text-2xl">Hightscore : {hightScore[0]}</p>}
            {openModalSnakeGuide && <div className="absolute flex justify-center items-center w-screen h-screen z-20 top-0 bg-black bg-opacity-50">
                <div className=" relative flex flex-col justify-center items-center bg-black p-5 max-h-[80vh] w-[90%] sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded gap-2">
                    <p className="text-[#FF00FF] text-4xl md:text-6xl font-retro">Snake</p>
                    <p className="font-sans text-white text-base md:text-xl text-justify">
                        {isMobile ? "Utilisez les boutons pour diriger le serpent et manger la nourriture. Chaque fois que vous mangez, le serpent grandit. Faites attention à ne pas vous mordre la queue ou à sortir des limites du plateau de jeu !"
                            : "Utilisez les flèches du clavier ou ZQSD pour diriger le serpent et manger la nourriture. Chaque fois que vous mangez, le serpent grandit. Faites attention à ne pas vous mordre la queue ou à sortir des limites du plateau de jeu !"}</p>
                    <div className="flex gap-5">
                        <button className=" bg-[#27F52E] cursor-pointer rounded p-2 hover:scale-110 font-sans" onClick={() => { chooseLevel("EASY"); setOpenModalSnakeGuide(false) }}>easy</button>
                        <button className=" bg-[#27F52E] cursor-pointer rounded p-2 hover:scale-110 font-sans " onClick={() => { chooseLevel("HARD"); setOpenModalSnakeGuide(false) }}>hard</button>
                    </div>
                </div>
            </div>}
            {isMobile && <div className="grid grid-cols-3 gap-2">
                <button className=" bg-[#27F52E] col-start-2 cursor-pointer rounded p-2 hover:scale-110" onClick={() => onDirection("UP")}><img src={arrow} alt="flèche directionnelle" className="w-10 h-10 rotate-180" /></button>
                <button className=" bg-[#27F52E] col-start-1 cursor-pointer rounded p-2 hover:scale-110" onClick={() => onDirection("LEFT")}><img src={arrow} alt="flèche directionnelle" className="w-10 h-10 rotate-90" /></button>
                <button className=" bg-[#27F52E] cursor-pointer rounded p-2 hover:scale-110" onClick={() => onDirection("DOWN")}><img src={arrow} alt="flèche directionnelle" className="w-10 h-10" /></button>
                <button className=" bg-[#27F52E] cursor-pointer rounded p-2 hover:scale-110" onClick={() => onDirection("RIGHT")}><img src={arrow} alt="flèche directionnelle" className="w-10 h-10 -rotate-90" /></button>
            </div>}
            <button className=" flex items-center justify-center bg-[#27F52E] cursor-pointer rounded p-2 hover:scale-110" onClick={toggleSound}> <img src={sound ? soundOn : soundOff} alt={sound ? "Son activé" : "Son désactivé"} className="w-6 h-6 " /></button>
        </div >
    )
}

export default Board