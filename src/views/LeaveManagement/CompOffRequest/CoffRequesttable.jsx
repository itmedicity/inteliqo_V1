import { Paper } from '@mui/material';
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { getCoffTableData, getCommonSettings, getEmployeeInformationLimited, } from 'src/redux/reduxFun/reduxHelperFun';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { getDepartmentSectionBasedHod } from '../LeavereRequsition/Func/LeaveFunction';

const CoffRequesttable = () => {

    const [masterGroupStatus, setMasterGroupStatus] = useState(false);
    //const [tableData, setTableData] = useState([])
    const [checkStatus, setCheckStatus] = useState(false)

    //LOGGED EMPLOYEE INFORMATION
    const empInform = useSelector((state) => getEmployeeInformationLimited(state))
    const employeeInform = useMemo(() => empInform, [empInform])
    const { hod, incharge, groupmenu, em_id, em_dept_section } = employeeInform;

    const getcommonSettings = useSelector((state) => getCommonSettings(state, groupmenu))
    const groupStatus = useMemo(() => getcommonSettings, [getcommonSettings])
    useEffect(() => {
        setMasterGroupStatus(groupStatus)
    }, [groupStatus])

    useEffect(() => {
        getDepartmentSectionBasedHod(em_id).then((hodSection) => {

            const checkHodSection = hodSection?.find(e => e.dept_section === em_dept_section) === undefined ?? false

            setCheckStatus(checkHodSection)
        })
    }, [em_dept_section, em_id])

    const empData = useSelector((state) => getCoffTableData(state, hod, incharge, masterGroupStatus, em_id, em_dept_section, checkStatus))

    // const state = useSelector((state) => state?.hodAuthorisedSection?.sectionDetal);
    // const authorizationBasedDeptSection = useMemo(() => state, [state]);

    // useEffect(() => {
    //     // IF THE LOGGED EMPLOYEE IS HOD OR INCHARGE
    //     if (hod === 1 || incharge === 1 && masterGroupStatus === true) {
    //         getInchargeHodData(authorizationBasedDeptSection, em_id).then((value) => {
    //             const { status, data } = value
    //             if (status === 1) {
    //                 setTableData(data)
    //             } else {
    //                 setTableData([])
    //             }
    //         })

    //     } else if (hod === 1 || incharge === 1 && masterGroupStatus === false) {
    //  getInchargeHodData(authorizationBasedDeptSection, em_id).then((value) => {
    //             const { status, data } = value
    //             if (status === 1) {
    //                 setTableData(data)
    //             } else {
    //                 setTableData([])
    //             }
    //         })
    //     } else {
    //         getEmployeeCoffData(em_id).then((value) => {
    //             const { success, data } = value
    //             if (success === 1) {
    //                 setTableData(data)
    //             } else {
    //                 setTableData([])
    //             }

    //         })
    //     }

    //     //CLEAN UP FUNCTION
    //     return () => {

    //     }
    // }, [hod, incharge, masterGroupStatus, em_id, authorizationBasedDeptSection])

    const [columnDef] = useState([
        { headerName: 'Emp. ID', field: 'emno', filter: true },
        { headerName: 'Emp. Name', field: 'name', filter: true },
        { headerName: 'Dept. Section', field: 'section', filter: true },
        { headerName: 'Duty Date', field: 'fromDate', filter: true },
        { headerName: 'Leave Reason', field: 'reason', },
        { headerName: 'Credited On', field: 'reqDate', filter: true },
    ])

    return (
        <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", width: "100%" }} >
            <CommonAgGrid
                columnDefs={columnDef}
                tableData={empData}
                sx={{
                    height: 400,
                    width: "100%"
                }}
                rowHeight={30}
                headerHeight={30}
            />
        </Paper>
    )
}

export default memo(CoffRequesttable) 