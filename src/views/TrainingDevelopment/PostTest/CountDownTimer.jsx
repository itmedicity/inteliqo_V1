import { Typography } from '@mui/material';
import React, { memo, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const CountDownTimer = ({ setOrder, order, sec, setSec, timeLeft, setTimeLeft }) => {

    const formatTime = (t) => t < 10 ? '0' + t : t;
    useEffect(() => {
        const interval = setInterval(() => {
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft - m * 60;

            setSec(s);
            if (m <= 0 && s <= 0) return () => clearInterval(interval);

            setTimeLeft((t) => t - 1);
            if (s === 1) {
                setOrder(order + 1)
                warningNofity("Time Expired! Catch Next question")
                setTimeLeft(60)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, setTimeLeft, setOrder, order, setSec]);

    return (

        <div>
            <ToastContainer />
            <Typography sx={{ fontSize: "xx-large" }}>{formatTime(sec)}s</Typography>
        </div>
    )
}
export default memo(CountDownTimer)
