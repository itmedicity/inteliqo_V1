import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react"
import React from 'react'
import LeaveTypeSelect from 'src/views/CommonCode/LeaveTypeSelect'
import SessionCheck from "src/views/Axios/SessionCheck"
import { ToastContainer } from "react-toastify"
import moment from 'moment';
import { succesNofity, warningNofity } from "src/views/CommonCode/Commonfunc"
import { axioslogin } from "src/views/Axios/Axios"
import { employeeNumber } from "src/views/Constant/Constant"
import { format, isAfter, lastDayOfYear, startOfYear } from "date-fns"
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import MasterLayout from "../MasterComponents/MasterLayout"
import { Box, Button, CssVarsProvider, Input } from "@mui/joy"
import { IconButton, Paper } from "@mui/material"
import CommonAgGrid from "src/views/Component/CommonAgGrid"
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import InputComponent from "src/views/MuiComponents/JoyComponent/InputComponent"
import JoyCheckbox from "src/views/MuiComponents/JoyComponent/JoyCheckbox"

const YearlyLeaveCalendarMast = () => {
    const [count, setCount] = useState(0)
    const [holidaydate, setValue] = useState(format(new Date(), "yyyy-MM-dd"))
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [year, setYear] = useState(format(new Date(), "yyyy-MM-dd"))
    const [leavetype, setleavetype] = useState(0)


    //setting initial state
    const [formData, setformData] = useState({
        calendar_leave: '',
        status: false
    })

    //destructuring
    const { calendar_leave, status } = formData

    const updateYearlyLeaveCalendar = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })
    }, [formData])

    //SETTING DEFAULT STATE
    const defaultState = useMemo(() => {
        return {
            calendar_leave: '',
            status: false
        }
    }, [])

    //post data
    const postdata = useMemo(() => {
        return {
            hld_desc: calendar_leave,
            lvetype_slno: leavetype,
            hld_date: moment(holidaydate).format('YYYY-MM-DD'),
            hld_year: moment(year).format('YYYY'),
            hld_status: status === false ? 0 : 1,
            create_user: employeeNumber()
        }
    }, [leavetype, calendar_leave, status, holidaydate, year])

    const updatedata = useMemo(() => {
        return {
            hld_desc: calendar_leave,
            hld_year: moment(year).format('YYYY'),
            hld_status: status === true ? 1 : 0,
            hld_date: moment(holidaydate).format('YYYY-MM-DD'),
            lvetype_slno: leavetype,
            edit_user: employeeNumber(),
            hld_slno: slno
        }
    }, [leavetype, calendar_leave, status, holidaydate, year, slno])



    const submitFormData = useCallback(async (e) => {
        e.preventDefault()


        if (flag === 1) {
            if (isAfter(new Date(), new Date(holidaydate)) === true) {
                warningNofity("Holiday Date is passed!!! Cannot Edit")
            } else {
                const result = await axioslogin.patch('/holidaylist', updatedata)
                const { success, message } = result.data
                if (success === 2) {
                    setformData(defaultState)
                    setCount(count + 1)
                    setValue(null)
                    setYear(null)
                    setleavetype(0);
                    succesNofity(message)
                    setFlag(0)
                } else {
                    warningNofity(message)
                }
            }
        } else {
            const result = await axioslogin.post('/holidaylist', postdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setformData(defaultState)
                setCount(count + 1)
                setleavetype(0);
                setValue(null)
                setYear(null)
            }
            else {
                warningNofity(message)
            }
        }
    }, [flag, updatedata, count, defaultState, holidaydate, postdata])

    //get data from data base
    useEffect(() => {
        const getTableData = async () => {
            const results = await axioslogin.get("/holidaylist")
            const { success, data } = results.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getTableData()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'hld_slno' },
        { headerName: 'Leave Type', field: 'lvetype_desc', filter: true, width: 150 },
        { headerName: 'Holiday Name', field: 'hld_desc', filter: true, width: 150 },
        { headerName: 'Holiday Date', field: 'hld_date', filter: true, width: 150 },
        { headerName: 'Year', field: 'hld_year', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { hld_slno, lvetype_slno, hld_desc, hld_date, hld_year, hld_status } = params.data
        const frmData = {
            calendar_leave: hld_desc,
            status: hld_status === 1 ? true : false
        }
        setleavetype(lvetype_slno)
        setValue(format(new Date(hld_date), "yyyy-MM-dd"))
        setformData(frmData)
        const dateholi = new Date(hld_year, 6, 2)
        setYear(format(new Date(dateholi), "yyyy-MM-dd"))
        setSlno(hld_slno)
    }, [])

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <MasterLayout title={"Yearly Leave Calendar"} displayClose={true}>
                <Box sx={{ width: "100%" }} >
                    <Paper variant='outlined' square sx={{ width: '100%', display: 'flex', py: 2, px: 0.5 }} >
                        <Box sx={{ flex: 1, px: 0.2 }}>
                            <LeaveTypeSelect value={leavetype} setValue={setleavetype} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={["day", "month", "year"]}
                                    minDate={startOfYear(new Date())}
                                    maxDate={lastDayOfYear(new Date())}
                                    value={holidaydate}
                                    size="small"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input
                                                    placeholder="Holiday Date"
                                                    ref={inputRef}
                                                    {...inputProps} style={{ width: '100%' }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ flex: 1, ml: 1, px: 0.2 }}>
                            <InputComponent
                                placeholder={'Calendar Leave Name'}
                                type="text"
                                size="sm"
                                name="calendar_leave"
                                value={calendar_leave}
                                onchange={(e) => updateYearlyLeaveCalendar(e)}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={["year"]}
                                    minDate={new Date()}
                                    value={year}
                                    size="small"
                                    onChange={(newValue) => {
                                        setYear(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input
                                                    placeholder="Year"
                                                    ref={inputRef}
                                                    {...inputProps} style={{ width: '100%' }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mt: 1, ml: 2 }}>
                            <JoyCheckbox
                                label='Status'
                                checked={status}
                                name="status"
                                onchange={(e) => updateYearlyLeaveCalendar(e)}
                            />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <CssVarsProvider>
                                <Button aria-label="Like" variant="outlined" color="primary" onClick={submitFormData} sx={{
                                    color: '#90caf9'
                                }} >
                                    <SaveIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: 400,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Paper>
                </Box>
            </MasterLayout>
        </Fragment>
    )
}

export default memo(YearlyLeaveCalendarMast)
