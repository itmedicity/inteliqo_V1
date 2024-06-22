import React, { useEffect, useState } from 'react'
import { getleaverequest, } from 'src/views/CommonCode/Commonfunc';
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import { Box, Paper, } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { getHodBasedDeptSectionName, getSectionHaldayRequest, getSectionLeaveRequest, getSectionMisspunchRequest } from 'src/redux/actions/LeaveReqst.action';
import HodWiseDeptSection from 'src/views/MuiComponents/JoyComponent/HodWiseDeptSection';
import LeaveTable from './LeaveTable';
import { getDepartmentSectionBasedHod } from '../LeavereRequsition/Func/LeaveFunction';

const ApprovalIncharge = () => {
    const dispatch = useDispatch()

    const [leaverequesttype, setleaverequesttype] = useState([]);//leave type list
    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [levtpevalue, setleavetypevalue] = useState(1)//selected checkbox
    const [count, setcount] = useState(0)//to render dispatch useeffect

    //login incharge id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
    }, [dispatch, em_id])

    useEffect(() => {
        const fetchData = async (em_id) => {
            const result = await getDepartmentSectionBasedHod(em_id);
            const section = await result?.map((e) => e.dept_section)
            const postData = {
                sectIds: section
            }
            dispatch(getSectionLeaveRequest(postData))
            dispatch(getSectionHaldayRequest(postData))
            dispatch(getSectionMisspunchRequest(postData))
        }
        fetchData(em_id)
    }, [em_id, dispatch, count])

    return (
        <CustomLayout title="Leave Approval Incharge" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, p: 0.5, alignItems: 'center' }} >
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <HodWiseDeptSection detSection={deptSect} setSectionValue={setDeptSect} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        <CssVarsProvider>
                            {
                                leaverequesttype?.map((val, idx) => {
                                    return <Box sx={{
                                        display: 'flex', p: 1,
                                        width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                    }}
                                        key={val.lrequest_slno}
                                    >
                                        <MappingCheckbox
                                            label={val.lrequest_short}
                                            name={val.lrequest_short}
                                            value={val.lrequest_slno}
                                            onChange={setleavetypevalue}
                                            checkedValue={levtpevalue}
                                        />
                                    </Box>
                                })
                            }
                        </CssVarsProvider>
                    </Box>

                </Paper>
                <LeaveTable levtpevalue={levtpevalue} deptSect={deptSect} setcount={setcount} />
            </Box>
        </CustomLayout>
    )
}
export default memo(ApprovalIncharge)