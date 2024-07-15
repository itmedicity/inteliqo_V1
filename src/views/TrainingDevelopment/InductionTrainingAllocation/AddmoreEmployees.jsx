import React, { useState, useCallback, memo, useEffect } from 'react'
import { Paper, Tooltip } from '@mui/material';
import { Box, Button, Checkbox, CssVarsProvider, Input, Sheet, Table, Typography } from '@mui/joy';
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch, useSelector } from 'react-redux'
import { InductionNewJoinees } from 'src/redux/actions/Training.Action'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment/moment'
import { axioslogin } from 'src/views/Axios/Axios'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import EventNoteIcon from '@mui/icons-material/EventNote';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';

const AddmoreEmployees = ({ SetCount, count, Scheduledata, schedule_slno, modalData, em_id, SetFlag }) => {
    const [fromdate, Setfromdate] = useState(new Date())
    const [todate, Settodate] = useState(new Date())
    const [datas, setdatas] = useState([])
    const [Em_ID, SetEm_ID] = useState('')
    const [msgBox, SetmsgBox] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if (fromdate !== '' && todate !== '') {
            const obj = {
                fromdate: moment(fromdate).format("YYYY-MM-DD HH:mm:ss"),
                todate: moment(todate).format("YYYY-MM-DD HH:mm:ss")
            }
            dispatch(InductionNewJoinees(obj))
        }
        dispatch(setDepartment());
    }, [dispatch, todate, fromdate])

    const newjoinees = useSelector((state) => state?.gettrainingData?.NewJoinees?.NewJoineesList);

    useEffect(() => {
        if (newjoinees?.length !== 0 && Scheduledata?.length !== 0) {
            const filterArr = newjoinees?.map((val) => {
                const fountArr = Scheduledata?.find((item) => item.indct_emp_no === val.em_id && item.schedule_no === schedule_slno);
                return {
                    ...val, inValue: false, schedule: fountArr?.induct_detail_date ?? 0
                }
            })
            setdatas(filterArr);
        } else if (newjoinees?.length !== 0 && Scheduledata?.length === 0) {
            const filterArr = newjoinees?.map((val) => {
                const obj = {
                    em_no: val.em_no,
                    em_name: val.em_name,
                    desg_name: val.desg_name,
                    inValue: false,
                    schedule: 0,

                }
                return {
                    ...val,
                    ...obj
                }
            })
            setdatas(filterArr);
        }
    }, [newjoinees, schedule_slno, Scheduledata]);

    const HandleCheckbox = useCallback((e, row) => {
        let arr = datas?.map((item) => item.em_id === row.em_id ? { ...item, "em_no": item.em_no, "em_name": item.em_name, "desg_name": item.desg_name, inValue: e } : item)
        setdatas([...arr]);
    }, [datas])

    const DataSubmit = useCallback(async () => {
        const filterarray = datas?.filter((val) => {
            return val.inValue === true
        })
        const arr = filterarray?.map((val) => {
            const obj = {
                insertId: schedule_slno,
                emp_id: val.em_id,
                date: moment(modalData?.induction_date).format('YYYY-MM-DD HH:ss:mm'),
                dept_id: val.dept_id,
                sect_id: val.sect_id,
                create_user: em_id,
            }
            return obj
        })
        const result = await axioslogin.post('/InductionTraining/addInductnEmps', arr)
        const { success } = result.data
        if (success === 1) {
            succesNofity("Employees AddedSuccessfully")
            SetCount(count + 1)
            SetFlag(0)
            Setfromdate('')
            Settodate('')
            setdatas([])
            SetEm_ID('')
        }
        else {
            SetFlag(0)
            warningNofity("Can't Add Employees at this moment")
            Setfromdate('')
            Settodate('')
            setdatas([])
            SetEm_ID('')
            SetCount(0)
        }
    }, [datas, SetCount, SetEm_ID, count, schedule_slno, modalData, SetFlag, em_id, Setfromdate, Settodate, setdatas])

    const ExitBtn = useCallback(() => {
        SetFlag(0)
        Setfromdate('')
        Settodate('')
        SetEm_ID('')
    }, [SetFlag, Setfromdate, SetEm_ID, Settodate])

    const CheckWithID = useCallback(() => {
        if (Em_ID.length < 3) {
            SetmsgBox(1)
            // infoNofity('Please enter a minimum of 3 digits to search Employee');
        } else {
            const getId = datas && datas.filter((item) => {
                return item.em_no.toString().includes(Em_ID);
            });
            SetmsgBox(2)
            setdatas(getId)
        }
    }, [datas, SetmsgBox, Em_ID]);

    return (

        <Paper sx={{ width: "60%", mx: "auto", mt: 5 }}>
            <Paper sx={{}}>
                <Box sx={{ backgroundColor: "#3C5B6F", p: 0.5 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Typography
                            level='h3'
                            lineHeight={1}
                            sx={{ display: 'flex', mt: 1, color: "white", textAlign: "center", justifyContent: "center" }}
                            startDecorator={<NoteAddIcon />}
                        >
                            Add New Employees
                        </Typography>
                        <Box>
                            <Tooltip title="Close">
                                <HighlightOffIcon onClick={ExitBtn} sx={{ color: "white", mt: 1 }} />
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{ p: 0.5, backgroundColor: "#EEF5FF", mt: 1, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Typography startDecorator={<LocalLibraryIcon sx={{ color: '#121481', level: 'h4' }} />}></Typography>
                            <Typography sx={{ fontSize: 18 }}>{modalData?.topic}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                            <Typography startDecorator={<EventNoteIcon sx={{ color: '#121481', level: 'h4' }} />}></Typography>
                            <Typography sx={{ fontSize: 18 }}>{moment(modalData?.induction_date).format('DD-MM-YYYY')}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, p: 1, flexWrap: "wrap" }}>
                        <Box sx={{ gap: 0.5 }} >
                            <Typography level='h5' style={{ color: "#116D6E" }}>From</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    views={['day']}
                                    value={fromdate}
                                    inputFormat="dd-MM-yyyy"
                                    size="small"
                                    onChange={(e) => {
                                        Setfromdate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: 300, color: "#9DB2BF" }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ gap: 0.5 }} >
                            <Typography level='h5' style={{ color: "#116D6E" }}>To</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    views={['day']}
                                    value={todate}
                                    inputFormat="dd-MM-yyyy"
                                    size="small"
                                    onChange={(e) => {
                                        Settodate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                                    }} renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: 300, color: "#9DB2BF" }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ mt: 3, display: "flex", flexDirection: "row" }} >
                            <Box>

                                <Input
                                    type='number'
                                    maxLength={8}
                                    placeholder='🧐 Seacrch with ID'
                                    value={Em_ID}
                                    onChange={(e) => { SetEm_ID(e.target.value) }}
                                />
                                {
                                    msgBox === 1 && msgBox !== 2 ?

                                        <Typography sx={{ fontSize: "sm", color: "#EE4E4E" }}>*Minimum 3 digits Required</Typography>
                                        : null
                                }
                            </Box>

                            <Box sx={{ mt: 0.5 }} onClick={CheckWithID}>
                                <SearchIcon />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: "end", mt: 3, p: 1 }} >
                        <Tooltip title="Save">
                            <Button aria-label="submit" variant="outlined"
                                onClick={DataSubmit}
                            >
                                SAVE
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>

                <Sheet sx={{
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: "none" }, height: 600,
                    width: "100%"
                }}>
                    <Table borderAxis="both" stickyHeader sx={{ p: 1, }} >
                        <thead>
                            <tr style={{ backgroundColor: "#4F709C" }}>
                                <th style={{ width: "8%", textAlign: "center", backgroundColor: "#3C5B6F", color: "white" }}>#</th>
                                <th style={{ width: "8%", textAlign: "center", backgroundColor: "#3C5B6F", color: "white" }}>
                                    CHECK
                                </th>
                                <th style={{ width: "8%", textAlign: "center", backgroundColor: "#3C5B6F", color: "white" }}>EMP ID</th>
                                <th style={{ width: "15%", textAlign: "center", backgroundColor: "#3C5B6F", color: "white" }}>DATE OF JOINING</th>
                                <th style={{ backgroundColor: "#3C5B6F", color: "white", textAlign: "center" }}>NAME</th>
                                <th style={{ backgroundColor: "#3C5B6F", color: "white", textAlign: "center" }}>DEPARTMENT SECTION</th>
                                <th style={{ backgroundColor: "#3C5B6F", color: "white", textAlign: "center" }}>DESIGNATION</th>
                            </tr>
                        </thead>
                        {/* {
                            datas.length !== 0 ? */}
                        <tbody>
                            {datas?.map((row, index) => (
                                <tr key={index}>
                                    <td style={{ width: "8%", textAlign: "center" }}>{index + 1}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Checkbox
                                            name="Emp Select"
                                            checked={row?.schedule === 0 ? row?.inValue : true}
                                            onChange={(e) => {
                                                HandleCheckbox(e.target.checked, row)
                                            }}
                                        />
                                    </td>
                                    <td style={{ width: "8%", textAlign: "center" }}>{row?.em_no}</td>
                                    <td style={{ width: "15%", textAlign: "center" }}>{moment(row?.joining_date).format("DD-MM-YYYY")}</td>
                                    <td>{row?.em_name}</td>
                                    <td>{row?.sect_name}</td>
                                    <td>{row?.desg_name}</td>
                                </tr>
                            ))}
                        </tbody>
                        {/* :
                                <Box sx={{ mt: 6, px: "auto" }}>
                                    <Typography>No Such Data</Typography>

                                </Box>
                        } */}
                    </Table>
                </Sheet>

            </Paper>
        </Paper >

    )
}

export default memo(AddmoreEmployees) 
