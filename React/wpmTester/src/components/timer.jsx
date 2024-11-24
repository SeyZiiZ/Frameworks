import { useEffect, useState } from "react";

export const Timer = ({isReady, onTimerChange, isFirstInput}) => {
    const [timeRemaining, setTimeRemaining] = useState(60);

    useEffect(() => {
        if(!isReady || !isFirstInput) return;

        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onTimerChange(0);
                    return 0;
                }
                const updatedTime = prevTime - 1;
                onTimerChange(updatedTime);
                return updatedTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isReady,  isFirstInput]);

    return (
        <>
        <h1 className="font-bold text-center text-4xl mb-4">Time remaining : {timeRemaining} </h1>
        </>
    )
}