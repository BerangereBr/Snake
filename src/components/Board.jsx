const GridSize = 20;
const CellSize = 30;

function Board({ snake }) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GridSize},${CellSize}px)`,
                gridTemplateRows: `repeat(${GridSize},${CellSize}px)`,
                border: '2px solid black',
            }}>
            {Array.from({ length: GridSize * GridSize }).map((_, index) => {
                const x = index % GridSize
                const y = Math.floor(index / GridSize)

                let isSnake = snake.some(
                    (segment) => segment.x === x && segment.y === y
                )
                return (
                    < div
                        key={index}
                        style={{
                            width: CellSize,
                            height: CellSize,
                            border: '2px solid black',
                            backgroundColor: isSnake ? 'green' : 'white',
                        }}>
                    </div>)
            })}
        </div >
    )
}

export default Board