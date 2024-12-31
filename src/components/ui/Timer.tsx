import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const Timer: FC = () => {
    const [seconds, setSeconds] = useState(0);
    const formatTime = (totalSeconds: number) => {
        const timeDuration = dayjs.duration(totalSeconds * 1000); // Mengonversi detik ke milidetik
        const hours = timeDuration.hours().toString().padStart(2, "0");
        const minutes = timeDuration.minutes().toString().padStart(2, "0");
        const secs = timeDuration.seconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    return (
        <>
            {formatTime(seconds)}
        </>
    );
};

export default Timer;