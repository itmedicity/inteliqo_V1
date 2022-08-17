import { Box, TextareaAutosize } from '@mui/material'
import React from 'react'
import IconButton from '@mui/joy/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const CompetencyItem = ({ val, setDeleteComp, setEditComp }) => {

    const EditCompItem = (id) => {
        setEditComp(id)
    }

    const DeleteCompItem = (id) => {
        setDeleteComp(id)
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
            <Box sx={{ flex: 0, pr: 0.2 }} >
                <IconButton variant="outlined" size='sm'
                    onClick={(e) => { EditCompItem(val.id) }}
                >
                    <DriveFileRenameOutlineOutlinedIcon color='primary' size="inherit" />
                </IconButton>
            </Box>
            <Box sx={{ flex: 2 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder="Sourcing"
                    value={val.kraname}
                />
            </Box>
            <Box sx={{ flex: 3, px: 0.5 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder=""
                    value={val.kpicompetency}
                />
            </Box>
            {/* <Box sx={{ flex: 1, px: 0.5 }} >
                <TextareaAutosize
                    style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                    minRows={1}
                    placeholder=""
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
                <IconButton variant="outlined" size='sm' onClick={(e) => { DeleteCompItem(val.id) }}>
                    <DeleteOutlinedIcon color='error' />
                </IconButton>
            </Box>
        </Box >
    )
}

export default CompetencyItem