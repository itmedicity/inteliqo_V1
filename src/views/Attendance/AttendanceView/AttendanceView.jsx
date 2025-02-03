import React, { Fragment, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHolidayList } from 'src/redux/actions/LeaveProcess.action';
import InchargeHodCompnt from './InchargeHodCompnt';
import _ from 'underscore';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import AllView from './AllView';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';
import { setDepartment } from 'src/redux/actions/Department.action';
import { setDeptWiseSection } from 'src/redux/actions/DepartmentSection.Action'
import { setDept } from 'src/redux/actions/Dept.Action'

const EmployeeCmpnt = React.lazy(() => import('./EmployeeCompnt'));
const AttendanceView = () => {

    const [empFlag, setEmpFlag] = useState(0)
    const [rights, setRights] = useState(0)
    const [empSalary, setEmpSalary] = useState([]);

    const reduxDispatch = useDispatch()

    useEffect(() => {
        //get holiday current
        reduxDispatch(getHolidayList());
        reduxDispatch(setCommonSetting())
        reduxDispatch(setShiftDetails())
        reduxDispatch(setDepartment());
        reduxDispatch(setDeptWiseSection());
        reduxDispatch(setDept())
    }, [reduxDispatch])


    //login employee details
    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
    const { hod, incharge, em_id, em_no, em_dept_section } = empData

    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const { group_slno } = state;

    useEffect(() => {
        if (hod === 0 && incharge === 0) {
            setEmpFlag(1)
        } else {
            setEmpFlag(0)
        }
    }, [hod, incharge])

    useEffect(() => {
        const getEmployeeRight = async () => {
            const result = await axioslogin.post("/attendCal/rights/", postData);
            const { success, data } = result.data;
            if (success === 1) {
                const { user_grp_slno } = data[0];
                if (group_slno !== undefined) {
                    if (group_slno.includes(user_grp_slno) === true) {
                        setRights(1)
                    } else {
                        setRights(0)
                    }
                }

            } else {
                setRights(0)
            }

            const getGrossSalaryEmpWise = await axioslogin.get(`/common/getgrossSalaryByEmployeeNo/${em_dept_section}`);
            const { su, dataa } = getGrossSalaryEmpWise.data;
            if (su === 1) setEmpSalary(dataa)
        }

        const postData = {
            emid: em_id
        }
        getEmployeeRight(postData)


    }, [em_id, group_slno, em_dept_section])

    return (
        <Fragment>
            {
                empFlag === 1 && rights === 0 ?
                    <EmployeeCmpnt em_no={em_no} empSalary={empSalary} em_dept_section={em_dept_section} /> :
                    rights === 1 ?
                        <AllView em_id={em_id} /> :
                        <InchargeHodCompnt em_id={em_id} em_no={em_no} empSalary={empSalary} em_dept_section={em_dept_section} />
            }
        </Fragment>
    )
}

export default memo(AttendanceView) 