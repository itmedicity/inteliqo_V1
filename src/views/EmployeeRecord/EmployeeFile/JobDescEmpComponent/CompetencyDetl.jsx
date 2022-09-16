import { Box, TextareaAutosize } from '@mui/material'
import React, { Fragment } from 'react'
import IconButton from '@mui/joy/IconButton';
import AdjustIcon from '@mui/icons-material/Adjust';
import { memo } from 'react';

const CompetencyDetl = ({ val }) => {
    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
                <Box sx={{ flex: 0, pr: 0.2 }} >
                    <IconButton variant="outlined" size='sm' >
                        <AdjustIcon color='primary' size="inherit" />
                    </IconButton>
                </Box>
                <Box sx={{ flex: 2 }} >
                    <TextareaAutosize
                        style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                        minRows={1}
                        placeholder="Kra"
                        value={val.kra_desc}
                        disabled={true}
                    />
                </Box>
                <Box sx={{ flex: 3, px: 0.5 }} >
                    <TextareaAutosize
                        style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                        minRows={1}
                        placeholder="Competency"
                        value={val.competency_desc}
                        disabled={true}
                    />
                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(CompetencyDetl) 