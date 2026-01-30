const GridSize = 20;
const CellSize = 30;

function Board() {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GridSize},${CellSize}px)`,
                gridTemplateRows: `repeat(${GridSize},${CellSize}px)`,
                border: '2px solid black',
            }}>
            {Array.from({ length: GridSize * GridSize }).map((_, index) => (
                <div
                    key={index}
                    style={{
                        width: CellSize,
                        height: CellSize,
                        border: '2px solid black',
                    }}>
                </div>
            ))}
        </div>
    )
}

export default Board