import { Avatar, Box, Button, Grid, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { Paper } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useDispatch } from 'react-redux';
import { getannualleave } from 'src/redux/actions/Profile.action';
import { getCreditedCasualLeave, getCreditedEarnLeave, getCreitedCommonLeave } from 'src/redux/actions/LeaveReqst.action';
import { format, startOfMonth, subMonths } from 'date-fns';

const EmployeeComp = lazy(() => import('./EmployeeDetails'))

const IncrementSettingPage = () => {

    const dispatch = useDispatch();




    const [Empno, setEmpNo] = useState(0)
    const [show, setShow] = useState(0)
    const [empdata, setEmpdata] = useState({
        emno: 0,
        emname: '',
        department: '',
        deptSection: '',
        designation: '',
        totalexperience: '',
        tmcexperience: '',
        grosssalary: 0,
        lwfamount: 0,
        npsamount: 0,
        toalDays: 0,
        totalP: 0,
        totalH: 0
    })


    const getData = useCallback(async () => {

        console.log("HV");
        console.log(Empno);
        if (Empno === 0) {
            warningNofity("Enter Employee Id")
        } else {
            const result = await axioslogin.get(`/empmast/databyempno/getemid/${parseInt(Empno)}`)
            const { data, success } = result.data

            if (success === 1) {
                console.log(data);
                const { em_no, em_name, dept_name, sect_name, gross_salary, desg_name,
                    lwfamount, npsamount, em_id, em_doj } = data[0]

                const getPunchMast_PostData = {
                    fromDate_punchMaster: format(new Date(startOfMonth(subMonths(new Date(), 12))), 'yyyy-MM-dd'),
                    toDate_punchMaster: format(new Date(), 'yyyy-MM-dd '),
                    empList: [em_id],
                }
                const punch_master_data = await axioslogin.post("/attendCal/punchMastData/emid/", getPunchMast_PostData); //GET PUNCH MASTER DATA
                const { success, planData: punchMasterData } = punch_master_data.data;
                console.log(punchMasterData);
                if (success === 1) {
                    setEmpdata({
                        emno: em_no,
                        emname: em_name,
                        department: dept_name,
                        deptSection: sect_name,
                        designation: desg_name,
                        em_doj: em_doj,
                        totalexperience: 0,
                        tmcexperience: 0,
                        grosssalary: gross_salary,
                        lwfamount: lwfamount,
                        npsamount: npsamount,
                        toalDays: punchMasterData?.length,
                        totalP: punchMasterData?.filter((v) => v.lvereq_desc === 'P')?.length,
                        totalH: punchMasterData?.filter((k) => k.lvereq_desc === 'H')?.length,
                        totalLop: punchMasterData?.filter((k) => k.lvereq_desc === 'A' || k.lvereq_desc === 'LWP'
                            || k.lvereq_desc === 'ML' || k.lvereq_desc === 'ESI')?.length,
                        totalLV: punchMasterData?.filter(val => val.lvereq_desc === 'SL' || val.lvereq_desc === 'CL'
                            || val.lvereq_desc === 'COFF' || val.lvereq_desc === 'EL')?.length,
                    })
                    dispatch(getCreditedCasualLeave(em_no)); //GET ALL CASUAL LEAVES 
                    dispatch(getCreitedCommonLeave(em_no));
                    dispatch(getCreditedEarnLeave(em_no)); // GET ALL EARN LEAVES
                    setShow(1)
                } else {
                    warningNofity("No Employee Details")
                }

            } else {
                warningNofity("There Is No Employee Exist In This Employee Number")
            }
        }
    }, [Empno,])

    return (
        <CustomLayout title="Salary Increment Updation Setting" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', p: 1 }}>
                    <Tooltip title="Employee Number" followCursor placement='top' arrow>
                        <Box sx={{ px: 0.3, }}>
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Employee Number"
                                name="Empno"
                                value={Empno}
                                onchange={(e) => setEmpNo(e.target.value)}
                            />
                        </Box>
                    </Tooltip>
                    <Button
                        aria-label="Like"
                        variant="outlined"
                        color="primary"
                        onClick={getData}
                        size='sm'
                        endDecorator={<Box>Search</Box>}
                    >
                        <SearchIcon fontSize='small' />
                    </Button>
                </Box>
                {
                    show === 1 ? <EmployeeComp empdata={empdata} /> : null
                }
            </Box>
        </CustomLayout>
    )
}

export default memo(IncrementSettingPage) 