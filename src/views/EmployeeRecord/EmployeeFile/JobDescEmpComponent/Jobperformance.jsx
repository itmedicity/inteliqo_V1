import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import KraDetl from './KraDetl';
import { memo } from 'react';

const Jobperformance = ({ selectedDept, selectDesignation }) => {
    const [jobSpecific, setjobSpecific] = useState([])
    useEffect(() => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            const postData = {
                dept_id: selectedDept,
                designation: selectDesignation
            }
            const getjobDuties = async () => {
                const result = await axioslogin.post('/jobsummary/getjobspecific', postData)
                const { success, data } = result.data
                if (success === 1) {
                    setjobSpecific(data)
                }
                else {
                    setjobSpecific([])
                }

            }
            getjobDuties()
        }

    }, [selectedDept, selectDesignation])

    return (
        <Fragment>
            {/* Prformance & Competency descriptive table */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Job  Performance
                    </Typography>
                </CssVarsProvider>
            </Box>

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >

                {
                    jobSpecific && jobSpecific.map((val, index) =>
                        <KraDetl key={index} val={val} />
                    )

                }

            </Paper>

        </Fragment>
    )
}

export default memo(Jobperformance) 