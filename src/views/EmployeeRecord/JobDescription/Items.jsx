import { CssVarsProvider } from '@mui/joy'
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { memo } from 'react';
import JobDeletionModal from './JobDeletionModal';
import { valueToPercent } from '@mui/base';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const Items = ({ val, setEdit, setDelete,
    setSubmitEdit, setsubmitdelt, DeleteValue,
    setOpen, open, handleClose, Close, Active, setActive, seteditCount, checkid, newid, setnewId }) => {

    const EditItem = (val) => {

        const { duties_id } = val
        setEdit(val.id)
        if (newid === 0) {
            setSubmitEdit(duties_id)
        }
        else if (newid === 1) {
            infoNofity("Please submit new data")
        }
    }

    const DeleteItem = useCallback((val) => {
        setDelete(val.id)
        const { duties_id, duties_slno } = val
        if (checkid !== 0) {
            infoNofity("Please Submit Edit!!")
        } else {
            setsubmitdelt(duties_id)
            const deltevalue = async (value) => {
                const result = await axioslogin.delete(`/jobsummary/deletedata/select/${value}`)
                const { success, message } = result.data
                if (success === 5) {
                    succesNofity(message)
                }
                else {
                    warningNofity(message)
                }
            }
            deltevalue(duties_slno)
        }
    }, [val, checkid])

    return (
        <Box sx={{ display: "flex", alignItems: "center", py: 0.1, }} >
            {/* {Active === 1 ? <JobDeletionModal
                open={open} heading="Duties & Responsilities"
                setOpen={setOpen} handleClose={handleClose}
                DeleteValue={DeleteValue} Close={Close} /> : null} */}
            <Box sx={{ display: "flex", flex: 1, pr: 1, flexDirection: "row" }}>
                <Paper
                    square
                    variant="outlined"
                    sx={{
                        display: "flex",
                        px: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "inherit",
                        minHeight: 32
                    }}
                >
                    <Box sx={{ flex: 0, pr: 0.2 }} >
                        <IconButton variant="outlined" size='sm' onClick={(e) => EditItem(val)} >
                            <DriveFileRenameOutlineOutlinedIcon color='primary' size="inherit" />
                        </IconButton>
                    </Box>
                </Paper>
                <Paper square sx={{ display: "flex", px: 0.5, justifyContent: "left", alignItems: "center", width: "100%" }} variant="outlined" >
                    <CssVarsProvider>
                        <Typography level="body1" >
                            {val.duties_and_resp}
                        </Typography>
                    </CssVarsProvider>
                </Paper>
            </Box>
            <Box sx={{ flex: 0, justifyItems: "center" }} >
                <IconButton variant="outlined" size='sm' onClick={(e) => DeleteItem(val)} >
                    <DeleteOutlinedIcon color='error' />
                </IconButton>
            </Box>
        </Box>
    )
}

export default memo(Items) 