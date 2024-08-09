import { Box, Paper } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { Button, CssVarsProvider, Input, LinearProgress, Option, Select, Textarea, Tooltip, Typography } from '@mui/joy'
import { useCallback } from 'react'
import ResignationComponent from './ResignationComponent'
import moment from 'moment'
import { addDays } from 'date-fns'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useSelector } from 'react-redux'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Files from 'react-files'
import BackupIcon from '@mui/icons-material/Backup';

import png from '../../../assets/upload/png.png';
import jpeg from '../../../assets/upload/jpeg.png';
import pdf from '../../../assets/upload/pdf.png';
import doc from '../../../assets/upload/doc.png';
import noPreview from '../../../assets/upload/images.png'


const ResignationMainPage = () => {

    const [resignation_type, setresignation_type] = useState(0)
    const [request_date, setrequest_date] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [resignation_reason, setresignation_reason] = useState('')
    const [noticeperiod, setNoticePeriod] = useState(0)
    const [relvngDate, setRelivingdate] = useState(moment(new Date()))
    const [files, setFiles] = useState('')
    const [progress, setProgress] = useState(0);


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

    }, [request_date, noticeperiod, resignation_type])


    const submitFormData = useCallback(async (e) => {
        e.preventDefault()


        if (resignation_type === 0) {
            warningNofity("Please Select Resignation Type")
            return
        }

        if (resignation_type === 2) {
            if (files.length === 0) {
                warningNofity("Please Upload Resignation Reason Document")
                return
            }
        }

        if (resignation_reason === '' || resignation_reason === null) {
            warningNofity("Please Enter Resignation Reason")
            return
        }

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

        const formData = new FormData()

        formData.append('file', files[0]);
        formData.append('postData', JSON.stringify(postData));

        const result = await axioslogin.post('/Resignation', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    console.log(percent)
                    setProgress(percent)
                }
            }

        })
        const { success, message } = result.data;

        if (success === 1) {
            // setProgress(100)
            succesNofity(message)
            setresignation_type(0)
            setrequest_date(new Date())
            setresignation_reason('')
            setRelivingdate(new Date())
        } else if (success === 2) {
            setProgress(0)
            warningNofity(message)
        } else if (success === 0) {
            setProgress(0)
            infoNofity("Your Resignation Already In Process")
        } else {
            setProgress(0)
            errorNofity("Error Occured!!!!! Please Contact EDP")
        }

    }, [resignation_type, resignation_reason, hod, incharge, authorization_incharge,
        authorization_hod, co_assign, em_designation, em_id, em_department, em_no,
        em_dept_section, request_date, relvngDate, noticeperiod, files])

    const handleChange = (files) => {
        setFiles(files)
    }

    const handleError = (error, file) => {
        const { code } = error
        if (code === 1) {
            warningNofity('Upload failed. Invalid file type')
        } else if (code === 2) {
            warningNofity('Upload failed. File too large')
        } else if (code === 3) {
            warningNofity('Upload failed. File too small')
        } else {
            warningNofity('Upload failed. Maximum file count reached')
        }
    }

    return (
        <CustomLayout title="Resignation Request" displayClose={true} >
            <ToastContainer />
            <Paper variant="outlined" sx={{ width: '100%', m: 2, pt: 2 }}  >
                <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'column', mx: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column',
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            p: 0.5,
                            pl: 1,
                        }}
                    >
                        <Typography
                            color="neutral"
                            level="title-md"
                            noWrap={false}
                            variant="plain"
                        >
                            {em_name}
                        </Typography>
                        <Typography
                            color="neutral"
                            level="body-md"
                            noWrap={false}
                            variant="plain"
                            sx={{ fontWeight: 500 }}
                            startDecorator={`Employee No : `}
                        >
                            {em_no}
                        </Typography>
                        <Typography
                            color="neutral"
                            level="body-md"
                            noWrap={false}
                            variant="plain"
                            sx={{ lineHeight: 0.5, textTransform: 'capitalize', fontWeight: 500 }}
                        >
                            {desg_name.toLowerCase()}
                        </Typography>
                        <Typography
                            color="neutral"
                            level="body-md"
                            noWrap={false}
                            variant="plain"
                            sx={{ textTransform: "capitalize", lineHeight: 1.5, fontWeight: 500 }}
                        >
                            {sect_name.toLowerCase()}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, },
                    flexDirection: 'row',
                    mx: 2
                }}>
                    <Box sx={{ flex: 2, mt: 1, px: 0.3 }}>
                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography >
                                        Resignation Type
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Select
                                    value={resignation_type}
                                    onChange={(event, newValue) => {
                                        setresignation_type(newValue);
                                    }}
                                    size='md'
                                    variant='outlined'
                                >
                                    <Option value={0}>Select Resignation Type</Option>
                                    <Option value={1}>Regular Resignation Process</Option>
                                    <Option value={2}>24-Hour Resignation Process</Option>
                                </Select>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', mt: 1 }}>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography >
                                        Resignation Requested Date
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1 }} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day']}
                                        minDate={new Date()}
                                        value={request_date}
                                        size="small"
                                        onChange={(newValue) => {
                                            setrequest_date(newValue)
                                        }}
                                        inputFormat="dd-MM-yyyy"
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                <CssVarsProvider>
                                                    <Input ref={inputRef} {...inputProps} style={{}} disabled={true} sx={{ textAlign: 'right', width: '100%' }} />
                                                </CssVarsProvider>
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', mt: 1 }}>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography >
                                        Notice Period In Days
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    name="noticeperiod"
                                    value={resignation_type === 1 ? `30 Days` : `24 Hour`}
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
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="resignation_type"
                                        value={resignation_type === 1 ? moment(addDays(new Date(request_date), noticeperiod)).format('DD-MM-YYYY') : moment(new Date(request_date)).format('DD-MM-YYYY')}
                                        disabled
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,
                        mt: 0.5,
                        mp: 1,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: '50%',
                        }} >
                            <Box sx={{
                                display: 'flex',
                                flex: 1,
                                border: 3 + 'px dashed',
                                borderColor: '#8EADCD',
                                borderRadius: 5,
                                m: 2,
                                mx: 4,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }} >
                                <Files
                                    className='files-dropzone'
                                    onChange={handleChange}
                                    onError={handleError}
                                    accepts={['image/png', '.pdf', '.doc', '.docx', 'image/jpeg', 'image/jpg']}
                                    multiple={false}
                                    maxFileSize={2000000}
                                    minFileSize={0}
                                    clickable
                                >
                                    <BackupIcon sx={{ fontSize: 80, color: '#8EADCD' }} />
                                    <Typography
                                        color="neutral"
                                        level="body-xs"
                                        noWrap
                                        sx={{ flex: 1, textAlign: 'center', color: '#8EADCD' }}
                                    >
                                        upload files
                                    </Typography>
                                </Files>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'center', alignItems: 'center', }} >
                            <img
                                src={
                                    files.length === 0 ? noPreview : files[0].extension === 'pdf' ? pdf : files[0].extension === 'doc' || files[0].extension === 'docx' ? doc : files[0].extension === 'jpg' || files[0].extension === 'jpeg' ? jpeg : png
                                }
                                alt="preview"
                                style={{ width: 100, height: 100 }}
                            />
                            <CssVarsProvider>
                                <Typography
                                    color="neutral"
                                    level="body-xs"
                                    noWrap
                                    textAlign={'center'}
                                    textOverflow={'ellipsis'}
                                    sx={{ width: '80%', }}
                                >
                                    {files[0]?.name}
                                </Typography>
                            </CssVarsProvider>
                            <Box
                                sx={{
                                    bgcolor: 'white',
                                    width: '50%',
                                }}
                            >
                                <LinearProgress
                                    determinate
                                    variant="outlined"
                                    color="success"
                                    size="sm"
                                    thickness={5}
                                    value={progress}
                                    sx={{
                                        mt: 0.5,
                                        boxShadow: 'sm',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ px: 3, py: 0.5 }} >
                    {resignation_type === 2 ? <ResignationComponent /> : null}
                </Box>
                <Box sx={{ flex: 1, mt: 1, px: 0.3, pb: 2, display: 'flex', flexDirection: 'column', mx: 2 }}>
                    <Box sx={{ flex: 1 }} >
                        <Textarea
                            label="Outlined"
                            placeholder="Reason for Resignation"
                            variant="outlined"
                            color="neutral"
                            size="lg"
                            minRows={1}
                            maxRows={4}
                            value={resignation_reason}
                            onChange={(e) => setresignation_reason(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <CssVarsProvider>
                            <Tooltip title="Save Request" variant="outlined" placement="top">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="danger"
                                    onClick={submitFormData}
                                >
                                    Save Resignation Request
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