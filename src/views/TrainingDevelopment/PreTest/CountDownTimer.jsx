import { Typography } from '@mui/material';
import React, { memo, useEffect } from 'react'

const CountDownTimer = ({ sec, setSec, timeLeft, setTimeLeft }) => {
    const formatTime = (t) => t < 10 ? '0' + t : t;
    useEffect(() => {
        const interval = setInterval(() => {
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft - m * 60;

            setSec(s);
            if (m <= 0 && s <= 0) return () => clearInterval(interval);

            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, setTimeLeft, setSec]);

    return (
        <div>
            <Typography sx={{ fontSize: "xx-large" }}>{formatTime(sec)}s</Typography>
        </div>
    )
}
export default memo(CountDownTimer)
