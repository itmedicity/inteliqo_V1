import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import CompetencyDetl from './CompetencyDetl';
import { memo } from 'react';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const JobCompetency = ({ selectedDept, selectDesignation }) => {
    const [competency, setcompetency] = useState([])
    useEffect(() => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            const postData = {
                dept_id: selectedDept,
                designation: selectDesignation
            }
            const getjobCompetency = async () => {
                const result = await axioslogin.post('/jobsummary/get/jobcompetency', postData)
                const { success, data } = result.data
                if (success === 1) {
                    setcompetency(data)
                }
                else {
                    setcompetency([])
                }

            }
            getjobCompetency()
        }

    }, [selectedDept, selectDesignation])
    return (
        <Fragment>
            {/* Prformance & Competency descriptive table */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                        Job  Competency
                    </Typography>
                </CssVarsProvider>
            </Box>

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >

                {
                    competency && competency.map((val, index) =>
                        <CompetencyDetl key={index} val={val} />
                    )

                }

            </Paper>
        </Fragment>
    )
}

export default memo(JobCompetency)