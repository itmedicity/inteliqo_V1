import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { memo } from 'react';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { CssVarsProvider, Typography } from '@mui/joy';

const CompetencyDetl = ({ val }) => {
    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center", py: 0.1 }} >
                <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CssVarsProvider>
                            <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                        </CssVarsProvider>
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', width: '80%', textTransform: 'capitalize', }}>
                    {val.kra_desc.toLowerCase()}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: "flex-start" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <CssVarsProvider>
                            <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                        </CssVarsProvider>
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', width: '80%', textTransform: 'capitalize', }}>
                    {val.competency_desc.toLowerCase()}
                </Box>

                {/* <Box sx={{ flex: 0, pr: 0.2 }} >
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
            </Box>*/}
            </Box>
        </Fragment >
    )
}

export default memo(CompetencyDetl) 