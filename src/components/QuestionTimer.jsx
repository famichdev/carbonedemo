import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeOut, onTimeout, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeOut);
    
    useEffect(() => {
        const timer = setTimeout(onTimeout, timeOut);

        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeOut]);

 
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 100);
        }, 100);


        return () => {
            clearInterval(interval);
        }
    });

    let bar = '';

    if (mode === '') {
        bar = <progress id="question-time" value={remainingTime} max={timeOut} className={mode} />;
    }

    return (
        <div>
          {bar}
        </div>
    )
}