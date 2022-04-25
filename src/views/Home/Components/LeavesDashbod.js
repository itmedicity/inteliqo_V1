import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useState } from 'react'
// import CommentIcon from '@mui/icons-material/Comment';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import { useDispatch, useSelector } from 'react-redux';
import { getannualleave } from 'src/redux/actions/Profile.action';
const ListItems = React.lazy(() => import('./ListItemCmp'));


const LeavesDashbod = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp.empLeaveData;
    })

    //getting employee id
    const empid = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_id
    })

    useEffect(() => {
        if (empid !== '') {
            dispatch(getannualleave(empid))
        }
    }, [empid])

    //useEffect
    useEffect(() => {
        const { leaveData } = state
        setData(leaveData)
    }, [state])

    const avatarStyle = {
        width: 20,
        height: 20,
        fontSize: 14,
        fontWeight: 700
    }

    return (
        <Fragment>
            <Grid item md={6} sm={4}
                sx={{
                    marginTop: 1
                }}
            >
                <Card>
                    <CardHeader
                        title="My Leaves Information"
                        titleTypographyProps={{ variant: "caption", display: "block", fontWeight: 790, paddingLeft: 1.5 }}
                        sx={{
                            bgcolor: "#90A4AE",
                            padding: 0.5,
                        }}
                        action={
                            <Typography variant='subtitle2' sx={{ display: "block", paddingY: 0.5, paddingRight: 4, fontSize: 12.5, fontWeight: 600 }}  >
                                Year - 2022
                            </Typography>
                        }
                    />
                    <CardContent sx={{ padding: 0 }} >
                        <Suspense  >
                            <ListItem dense disableGutters disablePadding sx={{ padding: 0, bgcolor: "#B0BEC5" }} >
                                <ListItemButton dense sx={{ paddingY: 0 }}>
                                    <ListItemIcon sx={{ paddingY: 0, paddingLeft: 1 }} >
                                        <IconButton edge="start" aria-label='comment' sx={{ padding: 0, }} >
                                            <DonutSmallIcon sx={{ fontSize: 15, paddingY: 0, color: '#5c6bc0' }} />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Leave Name`}
                                        primaryTypographyProps={{ fontWeight: 800, variant: 'caption', fontSize: 11 }}
                                    />
                                    <ListItemIcon>
                                        <Tooltip title="Allowed Leaves" arrow placement='top' >
                                            <Avatar sx={{ ...avatarStyle, bgcolor: "#26418f" }}>A</Avatar>
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemIcon>
                                        <Tooltip title="Credited Leaves" arrow placement='top' >
                                            <Avatar sx={{ ...avatarStyle, bgcolor: "#26418f" }}>C</Avatar>
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemIcon>
                                        <Tooltip title="Balance Leaves" arrow placement='top' >
                                            <Avatar sx={{ ...avatarStyle, bgcolor: "#26418f" }}>B</Avatar>
                                        </Tooltip>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <List dense disablePadding sx={{ paddingY: 0, height: 190, overflowY: "auto" }} className="ListItemScrol" >
                                {
                                    data && data.map((val, index) => {
                                        return <ListItems key={index} holidayName={val.typeleve} allowed={val.allowed} credited={val.credited} balance={val.balance} />
                                    })
                                }
                            </List>
                        </Suspense>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}

export default LeavesDashbod