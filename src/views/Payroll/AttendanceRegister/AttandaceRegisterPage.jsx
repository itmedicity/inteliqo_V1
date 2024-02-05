import { Button, CssVarsProvider, Input, } from '@mui/joy'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { addMonths, startOfMonth } from 'date-fns'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useDispatch, useSelector } from 'react-redux';
import { getEarnDeduction } from 'src/redux/actions/EarnDeduction.Action';
import _ from 'underscore';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { MapFunction } from '../PayslipCalculation/PaySlipComponents/PayslipFunc';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';

const AttandaceRegisterPage = () => {
    const [value, setValue] = useState(moment(new Date()));
    const [dept, setDepartment] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [empArray, setEmpArray] = useState([])
    const [earningData, setEarningData] = useState([])
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => dispatch(getEarnDeduction()), [dispatch])

    const earnDeductData = useSelector((state) => state.getEarnData.DataList, _.isEqual)
    useEffect(() => {
        if (Object.keys(earnDeductData).length > 0) {
            setEarningData(earnDeductData)
        } else {
            setEarningData([])
        }
    }, [earnDeductData])

    const getData = async () => {
        setOpenBkDrop(true)
        if (dept === 0 || deptSect === 0) {
            infoNofity('Select The Department || Department Section Feild');
        } else {
            const postData = {
                dept_id: dept,
                sect_id: deptSect,
                attendance_marking_month: moment(startOfMonth(value)).format('YYYY-MM-DD')
            }
            const result = await axioslogin.post("/payrollprocess/all", postData);
            const { success, data } = result.data
            if (success === 1) {
                const arr = data && data.map((val) => val.em_no);
                const postdata = {
                    em_no: arr,
                    attendance_marking_month: moment(startOfMonth(value)).format('YYYY-MM-DD')
                }
                const result = await axioslogin.post("/payrollprocess/all/detail", postdata);
                const { succes, datas } = await result.data
                if (succes === 1) {
                    MapFunction(earningData, data, datas).then((val) => {
                        setOpenBkDrop(false)
                        setEmpArray(val)
                    })
                } else {
                    setOpenBkDrop(false)
                    warningNofity("Payslip Not added for this month")
                }
            }
            else {
                setOpenBkDrop(false)
                warningNofity("Payslip Not added for this month")
            }
        }
    }

    const arrayid = earningData.map((val) => {
        return val.earnded_id
    })

    return (
        <CustomLayout title="Attendance Register" displayClose={true} >
            <CustomBackDrop open={openBkDrop} text="Please wait !" />
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                <Paper
                    square
                    variant="outlined"
                    sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}
                >
                    <ToastContainer />
                    {/* <CustomBackDrop open={open} text="Please Wait" /> */}
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    // minDate={subMonths(new Date(), 1)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
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
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DeptSelectByRedux setValue={setDepartment} value={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DeptSecSelectByRedux dept={dept} setValue={setDepartSection} value={deptSect} />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Box sx={{ p: 0.2 }} >
                                <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                    color: '#90caf9'
                                }} >
                                    <PublishedWithChangesIcon />
                                </Button>
                            </Box>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Box component={Grid}
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    sx={{
                        display: 'flex',
                        overflow: 'auto',
                        '::-webkit-scrollbar': {
                            height: 8,
                        },
                        '::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                            borderRadius: '0px',
                        },

                        '::-webkit-scrollbar-thumb': {
                            // background: '#077DFA',
                            borderRadius: '0px',
                        },

                        '::-webkit-scrollbar-thumb:hover': {
                            //   background: 'rgb(255, 251, 251)',
                        },
                    }} >
                    <TableContainer component={Grid}
                        item
                        xs={'auto'}
                        sm={'auto'}
                        md={'auto'}
                        lg={'auto'}
                        xl={'auto'}
                        sx={{
                            display: 'flex',
                        }}>
                        <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" >
                            <TableHead>
                                <TableRow sx={{ color: '#003A75' }} hover >
                                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 200 }} > Name </TableCell>
                                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 200 }} >ID #</TableCell>
                                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 100 }}>IP Number</TableCell>
                                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 100 }}>UAN Number</TableCell>
                                    {
                                        earnDeductData?.map((val, ind) => {
                                            return <TableCell key={ind} size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 150 }}>{val.earnded_name}</TableCell>
                                        })
                                    }
                                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 100 }}>Remark</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    empArray?.map((e, idx) => (
                                        <TableRow key={idx} >
                                            <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }}>{e.em_name}</TableCell>
                                            <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }}>{e.em_no}</TableCell>
                                            <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }}>{e.ipnumber === null ? 'NIL' : e.ipnumber}</TableCell>
                                            <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }}>{e.em_uan_no === null ? 'NIL' : e.em_uan_no}</TableCell>
                                            {
                                                // let c = Object.values(e.fixed)
                                                arrayid.map((val, index) => (
                                                    <TableCell key={index} size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }}>
                                                        {Object.values(e.fixed).find((l) => l.id === val).amount}
                                                    </TableCell>
                                                ))
                                            }
                                            <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25, fontWeight: 550 }}>NIL</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </CustomLayout >
    )
}

export default AttandaceRegisterPage