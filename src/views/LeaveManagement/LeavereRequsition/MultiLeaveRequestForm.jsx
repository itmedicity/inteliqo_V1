import React, { memo, lazy } from 'react'
import { Paper, Grid, Box, TextField, Typography, TextareaAutosize } from '@mui/material'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { useMemo } from 'react';
import { Suspense } from 'react';
import { Form } from 'react-bootstrap';
import TextInputBootStrap from 'src/views/Attendance/Component/TextInputBootStrap';
import MultiLeaveTypeDetl from './Func/CasualLeaveSelected';
// import MuliLeaveMapCmp from './MuliLeaveMapCmp';
import { Button, CssVarsProvider, Tooltip, Typography as Typo } from '@mui/joy';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { eachDayOfInterval } from 'date-fns';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useState } from 'react';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { Actiontypes } from 'src/redux/constants/action.type';

// lazy import 
const MultiLeaveTypeSelectCmp = lazy(() => import('./Func/MultiLeaveTypeSelectCmp'));
const MuliLeaveMapCmp = lazy(() => import('./MuliLeaveMapCmp'));

const MultiLeaveRequestForm = () => {

    const { RESET_SELECT_BOX_COUNTER } = Actiontypes;

    const dispatch = useDispatch();
    const [newData, setnewData] = useState([]);
    //request selected employee details after the submit button pn;y changes
    // const empDetl = useSelector((state) => state.getLeaveRequestInfom.empDetl, _.isEqual);
    // const reqEmpDetl = useMemo(() => empDetl, [empDetl]);
    // const { em_no, requestType, deptSection } = reqEmpDetl;

    // selected form data 
    const multiLeaveTypeFormData = useSelector((state) => state.singleLeaveRequestFormState.leaveReqState, _.isEqual);
    const multiLeaveTypeData = useMemo(() => multiLeaveTypeFormData, [multiLeaveTypeFormData])

    // console.log(`multi leaves`)
    // console.log(reqEmpDetl)

    const { dateRangeCheck, fromDate, toDate, singleLevCheck, singleLeaveType, singleLeaveDesc, totalDays, formSubmit
    } = multiLeaveTypeData;

    //get the date interwal
    // console.log(intervalDate)


    useEffect(() => {
        const intervalDate = eachDayOfInterval({ start: new Date(fromDate), end: new Date(toDate) }).map((date) => moment(date).format('YYYY-MM-DD'))
        const leaveSelectedData = intervalDate.map((val, ind) => {
            return {
                index: ind,
                "date": val,
                "leaveTypeSlno": 0,
                "leaveTypeName": '',
                "selectedLveSlno": 0,
                "selectedLeaveTypeName": '',
                "leaveDate": '',
                "selectedLeaveName": '',
            }
        })

        setnewData(leaveSelectedData)
    }, [fromDate, toDate]);


    //allowed leave type 

    // const state = useSelector((state) => state.getPrifileDateEachEmp.empLeaveData);
    // const allowedLeaveData = useMemo(() => state, [state]);

    //allowed leave details against leave type

    //leave request selection

    const handleChangeLeaveRequest = useCallback(async (leveTypeData, leaveDetl) => {
        // console.log(leveTypeData?.index)
        // console.log(leaveDetl)
        // const newSelectedData = [...leaveSelectedData];

        //filter the leaves for duplication

        const duplicateLeaveSelection = newData?.map((val) => val.selectedLveSlno).includes(leaveDetl?.selectedLveSlno);
        if (duplicateLeaveSelection === true) {
            warningNofity("You are Already Selected This Leaves");
            dispatch({ type: RESET_SELECT_BOX_COUNTER })
        } else {
            // leave add to the map
            const newSelectedLeaveData = newData?.map((val) => {
                if (val?.index === leveTypeData?.index) {
                    return {
                        ...val,
                        "leaveTypeSlno": leveTypeData?.leaveType,
                        "leaveTypeName": leveTypeData?.leaveTypeName,
                    }
                } else if (val?.index === leaveDetl?.index) {
                    return {
                        ...val,
                        "selectedLveSlno": leaveDetl?.selectedLveSlno,
                        "selectedLeaveTypeName": leaveDetl?.lveTypeName,
                        "leaveDate": leaveDetl?.lveDate,
                        "selectedLeaveName": leaveDetl?.leave,
                    }
                } else {
                    return val
                }
            })
            setnewData(newSelectedLeaveData)
        }

        // console.log(newData)
        // console.log(newSelectedLeaveData)
    })


    console.log(newData)
    return (
        <Paper
            // component={Grid}
            // container
            variant="outlined"
            sx={{
                display: "flex",
                flex: 1,
                p: 0.5, mb: 0.5, backgroundColor: '#EBEDEF',
                flexDirection: 'column',
            }}
        >
            <Box sx={{
                flex: 1,
                display: "flex",
                backgroundColor: 'Scrollbar',
                alignItems: 'center',
                justifyContent: 'center',
                p: 0,
                mb: -1
            }} >
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Selected Leave Date</Box>
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Leave Type</Box>
                <Box sx={{ display: "flex", flex: 1, px: 1, backgroundColor: 'lightblue' }} component={Typography} variant="subtitle2" gutterBottom >Leave Name</Box>
            </Box>
            <Box
                variant="outlined"
                sx={{
                    display: "flex",
                    flex: 1,
                    p: 0.5, mb: 0.5, backgroundColor: '#EBEDEF',
                    flexDirection: 'column',
                    minHeight: 10,
                    maxHeight: 210,
                    overflowY: 'auto'
                }}
            >
                {newData?.map((val, index) => <MuliLeaveMapCmp
                    key={index}
                    data={val}
                    index={index}
                    handleChange={handleChangeLeaveRequest}
                />)}
            </Box>
            <Paper
                variant="outlined"
                sx={{
                    p: 0.5, mb: 0.5,
                }}
            >
                <Box sx={{ display: "flex", flex: 1 }}>
                    <Box sx={{ flex: 2 }} >
                        <Box sx={{ display: "flex", flex: 1 }}>
                            <Box sx={{ display: "flex", flex: 2 }}>
                                <Form.Group style={{ width: '100%' }} >
                                    <Form.Control type="file" size="sm" />
                                </Form.Group>
                            </Box>
                            <Box sx={{ display: "flex", flex: 2, pl: 1 }} >
                                <CssVarsProvider>
                                    <Tooltip title="View Documents" variant="outlined" color="info" placement="top">
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="sm"
                                            color="primary"
                                        // fullWidth

                                        // onClick={() => setOpen(true)}
                                        >
                                            <FindInPageIcon />View Document
                                        </Button>
                                    </Tooltip>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flex: 1,
                            width: '100%',
                            flexDirection: 'start',
                            p: 0,
                            m: 0
                        }} >
                            <Typo level="body4">Supported Document/ Image Formats - *.pdf / *.jpg,*.jpeg,*.png || Doc/Image Size Should Be Less Than 2 MB </Typo>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flex: 2, px: 1 }} >
                        <TextareaAutosize maxRows={2} minRows={2} style={{ width: '100%' }} />
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0 }} >
                        <CssVarsProvider>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="success"
                                size="sm"
                                startDecorator={<SaveAsIcon />}
                                // onClick={leaveRequestSubmitFun}
                                fullWidth
                            // sx={{ color: 'green' }} 
                            >
                                Save Leave Request
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Box>

            </Paper>
        </Paper>
    )
}

export default memo(MultiLeaveRequestForm)