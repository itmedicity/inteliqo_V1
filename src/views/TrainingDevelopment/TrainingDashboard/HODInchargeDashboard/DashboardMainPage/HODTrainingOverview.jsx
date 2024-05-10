import { Box, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { Fragment, memo, } from 'react'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import UpcomingOutlinedIcon from '@mui/icons-material/UpcomingOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import GroupsIcon from '@mui/icons-material/Groups';


const HODTrainingOverview = ({ DeptComplt, DeptPndg, DeptNext, DeptRetest, DeptTotal }) => {

    return (
        <Fragment>
            <Paper sx={{ flex: 1, boxShadow: 4, p: 1, backgroundColor: "#FFFFFF" }}>
                <h5>Departmental Training Overview</h5>
                <Box sx={{ mx: "auto", p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <GroupsIcon color="secondary" />
                            Total
                        </Box>
                        <Box>
                            <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#7D1E6A", backgroundColor: "#7D1E6A", textAlign: "center" }} >
                                <Typography sx={{ color: "#F6F6C9" }}>{DeptTotal !== null ? DeptTotal : 0}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <AddTaskOutlinedIcon color="secondary" />
                            Completed
                        </Box>
                        <Box>
                            <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#153462", backgroundColor: "#153462", textAlign: "center" }} >
                                <Typography sx={{ color: "#F6F6C9" }}>{DeptComplt !== null ? DeptComplt : 0}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                        <Box><UpcomingOutlinedIcon color="secondary" /> Up coming</Box>
                        <Box>
                            <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#7D1E6A", backgroundColor: "#7D1E6A", textAlign: "center" }} >
                                <Typography sx={{ color: "#F6F6C9" }}>{DeptNext !== null ? DeptNext : 0}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                        <Box><PendingActionsOutlinedIcon color="secondary" />  Pending & Reschedule
                        </Box>
                        <Box>
                            <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#153462", backgroundColor: "#153462", textAlign: "center" }} >
                                <Typography sx={{ color: "#F6F6C9" }}>{DeptPndg !== null ? DeptPndg : 0}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 2 }}>
                        <Box><ModeOutlinedIcon color="secondary" />  Retest </Box>
                        {/* <Box>
                            <Chip sx={{ color: "#F6F6C9", backgroundColor: "#7D1E6A" }}>
                                {DeptRetest !== null ? DeptRetest : 0}
                            </Chip>
                        </Box> */}
                        <Box>
                            <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#7D1E6A", backgroundColor: "#7D1E6A", textAlign: "center" }} >
                                <Typography sx={{ color: "#F6F6C9" }}>{DeptRetest !== null ? DeptRetest : 0}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Fragment>
    )
}
export default memo(HODTrainingOverview) 
