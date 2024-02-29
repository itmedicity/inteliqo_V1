import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { screenInnerHeight } from 'src/views/Constant/Constant'
import React, { Fragment, useState, useCallback, memo, useEffect } from 'react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Paper, Tooltip, Typography } from '@mui/material';
import { Box, Button, Checkbox, CssVarsProvider, Sheet, Table, } from '@mui/joy';
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch, useSelector } from 'react-redux'
import { InductionNewJoinees } from 'src/redux/actions/Training.Action'
import _ from 'underscore'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddInductionTopics from './AddInductionTopics'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ViewNEditPage from './ViewNEditPage'

const InductionTrainingMainPage = () => {

    const dispatch = useDispatch()

    const [dept, setDept] = useState(0)
    const [fromdate, Setfromdate] = useState('')
    const [todate, Settodate] = useState('')
    const [tabledata, setTableData] = useState([])
    const [empselect, SetEmpSelect] = useState([])
    const [type, setType] = useState(0)
    const [checkAll, SetCheckAll] = useState(false)
    const [datas, setdatas] = useState([])
    const [open, setOpen] = useState(false)
    const [count, setcount] = useState(0)
    const [viewModal, setviewModal] = useState(false)


    const reset = useCallback(() => {
        setDept(0)
        Setfromdate('')
        Settodate('')
        SetEmpSelect([])
        setType(0)
        setdatas([])
        SetCheckAll(false)
        setTableData([])
    }, [setDept, Setfromdate, Settodate, SetEmpSelect, setType, setdatas, SetCheckAll, setTableData])

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

    const newjoinees = useSelector((state) => state?.gettrainingData?.NewJoinees?.NewJoineesList, _.isEqual);

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

    useEffect(() => {
        const filterarray = datas?.filter((val) => {
            return val.inValue === true
        })
        SetEmpSelect(filterarray);
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

    const NextModal = useCallback(() => {
        if (fromdate !== '' && todate !== '') {
            setOpen(true)
        }
        else {
            warningNofity("Please Enter From & To date")
        }
    }, [setOpen, fromdate, todate])

    //open view and edit page
    const ViewAndEdit = useCallback(() => {
        setviewModal(true)
    }, [setviewModal])

    return (
        <Fragment>
            {viewModal === true ? <ViewNEditPage setviewModal={setviewModal} viewModal={viewModal} count={count} setcount={setcount} />
                : <Box>
                    {open === true ? <AddInductionTopics newjoinees={newjoinees} open={open} empselect={empselect} setOpen={setOpen}
                        type={type} setType={setType} reset={reset} count={count} setcount={setcount}
                    /> :
                        <CustomLayout title="Induction Training" displayClose={true}>
                            <Box varient="outlined" sx={{ p: 1, width: "100%", height: screenInnerHeight - 120 }}>
                                <Paper varient="outlined" sx={{ backgroundColor: "#EEEEEE", p: 2 }}>
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, p: 0.3 }}>
                                        <Box sx={{ flex: 1, mt: 1, display: "flex", flexDirection: "row", gap: 0.5 }} >
                                            <Typography sx={{ mt: 1 }}>From:</Typography>
                                            <InputComponent
                                                type="date"
                                                size="sm"
                                                placeholder="From Date"
                                                name="Fromdate"
                                                value={fromdate}
                                                onchange={(e) => Setfromdate(e.target.value)}
                                            />
                                        </Box>
                                        <Box sx={{ flex: 1, mt: 1, display: "flex", flexDirection: "row", gap: 0.5 }} >
                                            <Typography sx={{ mt: 1 }}>To:</Typography>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <InputComponent
                                                    type="date"
                                                    size="xs"
                                                    placeholder="ToDate"
                                                    name="Todate"
                                                    value={todate}
                                                    onchange={(e) => Settodate(e.target.value)}
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
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
                                            <Box sx={{ mt: 1 }} >
                                                <Button aria-label="View & Edit" variant='outlined'
                                                    onClick={ViewAndEdit}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Paper variant="outlined">
                                    <Sheet sx={{
                                        mt: 3,
                                        overflow: 'auto',
                                        '::-webkit-scrollbar': { display: "none" }, height: 450,
                                        width: "100%"
                                    }}>
                                        <CssVarsProvider>
                                            <Table borderAxis="both" stickyHeader >
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "8%", textAlign: "center" }}>
                                                            check
                                                        </th>
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
                                </Paper>
                            </Box>
                        </CustomLayout>
                    }
                </Box>}
        </Fragment >
    )
}

export default memo(InductionTrainingMainPage)
