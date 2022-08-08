import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import SelectBasic from 'src/views/Component/SelectBasic';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { infoNofity, succesNofity, errorNofity } from 'src/views/CommonCode/Commonfunc';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { ToastContainer } from 'react-toastify';
import KraDetl from './KraDetl';

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
                        Job Specification : Performance & Competency
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

export default Jobperformance