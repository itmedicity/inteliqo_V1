import { Box, Paper } from '@mui/material'
import React, { memo, useCallback } from 'react'
import EmployeeViewMainPage from '../../TrainingEmployeeView/EmployeeViewMainPage'
import { IconButton, Tooltip } from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const HODpersonalDetails = ({ Hodself, SetHodSelf }) => {

    const HandleHodSelf = useCallback((e) => {
        SetHodSelf(true)
    }, [SetHodSelf])

    const HandleHodSelfOut = useCallback((e) => {
        SetHodSelf(false)
    }, [SetHodSelf])

    return (
        <Paper elevation={0} sx={{ flex: 1, width: "100%", boxShadow: 4, p: 1, backgroundColor: "#FFFFFF", display: "flex", flexDirection: "row", }}>

            <Box sx={{ display: "flex", width: "100%", flexDirection: "row", }}>
                {Hodself === false ?
                    <Box sx={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                        <Box>
                            <h5>Personal Details</h5>
                        </Box>
                        <Tooltip title="View personal details">
                            <Box>
                                <IconButton onClick={(e) => HandleHodSelf(e)}>
                                    <KeyboardArrowDownIcon style={{ backgroundColor: 'pink' }} />
                                </IconButton>
                            </Box>
                        </Tooltip>
                    </Box>
                    :
                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Box>
                                <h5> </h5>
                            </Box>
                            <Tooltip title="Back to HOD View">
                                <Box>
                                    <IconButton onClick={(e) => HandleHodSelfOut(e)}>
                                        <KeyboardArrowUpIcon style={{ backgroundColor: 'pink' }} />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                        </Box>

                        <EmployeeViewMainPage />
                    </Box>

                }
            </Box>



        </Paper >
    )
}
export default memo(HODpersonalDetails) 
