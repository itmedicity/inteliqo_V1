import React, { memo, useCallback, useEffect, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, IconButton, Paper } from '@mui/material'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Checkbox, CssVarsProvider, Input, Table, Textarea, Tooltip, Typography } from '@mui/joy';
import { addDays, differenceInCalendarDays, eachDayOfInterval, endOfMonth, format, lastDayOfMonth, startOfMonth } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from './DeleteModal';

const ManualRequestMain = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [dept, changeDept] = useState(0)
    const [deptsection, changeSection] = useState(0)
    const [emply, getEmployee] = useState({});
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [table, setTable] = useState([]);
    const [remrk, setRemark] = useState('')
    const [tableData, setTableData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [punchMastdata, setPunchMastdata] = useState({})
    const [count, setCount] = useState(0)

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0])
    const { em_id } = empData;

    const getEmpdata = useCallback(async () => {
        //dataes difference count for checking the the duyt plan is done or not
        const dateDiffrence = eachDayOfInterval({
            start: new Date(fromDate),
            end: new Date(toDate)
        })
        const postData = {
            fromDate: format(new Date(fromDate), 'yyyy-MM-dd'),
            toDate: format(new Date(toDate), 'yyyy-MM-dd'),
            emno: emply?.em_no
        }
        //dataes difference count for checking the the duyt plan is done or not
        const differenceCountFromToDate = differenceInCalendarDays(
            new Date(toDate),
            new Date(fromDate)
        ) + 1
        //CHECKING FOR PUNCH MARKING HR -> YES/NO
        const checkDutyPlan = await axioslogin.post('/plan/checkDutyPlanExcistNew', postData);
        const { success, dta } = checkDutyPlan.data;

        if (success === 1 && dta.plan === differenceCountFromToDate) {
            //DUTY PLAN IS PLANNED FOR THE SELECTED DATE

            //FOR LISTING THE SELECTED DATE IN THE SCREEN
            const modifiedTable = dateDiffrence?.map((e) => {
                return {
                    date: e,
                }
            })
            // setTable(modifiedTable)
            const postdata = {
                empno: emply?.em_no,
                fromdate: format(new Date(fromDate), 'yyyy-MM-dd'),
                todate: format(new Date(toDate), 'yyyy-MM-dd')
            }
            const result = await axioslogin.post(`/ReligionReport/punchReportmaster`, postdata)
            const { success, data: punchMasteData } = result.data
            if (success === 1) {
                const arr = punchMasteData?.map((val) => {
                    const a = modifiedTable?.find((e) => format(new Date(e.date), 'yyyy-MM-dd') === val.duty_day)
                    let shiftIn = `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_in), 'HH:mm')}`;
                    let shiftOut = val.shft_cross_day === 0 ? `${format(new Date(val.duty_day), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm')}` :
                        `${format(addDays(new Date(val.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(val.shift_out), 'HH:mm')}`;
                    return {
                        ...val,
                        datenew: a?.date ?? null,
                        selected: 0,
                        punch_in: shiftIn,
                        punch_out: shiftOut
                    }
                })
                setTable(arr)
            }
            else {
                warningNofity('Error while getting Punch Master data, Contact IT')
                return
            }
        } else {
            warningNofity('Duty Plan Not planned ')
            return
        }
    }, [toDate, fromDate, emply])

    const submitData = useCallback(async () => {
        const filterArray = table?.filter(val => val.selected === 1)?.map((val) => {
            return {
                ...val,
                duty_desc: 'P',
                lvereq_desc: 'P',
                remrk: remrk,
                create_user: em_id
            }
        })
        if (remrk === '') {
            warningNofity("Please Add any Reason!")
        } else {
            const monthStartDate = format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
            const postData = {
                month: monthStartDate,
                section: deptsection
            }

            const checkPunchMarkingHr = await axioslogin.post("/attendCal/checkPunchMarkingHR/", postData);
            const { success, data } = checkPunchMarkingHr.data
            if (success === 0 || success === 1) {
                const lastUpdateDate = data?.length === 0 ? format(startOfMonth(new Date(fromDate)), 'yyyy-MM-dd') : format(new Date(data[0]?.last_update_date), 'yyyy-MM-dd')
                const lastDay_month = format(lastDayOfMonth(new Date(fromDate)), 'yyyy-MM-dd')
                if ((lastUpdateDate === lastDay_month) || (lastUpdateDate > lastDay_month)) {
                    warningNofity("Punch Marking Monthly Process Done !! Can't Cancel Miss Punch Request  ")
                    setTable([])
                } else {
                    const result = await axioslogin.post("/attendCal/updateManualRequest", filterArray);
                    const { success } = result.data;
                    if (success === 1) {
                        setTable([])
                        setRemark('')
                        succesNofity("Data saved successfully")
                    } else {
                        setTable([])
                        setRemark('')
                        warningNofity("Error while saving data, Please contact IT")
                    }
                }
            } else {
                errorNofity("Error getting PunchMarkingHR ")
            }
        }

    }, [table, remrk, em_id, setRemark, deptsection, fromDate])

    const getArray = useCallback(async (e, val) => {
        let ar = table?.map((e) => e.duty_day === val.duty_day ? { ...e, selected: 1 } : { ...e })
        setTable([...ar])
    }, [table])

    const handleFileChange = useCallback(() => {

    }, [])


    useEffect(() => {
        const getManuladata = async () => {
            const result = await axioslogin.get('/attendCal/getAllManualrequest');
            const { success, data } = result.data;
            if (success === 1) {
                const arr = data?.map((val) => {
                    return {
                        ...val,
                        manual_request_date: format(new Date(val.manual_request_date), 'dd-MM-yyyy'),
                        duty_date: format(new Date(val.duty_date), 'dd-MM-yyyy'),
                    }
                })
                setTableData(arr)

            } else {
                setTableData([])
            }
        }

        getManuladata()

    }, [count])

    const [column] = useState([
        { headerName: 'Emp ID ', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', filter: true },
        { headerName: 'Duty Date', field: 'duty_date', filter: true },
        { headerName: 'Request Date', field: 'manual_request_date', filter: true },
        { headerName: 'Leave Desc', field: 'lvereq_desc', filter: true },
        { headerName: 'Duty Desc ', field: 'duty_desc', },
        {
            headerName: 'Action',
            cellRenderer: params =>

                <Tooltip title="Delete" followCursor placement='top' arrow >
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => deleteRequest(params)}
                    >
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Tooltip>
        },
    ])

    const deleteRequest = useCallback((params) => {
        const data = params.data
        setModalOpen(true)
        setPunchMastdata(data)
    }, [])

    return (
        <CustomLayout title="Manual Request" displayClose={true} >
            <DeleteModal open={modalOpen} setOpen={setModalOpen} punchMastdata={punchMastdata} setCount={setCount} />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ mt: 1, ml: 0.5, display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', flexWrap: "wrap", gap: 0.5 }} >
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentDropRedx getDept={changeDept} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentSectionRedx getSection={changeSection} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <SectionBsdEmployee getEmploy={getEmployee} />
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                            <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >From Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    // minDate={new Date()}
                                    inputFormat="dd-MM-yyyy"
                                    value={fromDate}
                                    size="small"
                                    onChange={(newValue) => setFromDate(newValue)}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' variant='outlined' />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                            <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >To Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    inputFormat="dd-MM-yyyy"
                                    minDate={new Date(fromDate)}
                                    maxDate={endOfMonth(new Date(fromDate))}
                                    value={toDate}
                                    size="small"
                                    onChange={(newValue) => setToDate(newValue)}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{
                            display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                            justifyContent: 'flex-start', pl: 0.5,
                        }} >
                            <Tooltip title="Save" followCursor placement='top' arrow >
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={getEmpdata}
                                    fullWidth
                                    startDecorator={<SearchIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Search
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Box sx={{}}>
                        <Paper variant="outlined"
                            sx={{
                                maxHeight: screenInnerHeight * 40 / 100, p: 1, m: 0.3, overflow: 'auto',

                            }} >
                            <Table
                                aria-label="basic table"
                                // borderAxis="xBetween"
                                color="neutral"
                                size="sm"
                                variant="plain"
                            >
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%', textAlign: 'center', }}>Selected Date</th>
                                        <th style={{ textAlign: 'center', }}>Shift Desc</th>
                                        <th style={{ textAlign: 'center', }}>Leave Desc</th>
                                        <th style={{ textAlign: 'center', }}>Duty Desc</th>
                                        <th style={{ textAlign: 'center', }}>Action</th>
                                        <th style={{ textAlign: 'center', }}></th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        table && table?.map((val, idx) =>
                                            <tr key={idx} style={{ p: 0, m: 0 }} >
                                                <td style={{ textAlign: 'center', }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 0 }} >
                                                        <Box>
                                                            <Typography
                                                                level="title-md"
                                                                textColor="var(--joy-palette-success-plainColor)"
                                                                fontFamily="monospace"
                                                                sx={{ opacity: '80%' }}
                                                            >
                                                                {format(val.datenew, 'dd-MMMM')}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Typography
                                                                level="title-md"
                                                                textColor="var(--joy-palette-success-plainColor)"
                                                                fontFamily="monospace"
                                                                sx={{ opacity: '50%' }}
                                                            >
                                                                {format(val.datenew, 'eee')}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        level="title-md"
                                                        textColor="var(--joy-palette-success-plainColor)"
                                                        fontFamily="monospace"
                                                        sx={{ opacity: '50%' }}
                                                    >
                                                        {val.lvereq_desc}
                                                    </Typography>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        level="title-md"
                                                        textColor="var(--joy-palette-success-plainColor)"
                                                        fontFamily="monospace"
                                                        sx={{ opacity: '50%' }}
                                                    >
                                                        {val.duty_desc}
                                                    </Typography>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        level="title-md"
                                                        textColor="var(--joy-palette-success-plainColor)"
                                                        fontFamily="monospace"
                                                        sx={{ opacity: '50%' }}
                                                    >
                                                        {val.shft_desc}
                                                    </Typography>
                                                </td>
                                                <td style={{ textAlign: 'center', }}>
                                                    <Box>
                                                        <Checkbox
                                                            checked={val.selected === 1 ? true : false}
                                                            disabled={val.duty_desc !== 'A' ? true : false}
                                                            onChange={(e) => {
                                                                getArray(e, val)
                                                            }}
                                                        />
                                                    </Box>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        level="title-md"
                                                        textColor={val.duty_desc !== 'A' ? 'red' : 'success.100'}
                                                        fontFamily="monospace"
                                                        sx={{ opacity: '50%' }}
                                                    >
                                                        {val.duty_desc !== 'A' ? 'Description is not Absent' : null}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Paper>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, p: 1, flexWrap: "wrap", gap: 0.5 }}>
                        <Box sx={{ display: 'flex', flex: 3 }} >
                            <Textarea
                                label="Outlined"
                                placeholder="Reason"
                                variant="outlined"
                                color="warning"
                                size="md"
                                minRows={1}
                                maxRows={2}
                                name='remrk'
                                value={remrk}
                                onChange={(e) => setRemark(e.target.value)}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <Tooltip title="Upload Documents" variant="outlined" placement="top">
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="lg"
                                        color="danger"
                                    >
                                        <UploadFileIcon />
                                        <input
                                            //hidden 
                                            id="file-input"
                                            accept=".jpg, .jpeg, .png, .pdf"
                                            style={{ display: 'none' }}
                                            multiple
                                            type="file"
                                            name="file"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: 'flex', }} >
                            <CssVarsProvider>
                                <Tooltip title="Click Here to Save  Request" followCursor placement='top' arrow variant='outlined' color='danger' >
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="success"
                                        onClick={submitData}
                                        size='md'
                                        endDecorator={<Box>Save Request</Box>}
                                    >
                                        <SaveIcon fontSize='large' />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>

                <Paper square sx={{ px: 1, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={column}
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
        </CustomLayout >
    )
}

export default memo(ManualRequestMain) 