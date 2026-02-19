import { useEffect } from "react";

function useCountdown({ countdown, setCountdown }) {
    useEffect(() => {
        if (countdown === null) return;

        const time = setTimeout(() => {
            setCountdown((prev) => prev > 0 ? prev - 1 : null);
        }, 1000)
        return () => clearTimeout(time);
    }, [countdown, setCountdown]);
}

export default useCountdown;