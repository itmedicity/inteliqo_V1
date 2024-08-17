import React, { memo, useEffect, useState } from 'react'
import { addDays, format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Paper } from '@mui/material'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import { Button, Textarea, Tooltip } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import { useCallback } from 'react'

const Hrm_message = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [dept, changeDept] = useState(0)
    const [deptsection, changeSection] = useState(0)
    const [emply, getEmployee] = useState({});
    const [msgexprdays, setmsgexprdays] = useState(0)
    const [Message, setMessage] = useState('')

    const employeeState = useSelector((state) => state.getProfileData.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);

    const { em_id } = employeeProfileDetl

    const postData = useMemo(() => {
        return {
            message_dept: dept,
            message_deptsec: deptsection,
            emp_id: emply.em_id,
            message: Message,
            expr_date: format(addDays(new Date(), parseInt(msgexprdays)), 'yyyy-MM-dd'),
            created_user: em_id,
        }
    }, [dept, deptsection, emply, Message, msgexprdays, em_id])

    //save
    const submitFormData = useCallback(async () => {
        if (msgexprdays !== '') {
            const result = await axioslogin.post('/hrmMessage', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                changeDept(0)
                changeSection(0)
                getEmployee({})
                setmsgexprdays(0)
                setMessage('')
            }
            else if (success === 2) {
                warningNofity(message)
                changeDept(0)
                changeSection(0)
                getEmployee({})
                setmsgexprdays(0)
                setMessage('')
            }
            else {
                errorNofity("Error Occured!!!Please Contact IT")
                changeDept(0)
                changeSection(0)
                getEmployee({})
                setmsgexprdays(0)
                setMessage('')
            }
        }
        else {
            warningNofity("Message Expiry Days Is Null")
        }
    }, [postData, msgexprdays])

    return (
        <CustomLayout title="Message" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Paper variant="outlined" sx={{
                    width: '100%', p: 0.5, display: 'flex',
                    flexDirection: 'row',
                }}  >
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentDropRedx getDept={changeDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentSectionRedx getSection={changeSection} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <SectionBsdEmployee getEmploy={getEmployee} />
                    </Box>
                </Paper>
                <Paper variant="outlined" sx={{
                    width: '100%', p: 0.5, display: 'flex',
                    flexDirection: 'row',
                }}  >
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <JoyInput
                            placeholder="Message Expiry Days"
                            type="number"
                            size="sm"
                            name="msgexprdays"
                            // value={msgexprdays}
                            onchange={setmsgexprdays}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 3 }} >
                        <Textarea
                            label="Outlined"
                            placeholder="Message"
                            variant="outlined"
                            color="warning"
                            size="sm"
                            minRows={1}
                            maxRows={2}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                        justifyContent: 'flex-start', pl: 0.5,
                    }} >
                        <Tooltip title="Save" followCursor placement='top' arrow >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="neutral"
                                onClick={submitFormData}
                                fullWidth
                                startDecorator={<SaveIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Save
                            </Button>
                        </Tooltip>
                    </Box>
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(Hrm_message) 