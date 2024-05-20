import React, { useState, useCallback, Fragment, memo } from 'react';
import moment from 'moment';
import { getMonth } from 'date-fns';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';

const DashboardMonthField = ({ month, setMonth }) => {

    const [click, setClick] = useState(0);

    const monthIndex = getMonth(new Date(month));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const monthName = months[monthIndex];

    const nextMonth = useCallback(() => {
        setClick(1);
        const nextMonthDate = moment(month).add(1, 'month').format("YYYY-MM-DD");
        setMonth(nextMonthDate);
    }, [month, setMonth]);

    const previousMonth = useCallback(() => {
        setClick(1);
        const previousMonthDate = moment(month).subtract(1, 'month').format("YYYY-MM-DD");
        setMonth(previousMonthDate);
    }, [month, setMonth]);

    return (
        <Fragment>
            <Tooltip title="Choose Month">
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box>
                        <IconButton onClick={previousMonth}>
                            <ArrowBackIosIcon sx={{ fontSize: 15, color: "#9EB8D9" }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ mt: 0.5, }}>
                        {click === 1 ?
                            <Typography sx={{ color: "#394867" }}>{moment(month).format("MMM ")}</Typography>
                            :
                            <Typography sx={{ color: "#394867" }}>{monthName}</Typography>
                        }
                    </Box>
                    <Box>
                        <IconButton onClick={nextMonth}>
                            <ArrowForwardIosIcon sx={{ fontSize: 15, color: "#9EB8D9" }} />
                        </IconButton>
                    </Box>
                </Box>
            </Tooltip>
        </Fragment>
    )
}

export default memo(DashboardMonthField)

