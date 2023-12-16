
import { Box, CssVarsProvider, Typography, IconButton, Button, Tooltip } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { employeeNumber } from 'src/views/Constant/Constant'
import EditIcon from '@mui/icons-material/Edit';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LeavePolicySelect from './LeavePolicySelect'
import SaveIcon from '@mui/icons-material/Save';
import { useMemo } from 'react'

const LeaveTypeMast = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
    const [tableData, setTableData] = useState([])
    const [select_leave_policy, setselect_leave_policy] = useState(0)
    const [updateFlag, setUpdateFlag] = useState(0)
    const [slno, setSlno] = useState(0)

    //setting initial state
    const [formData, setformData] = useState({
        leave_type: "",
        leave_type_code: '',
        Leave_Carry_Forwad: false,
        Leave_avail_training: false,
        Leave_avail_after_training: false,
        half_day: false,
        lop: false,
        holiday: false,
        Leave: false,
        common: false,
        leave_policy_count: "",
        // select_leave_policy: "0",
        status: false,
    })
    const { leave_type, leave_type_code, Leave_Carry_Forwad, Leave_avail_training, Leave_avail_after_training,
        half_day, lop, holiday, Leave, leave_policy_count, status, common } = formData

    const updateLeaveMastFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformData({ ...formData, [e.target.name]: value })
    }
    const postFormdata = useMemo(() => {
        return {
            lvetype_desc: leave_type,
            lvetype_code: leave_type_code,
            carryforward: Leave_Carry_Forwad === false ? 0 : 1,
            avail_on_traing_probation: Leave_avail_training === false ? 0 : 1,
            avail_on_after_confirm: Leave_avail_after_training === false ? 0 : 1,
            half_day_allowed: half_day === false ? 0 : 1,
            is_lop: lop === false ? 0 : 1,
            is_holiday: holiday === false ? 0 : 1,
            is_leave: Leave === false ? 0 : 1,
            leave_credit_policy: select_leave_policy,
            leave_credit_policy_count: leave_policy_count,
            status: status === false ? 0 : 1,
            common_leave: common === true ? 1 : 0,
            create_user: employeeNumber(),
        }
    }, [leave_type, leave_type_code, Leave_Carry_Forwad, half_day, lop, holiday, Leave_avail_training,
        Leave, select_leave_policy, Leave_avail_after_training, leave_policy_count, status, common])
    //setting default state
    const defaultState = useMemo(() => {
        return {
            leave_type: "",
            leave_type_code: '',
            Leave_Carry_Forwad: false,
            Leave_avail_training: false,
            Leave_avail_after_training: false,
            half_day: false,
            lop: false,
            holiday: false,
            Leave: false,
            leave_policy_count: "",
            select_leave_policy: 0,
            status: false,
            common: false,
        }
    }, [])
    const updateData = useMemo(() => {
        return {
            lvetype_slno: slno,
            lvetype_desc: leave_type,
            lvetype_code: leave_type_code,
            carryforward: Leave_Carry_Forwad === true ? 1 : 0,
            avail_on_traing_probation: Leave_avail_training === true ? 1 : 0,
            avail_on_after_confirm: Leave_avail_after_training === true ? 1 : 0,
            half_day_allowed: half_day === true ? 1 : 0,
            leave_credit_policy: select_leave_policy,
            leave_credit_policy_count: leave_policy_count,
            status: status === true ? 1 : 0,
            is_lop: lop === true ? 1 : 0,
            is_holiday: holiday === true ? 1 : 0,
            is_leave: Leave === true ? 1 : 0,
            common_leave: common === true ? 1 : 0,
            edit_user: employeeNumber()
        }
    }, [leave_type, leave_type_code, Leave_Carry_Forwad, half_day, lop, holiday, Leave_avail_training,
        Leave, select_leave_policy, leave_policy_count, status, slno, Leave_avail_after_training, common])
    const submitFormDataLeaveType = useCallback(async (e) => {
        e.preventDefault();
        if (updateFlag === 1) {
            const result = await axioslogin.patch('/leaveType', updateData)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
                setformData(defaultState)
            }
            else {
                warningNofity(message)
            }
        } else {
            const result = await axioslogin.post('/leaveType', postFormdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setformData(defaultState)
            } else {
                warningNofity(message)
            }
        }
    }, [updateFlag, count, defaultState, postFormdata, updateData])

    useEffect(() => {
        //getdata from data base
        const getTableData = async () => {
            const results = await axioslogin.get("/leaveType")
            const { success, data } = results.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getTableData()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'No', field: 'lvetype_slno' },
        { headerName: 'Leave Type ', field: 'lvetype_desc', filter: true, width: 250 },
        { headerName: 'Code ', field: 'lvetype_code', filter: true, width: 150 },
        { headerName: 'Status', field: 'lvstatus', filter: true, width: 150 },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])

    const getDataTable = useCallback((params) => {
        setUpdateFlag(1)
        const data = params.data
        const { lvetype_desc, lvetype_code, carryforward, lvetype_slno,
            avail_on_traing_probation, avail_on_after_confirm, half_day_allowed,
            leave_credit_policy, leave_credit_policy_count, status, is_lop,
            is_holiday, is_leave, common_leave } = data;

        const formData = {
            // lvetype_slno: id,
            leave_type: lvetype_desc,
            leave_type_code: lvetype_code,
            Leave_Carry_Forwad: carryforward === 1 ? true : false,
            Leave_avail_training: avail_on_traing_probation === 1 ? true : false,
            Leave_avail_after_training: avail_on_after_confirm === 1 ? true : false,
            half_day: half_day_allowed === 1 ? true : false,
            leave_policy_count: leave_credit_policy_count,
            status: status === 1 ? true : false,
            lop: is_lop === 1 ? true : false,
            holiday: is_holiday === 1 ? true : false,
            Leave: is_leave === 1 ? true : false,
            common: common_leave === 1 ? true : false,

        }
        setformData(formData)
        setSlno(lvetype_slno)
        setselect_leave_policy(leave_credit_policy)

    }, [])


    const toSettings = () => {
        history.push('/Home/Settings')
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }} >
                <Paper sx={{ display: 'flex', flex: 1, height: window.innerHeight - 85, flexDirection: 'column', overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }}>
                    <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Leave Type Master
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.5 }}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='xs' color="danger" onClick={toSettings}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                        <Paper variant='outlined' sx={{ flex: 1, p: 1, }}>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <InputComponent
                                    placeholder={'Leave Type'}
                                    type="text"
                                    size="sm"
                                    name="leave_type"
                                    value={leave_type}
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <InputComponent
                                    placeholder={'Leave Type Code'}
                                    type="text"
                                    size="sm"
                                    name="leave_type_code"
                                    value={leave_type_code}
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Leave Carry Forwad'
                                    checked={Leave_Carry_Forwad}
                                    name="Leave_Carry_Forwad"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Avail on Training/probation Probation Period'
                                    checked={Leave_avail_training}
                                    name="Leave_avail_training"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Avail On After Training /Training Confirmation'
                                    checked={Leave_avail_after_training}
                                    name="Leave_avail_after_training"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Half Day Allowed'
                                    checked={half_day}
                                    name="half_day"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Lop'
                                    checked={lop}
                                    name="lop"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Holiday'
                                    checked={holiday}
                                    name="holiday"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>

                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Leave'
                                    checked={Leave}
                                    name="Leave"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Common Leave'
                                    checked={common}
                                    name="common"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <LeavePolicySelect value={select_leave_policy} setValue={setselect_leave_policy} />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <InputComponent
                                    placeholder={'Leave Policy Count'}
                                    type="text"
                                    size="sm"
                                    disabled={select_leave_policy === '4' ? true : false}
                                    name="leave_policy_count"
                                    value={leave_policy_count}
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Status'
                                    checked={status}
                                    name="status"
                                    onchange={(e) => updateLeaveMastFormData(e)}
                                />
                            </Box>
                            <Tooltip title="Save" followCursor placement='top' arrow>
                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="sm"
                                            color="primary"
                                            onClick={submitFormDataLeaveType}
                                        >
                                            <SaveIcon />
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Tooltip>
                        </Paper>
                        <Box sx={{ flex: 3, p: 1 }}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 500,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box >
        </Fragment >
    )
}

export default memo(LeaveTypeMast) 
