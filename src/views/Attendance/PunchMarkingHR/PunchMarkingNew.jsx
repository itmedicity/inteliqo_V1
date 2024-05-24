import React, { Fragment, useEffect, useState, memo, useCallback } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CssVarsProvider, IconButton, Typography } from '@mui/joy';
import Input from '@mui/joy/Input';
import { addMonths, subMonths } from 'date-fns';
import { useHistory } from 'react-router-dom'
import _ from 'underscore'
import { setDept } from 'src/redux/actions/Dept.Action';
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action';
import DeptSectionComponent from './DeptSectionComponent';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';

const PunchMarkingNew = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    //FORM DATA 
    const [value, setValue] = useState(moment(new Date()));
    /** To get stored branch values from redux */
    useEffect(() => {
        dispatch(setDept())
        dispatch(setDeptWiseSection());
    }, [dispatch])

    const deptSection = useSelector((state) => state?.getDeptSectList?.deptSectionList, _.isEqual)
    const dept = useSelector((state) => state?.getdept?.departmentlist, _.isEqual)

    const toRedirectToHome = useCallback(() => {
        history.push(`/Home`)
    }, [])

    return (
        <Fragment>
            <Paper sx={{ display: 'flex', flex: 1, height: window.innerHeight - 85, flexDirection: 'column' }}>

                <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Punch In/Out Marking HR
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ pl: 0.5, mt: 0.5 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='xs' color="danger" onClick={toRedirectToHome}>
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>

                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                    <Box sx={{ flex: 1, px: 0.5, }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                minDate={subMonths(new Date(), 1)}
                                maxDate={addMonths(new Date(), 1)}
                                value={value}
                                size="small"
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, }} ></Box>
                    <Box sx={{ flex: 1, px: 0.5, }} ></Box>
                    <Box sx={{ flex: 1, px: 0.5, }} ></Box>
                </Paper>

                <Box sx={{
                    display: 'flex', width: '100%', flexDirection: 'column', mt: 1,
                    overflow: 'auto', '::-webkit-scrollbar': { display: "none", backgroundColor: 'lightgoldenrodyellow' }
                }}>
                    {
                        dept?.map((val, index) => (
                            <Box key={index} sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{
                                    width: "20%", borderBottom: 1, borderLeft: 1, textAlign: "center",
                                    borderColor: "#D8D9DA", display: "flex", flexDirection: "row", justifyContent: "center", gap: 4
                                }}>
                                    <Typography >
                                        {val.dept_name}

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "80%" }}>
                                    <DeptSectionComponent deptid={val.dept_id} deptSection={deptSection} value={value} />
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Paper>



            {/* <CustomLayout title="Punch In/Out Marking HR" displayClose={true} >
                <Box sx={{ width: '100%', }}>
                    <Box sx={{ display: 'flex', py: 0.5, width: '100%', }}>
                        <Box sx={{ flex: 1, px: 0.5, width: '20%', }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    minDate={subMonths(new Date(), 1)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    size="small"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ display: 'flex', width: '50%', }}>

                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentDropRedx getDept={changeDept} deptslno={depart} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentSectionRedx getSection={changeSection} />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', px: 0.5, width: '30%' }}>
                            <CssVarsProvider>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={handleOnClickFuntion}
                                    fullWidth
                                    startDecorator={<HourglassEmptyOutlinedIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Process
                                </Button>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    fullWidth
                                    onClick={handleView}
                                    startDecorator={<RemoveRedEyeOutlinedIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    View
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    {flag === 1 ? <PunchSavedHrView value={value} dept={depart} section={section}
                    /> : null}
                </Box>
            </CustomLayout> */}
        </Fragment >
    )
}

export default memo(PunchMarkingNew) 