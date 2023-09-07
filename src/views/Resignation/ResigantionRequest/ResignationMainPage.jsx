import { Box, FormControl, MenuItem, Paper, Select, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import _ from 'underscore'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { axioslogin } from 'src/views/Axios/Axios'
import { Button, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import { useCallback } from 'react'
import ResignationComponent from './ResignationComponent'
import moment from 'moment'
import { addDays } from 'date-fns'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useSelector } from 'react-redux'

const ResignationMainPage = () => {

    const [resignation_type, setresignation_type] = useState(0)
    const [request_date, setrequest_date] = useState(moment(new Date()))
    const [resignation_reason, setresignation_reason] = useState('')
    const [noticeperiod, setNoticePeriod] = useState(0)
    const [relvngDate, setRelivingdate] = useState(moment(new Date()))
    const [authorization, setAuthorization] = useState({
        hod: 0, incharge: 0, authorization_incharge: 0, authorization_hod: 0, co_assign: 0
    })
    const { hod, incharge, authorization_incharge, authorization_hod, co_assign } = authorization;

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
    const { em_designation, em_id, em_department, em_no, em_name, sect_name, em_dept_section, desg_name } = empData

    useEffect(() => {
        const getAuthrization = async () => {
            const result = await axioslogin.get(`/common/getapproval/levels/${em_id}`);
            const { success, data } = result.data;
            if (success === 1) {
                const { hod, incharge, authorization_incharge, authorization_hod, co_assign } = data[0];
                const form = {
                    hod: hod,
                    incharge: incharge,
                    authorization_incharge: authorization_incharge,
                    authorization_hod: authorization_hod,
                    co_assign: co_assign
                }
                setAuthorization(form)
            } else {
                setAuthorization({})
            }
        }
        getAuthrization()
    }, [em_id])

    useEffect(() => {
        if (em_designation !== 0) {
            const getNoticePeriod = async () => {
                const result = await axioslogin.get(`/designation/noticeperiod/${em_designation}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { desg_notice_prd } = data[0]
                    setNoticePeriod(desg_notice_prd)
                }
                else {
                    setNoticePeriod(0)
                }
            }
            getNoticePeriod()
        }
    }, [em_designation])

    useEffect(() => {
        if (request_date !== '' && resignation_type === 1) {
            const result = addDays(new Date(request_date), noticeperiod)
            setRelivingdate(result)
        } else {
            setRelivingdate(new Date(request_date))
        }

    }, [request_date, noticeperiod])

    const submitFormData = useCallback(async (e) => {
        e.preventDefault()
        const postData = {
            dept_id: em_department,
            sect_id: em_dept_section,
            em_id: em_id,
            em_no: em_no,
            designation: em_designation,
            resignation_type: resignation_type,
            request_date: moment(request_date).format('YYYY-MM-DD'),
            relieving_date: moment(relvngDate).format('YYYY-MM-DD'),
            resign_reason: resignation_reason,
            notice_period: noticeperiod,
            incharge_required: (authorization_incharge === 1 && incharge === 1) ? 1 :
                (authorization_incharge === 1 && incharge === 0) ? 1 :
                    (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            inch_app_status: (authorization_incharge === 1 && incharge === 1) ? 1 :
                (hod === 1) ? 1 :
                    (authorization_incharge === 0 && incharge === 1) ? 1 : 0,
            inch_coment: (authorization_incharge === 1 && incharge === 1) ? "DIRECT" :
                (hod === 1) ? "DIRECT" :
                    (authorization_incharge === 0 && incharge === 1) ? 'DIRECT' : 'NIL',
            inch_app_date: (authorization_incharge === 1 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                (hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                    (authorization_incharge === 0 && incharge === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss'),
            inch_id: (authorization_incharge === 1 && incharge === 1) ? em_id :
                (hod === 1) ? em_id :
                    (authorization_incharge === 0 && incharge === 1) ? em_id : 0,
            hod_required: (authorization_hod === 1 && hod === 1) ? 1 :
                (authorization_hod === 1 && hod === 0) ? 1 :
                    (authorization_hod === 0 && hod === 1) ? 1 : 0,
            hod_app_status: (authorization_hod === 1 && hod === 1) ? 1 :
                (authorization_hod === 0 && hod === 1) ? 1 : 0,
            hod_coment: (authorization_hod === 1 && hod === 1) ? "DIRECT" :
                (authorization_hod === 0 && hod === 1) ? 'DIRECT' : 'NIL',
            hod_app_date: (authorization_hod === 1 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') :
                (authorization_hod === 0 && hod === 1) ? moment().format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss'),
            hod_id: (authorization_hod === 1 && hod === 1) ? em_id :
                (authorization_hod === 0 && hod === 1) ? em_id : 0,
            hr_required: 1,
            ceo_required: co_assign,
        }
        const result = await axioslogin.post('/Resignation', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setresignation_type(0)
            setrequest_date(new Date())
            setresignation_reason('')
            setRelivingdate(new Date())
        }
        else if (success === 2) {
            warningNofity(message)
        }
        else if (success === 0) {
            infoNofity("Your Resignation Already In Process")

        }
        else {
            errorNofity("Error Occured!!!!! Please Contact EDP")
        }
    }, [resignation_type, resignation_reason, hod, incharge, authorization_incharge,
        authorization_hod, co_assign, em_designation, em_id, em_department, em_no,
        em_dept_section, request_date, relvngDate, noticeperiod])

    return (
        <CustomLayout title="Resignation Request" displayClose={true} >
            <ToastContainer />
            <Paper variant="outlined" sx={{ width: '100%', p: 0.5 }}  >
                <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <TextField
                            fullWidth
                            id="fullWidth"
                            size="small"
                            value={sect_name}
                            disabled
                        />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <TextField
                            fullWidth
                            id="fullWidth"
                            size="small"
                            value={em_name}
                            disabled
                        />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <TextField
                            fullWidth
                            id="fullWidth"
                            size="small"
                            value={em_no}
                            disabled
                        />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        <TextField
                            fullWidth
                            id="fullWidth"
                            size="small"
                            value={desg_name}
                            disabled
                        />
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                    flexDirection: 'row', width: '100%'
                }}>
                    <Box sx={{ flex: 1, mt: 1, px: 0.3, }}>

                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography >
                                        Resignation Type
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <FormControl
                                    fullWidth
                                    size='small'   >
                                    <Select
                                        value={resignation_type}
                                        onChange={(e) => setresignation_type(e.target.value)}
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                    >
                                        <MenuItem disabled value={0} >
                                            Select Resignation Type
                                        </MenuItem>
                                        <MenuItem value={1}>Resignation</MenuItem>
                                        <MenuItem value={2}>24-Hour Resignation</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', mt: 1 }}>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography >
                                        Request Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1 }} >
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DatePicker
                                        views={['day']}
                                        inputFormat="DD-MM-YYYY"
                                        value={request_date}
                                        onChange={setrequest_date}
                                        renderInput={(params) => (
                                            <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', mt: 1 }}>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography >
                                        Notice Period
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, }}>
                                <TextField
                                    fullWidth
                                    id="fullWidth"
                                    size="small"
                                    value={noticeperiod}
                                    disabled
                                />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', mt: 1, }}>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography >
                                        Relieving Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, }} >
                                <Box sx={{ flex: 1, }}>
                                    <TextField
                                        fullWidth
                                        id="fullWidth"
                                        size="small"
                                        value={resignation_type === 1 ? moment(addDays(new Date(request_date), noticeperiod)).format('DD-MM-YYYY') : moment(new Date(request_date)).format('DD-MM-YYYY')}
                                        disabled
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                        {resignation_type === 2 ? <ResignationComponent /> : null}
                    </Box>
                </Box>
                <Box sx={{ flex: 1, mt: 1, px: 0.3, display: 'flex', flexDirection: 'row' }}>
                    <Box sx={{ flex: 1 }} >
                        <TextField
                            fullWidth
                            placeholder="Over Time Remark"
                            id="fullWidth"
                            size="small"
                            value={resignation_reason}
                            onChange={(e) => setresignation_reason(e.target.value)}
                        />
                    </Box>
                    <Box sx={{ px: 0.5, }}>
                        <CssVarsProvider>
                            <Tooltip title="Save Request" variant="outlined" color="info" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitFormData}
                                >
                                    Save Request
                                </Button>
                            </Tooltip>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Paper>
        </CustomLayout>
    )
}

export default memo(ResignationMainPage) 