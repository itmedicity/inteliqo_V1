import React, { lazy, useEffect, useMemo, useState, } from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux';
import { getCommonSettings, getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';

const MasterComponent = lazy(() => import('./MasterPage'))
const InchargeHod = lazy(() => import('./InchargeHodPage'))
const EmployeeComponent = lazy(() => import('./EmployeePage'))

const LeaveReportMain = () => {

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])

    const { hod, incharge, groupmenu } = empInformationFromRedux;

    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])


    return (
        <>
            {
                (hod === 1 || incharge === 1) && masterGroupStatus === true ? <MasterComponent /> :
                    (hod === 1 || incharge === 1) && masterGroupStatus === false ? <InchargeHod /> : <EmployeeComponent />
            }
        </>
    )
}

export default memo(LeaveReportMain) 