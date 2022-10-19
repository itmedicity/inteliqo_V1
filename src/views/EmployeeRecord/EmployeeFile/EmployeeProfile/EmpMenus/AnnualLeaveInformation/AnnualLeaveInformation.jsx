import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, CircularProgress, Paper } from '@mui/material';
import { compareAsc, lastDayOfYear, startOfYear, sub } from 'date-fns';
import moment from 'moment';
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setEmployeeProcessDetail } from 'src/redux/actions/EmployeeLeaveProcessDetl';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { getProcessserialnum } from 'src/views/Constant/Constant';
import CalculatedOffDays from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/CalculatedOffDays';
import CardLeaveContainer from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/CardLeaveContainer';
import CardLeaveContainerTwo from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/CardLeaveContainerTwo';
import CarryForwardLeaveList from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/CarryForwardLeaveList';
import EarnLeaveList from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EarnLeaveList';
import FixedOffDaysInformation from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/FixedOffDaysInformation';
import HolidayLeaveList from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/HolidayLeaveList';
import ModelAvailLeavelist from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelAvailLeavelist';
import ModelLeaveProcess from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelLeaveProcess';
import NotApplicableCmp from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/NotApplicableCmp';
import NotProcessedCmp from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/NotProcessedCmp';
// import './EmpStyle.css'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import IconButton from '@mui/joy/IconButton';
import LeaveProcessComp from './LeaveProcessComp';

const CasualLeaveList = React.lazy(() => import('src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/CasualLeaveList'))


