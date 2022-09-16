import React, { Fragment, Suspense, useContext, useState } from 'react'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { IconButton, TextField } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { LinearProgress } from '@mui/material'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import Leavprccompnt from './Leavprccompnt';
import { lastDayOfYear, startOfYear, sub } from 'date-fns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router-dom'

const AnnualLeaveProcess = () => {
    const classes = useStyles();
    const { selectDeptSection } = useContext(PayrolMasterContext);
    const [name, setname] = useState([])
    const history = useHistory();
    const [holidaycount, setholidaycount] = useState(0)
    const [year, setYear] = useState(null);


    const gettable = async () => {
        const postdata = {
            dp_sec: selectDeptSection,
            startdate: moment(startOfYear(sub(new Date(year), { years: 1 }))).format('YYYY-MM-DD'),
            endate: moment(lastDayOfYear(sub(new Date(year), { years: 1 }))).format('YYYY-MM-DD'),
        }
        const postdata2 = {
            dp_sec: selectDeptSection,
            startdate: moment(startOfYear(new Date(year))).format('YYYY-MM-DD'),
            endate: moment(lastDayOfYear(new Date(year))).format('YYYY-MM-DD'),
        }
        //holdys of the year
        const result2 = await axioslogin.post('/yearleaveprocess/holidaylistyear', postdata2)
        if (result2.data.success === 2) {
            setholidaycount((result2.data.data).length)
            // data based on the calculation of earn leave
            const result = await axioslogin.post('/yearleaveprocess/dataannualcalculation', postdata)
            const { success, data } = result.data;
            if (success === 2) {
                setname(data)
            }
        } else {
            warningNofity('Please Do Calender Setting')
        }
    }
    //Year update function
    const updateYear = (val) => {
        setYear(val)
    }
    const redirect = () => {
        history.push('/Home');
    }
    return (
        <Fragment>
            <PageLayoutProcess
                heading={"Annual Leave Process"}
                redirect={redirect}
            >
                <div className="col-md-12 mb-2">
                    <div className="row g-2">
                        <div className="col-md-3">
                            <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSectionSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        {/* <div className="col-md-3">
                            <EmployeeNameSelect select="Department Section" style={SELECT_CMP_STYLE} />
                        </div> */}
                        <div className="col-md-1 col-xs-12 pt-1" style={{
                            paddingLeft: '0.5rem', paddingRight: '-0.5rem'
                        }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year']}
                                    name="year"
                                    value={year}
                                    // minDate={new Date()}
                                    // maxDate={new Date()}
                                    onChange={(e) => { updateYear(e) }}
                                    InputProps={{
                                        className: classes.customInputFeild
                                    }}
                                    renderInput={(params) => <TextField {...params}
                                        fullWidth
                                        size="small"
                                        name="datepick"
                                        autoComplete="off"
                                        variant="outlined"
                                        helperText={null} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="col-md-1 text-center">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={() => {
                                    gettable()
                                }}
                            >
                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row g-1 ">
                        <div className="card ">
                            <div className="col-md-12 pt-1">
                                <TableContainer sx={{ maxHeight: 500 }}>
                                    <Table size="small"
                                        stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow >
                                                <TableCell align="center">Employee ID</TableCell>
                                                <TableCell align="center">Employee Name</TableCell>
                                                <TableCell align="center">Working Days</TableCell>
                                                <TableCell align="center">Allowed EL</TableCell>
                                                <TableCell align="center">Allowed CL </TableCell>
                                                <TableCell align="center">Allowed HL </TableCell>
                                                <TableCell align="center">Maternity Leave</TableCell>
                                                <TableCell align="center">Process</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <Suspense fallback={<LinearProgress />} >
                                                <Leavprccompnt
                                                    name={name}
                                                    holidaycount={holidaycount}
                                                    year={year}
                                                // postdata={postdata}
                                                />

                                            </Suspense>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutProcess>
        </Fragment >
    )
}

export default AnnualLeaveProcess