import { Box, Button, Input, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { memo, useCallback, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { setDepartment } from 'src/redux/actions/Department.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { eachMonthOfInterval, format, isSameMonth, } from 'date-fns'
import ReportLayout from '../ReportComponent/ReportLayout'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { useDispatch } from 'react-redux'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'

const IndividualAttendance = () => {

    const [fromdate, Setfromdate] = useState(new Date());
    const [todate, Settodate] = useState(new Date());
    const [Empno, setEmpNo] = useState(0)
    const [openBkDrop, setOpenBkDrop] = useState(false)
    const [tableData, setTableData] = useState([])
    const [empdata, setEmpdata] = useState({})

    const getEmpdata = useCallback(async () => {

        if (Empno === 0) {
            warningNofity("Enter Employee Id")
        } else {
            const result = await axioslogin.get(`/empmast/databyempno/getemid/${parseInt(Empno)}`)
            const { data, success } = result.data
            if (success === 1) {
                setEmpdata(data[0])
                setOpenBkDrop(true)
                const getPunchMast_PostData = {
                    fromDate_punchMaster: format(new Date(fromdate), 'yyyy-MM-dd'),
                    toDate_punchMaster: format(new Date(todate), 'yyyy-MM-dd '),
                    empList: [Empno],
                }
                const punch_master_data = await axioslogin.post("/attendCal/getPunchMasterDataSectionWise/", getPunchMast_PostData); //GET PUNCH MASTER DATA
                const { success, planData: punchMasterData } = punch_master_data.data;
                if (success === 1) {
                    const result = eachMonthOfInterval({
                        start: new Date(fromdate),
                        end: new Date(todate)
                    })
                    const monthArray = result?.map((val) => {
                        const cl = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val)) && k.duty_desc === 'CL')
                        const sl = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val)) && k.duty_desc === 'SL')
                        const el = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val)) && k.duty_desc === 'EL')
                        const total = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val))
                            && (k.duty_desc === 'EL' || k.duty_desc === 'CL' || k.duty_desc === 'SL'))

                        const lwp = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val)) && k.duty_desc === 'LWP')
                        const countA = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val)) && k.duty_desc === 'A')
                        const coff = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val)) && k.duty_desc === 'COFF')
                        const woff = punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val)) && k.duty_desc === 'WOFF')

                        return {
                            ...val,
                            "month": format(new Date(val), 'MMMM'),
                            "days": punchMasterData?.filter((k) => isSameMonth(new Date(k.duty_day), new Date(val))),
                            countSL: sl.length,
                            countCL: cl.length,
                            countEL: el.length,
                            totalLV: total.length,
                            countLOP: lwp?.length,
                            countA: countA?.length,
                            countcoff: coff?.length,
                            countwoff: woff?.length
                        }
                    })
                    setTableData(monthArray)
                    setOpenBkDrop(false)
                } else {
                    warningNofity("Error While Getting PunchMast Data, Contct IT")
                    setOpenBkDrop(false)
                }
            } else {
                warningNofity("No Employee Exist In The Employee Number")
            }


        }

    }, [fromdate, todate, Empno])

    const [column] = useState([
        { headerName: 'Month', field: 'month', minWidth: 300 },
        { headerName: 'SL', field: 'countSL' },
        { headerName: 'CL', field: 'countCL' },
        { headerName: 'EL', field: 'countEL' },
        { headerName: 'LOP', field: 'countLOP' },
        { headerName: 'A', field: 'countA' },
        { headerName: 'COFF', field: 'countcoff' },
        { headerName: 'WOFF', field: 'countwoff' },
    ])
    return (
        <ReportLayout title="Individual Attendance Report" data={tableData} displayClose={true} >
            <CustomBackDrop open={openBkDrop} text="Please wait !. " />
            <Box sx={{
                display: 'flex', flexDirection: 'column', flex: 1,
                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
            }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5, }}  >
                    <Box sx={{ px: 0.5, display: "flex", flexDirection: "row" }} >
                        <Typography sx={{ p: 1 }}>From:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                // disableFuture={true}
                                views={['day']}
                                value={fromdate}
                                maxDate={new Date()}
                                inputFormat='dd-MM-yyyy'
                                size="small"
                                onChange={(newValue) => Setfromdate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ px: 0.5, display: "flex", flexDirection: "row" }} >
                        <Typography sx={{ p: 1 }}>To:</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            < DatePicker
                                // disableFuture={true}
                                views={['day']}
                                value={todate}
                                inputFormat='dd-MM-yyyy'
                                maxDate={new Date()}
                                size="small"
                                onChange={(newValue) => Settodate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Tooltip title="Employee Number" followCursor placement='top' arrow>
                        <Box sx={{ mt: 0.5, px: 0.3, }}>
                            <InputComponent
                                type="number"
                                size="sm"
                                placeholder="Employee ID"
                                name="Empno"
                                value={Empno}
                                onchange={(e) => setEmpNo(e.target.value)}
                            />
                        </Box>
                    </Tooltip>
                    <Box sx={{
                        display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                        justifyContent: 'flex-start', pl: 0.5, mt: 0.5,
                        //bgcolor: 'lightblue'
                    }} >
                        <Tooltip title="Save" followCursor placement='top' arrow >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={getEmpdata}
                                fullWidth
                                startDecorator={<SearchIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Search
                            </Button>
                        </Tooltip>
                    </Box>
                </Paper>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5, }}  >
                    <Typography sx={{ p: 1 }}>Name :</Typography>
                    <Typography sx={{ p: 1 }}>{empdata?.em_name}</Typography>
                    <Typography sx={{ p: 1 }}>EMID :</Typography>
                    <Typography sx={{ p: 1 }}>{empdata?.em_no}</Typography>
                    <Typography sx={{ p: 1 }}>Section :</Typography>
                    <Typography sx={{ p: 1 }}>{empdata?.sect_name}</Typography>
                </Paper>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        p: 1, mt: 0.5,
                        display: 'flex',
                        backgroundColor: '#f0f3f5',
                        flexDirection: "column",
                    }} >
                    <CustomAgGridRptFormatOne
                        tableDataMain={tableData}
                        columnDefMain={column}
                    />
                </Paper>
            </Box>
        </ReportLayout>
    )
}

export default memo(IndividualAttendance) 