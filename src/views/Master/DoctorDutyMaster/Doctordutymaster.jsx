import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import MasterLayout from '../MasterComponents/MasterLayout';
import { Box, Button, Grid, IconButton } from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import SaveIcon from '@mui/icons-material/Save';
import { axioslogin } from 'src/views/Axios/Axios';
import { getDoctordutyList } from '../MenuCreationMaster/FuncLis';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';

const Doctordutymaster = () => {
    const queryClient = useQueryClient()
    const [formData, setFormData] = useState({
        doctorDuty: '',
        dutyStatus: false
    })

    const { doctorDuty, dutyStatus } = formData;
    const [value, setvalue] = useState(0)
    const [slno, setslno] = useState(0)

    const defaultState = useMemo(() => {
        return {
            doctorDuty: '',
            dutyStatus: false
        }
    }, [])

    const getDuty = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const { data: dutyList } = useQuery({
        queryKey: ['doctorDutyList'],
        queryFn: getDoctordutyList
    })

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'dutyslno' },
        { headerName: 'Duty Name ', field: 'duty_name', filter: true },
        { headerName: 'Status ', field: 'showStatus' },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])

    const getDataTable = useCallback((params) => {
        setvalue(1)
        const { dutyslno, duty_name, duty_status } = params.data;

        const getData = {
            doctorDuty: duty_name,
            dutyStatus: duty_status === 1 ? true : false
        }
        setFormData(getData)
        setslno(dutyslno)
    }, [])

    const SubmitFormData = useCallback(async (e) => {

        const postData = {
            duty_name: doctorDuty,
            duty_status: dutyStatus === true ? 1 : 0,
            dutyslno: slno
        }
        if (value === 1) {
            const result = await axioslogin.patch('/DoctorsProcess/update/duty', postData)
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message)
                setFormData(defaultState)
                setslno(0)
                queryClient.invalidateQueries('doctorDutyList')
            } else if (success === 1) {
                errorNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            }
        } else {
            const result = await axioslogin.post("/DoctorsProcess/create/duty", postData)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                setFormData(defaultState)
                queryClient.invalidateQueries('doctorDutyList')
            } else {
                errorNofity(message)
            }
        }
    }, [doctorDuty, dutyStatus, slno, value, queryClient, defaultState])

    return (
        <MasterLayout title="Doctor Duty master" displayClose={true} >
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid xl={3} lg={2}>
                        <Box sx={{ width: "100%", p: 1 }}>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <InputComponent
                                    placeholder={'Duty Name'}
                                    type="text"
                                    size="sm"
                                    name="doctorDuty"
                                    value={doctorDuty}
                                    onchange={(e) => getDuty(e)}
                                />
                            </Box>
                            <Box sx={{ width: "100%", pt: 1 }}>
                                <JoyCheckbox
                                    label='Status'
                                    checked={dutyStatus}
                                    name="dutyStatus"
                                    onchange={(e) => getDuty(e)}
                                />
                            </Box>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={SubmitFormData}
                                >
                                    <SaveIcon />
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={9} lg={9} xl={9} md={9}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={dutyList}
                            sx={{
                                height: 500,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Grid>
                </Grid>
            </Box>
        </MasterLayout>
    )
}

export default memo(Doctordutymaster)