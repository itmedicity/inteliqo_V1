import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, IconButton, Paper, TextareaAutosize, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const CareerAdvancement = ({ empid, show }) => {


    const emp_id = useMemo(() => empid, [empid])
    console.log(emp_id);

    const [InchargeValue, SetInchargeValue] = useState(false)
    const [incharge_comment, setincharge_comment] = useState('')
    const [inchargeRes, setinchargeRes] = useState(false)

    const [hodValue, setHodValue] = useState(false)
    const [hodRes, sethodRes] = useState(false)
    const [hod_comment, sethod_comment] = useState('')

    const [ceoValue, setCeoValue] = useState(false)
    const [ceo_comment, setceo_comment] = useState('')
    const [ceoRes, setCeoRes] = useState(false)

    const HigherData = [
        { dslno: 1, dname: 'Probation' },
        { dslno: 2, dname: 'Confirmation' },
        { dslno: 3, dname: 'Promotion' }
    ]

    const Responsibility = [
        { rslno: 1, rname: 'Yes' },
        { rslno: 2, rname: 'No' },
        { rslno: 3, rname: 'Cant Judge Now' }
    ]

    //to get details if already exist incharge, hod submitted their comments
    useEffect(() => {
        const getDetails = async () => {
            const result = await axioslogin.get(`/Performance/check/careerEmpid/${emp_id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { incharge_comment, incharge_data, incharge_res,
                    hod_data, hod_res, hod_comment } = data[0]
                SetInchargeValue(incharge_data)
                setincharge_comment(incharge_comment)
                setinchargeRes(incharge_res)
                setHodValue(hod_data === null ? false : hod_data)
                sethodRes(hod_res === null ? false : hod_res)
                sethod_comment(hod_comment === null ? '' : hod_comment)
            } else {
                SetInchargeValue(0)
                setincharge_comment('')
                setinchargeRes(0)
                setHodValue(0)
                sethodRes(0)
                sethod_comment('')
            }
        }

        getDetails()
    }, [emp_id])

    const getInchargeCmt = async (e) => {
        setincharge_comment(e.target.value)
    }

    const SaveInchargeData = async () => {

        if (incharge_comment === '') {
            infoNofity("Please Add Remarks")
        } else {
            const result = await axioslogin.get(`/Performance/check/careerid/${emp_id}`)
            const { success } = result.data
            if (success === 0) {
                const result = await axioslogin.get(`/Performance/check/careerEmpid/${emp_id}`)
                const { success } = result.data
                if (success === 1) {
                    const postData = {
                        incharge_data: InchargeValue,
                        incharge_res: inchargeRes,
                        incharge_comment: incharge_comment,
                        incharge_status: 1,
                        em_id: emp_id
                    }
                    const results = await axioslogin.patch('/Performance/update/incharge/remark', postData)
                    const { message, success } = results.data
                    if (success === 2) {
                        succesNofity(message)
                        SetInchargeValue(false)
                        setinchargeRes(false)
                        setincharge_comment('')
                    } else {
                        infoNofity(message)
                    }

                } else {
                    const postData = {
                        incharge_data: InchargeValue,
                        incharge_res: inchargeRes,
                        incharge_comment: incharge_comment,
                        incharge_status: 1,
                        em_id: emp_id
                    }
                    const results = await axioslogin.post('/Performance/inchargeremark', postData)
                    const { message, success } = results.data
                    if (success === 1) {
                        succesNofity(message)
                        SetInchargeValue(false)
                        setinchargeRes(false)
                        setincharge_comment('')
                    } else {
                        infoNofity(message)
                    }
                }
            } else {
                warningNofity("HOD Verification Already Done!!")
            }
        }
    }

    const getHodCmt = async (e) => {
        sethod_comment(e.target.value)
    }

    const SaveHodData = async () => {
        if (hod_comment === '') {
            infoNofity("Please Add Remarks")
        } else {
            const result = await axioslogin.get(`/Performance/check/careerEmpid/${emp_id}`)
            const { success } = result.data
            if (success === 0) {
                const postData = {
                    em_id: emp_id,
                    hod_data: hodValue,
                    hod_res: hodRes,
                    hod_comment: hod_comment,
                    hod_status: 1
                }
                const results = await axioslogin.post('/Performance/hodRemark', postData)
                const { message, success } = results.data
                if (success === 1) {
                    succesNofity(message)
                    setHodValue(false)
                    sethodRes(false)
                    sethod_comment('')
                } else {
                    infoNofity(message)
                }
            } else {
                const patchData = {
                    hod_data: hodValue,
                    hod_res: hodRes,
                    hod_comment: hod_comment,
                    hod_status: 1,
                    em_id: emp_id
                }
                const results = await axioslogin.patch('/Performance/update/hod', patchData)
                const { message, success } = results.data
                if (success === 1) {
                    succesNofity(message)
                    setHodValue(false)
                    sethodRes(false)
                    sethod_comment('')
                } else {
                    infoNofity(message)
                }
            }
        }
    }
    const getCeoCmt = async (e) => {
        setceo_comment(e.target.value)
    }

    const SaveCeoData = async () => {
        if (ceo_comment === '') {
            infoNofity("Please Add Remarks")
        } else {
            //checking employee id present in table or not
            const result = await axioslogin.get(`/Performance/check/careerEmpid/${emp_id}`)
            const { success } = result.data
            if (success === 0) {
                //if not present add new entry to table
                const postData = {
                    ceo_data: ceoValue,
                    ceo_res: ceoRes,
                    ceo_comment: ceo_comment,
                    ceo_status: 1,
                    em_id: emp_id
                }
                const results = await axioslogin.post('/Performance/ceoRemark', postData)
                const { message, success } = results.data
                if (success === 1) {
                    succesNofity(message)
                    setCeoValue(false)
                    setCeoRes(false)
                    setceo_comment('')
                } else {
                    infoNofity(message)
                }

            } else {
                //if present update that row
                const patchData = {
                    ceo_data: ceoValue,
                    ceo_res: ceoRes,
                    ceo_comment: ceo_comment,
                    ceo_status: 1,
                    em_id: emp_id
                }
                const results = await axioslogin.patch('/Performance/updateCeoCareer', patchData)
                const { message, success } = results.data
                if (success === 1) {
                    succesNofity(message)
                    setCeoValue(false)
                    setCeoRes(false)
                    setceo_comment('')
                } else {
                    infoNofity(message)
                }
            }
        }
    }

    return (
        <Fragment>
            <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                <Box sx={{ flex: 1, height: 35, pt: 0.5 }} >
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                            Career Advancement
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                <Box sx={{ display: "flex", width: "100%", pt: 1, flexDirection: 'column' }} >
                    {/* For Incharge Use Only */}
                    <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', width: '100%' }} >
                        <Paper square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                            <Box sx={{ flex: 1, fontWeight: 500, }} >
                                <CssVarsProvider>
                                    <Typography sx={{ display: 'flex', }} >
                                        For Incharge Use Only
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 1 }}>

                                {
                                    show === 1 ? <IconButton variant="outlined" size='sm' disabled>
                                        <AddTaskIcon />
                                    </IconButton> : show === 2 ? <IconButton variant="outlined" size='sm' disabled>
                                        <AddTaskIcon />
                                    </IconButton> : <Tooltip title="SAve Incharge Comments" followCursor placement='top' arrow >
                                        <IconButton variant="outlined" size='sm' onClick={SaveInchargeData}>
                                            <AddTaskIcon color='primary' />
                                        </IconButton></Tooltip>
                                }

                            </Box>
                        </Paper>
                        <Box sx={{
                            display: "flex", flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%',

                        }} >
                            <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center' }} >
                                <Box sx={{ display: 'flex', fontStyle: "oblique", pl: 1 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1">Can be considered for</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row', justifyContent: 'center' }}>
                                    {
                                        HigherData && HigherData.map((val, index) => {
                                            return <Box sx={{
                                                display: 'flex',
                                                py: 1, pl: 1,
                                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                            }}
                                                key={val.dslno}
                                            >
                                                <MappingCheckbox
                                                    label={val.dname}
                                                    name={val.dname}
                                                    value={val.dslno}
                                                    onChange={SetInchargeValue}
                                                    checkedValue={InchargeValue}
                                                />
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', }} >
                                <Box sx={{ display: 'flex', flex: 1, pl: 1, fontStyle: "oblique", }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" >Is the appraisee capable of higher responsibility?</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row', justifyContent: 'center' }}>
                                    {
                                        Responsibility && Responsibility.map((val, index) => {
                                            return <Box sx={{
                                                display: 'flex',
                                                pt: 1, pb: 1, pl: 1,
                                                //justifyContent: 'column',
                                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                            }}
                                                key={val.rslno}
                                            >
                                                <MappingCheckbox
                                                    label={val.rname}
                                                    name={val.rname}
                                                    value={val.rslno}
                                                    onChange={setinchargeRes}
                                                    checkedValue={inchargeRes}
                                                />
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, p: 1 }}>
                            <CssVarsProvider>
                                <Typography level="body1" >Comments Here:</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 1 }} >

                            <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={2}
                                placeholder="Comments"
                                name="incharge_comment"
                                value={incharge_comment}
                                onChange={(e) => getInchargeCmt(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', width: '100%' }} >
                        <Paper square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                            <Box sx={{ flex: 1, fontWeight: 500, }} >
                                <CssVarsProvider>
                                    <Typography sx={{ display: 'flex', }} >
                                        For HOD Use Only
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 1 }}>

                                {
                                    show === 1 ?
                                        <IconButton variant="outlined" size='sm' disabled>
                                            <AddTaskIcon />
                                        </IconButton>
                                        : show === 3 ?
                                            <IconButton variant="outlined" size='sm' disabled>
                                                <AddTaskIcon />
                                            </IconButton>
                                            : <IconButton variant="outlined" size='sm' onClick={SaveHodData} >
                                                <Tooltip title="Save HOD Comments" followCursor placement='top' arrow >
                                                    <AddTaskIcon color='primary' />
                                                </Tooltip>
                                            </IconButton>
                                }
                            </Box>
                        </Paper>
                        <Box sx={{
                            display: "flex", flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%',

                        }} >
                            <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center' }} >
                                <Box sx={{ display: 'flex', fontStyle: "oblique", pl: 1 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" >Can be considered for</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row', justifyContent: 'center' }}>
                                    {
                                        HigherData && HigherData.map((val, index) => {
                                            return <Box sx={{
                                                display: 'flex',
                                                pt: 1, pb: 1, pl: 1,
                                                //justifyContent: 'column',
                                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                            }}
                                                key={val.dslno}
                                            >
                                                <MappingCheckbox
                                                    label={val.dname}
                                                    name={val.dname}
                                                    value={val.dslno}
                                                    onChange={setHodValue}
                                                    checkedValue={hodValue}
                                                />
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', }} >
                                <Box sx={{ display: 'flex', flex: 1, pl: 1, fontStyle: "oblique", }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" >Is the appraisee capable of higher responsibility?</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row', justifyContent: 'center' }}>
                                    {
                                        Responsibility && Responsibility.map((val, index) => {
                                            return <Box sx={{
                                                display: 'flex',
                                                pt: 1, pb: 1, pl: 1,
                                                //justifyContent: 'column',
                                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                            }}
                                                key={val.rslno}
                                            >
                                                <MappingCheckbox
                                                    label={val.rname}
                                                    name={val.rname}
                                                    value={val.rslno}
                                                    onChange={sethodRes}
                                                    checkedValue={hodRes}
                                                />
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, p: 1 }}>
                            <CssVarsProvider>
                                <Typography level="body1" >Comments Here:</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 1 }} >
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={2}
                                placeholder="Comments"
                                name="hod_comment"
                                value={hod_comment}
                                onChange={(e) => getHodCmt(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', width: '100%' }} >
                        <Paper square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                            <Box sx={{ flex: 1, fontWeight: 500, }} >
                                <CssVarsProvider>
                                    <Typography sx={{ display: 'flex', }} >
                                        For CEO Use Only
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 1 }}>

                                {
                                    show === 2 ?
                                        <IconButton variant="outlined" size='sm' disabled>
                                            <AddTaskIcon />
                                        </IconButton>
                                        : show === 3 ?
                                            <IconButton variant="outlined" size='sm' disabled>
                                                <AddTaskIcon />
                                            </IconButton>
                                            : <Tooltip title="Save CEO Comments" followCursor placement='top' arrow >
                                                <IconButton variant="outlined" size='sm'
                                                    onClick={SaveCeoData}
                                                >
                                                    <AddTaskIcon color='primary' />
                                                </IconButton>
                                            </Tooltip>
                                }
                            </Box>
                        </Paper>
                        <Box sx={{
                            display: "flex", flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%',

                        }} >
                            <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center' }} >
                                <Box sx={{ display: 'flex', fontStyle: "oblique", pl: 1 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" >Can be considered for</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row', justifyContent: 'center' }}>
                                    {
                                        HigherData && HigherData.map((val, index) => {
                                            return <Box sx={{
                                                display: 'flex',
                                                pt: 1, pb: 1, pl: 1,
                                                //justifyContent: 'column',
                                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                            }}
                                                key={val.dslno}
                                            >
                                                <MappingCheckbox
                                                    label={val.dname}
                                                    name={val.dname}
                                                    value={val.dslno}
                                                    onChange={setCeoValue}
                                                    checkedValue={ceoValue}
                                                />
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, flexDirection: 'column', justifyContent: 'center', }} >
                                <Box sx={{ display: 'flex', flex: 1, pl: 1, fontStyle: "oblique", }}>
                                    <CssVarsProvider>
                                        <Typography level="body1" >Is the appraisee capable of higher responsibility?</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row', justifyContent: 'center', pt: 1 }}>
                                    {
                                        Responsibility && Responsibility.map((val, index) => {
                                            return <Box sx={{
                                                display: 'flex',
                                                pt: 1, pb: 1, pl: 1,
                                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                            }}
                                                key={val.rslno}
                                            >
                                                <MappingCheckbox
                                                    label={val.rname}
                                                    name={val.rname}
                                                    value={val.rslno}
                                                    onChange={setCeoRes}
                                                    checkedValue={ceoRes}
                                                />
                                            </Box>
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, p: 1 }}>
                            <CssVarsProvider>
                                <Typography level="body1" >Comments Here:</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 1 }} >
                            <TextareaAutosize
                                style={{ width: "100%", display: "flex", borderRadius: 4, borderColor: "#c4c4c4", paddingLeft: 13 }}
                                minRows={2}
                                placeholder="Comments"
                                name="ceo_comment"
                                value={ceo_comment}
                                onChange={(e) => getCeoCmt(e)}
                            />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(CareerAdvancement) 