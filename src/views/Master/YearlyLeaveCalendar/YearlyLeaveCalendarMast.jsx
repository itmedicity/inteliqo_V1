import { Fragment, memo, useCallback, useEffect, useMemo, useState } from "react"
import React from 'react'
import LeaveTypeSelect from 'src/views/CommonCode/LeaveTypeSelect'
import SessionCheck from "src/views/Axios/SessionCheck"
import { ToastContainer } from "react-toastify"
import { succesNofity, warningNofity } from "src/views/CommonCode/Commonfunc"
import { axioslogin } from "src/views/Axios/Axios"
import { employeeIdNumber } from "src/views/Constant/Constant"
import { format, isAfter, startOfYear } from "date-fns"
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import MasterLayout from "../MasterComponents/MasterLayout"
import { Box, Button, CssVarsProvider, Input, Option, Select } from "@mui/joy"
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
    const [leavetype, setleavetype] = useState(0)
    const [gtype, setType] = useState(0)


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
            hld_date: format(new Date(holidaydate), "yyyy-MM-dd"),
            hld_year: format(new Date(holidaydate), "yyyy"),
            hld_status: status === false ? 0 : 1,
            special_type: gtype,
            create_user: employeeIdNumber()
        }
    }, [leavetype, calendar_leave, status, holidaydate, gtype])

    const updatedata = useMemo(() => {
        return {
            hld_desc: calendar_leave,
            hld_year: format(new Date(holidaydate), "yyyy"),
            hld_status: status === true ? 1 : 0,
            hld_date: format(new Date(holidaydate), "yyyy-MM-dd"),
            lvetype_slno: leavetype,
            edit_user: employeeIdNumber(),
            special_type: gtype,
            hld_slno: slno
        }
    }, [leavetype, calendar_leave, status, holidaydate, slno, gtype])

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
                    setleavetype(0);
                    succesNofity(message)
                    setFlag(0)
                    setType(0)
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
                setType(0)
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
                const arr = data?.map((val) => {
                    return {
                        ...val,
                        typename: val.special_type === 1 ? "General" : val.special_type === 2 ? "Accademic" : val.special_type === 3 ? "Both" : "NIL"
                    }
                }
                )
                setTableData(arr)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getTableData()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'hld_slno', minWidth: 100 },
        { headerName: 'Leave Type', field: 'lvetype_desc', filter: true, minWidth: 250 },
        { headerName: 'Holiday Name', field: 'hld_desc', filter: true, minWidth: 250 },
        { headerName: 'Holiday Date', field: 'hld_date', filter: true, minWidth: 150 },
        { headerName: 'Year', field: 'hld_year', filter: true, minWidth: 100 },
        { headerName: 'Type', field: 'typename', filter: true, minWidth: 150 },
        { headerName: 'Status ', field: 'status', minWidth: 100 },
        {
            headerName: 'Edit', minWidth: 100, cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        console.log(params.data);

        const { hld_slno, lvetype_slno, hld_desc, hld_date, hld_status, special_type } = params.data
        const frmData = {
            calendar_leave: hld_desc,
            status: hld_status === 1 ? true : false
        }
        setleavetype(lvetype_slno)
        setValue(format(new Date(hld_date), "yyyy-MM-dd"))
        setformData(frmData)
        setSlno(hld_slno)
        setType(special_type)
    }, [])

    const type = [
        { slno: 1, name: "General" },
        { slno: 2, name: "Accademic" },
        { slno: 3, name: 'Both' }
    ]

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
                                    // maxDate={lastDayOfYear(new Date())}
                                    inputFormat='dd-MM-yyyy'
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
                            <Select
                                value={gtype}
                                onChange={(event, newValue) => {
                                    setType(newValue);
                                }}
                                size='md'
                                variant='outlined'
                            >
                                <Option disabled value={0}> Select Staff Type </Option>
                                {
                                    type?.map((val, index) => {
                                        return <Option key={index} value={val.slno}>{val.name}</Option>
                                    })
                                }
                            </Select>
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
