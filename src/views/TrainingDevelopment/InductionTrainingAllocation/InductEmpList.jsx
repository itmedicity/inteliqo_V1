import { Box, Modal, ModalClose, ModalDialog, Typography, Tooltip, Button, Checkbox, CssVarsProvider, Input, Sheet, Table, } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import { setDepartment } from 'src/redux/actions/Department.action'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { InductionNewJoinees } from 'src/redux/actions/Training.Action';
import { axioslogin } from 'src/views/Axios/Axios';


const InductEmpList = ({ setOpenEmplist, OpenEmplist, topicDetails, datefrmt, em_id }) => {

    const dispatch = useDispatch()

    const [dept, setDept] = useState(0)
    const [fromdate, Setfromdate] = useState(new Date())
    const [todate, Settodate] = useState(new Date())
    const [tabledata, setTableData] = useState([])
    const [checkAll, SetCheckAll] = useState(false)
    const [datas, setdatas] = useState([])


    const Handleclose = useCallback((e) => {
        setOpenEmplist(false)
    }, [setOpenEmplist])

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
        if (tabledata.length !== 0 && checkAll === false) {
            const mapArry = tabledata?.map((item) => {
                const obj = {
                    datefmt: moment(item.joining_date).format("YYYY-MM-DD"),
                    em_name: item.em_name,
                    sect_name: item.sect_name,
                    desg_name: item.desg_name,
                    "inValue": false
                }
                return {
                    ...item,
                    ...obj
                }
            })
            setdatas(mapArry)
        }
        //Select all emp
        else if (checkAll === true) {
            const mapArry = tabledata?.map((item) => {
                const obj = {
                    datefmt: moment(item.joining_date).format("YYYY-MM-DD"),
                    em_name: item.em_name,
                    sect_name: item.sect_name,
                    desg_name: item.desg_name,
                    "inValue": true
                }
                return {
                    ...item,
                    ...obj
                }
            })
            setdatas(mapArry)
        }
        else {
            setdatas([])
        }
    }, [checkAll, tabledata])


    const HandleCheckbox = useCallback((e, row) => {
        let arr = datas?.map((item) => item.em_id === row.em_id ? { ...item, "datefmt": item.datefmt, "em_name": item.em_name, "sect_name": item.sect_name, "desg_name": item.desg_name, inValue: e } : item)
        setdatas([...arr]);
    }, [datas])

    const SearchBtn = useCallback(() => {
        if (dept === 0 && fromdate === '' && todate === '') {
            warningNofity("Please Select FROM & TO dates For Searching")
        }
        else if (dept !== 0) {
            const deptwise = newjoinees?.filter((val) => val.dept_id === dept)
            setTableData(deptwise);
        }
        else if (dept === 0 || fromdate !== '' && todate !== '') {
            const datewise = newjoinees?.filter((val) => (moment(val.joining_date).format("YYYY-MM-DD") > fromdate && moment(val.joining_date).format("YYYY-MM-DD") < todate))
            setTableData(datewise);
        }
        else {
            setTableData([]);
        }
    }, [dept, setTableData, newjoinees, fromdate, todate])

    const DataSubmit = useCallback(async () => {
        const filterarray = datas?.filter((val) => {
            return val.inValue === true
        })
        const { trainers, topic_slno, type_slno } = topicDetails
        const scheduleData = {
            trainers: trainers,
            topic_slno: topic_slno,
            type_slno: type_slno,
            date: moment(new Date(datefrmt)).format('YYYY-MM-DD HH:ss:mm'),
            create_user: em_id
        }

        if (scheduleData.length !== 0) {
            const result = await axioslogin.post('/InductionTraining/ScheduleInduction', scheduleData)
            const { success, insertId } = result.data
            if (success === 1 && type_slno !== 0) {
                const arr = filterarray?.map((val) => {
                    const obj = {
                        insertId: insertId,
                        emp_id: val.em_id,
                        date: moment(new Date(datefrmt)).format('YYYY-MM-DD HH:ss:mm'),
                        dept_id: val.dept_id,
                        sect_id: val.sect_id,
                        create_user: em_id,
                        edit_user: em_id,
                        slno: val.master_slno,
                    }
                    return obj

                })
                const result = await axioslogin.post('/InductionTraining/addInductnEmps', arr)
                const { success } = result.data
                if (success === 1) {
                    setOpenEmplist(false)
                    succesNofity("Training Scheduled Successfully")

                }
                else {
                    warningNofity("Can't Schedule Training")
                }
            }
            else {
                setOpenEmplist(false)
                alert("Please Enter all the fields")
            }

        }
        else {
            setOpenEmplist(false)
            infoNofity("Select topics and dates")
        }

    }, [datas, em_id, topicDetails, datefrmt, setOpenEmplist])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={OpenEmplist}
            onClose={Handleclose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalDialog size="lg" sx={{ width: "70%" }}>
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '100%',
                        bgcolor: 'background.body',
                    }}
                />
                <Typography
                    fontSize="xl2"
                    lineHeight={1}
                    startDecorator={
                        <GroupsIcon sx={{ color: 'green' }} />
                    }
                    sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                >
                    Select Employees
                </Typography>
                {/* body starts */}
                <Paper variant='outlined' elevation={0}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, p: 0.3, flexWrap: "wrap" }}>
                        <Box sx={{ flex: 1, mt: 1, display: "flex", flexDirection: "row", gap: 0.5 }} >
                            <Typography sx={{ mt: 1 }}>From:</Typography>
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
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: 500 }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, display: "flex", flexDirection: "row", gap: 0.5 }} >
                            <Typography sx={{ mt: 1 }}>To:</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                < DatePicker
                                    views={['day']}
                                    value={todate}
                                    inputFormat="dd-MM-yyyy"
                                    size="small"
                                    onChange={(e) => {
                                        Settodate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                                    }} renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: 500 }} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ flex: 1, mt: 1, }} >
                            <JoyDepartment sx={{ p: 1 }} deptValue={dept} getDept={setDept} />
                        </Box>
                        <Tooltip title="Search">
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                mt: 1
                            }} >
                                <CssVarsProvider>
                                    <Box>
                                        <Button aria-label="search" variant='outlined'
                                            onClick={SearchBtn}
                                        >
                                            <SearchIcon />
                                        </Button>
                                    </Box>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Box sx={{ p: 1, mt: 1 }}>
                            <JoyCheckbox
                                label="Select All"
                                checked={checkAll}
                                onchange={(e) => SetCheckAll(e.target.checked)}
                                name="check_all"
                            />
                        </Box>
                        <Sheet sx={{
                            mt: 1,
                            overflowY: 'auto',
                            '::-webkit-scrollbar': { display: "none" }, height: 450,
                            width: "100%"
                        }}>
                            <Table borderAxis="both" stickyHeader >
                                <thead>
                                    <tr>
                                        <th style={{ width: "8%", textAlign: "center" }}>Sl.no</th>
                                        <th style={{ width: "8%", textAlign: "center" }}>
                                            check
                                        </th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Emp ID</th>
                                        <th style={{ width: "10%", textAlign: "center" }}>Joining Date</th>
                                        <th>Name</th>
                                        <th>Department Section</th>
                                        <th>Designation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datas?.map((row, index) => (
                                        <tr key={index}>
                                            <td style={{ width: "8%", textAlign: "center" }}>{index + 1}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <Checkbox
                                                    name="Emp Select"
                                                    checked={row?.inValue || false}
                                                    onChange={(e) => {
                                                        HandleCheckbox(e.target.checked, row)
                                                    }}
                                                />
                                            </td>
                                            <td style={{ width: "10%", textAlign: "center" }}>{row?.em_no}</td>
                                            <td style={{ width: "10%", textAlign: "center" }}>{row?.datefmt}</td>
                                            <td>{row?.em_name}</td>
                                            <td>{row?.sect_name}</td>
                                            <td>{row?.desg_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    </Box>

                </Paper>
                <Box sx={{ textAlign: "end" }} >
                    <Button aria-label="submit" variant="outlined"
                        onClick={DataSubmit}
                    >
                        SAVE
                    </Button>

                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(InductEmpList) 
