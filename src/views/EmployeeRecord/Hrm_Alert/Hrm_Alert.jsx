import { Button, Textarea, Tooltip } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import { addDays } from 'date-fns/esm'
import moment from 'moment'
import React, { memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import BranchSelectRedux from 'src/views/MuiComponents/BranchSelectRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCategorySelect from 'src/views/MuiComponents/JoyComponent/JoyCategorySelect'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect'
import SaveIcon from '@mui/icons-material/Save';
import { useMemo } from 'react'

const Hrm_Alert = () => {

    const [branch, setBranch] = useState(0)
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [category, setCategory] = useState(0)
    const [designation, setDesignation] = useState(0)

    const [formData, setFormData] = useState({
        alertexprdays: '',
        alert: ''
    })
    const defaultState = useMemo(() => {
        return {
            alertexprdays: '',
            alert: ''
        }
    }, [])

    const { alertexprdays, alert } = formData;

    const updateAlert = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])

    const postData = useMemo(() => {
        return {
            alert_branch: branch,
            alert_department: dept,
            aler_deptsec: deptSect,
            emp_category: category,
            designation: designation,
            alert: alert,
            alert_expr_date: moment(addDays(new Date(), alertexprdays)).format('YYYY-MM-DD'),
            create_date: moment(new Date()).format('YYYY-MM-DD'),
        }
    }, [branch, dept, deptSect, category, designation, alert, alertexprdays])

    //save
    const submitFormData = useCallback(async () => {
        if (alertexprdays !== '') {
            const result = await axioslogin.post('/hrmAlert', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setFormData(defaultState)
                setBranch(0)
                setDept(0)
                setDeptSect(0)
                setCategory(0)
                setDesignation(0)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured, Contact IT")
            }
        }
        else {
            warningNofity("Expiry Days Can't Be Null")
        }
    }, [postData, alertexprdays, defaultState])

    return (
        <CustomLayout title="Alert" displayClose={true} >
            <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'row', width: '100%', p: 1 }}>
                <Box sx={{ flex: 1, px: 0.5 }}>
                    <Box sx={{ flex: 1, px: 0.5, py: 0.1 }}>
                        <BranchSelectRedux value={branch} setValue={setBranch} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, py: 0.1 }}>
                        <DeptSelectByRedux value={dept} setValue={setDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, py: 0.1 }}>
                        <DeptSecSelectByRedux dept={dept} value={deptSect} setValue={setDeptSect} />
                    </Box>
                </Box>
                <Box sx={{ flex: 1, px: 0.5 }}>
                    <Box sx={{ flex: 1, px: 0.5, py: 0.1 }}>
                        <JoyCategorySelect value={category} setValue={setCategory} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, py: 0.1 }}>
                        <JoyDesignationSelect desgValue={designation} getDesg={setDesignation} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, py: 0.1 }}>
                        <InputComponent
                            type="text"
                            size="sm"
                            placeholder="Alert Expiry Days"
                            name="alertexprdays"
                            value={alertexprdays}
                            onchange={(e) => updateAlert(e)}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 1, px: 0.5, }}>
                    <Textarea
                        label="Outlined"
                        minRows={5}
                        placeholder="Alert Message"
                        variant="outlined"
                        color="warning"
                        size="sm"
                        value={alert}
                        name="alert"
                        onChange={(e) => updateAlert(e)}
                        sx={{ flex: 1 }}
                    />
                </Box>
            </Paper>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Tooltip title="Save" followCursor placement='top' arrow>
                    <Box sx={{ px: 0.5, mt: 0.9 }}>
                        <Button
                            variant="outlined"
                            component="label"
                            size="sm"
                            color="primary"
                            onClick={submitFormData}
                        >
                            <SaveIcon />
                        </Button>
                    </Box>
                </Tooltip>

            </Box>
        </CustomLayout>
    )
}

export default memo(Hrm_Alert) 