import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { useCallback } from 'react'
import IconButton from '@mui/joy/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { memo } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';


const ExperienceItem = ({ val, setDeleteItem, jobedit, setsubmitdelt, DeleteValue,
    setOpen, open, handleClose, Close, Active, setActive }) => {

    const deleteexperience = useCallback((val) => {
        setDeleteItem(val.id)
        const { qualification_slno, qualification_id } = val
        setsubmitdelt(qualification_id)
        const deltevalue = async (value) => {
            const result = await axioslogin.delete(`/jobsummary/deleteQualification/${value}`)
            const { success, message } = result.data
            if (success === 5) {
                succesNofity(message)
            }
            else {
                warningNofity(message)
            }
        }
        deltevalue(qualification_slno)
    }, [setDeleteItem, setsubmitdelt])

    return (
        <Box sx={{ display: "flex", width: "100%", alignItems: "center", px: 0.1 }} >
            {/* {Active === 1 ? <JobDeletionModal
                open={open} heading="Experience"
                setOpen={setOpen} handleClose={handleClose}
                DeleteValue={DeleteValue} Close={Close} /> : null} */}
            <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {jobedit === 0 || val.id > 0 ? val.course : val.cour_desc}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 3, px: 0.2 }} >
                <Paper square variant="outlined" sx={{ display: "flex", justifyContent: "center" }} >
                    <CssVarsProvider>
                        <Typography
                            level="body1"
                        >
                            {jobedit === 0 || val.id > 0 ? val.specialization : val.spec_desc}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 0, px: 0.2 }} >
                <IconButton variant="outlined" size='xs' onClick={(e) => deleteexperience(val)}>
                    <DeleteOutlinedIcon color='error' />
                </IconButton>
            </Box>
        </Box>
    )
}

export default memo(ExperienceItem) 