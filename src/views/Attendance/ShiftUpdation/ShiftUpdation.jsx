import { IconButton, LinearProgress } from '@mui/material'
import React, { Fragment, Suspense, useContext, useEffect } from 'react'
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import TextInput from 'src/views/Component/TextInput'
import { FcPlus, FcCancel } from "react-icons/fc";
import ShiftUpdationTable from './ShiftUpdationTable';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect';
import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import moment from 'moment';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { memo } from 'react';
const ShiftPunchUpdationTable = React.lazy((() => import('../ShiftUpdation/ShiftUpdationTable')))


const ShiftUpdation = () => {
    // GET FORM DATA
    const [formData, setFormData] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
    })

    const getStartEndDate = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const { startDate, endDate } = formData;
    const maxdate = addDays(new Date(startDate), 30);
    const maxdatee = moment(maxdate).format('YYYY-MM-DD');

    const {
        selectedDept,
        selectDeptSection,
        selectEmpName
    } = useContext(PayrolMasterContext)

    //SET  POST DATA
    const [postData, setPostData] = useState({});
    const [apiData, setApiData] = useState([])

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
                setPostData(deptDetl)
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
                setPostData(deptDetl)
            }

            // const result = await axioslogin.post("/attendCal", deptDetl);

        } else {
            infoNofity("AtLeast Department & Section is Required");
        }
    }

    useEffect(() => {
        if (Object.keys(postData).length > 1) {
            // console.log(postData)
            const result = axioslogin.post("/attendCal", postData);
            // console.log(result)
            setApiData(result)
        }
    }, [postData])

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
                        <div className="col-md-2">
                            <DepartmentSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <DepartmentSectionSelect select="Department" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <EmployeeNameSelect select="Department Section" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-1">
                            <div className='d-flex justify-content-evenly' >
                                <div>
                                    <IconButton
                                        aria-label="add"
                                        style={{ padding: '0rem' }}
                                        onClick={getPunchDetl}
                                    >
                                        <FcPlus className="text-info" size={30} />
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton
                                        aria-label="add"
                                        style={{ padding: '0rem' }}
                                    >
                                        <FcCancel className="text-info" size={30} />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <Suspense fallback={<LinearProgress />} >
                        <ShiftPunchUpdationTable data={apiData} />
                    </Suspense>
                </div>
            </PageLayoutProcess>
        </Fragment>
    )
}

export default memo(ShiftUpdation)
