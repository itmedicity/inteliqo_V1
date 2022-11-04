import { Box, TextareaAutosize } from '@mui/material'
import React, { useCallback } from 'react'
import IconButton from '@mui/joy/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { memo } from 'react';
import JobDeletionModal from './JobDeletionModal';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const CompetencyItem = ({ val, setDeleteComp, setEditComp,
    setSubmitEdit, setsubmitdelt,
    DeleteValue,
    setOpen, open, handleClose, Close, Active, setActive, checkid, newid }) => {

    const EditCompItem = (val) => {
        setEditComp(val.id)

        if (newid === 0) {
            setSubmitEdit(val.competency_id)
        }
        else if (newid === 1) {
            infoNofity("Please submit new data")
        }

    }


    const DeleteCompItem = useCallback((val) => {
        setDeleteComp(val.id)
        const { competency_slno, competency_id } = val
        if (checkid !== 0) {
            infoNofity("Please Submit Edit!!")
        } else {
            setsubmitdelt(competency_id)
            const deltevalue = async (value) => {
                const result = await axioslogin.delete(`/jobsummary/deletePerf/${value}`)
                const { success, message } = result.data
                if (success === 5) {
                    succesNofity(message)
                }
                else {
                    warningNofity(message)
                }
            }
            deltevalue(competency_slno)
        }

    }, [val, checkid])

    return (
        <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
            {/* {Active === 1 ? <JobDeletionModal
                open={open} heading="Competency Item"
                setOpen={setOpen} handleClose={handleClose}
                DeleteValue={DeleteValue} Close={Close} /> : null} */}
            <Box sx={{ flex: 0, pr: 0.2 }} >
                <IconButton variant="outlined" size='sm'
                    onClick={(e) => { EditCompItem(val) }}
                >
                    <DriveFileRenameOutlineOutlinedIcon color='primary' size="inherit" />
                </IconButton>
            </Box>
            <Box sx={{ flex: 3, px: 0.5 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder="kra"
                    value={val.kra_desc}
                    disabled={true}
                />
            </Box>
            <Box sx={{ flex: 2 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder="Sourcing"
                    value={val.competency_desc}
                    disabled={true}
                />
            </Box>

            {/* <Box sx={{ flex: 1, px: 0.5 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder="hhhhhhhhhhh"
                //value={val.kpiscore}
                />
            </Box> */}
            {/* <Box sx={{ flex: 3, }} >
            <TextareaAutosize
                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                minRows={1}
                placeholder=""
                value={val.kpicompetency}
            />
        </Box> */}
            <Box sx={{ flex: 0, px: 0.5 }} >
                <IconButton variant="outlined" size='sm' onClick={(e) => { DeleteCompItem(val) }}>
                    <DeleteOutlinedIcon color='error' />
                </IconButton>
            </Box>
        </Box >
    )
}

export default memo(CompetencyItem) 