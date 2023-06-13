import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { Fragment, memo, useState } from 'react'
import moment from 'moment'
import { ToastContainer } from 'react-toastify'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import { Button, CssVarsProvider, Input, Typography } from '@mui/joy'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addMonths } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { pdfdownlod } from './PaySlipPdf'

const Payslipprint = () => {

    const [value, setValue] = useState(moment(new Date()));
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [selctedemp, setSelctedEmp] = useState([])

    const getAllData = async (e) => {
        e.preventDefault()
        if (dept === 0 || deptSect === 0) {
            infoNofity('Check The Department || Department Section Feild');
        } else {
            const postData = {
                dept_id: dept,
                sect_id: deptSect,
                attendance_marking_month: moment(value).format('YYYY-MM-01')
            }
            const result = await axioslogin.post("/payrollprocess/getPaySlipData", postData)
            if (result.data.success === 1) {
                setSelctedEmp(result.data.data);
            } else {
                setSelctedEmp([])
            }
        }
    }

    const [Column] = useState([
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'ID#', field: 'em_no' },
        { headerName: 'Total Days', field: 'total_working_days' },
        { headerName: 'Total Pay Days', field: 'total_days' },
        { headerName: 'Fixed Wages', field: 'fixed_wages' },
        { headerName: 'Earnings', field: 'earning_wages' },
        { headerName: 'Deduction', field: 'deduct_wages' },
        { headerName: 'Gross Amount', field: 'gross_amount' },
        { headerName: 'Net Amount', field: 'net_amount' },
        {
            headerName: 'View',
            cellRenderer: params =>
                <Tooltip title="PaySlip View" followCursor placement='top' arrow >
                    <IconButton size="small" sx={{ p: 0 }}
                        onClick={() => viewPage(params)}
                    >
                        <InsertDriveFileIcon color='primary' />
                    </IconButton>
                </Tooltip>
        },
    ])


    const viewPage = async (params) => {

        const eempdata = params.api.getSelectedRows()

        const { em_no, em_id, desg_name, attendance_marking_month, em_doj,
            em_esi_no, em_uan_no, em_name } = eempdata[0]
        const getId = {
            em_no: em_no
        }
        const result = await axioslogin.post("/payrollprocess/getIndvidualPayslipDetl", getId)
        const { data, success } = result.data
        if (success === 1) {
            const earnings = data.filter(i => (i.em_earning_type === 1 || i.em_earning_type === 2))
            const deduction = data.filter(i => i.em_earning_type === 3)

            pdfdownlod(deduction, earnings, em_no, em_id, desg_name,
                attendance_marking_month, em_doj,
                em_esi_no, em_uan_no, em_name)
        } else {
            warningNofity("Payroll data not updated")
        }
    }

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, height: '400' }}>
                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Pay Slip Calculation
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>

                    <Paper square variant="outlined"
                        sx={{ display: 'flex', flex: 1, flexDirection: 'row', p: 0.5, alignItems: 'center', mb: 0.5 }}>
                        <ToastContainer />
                        {/* <CustomBackDrop open={open} /> */}
                        <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }} >
                            <Box sx={{ p: 1 }}>
                                <CssVarsProvider>
                                    <Typography>
                                        PaySlip Print Month
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
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
                            <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                                <DeptSelectByRedux setValue={setDept} value={dept} />
                            </Box>
                            <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                                <DeptSecSelectByRedux dept={dept} setValue={setDeptSect} value={deptSect} />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                            <CssVarsProvider>
                                <Box sx={{ p: 0.2 }} >
                                    <Button aria-label="Like" variant="outlined" color="neutral"
                                        onClick={getAllData}
                                        sx={{ color: '#90caf9' }} >
                                        <PublishedWithChangesIcon />
                                    </Button>
                                </Box>
                            </CssVarsProvider>
                        </Box>
                    </Paper>

                    <Box sx={{ py: 0.5 }}>
                        <CommonAgGrid
                            columnDefs={Column}
                            tableData={selctedemp}
                            sx={{
                                height: 500,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Box>
                </Paper >
            </Box >
        </Fragment >


    )
}

export default memo(Payslipprint) 