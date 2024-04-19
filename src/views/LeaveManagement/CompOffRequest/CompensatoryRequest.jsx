import { Box } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { Button, CssVarsProvider, Input, Tooltip } from '@mui/joy';

import moment from 'moment';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import HodWiseDeptSection from 'src/views/MuiComponents/JoyComponent/HodWiseDeptSection';
import HodWiseEmpList from 'src/views/MuiComponents/JoyComponent/HodWiseEmpList';
import { setDepartment } from 'src/redux/actions/Department.action';
import { getEmpNameHodSectionBased, getHodBasedDeptSectionName } from 'src/redux/actions/LeaveReqst.action';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OffSubmitForm from './OffSubmitForm';

const CompensatoryRequest = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCommonSetting())
    }, [dispatch])

    const [rights, setRights] = useState(0)
    const [self, setSelf] = useState(false)
    const [fromDate, setFromDate] = useState(moment(new Date()))
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [emply, getEmployee] = useState({});
    const [department, setDepart] = useState(0)
    const [showList, setShowList] = useState(0)

    const employeeState = useSelector((state) => state.getProfileData.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { hod, incharge, em_id, em_name, sect_name, dept_name, em_department, em_dept_section } = employeeProfileDetl;

    const state = useSelector((state) => state?.getCommonSettings)
    const commonSetting = useMemo(() => state, [state])

    const { group_slno, cmmn_early_out, cmmn_grace_period, cmmn_late_in, salary_above,
        week_off_day, notapplicable_shift, default_shift, noff } = commonSetting;


    useEffect(() => {
        const getEmployeeRight = async () => {
            const result = await axioslogin.post("/attendCal/rights/", postData);
            const { success, data } = result.data;
            if (success === 1) {
                const { user_grp_slno } = data[0];
                if (group_slno !== undefined) {
                    if (group_slno.includes(user_grp_slno) === true) {
                        setRights(1)
                        dispatch(setDepartment());
                    } else {
                        setRights(0)
                    }
                }
            } else {
                setRights(0)
            }
        }

        const postData = {
            emid: em_id
        }
        getEmployeeRight(postData)

    }, [em_id, dispatch, group_slno])

    const selfRequest = useCallback(() => {
        setSelf(true)
    }, [])

    useEffect(() => {
        if ((hod === 1 || incharge === 1) && self === false) {
            dispatch(getHodBasedDeptSectionName(em_id));
            dispatch(getEmpNameHodSectionBased(em_id));
            changeDept(department)
        } else if ((hod === 1 || incharge === 1) && self === true) {
            changeDept(em_department)
            changeSection(em_dept_section)
            getEmployee(employeeProfileDetl)
        }
        else {
            changeDept(em_department)
            changeSection(em_dept_section)
            getEmployee(employeeProfileDetl)
        }
    }, [hod, dispatch, em_id, incharge, em_department, em_dept_section, employeeProfileDetl, department, self])

    const processEmployee = useCallback(() => {
        setShowList(1)
    }, [])


    return (
        <CustomLayout title="Compensatory Off Request" displayClose={true} >
            <Box sx={{ width: '100%', }}>
                <Box sx={{ display: 'flex', py: 0.5, width: '100%', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentDropRedx getDept={changeDept} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentSectionRedx getSection={changeSection} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <SectionBsdEmployee getEmploy={getEmployee} />
                        </Box>
                        <Box sx={{ display: "flex", px: 0.5 }} >
                            <CssVarsProvider>
                                <Tooltip title="Process" followCursor placement='top' arrow >
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="primary"
                                        onClick={processEmployee}
                                        sx={{
                                            // color: 'green',
                                        }}
                                    >
                                        <AddCircleOutlineIcon />
                                    </Button>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                    {
                        showList === 1 ? <OffSubmitForm /> : null
                    }






                    {/* {
                        hod === 1 || incharge === 1 ?
                            <Box sx={{ px: 0.5 }} >
                                <CssVarsProvider>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="primary"
                                        onClick={selfRequest}
                                        fullWidth
                                        startDecorator={<AccessibilityIcon />}
                                        sx={{ mx: 0.5 }}
                                    >
                                        Self Request
                                    </Button>
                                </CssVarsProvider>
                            </Box> : null
                    }
                    {
                        rights === 1 ? <Box sx={{ display: 'flex', flex: 1 }}>

                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentDropRedx getDept={changeDept} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <DepartmentSectionRedx getSection={changeSection} />
                            </Box>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <SectionBsdEmployee getEmploy={getEmployee} />
                            </Box>
                        </Box> : hod === 1 || incharge === 1 ?
                            <Box sx={{ display: 'flex', flex: 1 }}>

                                <Box sx={{ flex: 1, px: 0.5 }}>
                                    <HodWiseDeptSection detSection={section} setSectionValue={changeSection} />
                                </Box>
                                <Box sx={{ flex: 1, px: 0.5 }}>
                                    <HodWiseEmpList section={section} setEmployee={getEmployee} />
                                </Box>
                            </Box> : null
                    }
 */}




                </Box>
            </Box>
        </CustomLayout >
    )
}

export default memo(CompensatoryRequest) 