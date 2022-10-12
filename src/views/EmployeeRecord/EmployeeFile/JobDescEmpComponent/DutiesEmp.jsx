import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import DutiesAndresp from './DutiesAndresp';
import { memo } from 'react';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';


const DutiesEmp = ({ selectDesignation, selectedDept }) => {
    const [jobDuties, setJobduties] = useState([])
    useEffect(() => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            const postData = {
                dept_id: selectedDept,
                designation: selectDesignation
            }
            const getjobDuties = async () => {
                const result = await axioslogin.post('/jobsummary/getjobduties', postData)
                const { success, data } = result.data
                if (success === 1) {
                    setJobduties(data)
                }
                else {
                    setJobduties([])
                }

            }
            getjobDuties()
        }

    }, [selectDesignation, selectedDept])
    return (
        <Fragment>
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                        Duties And Responsbilities
                    </Typography>
                </CssVarsProvider>
            </Box>

            {/* Dutieds And Responsibilities */}

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                {
                    jobDuties && jobDuties.map((val, index) =>
                        <DutiesAndresp key={index} val={val} />
                    )
                }
            </Paper>
        </Fragment>
    )
}

export default memo(DutiesEmp) 