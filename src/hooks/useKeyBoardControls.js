import { useEffect } from "react";

function useKeyBoardControls({ gameOver, playing, controls, changeDirection }) {

    useEffect(() => {
        if (!playing || gameOver) return
        function handleKey(e) {
            if (controls.UP.includes(e.key)) {
                changeDirection("UP")
            } else if (controls.DOWN.includes(e.key)) {
                changeDirection("DOWN")
            } else if (controls.LEFT.includes(e.key)) {
                changeDirection("LEFT")
            } else if (controls.RIGHT.includes(e.key)) {
                changeDirection("RIGHT")
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [gameOver, playing, controls, changeDirection]);
}
export default useKeyBoardControls;