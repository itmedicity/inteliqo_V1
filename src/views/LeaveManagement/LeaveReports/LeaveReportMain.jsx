import React, { lazy, useEffect, useMemo, } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCommonSettings, getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { setCommonSetting } from 'src/redux/actions/Common.Action'

const MasterComponent = lazy(() => import('./MasterPage'))
const InchargeHod = lazy(() => import('./InchargeHodPage'))
const EmployeeComponent = lazy(() => import('./EmployeePage'))


const LeaveReportMain = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCommonSetting());
    }, [dispatch])

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])

    const { hod, incharge, groupmenu } = empInformationFromRedux;

    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])

    return (
        <>
            {
                ((hod === 1 || incharge === 1) && groupStatus === false) ? <InchargeHod /> :
                    ((hod === 0 || incharge === 0) && groupStatus === false) ? <EmployeeComponent /> : <MasterComponent />
            }
        </>
    )
}

export default memo(LeaveReportMain) 