import React, { Fragment, memo, useMemo } from 'react'
import { useCallback } from 'react';
import { Typography, Box, Modal, ModalDialog, Sheet, Table } from '@mui/joy';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import ModalClose from '@mui/joy/ModalClose';
import { Paper } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Tooltip } from '@mui/material';
import { Button, Checkbox, CssVarsProvider, Input, } from '@mui/joy';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch, useSelector } from 'react-redux'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ViewNEditPage from '../../InductionTraining/ViewNEditPage';
import AddInductionTopics from '../../InductionTraining/AddInductionTopics';
import { getJoineesData } from './TnDFunctions';
import { axioslogin } from 'src/views/Axios/Axios';

const PendingNReschedule = ({ openmodal, setopenmodal }) => {

    const dispatch = useDispatch()

    const [dept, setDept] = useState(0)
    const [fromdate, Setfromdate] = useState(new Date())
    const [todate, Settodate] = useState(new Date())
    const [tabledata, setTableData] = useState([])
    const [empselect, SetEmpSelect] = useState([])
    const [type, setType] = useState(0)
    const [checkAll, SetCheckAll] = useState(false)
    const [datas, setdatas] = useState([])
    const [open, setOpen] = useState(false)
    const [count, setcount] = useState(0)
    const [viewModal, setviewModal] = useState(false)
    const [msg, setmsg] = useState(0)

    const reset = useCallback(() => {
        setDept(0)
        Setfromdate('')
        Settodate('')
        SetEmpSelect([])
        setType(0)
        setdatas([])
        SetCheckAll(false)
        setTableData([])
        setmsg(0)
        setopenmodal(false)
    }, [setDept, Setfromdate, Settodate, SetEmpSelect, setType, setdatas, SetCheckAll, setTableData, setmsg, setopenmodal])

    useEffect(() => {
        dispatch(setDepartment());
        updateEmpSelect(datas);
    }, [dispatch, datas])

    const newjoineesData = useSelector((state) => getJoineesData(state))
    const newjoinees = useMemo(() => newjoineesData, [newjoineesData])

    const HandleCheckbox = useCallback((e, row) => {
        let arr = datas?.map((item) => item.em_id === row.em_id ? { ...item, "em_no": item.em_no, "datefmt": item.datefmt, "em_name": item.em_name, "sect_name": item.sect_name, "desg_name": item.desg_name, inValue: e } : item)
        setdatas([...arr]);
    }, [datas])

    const updateEmpSelect = (datas) => {
        const filterarray = datas?.filter((val) => val.inValue === true);
        SetEmpSelect(filterarray);
    };

    const SearchBtn = useCallback(async () => {
        const obj = {
            fromdate: moment(fromdate).format("YYYY-MM-DD HH:mm:ss"),
            todate: moment(todate).format("YYYY-MM-DD HH:mm:ss"),
            dept: dept
        }
        if (dept !== 0) {
            const result = await axioslogin.post(`/InductionTraining/getDeptWiseEmployee/List`, obj)
            const { data, success } = result.data
            if (success === 2) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
        else {
            const result = await axioslogin.post(`/InductionTraining/getEmps`, obj)
            const { data, success } = result.data
            if (success === 2) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
    }, [fromdate, dept, todate]);

    const NextModal = useCallback(() => {
        if (fromdate !== '' && todate !== '' && empselect.length !== 0) {
            setOpen(true)
        }
        else {
            setopenmodal(false)
            warningNofity("Select Date Range and Candidates")
        }
    }, [setOpen, setopenmodal, fromdate, empselect, todate])

    //open view and edit page
    const ViewAndEdit = useCallback(() => {
        setviewModal(true)
    }, [setviewModal])

    const Handleclose = useCallback((e) => {
        setopenmodal(false)
    }, [setopenmodal])

    useEffect(() => {
        if (tabledata.length !== 0 && checkAll === false) {
            const mapArry = tabledata?.map((item) => {
                const obj = {
                    em_no: item.em_no,
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
                    em_no: item.em_no,
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

    return (
        <Fragment>
            {viewModal === true ? <ViewNEditPage setopenmodal={setopenmodal} setviewModal={setviewModal} viewModal={viewModal} count={count} setcount={setcount} />
                : <Box>
                    {open === true ? <AddInductionTopics newjoinees={newjoinees} open={open} empselect={empselect} setOpen={setOpen}
                        type={type} setType={setType} reset={reset} count={count} setcount={setcount} msg={msg} setmsg={setmsg}
                    /> :
                        <Modal
                            aria-labelledby="modal-title"
                            aria-describedby="modal-desc"
                            open={openmodal}
                            onClose={Handleclose}
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <ModalDialog size="lg"  >
                                <ModalClose
                                    variant="outlined"
                                    sx={{
                                        top: 'calc(-1/4 * var(--IconButton-size))',
                                        right: 'calc(-1/4 * var(--IconButton-size))',
                                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                        borderRadius: '50%',
                                        bgcolor: 'background.body',
                                    }}
                                />
                                <Box sx={{ p: 1 }}>
                                    <Paper elevation={0} sx={{ p: 1 }}>
                                        <Typography
                                            fontSize="xl2"
                                            lineHeight={1}
                                            startDecorator={
                                                <PendingActionsIcon sx={{ color: 'green' }}
                                                />
                                            }
                                            sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                                        >
                                            Pending & Schedule
                                        </Typography>
                                        <Paper elevation={0} sx={{ backgroundColor: "#EEEEEE", p: 2, mt: 1 }}>
                                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1, p: 0.3, flexWrap: "wrap" }}>
                                                <Box sx={{ flex: 1, mt: 1, display: "flex", flexDirection: "row", gap: 0.5 }} >
                                                    <Typography sx={{ mt: 1 }}>From:</Typography>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        < DatePicker
                                                            views={['day']}
                                                            value={fromdate}
                                                            size="small"
                                                            inputFormat="dd-MM-yyyy"
                                                            onChange={(e) => {
                                                                Setfromdate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                                                            }}
                                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                                    <CssVarsProvider>
                                                                        <Input ref={inputRef} {...inputProps} disabled={true} />
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
                                                            size="small"
                                                            inputFormat="dd-MM-yyyy"
                                                            onChange={(e) => {
                                                                Settodate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                                                            }}
                                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                                    <CssVarsProvider>
                                                                        <Input ref={inputRef} {...inputProps} disabled={true} />
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
                                                <Tooltip title="Add More">
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-start',
                                                    }} >
                                                        <CssVarsProvider>
                                                            <Box sx={{ mt: 1 }} >
                                                                <Button aria-label="next"
                                                                    onClick={NextModal}
                                                                >
                                                                    <AddCircleOutlineIcon />
                                                                </Button>
                                                            </Box>
                                                        </CssVarsProvider>
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Paper>
                                        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                                            <Box sx={{ p: 1, mt: 1 }}>
                                                <JoyCheckbox
                                                    label="Select All"
                                                    checked={checkAll}
                                                    onchange={(e) => SetCheckAll(e.target.checked)}
                                                    name="check_all"
                                                />
                                            </Box>
                                            <Tooltip title="View & Edit">
                                                <Box sx={{ p: 1, mt: 1 }}>
                                                    <Box sx={{}} >
                                                        <Button aria-label="View & Edit" variant='outlined'
                                                            onClick={ViewAndEdit}
                                                        >
                                                            <EditIcon />
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Tooltip>
                                        </Box>
                                        {datas?.length !== 0 ?
                                            <Sheet sx={{
                                                mt: 3,
                                                overflow: 'auto',
                                                '::-webkit-scrollbar': { display: "none" }, height: 300,
                                                width: "100%"
                                            }}>
                                                <CssVarsProvider>
                                                    <Table borderAxis="both" stickyHeader >
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "8%", textAlign: "center" }}>
                                                                    check
                                                                </th>
                                                                <th style={{ width: "10%" }}>Emp Id</th>
                                                                <th>Joining Date</th>
                                                                <th>Name</th>
                                                                <th>Department Section</th>
                                                                <th>Designation</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {datas?.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <Checkbox
                                                                            name="Emp Select"
                                                                            checked={row?.inValue || false}
                                                                            onChange={(e) => {
                                                                                HandleCheckbox(e.target.checked, row)
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td style={{ width: "10%" }}>{row?.em_no}</td>
                                                                    <td>{row?.datefmt}</td>
                                                                    <td>{row?.em_name}</td>
                                                                    <td>{row?.sect_name}</td>
                                                                    <td>{row?.desg_name}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </CssVarsProvider>
                                            </Sheet>
                                            : null}
                                    </Paper>
                                </Box>
                            </ModalDialog>
                        </Modal>
                    }
                </Box>
            }
        </Fragment>
    )
}

export default memo(PendingNReschedule) 