const AnnualLeaveInformation = () => {
    //const history = useHistory()
    // get id and number of logged user
    const { id, no } = useParams();
    const dispatch = useDispatch();
    // check wheathe old or new
    const [olddata, setolddat] = useState(0)
    // use sate for causltable rerender
    const [castable, setcastable] = useState(0)
    // to check wheather data is present
    const [nodatacl, setnodatacl] = useState(0)
    const [nodatahl, setnodatahl] = useState(0)
    const [nodatael, setnodatael] = useState(0)
    const [nodatafixed, setnodatafixed] = useState(0)
    // to open model ModelLeaveProcess consition
    const [modelvalue, setmodelvalue] = useState(0)
    // to open model leave  list
    const [modellist, setmodellist] = useState(false)
    // to model message
    const [modelmessage, setmodelmessage] = useState('');
    // use State foe serial number
    const [processslno, setprocessslno] = useState(0)
    // set open model 
    const [open, setOpen] = useState(false);
    const [attendanceata, setAttendanceData] = useState([])
    // current process details
    const [leaveprocessid, leaveprocessidupdate] = useState({
        hrm_calcu: 0,
        hrm_clv: 0,
        hrm_cmn: 0,
        hrm_ern_lv: 0,
        hrm_hld: 0,
        lv_process_slno: 0,
        category_slno: 0
    });

    // destructuring current process details
    const { lv_process_slno } = leaveprocessid
    // const RedirectToProfilePage = () => {
    //     history.push(`/Home/Profile/${id}/${no}`)
    // }

    //  data based on employeee category
    const [leavestate, setleavestate] = useState({
        ecat_cl: 0,
        ecat_confere: 0,
        ecat_cont: 0,
        ecat_doff_allow: 0,
        ecat_el: 0,
        ecat_esi_allow: 0,
        ecat_fh: 0,
        ecat_lop: 0,
        ecat_mate: 0,
        ecat_nh: 0,
        ecat_prob: 0,
        ecat_woff_allow: 0,
        ecat_sl: 0,
        em_category: 0,
        em_doj: ''
    })
    const { ecat_cl, ecat_el, ecat_esi_allow,
        ecat_lop, ecat_mate, ecat_nh, ecat_sl, em_category
    } = leavestate
    const CasualLeave = {
        mainHeading: "Casual Leaves",
        headingOne: "Month",
        headingTwo: "C",
        headingThee: "T",
        headingFour: "B"
    }
    const Holidy = {
        mainHeading: "National & Festival Holiday",
        headingOne: "Holidays",
        headingTwo: "C",
        headingThee: "T",
        headingFour: "B"
    }
    const EarnLeave = {
        mainHeading: "Privilage Leave",
        headingOne: "Month",
        headingTwo: "C",
        headingThee: "T",
        headingFour: "B"
    }

    const Carryfoward = {
        mainHeading: "Carry Forward Leave",
        headingOne: "Leave Name",
        headingTwo: "C",
        headingThee: "T",
        headingFour: "B"
    }

    const CalculatedLeave = {
        mainHeading: "Calculated Approved off Days",
        headingOne: "Off",
        headingTwo: "Date",
        headingThee: "C",
        headingFour: "B"
    }

    const FixedLeaves = {
        mainHeading: "Fixed Off Days Information",
        headingOne: "Leaves Name",
        headingThee: "A",
        headingFour: "T",
        headingFive: "B"

    }
    useEffect(() => {
        // get current data allowed  leave based on category
        const getcategorydata = async () => {
            const result = await axioslogin.get(`/common/getannprocess/${no}`)
            const { data } = result.data
            setleavestate(data[0])
        }
        getcategorydata();
        getProcessserialnum().then((val) => {
            setprocessslno(val)
        }
        )
        // Get the Employee Joinng / Contract / category Details ( All Date Detail )
        dispatch(setEmployeeProcessDetail(id))

        return (
            dispatch(setEmployeeProcessDetail(id))
        )

    }, [no, modelvalue, id])
    const year = moment(new Date()).format('YYYY')
    //useEffect for getting attendancde details to process earn leave
    useEffect(() => {
        const postdata = {
            emp_id: no,
            startdate: moment(startOfYear(sub(new Date(year), { years: 1 }))).format('YYYY-MM-DD'),
            endate: moment(lastDayOfYear(sub(new Date(year), { years: 1 }))).format('YYYY-MM-DD'),
        }
        // const postdata = {
        //     emp_id: no,
        //     startdate: '2022-01-01',
        //     endate: '2022-12-30'
        // }
        // data based on the calculation of earn leave
        const getattendanceData = async () => {
            const result = await axioslogin.post('/yearleaveprocess/dataannualcalculationemp', postdata)
            const { success, data } = result.data;
            if (success === 2) {
                setAttendanceData(data[0])
            }
            else if (success == 2) {
                setAttendanceData([])
            }
            else {
                setAttendanceData([])
            }
        }
        getattendanceData()

    }, [no, year])
    const postFormdata = useMemo(() => {
        return {
            em_no: no,
            em_id: id
        }
    }, [id, no])

    // Leave Processing Button Start here

    const submitprocess = () => {
        const getdata = async () => {
            //CHECKING WHETHER THE DATA IS INSERTED INTO YEARLY LEAVE PROCESS TABLE
            const datatoselect = {
                emp_no: no,
                startdate: moment(startOfYear(new Date())).format('YYYY-MM-DD'),
                endate: moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'),
            }
            const resultselect = await axioslogin.post('/yearleaveprocess/select_yearlyprocess', datatoselect)

            /*
             * This api get the details from the table 
                'yearly_leave_process'
             * For checking the yearly process done or not if it is done 'success=== 2 '
             * then get the value from the yearly process table
             */

            if (resultselect.data.success === 2) {
                // check the table where data present if present get the details process table
                /*
                    First check the "hrm_leave_process" table for any data if there
                    if success === 1 and if data {
                        fetch the data from table and show in the "dataprvleave" variable
                        values are 
                            {category_slno, hrm_calcu, hrm_clv, hrm_cmn, hrm_ern_lv, hrm_hld}
                            hrm_calcu, hrm_clv, hrm_cmn, hrm_ern_lv, hrm_hld ==> value = 2 --> Not Applicable
                                                                             ==> value = 1 --> Applicable
                    }                                                        ==> value = 0 --> Not Processed   
                */
                const result = await axioslogin.post('/yearleaveprocess/', postFormdata)
                const { success, message } = result.data;
                const { category_slno, hrm_calcu, hrm_clv, hrm_cmn, hrm_ern_lv, hrm_hld,
                    lv_process_slno, next_updatedate } = message[0]
                const dataprvleave = {
                    hrm_calcu: hrm_calcu,
                    hrm_clv: hrm_clv,
                    hrm_cmn: hrm_cmn,
                    hrm_ern_lv: hrm_ern_lv,
                    hrm_hld: hrm_hld,
                    category_slno: category_slno,
                    lv_process_slno: lv_process_slno
                }


                // if no data available
                if (success === 0) {
                    /*
                        If no data is present means new employee  set model

                        success === 0 means --> No data available in the "hrm_leave_process" table 
                        ie: New Employee , This is the initial process , after this leave process 
                        one entry saved in "hrm_leave_process" table with next_updatedate and "hrm_process_status == A" (A -> Active) "N" --> Inactive
                        Open the Model Component -->  <ModelLeaveProcess/>
                    */
                    setmodelvalue(1)
                    setmodelmessage('Leave process is not done for the employee')
                    setolddat(1)  // Updated the olddata === 1 for identify this is the new Process , default is 0 ,0 means not a new process
                    setOpen(true)
                }
                else if (success === 1) {
                    leaveprocessidupdate(dataprvleave)
                    // if employee process date has over 
                    /*
                        If the current date "new Date()" > "next_updatedate" --> needed to open the model and needed to Leave Process again
                        and "hrm_process_status == A" (A -> Active)
                        Open the Model Component -->  <ModelLeaveProcess/>
                    */
                    if (compareAsc(new Date(), new Date(next_updatedate)) === 1) {
                        setOpen(true)
                        setmodelvalue(1)
                        setmodelmessage('Date Exceeded do you Want To Process')
                    }
                    /*
                        If any category change happens --> needed to open the model and needed to Leave Process again
                        and "hrm_process_status == A" (A -> Active)
                        Open the Model Component -->  <ModelLeaveProcess/>
                    */
                    else if (category_slno !== em_category) {
                        setmodelvalue(1)
                        setmodelmessage('Category Change Do You Want to  To Process')
                        setOpen(true)
                    }
                    /*
                        // if process contain data and pending leave process is present
                            If "hrm_leave_process" table have the new row with "hrm_process_status" column have the 'A' status ( Active status ) 
                            and following column is hrm_calcu === 0 || hrm_clv === 0 || hrm_cmn === 0 || hrm_ern_lv === 0 || hrm_hld === 0
                            then the <ModelAvailLeavelist/> model open for Process
                    */
                    else if (hrm_clv === 0 || hrm_cmn === 0 || hrm_ern_lv === 0 || hrm_hld === 0) {
                        setmodellist(true)
                    }
                    else {
                        warningNofity("Leave Process Is Already Done For This Employee")
                    }
                }


            } else if (resultselect.data.success === 1) {
                /***
                 * If the yearly leave process table 
                 * 'yearly_leave_process' data not present on currect year 
                 * then insert that current year data and process the leave process
                 * open this model  '<ModelLeaveProcess/>' component for leave process
                 */
                const yearlyleavedata = {
                    em_no: id,
                    em_id: no,
                    proceeuser: 1,
                    year_of_process: moment(startOfYear(new Date())).format('YYYY-MM-DD')
                }
                const resultinsert = await axioslogin.post('/yearleaveprocess/insertyearly', yearlyleavedata)
                if (resultinsert.data.success === 1) {
                    setOpen(true)
                    setmodelvalue(1) //open the <ModelLeaveProcess/> component for leave process
                    setmodelmessage('Do You Want To Process Leave For The Employee')
                }
                else {
                    warningNofity('Please Contact Edp')
                }
            }

        }
        getdata()
    }
    const handleClose = () => {
        setmodellist(false)
    }

    // Leave Processing Button End here

    return (
        <Fragment>

            {/* if new process needed */}
            {modelvalue === 1 ? <ModelLeaveProcess
                open={open}
                dataleave={leavestate} // {Allowed Leaves based on category}
                handleClose={handleClose}
                setOpen={setOpen}  //for open model
                id={id}//employee id
                no={no}//employee number
                valuemessage={modelmessage}//model message
                leaveprocessid={leaveprocessid} //current proceess details from the 
                processslno={processslno}//processess serialno
                olddata={olddata}// check value === 1 then this is the new process and 0 is not a new process
                setcastable={setcastable}//casual leave table rerender
                setnodatacl={setnodatacl}//dataset render  for rerendering the casual leave
                setnodatael={setnodatael} //dataset render  for rerendering the earnleave
                setnodatahl={setnodatahl}//dataset render  for rerendering the holiday
                setnodatafixed={setnodatafixed}//dataset render  for rerendering the datafixed
                setmodelvalue={setmodelvalue}
                nameel={attendanceata === undefined ? [] : attendanceata}
            /> : null}
            {/* if new process pending */}
            {modellist === true ? <ModelAvailLeavelist
                open={modellist} //for open model
                handleClose={handleClose}
                dataleave={leavestate} // {leaves available based on category}
                lv_process_slnocurrent={lv_process_slno}//previous process data
                setcastable={setcastable}//casual leave table rerender
                setnodatacl={setnodatacl}//dataset render  for rerendering the casual leave
                setnodatael={setnodatael} //dataset render  for rerendering the earnleave
                setnodatahl={setnodatahl}//dataset render  for rerendering the holiday
                setnodatafixed={setnodatafixed}//dataset render  for rerendering the datafixed
                nodatafixed={nodatafixed}
                nameel={attendanceata === undefined ? [] : attendanceata}
            /> : null}

            <Box sx={{
                width: "100%",
                height: { xxl: 800, xl: 750, lg: 500, md: 500, sm: 500, xs: 350 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    {/* Heading Section start */}
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Leave Setting
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* Heading Section end */}

                    {/* Leave Process Component */}
                    <LeaveProcessComp empNumbers={postFormdata} />

                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1, px: 0.5,
                        }}>
                            <Box sx={{
                                //flex: 1, 
                                //px: 0.5,
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <Box boxShadow={2} sx={{ flex: 1, px: 0.5, pt: 0.5 }} >
                                    <CardLeaveContainer title={CasualLeave}  >
                                        <Suspense fallback={<CircularProgress />} >
                                            <div className="card-casual-leave">
                                                {ecat_cl === 1 && nodatacl === 0 ? <CasualLeaveList
                                                    nodataset={setnodatacl}
                                                    no={no} //employee id
                                                    castable={castable}// for rerendering on process click
                                                /> : nodatacl === 1 ? <NotProcessedCmp name="Casual Leaves" /> : <NotApplicableCmp name="Casual Leaves" />}

                                            </div>
                                        </Suspense>
                                    </CardLeaveContainer>
                                </Box>
                                <Box boxShadow={2} sx={{ flex: 1, px: 0.5, pt: 0.5 }} >
                                    <CardLeaveContainer title={EarnLeave}  >
                                        <Suspense fallback={<CircularProgress />} >
                                            <div className="card-casual-leave">
                                                {ecat_el === 1 && nodatael === 0 ? <EarnLeaveList
                                                    hldnodata={setnodatael}
                                                    no={no} //employee id
                                                /> : nodatael === 1 ? <NotProcessedCmp name="Privilage Leave" /> : <NotApplicableCmp name="Privilage Leave" />}
                                            </div>
                                        </Suspense>
                                    </CardLeaveContainer>
                                </Box>

                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 1,
                                // height: 200
                            }}>
                                <Box boxShadow={2} sx={{ flex: 1, px: 0.5 }} >
                                    <CardLeaveContainer title={Holidy}  >
                                        <Suspense fallback={<CircularProgress />} >
                                            <div className="card-casual-leave">
                                                {ecat_nh === 1 && nodatahl === 0 ? <HolidayLeaveList
                                                    hldnodata={setnodatahl}
                                                    no={no} //employee id
                                                /> : nodatahl === 1 ? <NotProcessedCmp name="Holiday Leaves" /> : <NotApplicableCmp name="Holiday Leaves" />}
                                            </div>
                                        </Suspense>
                                    </CardLeaveContainer>
                                </Box>
                                <Box boxShadow={2} sx={{ flex: 1, px: 0.5 }} >
                                    <CardLeaveContainerTwo title={FixedLeaves}  >
                                        <Suspense fallback={<CircularProgress />} >
                                            <div className="card-casual-leave">
                                                {(ecat_esi_allow === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1) && nodatafixed === 0 ? <FixedOffDaysInformation
                                                    hldnodata={setnodatafixed}
                                                    no={no} //employee id
                                                /> : nodatafixed === 1 ? <NotProcessedCmp name="Common Leaves" /> : <NotApplicableCmp name="Common Leaves" />}
                                            </div>
                                        </Suspense>
                                    </CardLeaveContainerTwo>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 1,
                                // height: 200
                            }}>
                                <Box boxShadow={2} sx={{ flex: 1, px: 0.5 }} >
                                    <CardLeaveContainer title={Carryfoward}  >
                                        <Suspense fallback={<CircularProgress />} >
                                            <div className="card-casual-leave">
                                                <CarryForwardLeaveList empid={no} />
                                            </div>
                                        </Suspense>
                                    </CardLeaveContainer>
                                </Box>
                                <Box boxShadow={2} sx={{ flex: 1, px: 0.5 }} >
                                    <CardLeaveContainer title={CalculatedLeave}  >
                                        <Suspense fallback={<CircularProgress />} >
                                            <div className="card-casual-leave">
                                                <CalculatedOffDays empid={no} />
                                            </div>
                                        </Suspense>
                                    </CardLeaveContainer>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Paper>
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ flex: 0, p: 0.3 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={submitprocess} >
                                <TaskAltRoundedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default AnnualLeaveInformation