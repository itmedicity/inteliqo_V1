import { Box } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { Fragment, memo, useCallback } from 'react'
import Chip from '@mui/joy/Chip';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';

const AttandancePage = ({ SetAttendance }) => {
    const InductionAttandance = useCallback(() => {
        SetAttendance(1)
    }, [SetAttendance])

    const DepartmentalAttandance = useCallback(() => {
        SetAttendance(2)
    }, [SetAttendance])


    return (
        <Fragment>
            <Paper elevation={0} sx={{ boxShadow: 4, p: 1, backgroundColor: "#FFFFFF" }}>
                <h5>Attendance</h5>
                <Box sx={{ width: "100%", p: 1 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: 'wrap' }}>
                        <Box><PendingActionsOutlinedIcon color="secondary" />  Induction Training
                        </Box>
                        <Box onClick={InductionAttandance} sx={{ cursor: "pointer" }}>
                            <Chip sx={{ color: "#F6F6C9", backgroundColor: "#153462" }}>
                                Mark Attendance
                            </Chip>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 2, flexWrap: 'wrap' }}>
                        <Box><PendingActionsOutlinedIcon color="secondary" />  Departmental Training</Box>
                        <Box onClick={DepartmentalAttandance} sx={{ cursor: "pointer" }}>
                            <Chip sx={{ color: "#F6F6C9", backgroundColor: "#153462" }}>
                                Mark Attendance
                            </Chip>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    )
}

export default memo(AttandancePage)
