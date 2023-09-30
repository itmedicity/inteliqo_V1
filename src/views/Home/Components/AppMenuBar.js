import React, { Fragment, memo, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import DigitalCLock from './DigitalCLock';
import Alert from './Alert';
import Notification from './Notification';
import Message from './Message';
import { Chip, CssVarsProvider, Typography } from '@mui/joy';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import GroupRemoveOutlinedIcon from '@mui/icons-material/GroupRemoveOutlined';
import { useSelector } from 'react-redux';
import { setActiveempCount } from 'src/redux/actions/CountActiveEmp.Action'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPunchCount } from 'src/redux/actions/PunchdataCount.Action';

const AppMenuBar = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setActiveempCount());
        dispatch(setPunchCount());
    }, [dispatch])

    /** useSelector for getting active employee count and punching employee count  wise list from redux  */
    const state = useSelector((state) => {
        return {
            empActiveCount: state.getActiveCountemp.empActiveCountList || 0,
            empPunchCount: state.getPunchCount.empPunchCountList
        }
    })

    /** destructuring the state */
    const { empActiveCount, empPunchCount } = state
    /** to get active employee count */
    const [count1, setcount1] = useState(0)
    useEffect(() => {
        const arr = empActiveCount && empActiveCount.map((val, index) => {
            return val.ActiveEmpCount
        })
        setcount1(arr)
    }, [empActiveCount])

    /** to get employee punch count */
    const [count2, setcount2] = useState(0)
    useEffect(() => {
        const arr2 = empPunchCount && empPunchCount.map((val, index) => {
            return val.punchcount
        })
        setcount2(arr2)
    }, [empPunchCount])

    /** to get nin punching count */
    const count3 = count1 - count2
    let string = count3.toString().padStart(4, '0')

    return (
        <Fragment>
            <AppBar position="static" color="inherit" >
                <Container maxWidth="false" sx={{
                    height: { lg: 50, xl: 50, md: 50 }
                }} >
                    <Box sx={{ display: "flex", p: 1 }} >
                        <Box sx={{ display: "flex", flexGrow: 0 }} ><Alert /></Box>
                        <Box sx={{ display: "flex", flexGrow: 0 }} ><Notification /></Box>
                        <Box sx={{ display: "flex", flexGrow: 0 }} ><Message /></Box>
                        <Box sx={{
                            display: "flex",
                            flexGrow: 10,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }} >
                            <CssVarsProvider>
                                <Box sx={{ display: "flex", flexGrow: 0 }} >
                                    <Typography level="body2">
                                        <DigitalCLock />
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexGrow: 10, px: 2, flexDirection: "row-reverse", }} >
                                    <Box sx={{ display: "flex", px: 0.5 }} >
                                        <Chip
                                            variant="outlined"
                                            size="md"
                                            sx={{ "--Chip-radius": "8px", color: "#808066", }}
                                            startDecorator={<GroupRemoveOutlinedIcon />}
                                            endDecorator={string}
                                        ></Chip>
                                    </Box>
                                    <Box sx={{ display: "flex", px: 0.5 }} >
                                        <Chip
                                            variant="outlined"
                                            size="md"
                                            sx={{ "--Chip-radius": "8px", color: "#808066", }}
                                            startDecorator={<GroupAddOutlinedIcon />}
                                            endDecorator={count2}
                                        ></Chip>
                                    </Box>
                                    <Box sx={{ display: "flex", px: 0.5 }} >
                                        <Chip
                                            variant="outlined"
                                            size="md"
                                            sx={{ "--Chip-radius": "8px", color: "#808066", }}
                                            startDecorator={<GroupOutlinedIcon />}
                                            endDecorator={count1}

                                        ></Chip>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", flexGrow: 15 }}></Box>
                            </CssVarsProvider>

                        </Box>
                    </Box>
                </Container>
            </AppBar>
        </Fragment>
    )
}

export default memo(AppMenuBar)