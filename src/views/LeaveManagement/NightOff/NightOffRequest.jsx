
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment';
import { Box, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { Button, CssVarsProvider, Typography } from '@mui/joy';
import { addDays } from 'date-fns';
import { ToastContainer } from 'react-toastify';
import _ from 'underscore';
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import DeptSectionSelect from './DeptSectionSelect';
import EmployeeUderDeptSec from './EmployeeUderDeptSec';
const NightOffRequest = () => {

    const dispatch = useDispatch();
    const [requiredate, setRequireDate] = useState(moment())
    const [fromdate, setFromDate] = useState(moment())
    const [todate, setToDate] = useState(moment())
    const [deptSection, setDeptSection] = useState(0);
    const [employee, setEmployee] = useState(0)

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);

    const { em_no, em_id, em_name, sect_name, dept_name, hod, incharge } = employeeProfileDetl



    useEffect(() => {
        dispatch(setCommonSetting());
    }, [dispatch])

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);
    const commonSettings = useMemo(() => commonState, [commonState]);

    const submitRequest = async () => {
        const empdata = {
            fromDate: moment(fromdate).format('yyyy-MM-DD'),
            todate: moment(todate).format('yyyy-MM-DD'),
            em_no: hod === 0 && incharge === 0 ? em_no : employee
        }
        const result = await axioslogin.post('/attandancemarking/getnightoffdata', empdata)
        const { success } = result.data
        if (success === 1) {
            const findata = result.data.message
            if (findata.length === commonSettings.noff_count) {
                const submitdata = {
                    duty_day: moment(requiredate).format('yyyy-MM-DD'),
                    duty_desc: 'NOFF',
                    duty_status: 1,
                    lve_tble_updation_flag: 1,
                    em_no: hod === 0 && incharge === 0 ? em_no : employee,
                    frmdate: moment(fromdate).format('yyyy-MM-DD'),
                    todate: moment(todate).format('yyyy-MM-DD')
                }
                const result = await axioslogin.patch('/attandancemarking/updatenightoff', submitdata)
                const { success } = result.data
                if (success === 1) {
                    succesNofity("NOFF Requested Sucessfully");
                    setRequireDate(new Date())
                    setFromDate(new Date())
                    setToDate(new Date())
                }
            } else if (findata.length > commonSettings.noff_count) {
                warningNofity('More Night duties Selected,You Can Reduce the Date Range')
            }
            else {
                warningNofity('Less Night duties Under Selected Dates,Not Applicable for NOFF')
            }
        } else if (success === 0) {
            warningNofity('No Night duties Under Selected Dates')
        }
    }


    return (

        <CustomLayout title="Night Off Request" displayClose={true} >
            <ToastContainer />
            <Paper variant="outlined" sx={{ width: '100%', p: 0.5 }}  >

                {hod === 1 || incharge === 1 ?


                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

                        <Box sx={{

                            mt: 0.5, px: 0.3,
                            width: '30%'
                        }} >
                            <DeptSectionSelect
                                em_id={em_id}
                                value={deptSection}
                                setValue={setDeptSection}
                            // updateDeptSect={updateDeptSect}
                            />
                        </Box>

                        <Box sx={{

                            mt: 0.5, px: 0.3,
                            width: '30%'
                        }} >
                            <EmployeeUderDeptSec
                                value={employee}
                                setValue={setEmployee}
                                deptSect={deptSection}
                            />
                        </Box>
                        <Box sx={{

                            mt: 0.5, px: 0.3,
                            width: '10%'
                        }} >
                            <TextField
                                fullWidth
                                id="fullWidth"
                                size="small"
                                value={employee}
                                disabled
                            />
                        </Box>

                    </Box>
                    :
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>

                            <TextField
                                fullWidth
                                id="fullWidth"
                                size="small"
                                value={dept_name}
                                disabled
                            />
                        </Box>
                        <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={sect_name}
                                disabled
                            />
                        </Box>
                        <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={em_name}
                                disabled
                            />
                        </Box>
                        <Box sx={{ flex: 1, alignItems: 'center', mt: 0.5, px: 0.3 }} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={em_no}
                                disabled
                            />
                        </Box>
                    </Box>




                }


                <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                    <Box sx={{
                        display: 'flex', width: '25%', p: 0.5, mt: 0.2, flexDirection: 'row'
                    }} >
                        <Box sx={{ width: '40%', pt: 1 }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 18, fontWeight: 350 }}>Required Date: </Typography>
                            </CssVarsProvider>
                        </Box>

                        <Box sx={{ width: '80%' }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    inputFormat="DD-MM-YYYY"
                                    value={requiredate}
                                    onChange={setRequireDate}
                                    renderInput={(params) => (
                                        <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                    </Box>
                    <Box sx={{
                        display: 'flex', width: '50%', p: 0.5, mt: 0.2, flexDirection: 'row'
                    }} >
                        <Box sx={{ width: '30%', pt: 1 }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 18, fontWeight: 350 }}>From Date: </Typography>
                            </CssVarsProvider>
                        </Box>

                        <Box sx={{ width: '80%' }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    inputFormat="DD-MM-YYYY"
                                    value={fromdate}
                                    onChange={setFromDate}
                                    renderInput={(params) => (
                                        <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ width: '30%', pt: 1 }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontSize: 18, fontWeight: 350, pl: 2 }}>To Date: </Typography>
                            </CssVarsProvider>
                        </Box>


                        <Box sx={{ width: '80%' }}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    inputFormat="DD-MM-YYYY"

                                    minDate={addDays(new Date(fromdate), commonSettings.noff_count)}
                                    value={todate}
                                    onChange={setToDate}
                                    renderInput={(params) => (
                                        <TextField {...params} helperText={null} size="small" sx={{ display: 'flex', pt: 0.5 }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>

                    <Box sx={{ px: 0.5, mt: 0.9 }}>
                        <CssVarsProvider>
                            {/* <Tooltip title="Save Request" variant="outlined" color="info" placement="right-end"> */}
                            <Button
                                variant="outlined"
                                component="label"
                                size="md"
                                color="primary"
                                onClick={submitRequest}
                            >
                                Save Request
                            </Button>
                            {/* </Tooltip> */}
                        </CssVarsProvider>
                    </Box>
                </Box>





            </Paper>

        </CustomLayout >




        // <Fragment>
        //     <AuthorizationDetails />
        //     <PageLayoutSave
        //         heading="Night Off Request"
        //         redirect={RedirectToProfilePage}
        //         submit={submitNightoff}
        //     >
        //         <div className="col-md-12">
        //             <div className="row g-1 mb-2">
        //                 <div className="col-md-3">
        //                     <TextInput
        //                         type="text"
        //                         classname="form-control form-control-sm"
        //                         Placeholder="Department"
        //                         disabled="disabled"
        //                         value={dept_name}
        //                     />
        //                 </div>
        //                 <div className="col-md-3">
        //                     <TextInput
        //                         type="text"
        //                         classname="form-control form-control-sm"
        //                         Placeholder="Department Section"
        //                         disabled="disabled"
        //                         value={sect_name}
        //                     />
        //                 </div>
        //                 <div className="col-md-3">
        //                     <TextInput
        //                         type="text"
        //                         classname="form-control form-control-sm"
        //                         Placeholder="Employee Name"
        //                         disabled="disabled"
        //                         value={em_name}
        //                     />
        //                 </div>
        //                 <div className="col-md-3">
        //                     <TextInput
        //                         type="text"
        //                         classname="form-control form-control-sm"
        //                         Placeholder="Emplyee Number"
        //                         disabled="disabled"
        //                         value={em_no}
        //                     />
        //                 </div>
        //             </div>
        //             <div className="row g-1 mb-2">
        //                 <div className="col-md-3">
        //                     <TextInput
        //                         type="date"
        //                         classname="form-control form-control-sm"
        //                         Placeholder="Duty Day From"
        //                         name="fromDate"
        //                         value={fromDate}
        //                         changeTextValue={(e) => updateLeaveDetails(e)}
        //                     />
        //                 </div>
        //                 <div className="col-md-3">
        //                     <TextInput
        //                         type="date"
        //                         classname="form-control form-control-sm"
        //                         Placeholder="Duty Day To"
        //                         name="todate"
        //                         min={fromDate}
        //                         value={todate}
        //                         changeTextValue={(e) => {
        //                             updateLeaveDetails(e)
        //                             updatepunch()
        //                         }}
        //                     />
        //                 </div>
        //                 {value === 1 ?
        //                     <div className="col-md-3">
        //                         <TextInput
        //                             type="date"
        //                             classname="form-control form-control-sm"
        //                             Placeholder="Request For Night Off To"
        //                             name="fordate"
        //                             min={todate}
        //                             value={fordate}
        //                             changeTextValue={(e) => updateLeaveDetails(e)}
        //                         />
        //                     </div> : null
        //                 }
        //             </div>
        //         </div>
        //     </PageLayoutSave>
        // </Fragment>
    )
}

export default NightOffRequest