import React, { useState, useCallback, Fragment, memo } from 'react';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';

const DashboardYearSelect = ({ selectedYear, setSelectedYear }) => {

    const [click, setClick] = useState(0);

    const previousYear = useCallback(() => {
        setClick(1)
        const nextYear = moment(selectedYear).add(1, 'year').format("YYYY");
        setSelectedYear(nextYear);
    }, [setSelectedYear, selectedYear])

    const nextYear = useCallback(() => {
        setClick(1)
        const previousYear = moment(selectedYear).subtract(1, 'year').format("YYYY");
        setSelectedYear(previousYear);
    }, [setSelectedYear, selectedYear])

    return (
        <Fragment>
            <Tooltip title="Choose Year">
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box>
                        <IconButton onClick={nextYear} >
                            <ArrowBackIosIcon sx={{ fontSize: 15, color: "#9EB8D9" }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ mt: 0.5, }}>
                        {click === 1 ?
                            <Typography sx={{ color: "#394867" }}>{moment(selectedYear).format("YYYY ")}</Typography>
                            :
                            <Typography sx={{ color: "#394867" }}>{selectedYear}</Typography>
                        }
                    </Box>
                    <Box>
                        <IconButton onClick={previousYear}>
                            <ArrowForwardIosIcon sx={{ fontSize: 15, color: "#9EB8D9" }} />
                        </IconButton>
                    </Box>
                </Box>
            </Tooltip>
        </Fragment>
    )
}

export default memo(DashboardYearSelect) 
