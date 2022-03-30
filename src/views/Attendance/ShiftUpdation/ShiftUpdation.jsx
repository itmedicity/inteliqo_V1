import { IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { Fragment, useContext, useEffect, memo } from 'react'
import Paper from '@mui/material/Paper';
import CustomePagination from 'src/views/CommonCode/CustomePagination';
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import TextInput from 'src/views/Component/TextInput'
import { FcPlus, FcCancel, FcProcess } from "react-icons/fc";
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import moment from 'moment';
import { infoNofity, getDayDiffrence, succesNofity, errorNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
const ShiftTableDataRow = React.lazy(() => import('./ShiftUpdationTblRow'))
const ShiftUpdation = () => {

    //SHIFT TABLE CODE
    //SHIFT TABLE - pagination code
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, rowsPerPage));
        setPage(0);
    };

    // GET FORM DATA
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
    })

    const getStartEndDate = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setApiData([])
    }

    const { startDate, endDate } = formData;
    const maxdate = addDays(new Date(startDate), 30);
    const maxdatee = moment(maxdate).format('YYYY-MM-DD');

    useEffect(() => {
        //get days diffrence for the page pagination
        const x = moment(startDate);
        const y = moment(endDate);
        const daysDiff = getDayDiffrence(x, y);
        const rows = daysDiff === 0 ? 0 : daysDiff + 1;
        setRowsPerPage(rows)
        // setDays(daysDiff)
    }, [startDate, endDate])
    const {
        selectedDept,
        selectDeptSection,
        selectEmpName
    } = useContext(PayrolMasterContext)
    //SET  POST DATA
    const [apiData, setApiData] = useState([]);
    // Get the attendance data from the database 
    const getPunchDetl = async () => {
        if (selectedDept !== 0 && selectDeptSection !== 0 && selectEmpName === 0) {
            const deptDetl = {
                startDate: startDate,
                endDate: endDate,
                department: selectedDept,
                departmentSec: selectDeptSection,
                cmpCode: 1
            }
            if (Object.keys(deptDetl).length > 1) {
                const result = await axioslogin.post("/attendCal", deptDetl);
                const { success, data } = result.data;
                if (success === 1) {
                    if (data.length !== 0) {
                        setApiData(data)
                    }
                    else {
                        setApiData(data)
                        infoNofity("Please Do the Shift Marking")
                    }

                }

                if (success === 0) {
                    infoNofity("Please Do the Shift Marking")
                }
            }

        } else if (selectedDept !== 0 && selectDeptSection !== 0 && selectEmpName !== 0) {
            const deptDetl = {
                startDate: startDate,
                endDate: endDate,
                department: selectedDept,
                departmentSec: selectDeptSection,
                empName: selectEmpName,
                cmpCode: 1
            }

            if (Object.keys(deptDetl).length > 1) {
                // setPostData(deptDetl)
                setApiData([])
            }
            // const result = await axioslogin.post("/attendCal", deptDetl);
        } else {
            setApiData([])
            infoNofity("AtLeast Department & Section is Required");
        }
    }

    //Process and Get Attendance data from the database
    const processPunchdetl = async () => {

        if (selectedDept !== 0 && selectDeptSection !== 0 && selectEmpName === 0) {
            const deptDetl = {
                startDate: startDate,
                endDate: endDate,
                department: selectedDept,
                departmentSec: selectDeptSection,
                cmpCode: 1
            }

            if (Object.keys(deptDetl).length > 1) {

                const result = await axioslogin.post("/attendCal/proc", deptDetl)

                const { success } = result.data;
                if (success === 1) {
                    const result = await axioslogin.post("/attendCal/attendancecal", deptDetl)

                    const { success } = result.data;


                    if (success === 1) {
                        succesNofity("Processed SuccessFully")
                    } else {
                        errorNofity('Please Contact')
                    }


                }

                if (success === 0) {
                    infoNofity("Please Do the Shift Marking")
                }
            }

        } else if (selectedDept !== 0 && selectDeptSection !== 0 && selectEmpName !== 0) {
            const deptDetl = {
                startDate: startDate,
                endDate: endDate,
                department: selectedDept,
                departmentSec: selectDeptSection,
                empName: selectEmpName,
                cmpCode: 1
            }

            if (Object.keys(deptDetl).length > 1) {
                // setPostData(deptDetl)
                setApiData([])
            }
            // const result = await axioslogin.post("/attendCal", deptDetl);
        } else {
            setApiData([])
            infoNofity("AtLeast Department & Section is Required");
        }

    }

    return (
        <Fragment>
            <PageLayoutProcess heading="Attendance Details" >
                <div className="col-md-12 mb-2">
                    <div className="row g-2">
                        <div className="col-md-2">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm custom-datefeild-height"
                                Placeholder="Date"
                                name="startDate"
                                value={startDate}
                                changeTextValue={(e) => getStartEndDate(e)}
                            />
                        </div>
                        <div className="col-md-2">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm custom-datefeild-height"
                                Placeholder="Date"
                                name="endDate"
                                value={endDate}
                                min={startDate}
                                max={maxdatee}
                                changeTextValue={(e) => getStartEndDate(e)}
                            />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3">
                            <DepartmentSectionSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        {/* <div className="col-md-2">
                            <EmployeeNameSelect select="Department Section" style={SELECT_CMP_STYLE} />
                        </div> */}
                        <div className="col-md-1">
                            <div className='d-flex justify-content-evenly' >
                                <div>
                                    <Tooltip title="Search" placement="top" arrow>
                                        <IconButton
                                            aria-label="add"
                                            style={{ padding: '0rem' }}
                                            onClick={getPunchDetl}
                                        >
                                            <FcPlus className="text-info" size={30} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip title="Process" placement="top" arrow>
                                        <IconButton
                                            aria-label="add"
                                            style={{ padding: '0rem' }}
                                            onClick={processPunchdetl}
                                        >
                                            <FcProcess className="text-info" size={30} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip title="Back To Home" placement="top" arrow>
                                        <IconButton
                                            aria-label="add"
                                            style={{ padding: '0rem' }}
                                        >
                                            <FcCancel className="text-info" size={30} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }} >
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '6rem', }}>Date</TableCell>
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '6rem', }}>Emp No</TableCell>
                                    <TableCell align="center" colSpan={2} className="p-0" style={{ width: '8rem', }}>Shift Time</TableCell>
                                    <TableCell align="center" colSpan={2} className="p-0" style={{ width: '8rem', }}>Punch Data</TableCell>
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '6rem', }}>Hrs Worked</TableCell>
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '4rem', }}>OT (min)</TableCell>
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '4rem', }}>L-IN(min)</TableCell>
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '4rem', }}>E-GO(min)</TableCell>
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '1rem', }}></TableCell>
                                    <TableCell align="center" rowSpan={2} className="p-0" style={{ width: '1rem', }}></TableCell>
                                </TableRow>
                                <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }} >
                                    {/* <TableCell>Date</TableCell> */}
                                    <TableCell align="center" style={{ padding: 0, width: '2rem' }}>In Time</TableCell>
                                    <TableCell align="center" style={{ padding: 0, width: '2rem' }}>Out Time</TableCell>
                                    <TableCell align="center" style={{ padding: 0, width: '2rem' }}>In Time</TableCell>
                                    <TableCell align="center" style={{ padding: 0, width: '2rem' }}>Out Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    (rowsPerPage > 0
                                        ? apiData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : apiData
                                    ).map((val, index) => {
                                        return <ShiftTableDataRow val={val} key={index} />
                                    })
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow hover={true} >
                                    <CustomePagination
                                        data={apiData}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        handleChangePage={handleChangePage}
                                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            </PageLayoutProcess>
        </Fragment>
    )
}

export default memo(ShiftUpdation)
