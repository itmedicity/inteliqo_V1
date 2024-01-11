import React, { Fragment, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getHolidayList } from 'src/redux/actions/LeaveProcess.action';
import InchargeHodCompnt from './InchargeHodCompnt';

const EmployeeCmpnt = React.lazy(() => import('./EmployeeCompnt'));
const AttendanceView = () => {

    const [empFlag, setEmpFlag] = useState(0)

    const reduxDispatch = useDispatch()
    //login employee details
    const empData = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0];
    })

    const { hod, incharge, em_id, em_no, em_department } = empData

    useEffect(() => {
        //get holiday current
        reduxDispatch(getHolidayList());
    }, [reduxDispatch])

    useEffect(() => {
        if (hod === 0 && incharge === 0) {
            setEmpFlag(1)
        } else {
            setEmpFlag(0)
        }
    }, [hod, incharge])

    return (
        <Fragment>


            {
                empFlag === 1 ? <EmployeeCmpnt em_no={em_no} /> : <InchargeHodCompnt em_id={em_id} em_department={em_department} />
            }
        </Fragment>
    )
}

export default memo(AttendanceView) 