import { Box, Button, Tooltip } from '@mui/joy'
import React, { lazy, memo, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DoctorDepartmentSection from '../DoctorDutyplan/Components/DoctorDepartmentSection'
import EmployeeRightsDepartment from '../DoctorDutyplan/Components/EmployeeRightsDepartment'
import SectionBasedDoctors from '../DoctorDutyplan/Components/SectionBasedDoctors'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import RefreshIcon from '@mui/icons-material/Refresh'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useDispatch } from 'react-redux';
import {
    getEmployeeInformation,
    getCreditedCasualLeave, getCreitedCommonLeave,
} from 'src/redux/actions/LeaveReqst.action';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const COFFSelectComponent = lazy(() => import('./COFFSelectComponent'))
const LeaveSelectComponent = lazy(() => import('./LeaveSelectComponent'))

const LeaveRequest = () => {
    const dispatch = useDispatch()
    const [dept, changeDept] = useState(0)
    const [section, changeSection] = useState(0)
    const [emply, getEmployee] = useState(0)
    const [leaveType, setLeaveType] = useState(0)
    const [requestType, setRequestType] = useState(0)

    const leaveRequestType = [
        { lrequest_slno: 1, lrequest_type: 'Leave Request' },
        { lrequest_slno: 2, lrequest_type: 'Compensatory OFF' },
    ]

    const handleProcessLeveRequest = async () => {
        setRequestType(leaveType);
        dispatch(getEmployeeInformation(emply))
        const result = await axioslogin.get(`/common/getEmpoyeeInfomation/${emply}`);
        const { success, data } = result.data;
        if (success === 1) {
            const {em_no}=data[0]
            dispatch(getCreditedCasualLeave(em_no)); //GET ALL CASUAL LEAVES 
            dispatch(getCreitedCommonLeave(em_no)); //GET COMMON LEAVES
            //dispatch(getCreitedHolidayLeave(em_no)); // GET ALL HOLIDAYS LEAVES
            //dispatch(getCreditedEarnLeave(em_no)); // GET ALL EARN LEAVES
        } else {
            warningNofity("There Is No Employee Exist!")
        }
    }

    return (
        <CustomLayout title="Doctor Leave Request" displayClose={true}>
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                            flexDirection: 'row',
                            px: 0.5,
                        }}
                    >
                        <EmployeeRightsDepartment value={dept} setValue={changeDept} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                            flexDirection: 'row',
                            px: 0.5,
                        }}
                    >
                        <DoctorDepartmentSection value={section} setValue={changeSection} dept={dept} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 } }}>
                        <SectionBasedDoctors value={emply} setValue={getEmployee} sect={section} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '20%', px: 0.3 }}>
                        <Select
                            defaultValue={leaveType}
                            onChange={(event, newValue) => { setLeaveType(newValue) }}
                            size="md"
                            sx={{ width: '100%' }}
                            variant="outlined"
                            color="primary"
                        >
                            <Option value={0} disabled>
                                Leave Request Type ...
                            </Option>
                            {leaveRequestType &&
                                leaveRequestType.map((val, index) => {
                                    return (
                                        <Option key={index} value={val.lrequest_slno}>
                                            {val.lrequest_type}
                                        </Option>
                                    )
                                })}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', px: 0.3 }}>
                        <Tooltip title="Process" followCursor placement="top" arrow>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="danger"
                                onClick={handleProcessLeveRequest}
                                size="sm"
                            >
                                <AddCircleOutlineIcon />
                            </Button>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', px: 0.3 }}>
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="success"
                            onClick={() => setRequestType(10)}
                            size="sm"
                            className="refreshButton"
                        >
                            <RefreshIcon className="rotating-icon" />
                        </Button>
                    </Box>
                </Box>
                {
                    requestType === 1 ? <LeaveSelectComponent emply={emply} /> :
                        requestType === 2 ? <COFFSelectComponent /> : null
                }
            </Box>
        </CustomLayout>
    )
}

export default memo(LeaveRequest) 
