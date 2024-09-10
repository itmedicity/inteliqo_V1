import { Box, IconButton, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Paper } from '@mui/material';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { ToastContainer } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const DutiesAndRes = ({ selectDesignation, selectedDept }) => {
    const [tableData, settableData] = useState([])
    const [Count, setCount] = useState(0)
    const [slno, setSlno] = useState(0)
    const [value, setvalue] = useState(0)

    const TableValues = useMemo(() => tableData, [tableData])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', width: 20, },
        { headerName: 'Job Description', field: 'job_desc', autoHeight: true, wrapText: true, },
        {
            headerName: 'Edit', width: 20, cellRenderer: params =>
                <IconButton sx={{ mb: 1 }} size='sm' color='primary'
                    onClick={() => EditData(params)}
                >
                    <EditIcon />
                </IconButton>
        },
        {
            headerName: 'Delete', width: 20, cellRenderer: params =>
                <IconButton sx={{ mb: 1 }} size='sm' color='primary'
                    onClick={() => DeleteItem(params)}
                >
                    <DeleteIcon />
                </IconButton>
        },
    ])

    const [formData, setFormData] = useState({
        duties: ''
    })


    const defaultstate = useMemo(() => {
        return {
            duties: ''
        }
    }, [])

    const { duties } = formData


    const updateDutiesandResponsibility = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }, [formData])
    const checkData = useMemo(() => {
        return {
            designation: selectDesignation,
            Dept_id: selectedDept,

        }
    }, [selectDesignation, selectedDept])

    //for getting the job desc from database
    useEffect(() => {
        if (selectDesignation !== 0) {
            const getdutiesandResp = async () => {
                const result = await axioslogin.post('/JobAndSkillDesc/getJobDesc', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    settableData(data)
                    setCount(0)
                } else {
                    settableData([])
                    warningNofity("No JobDescription added")

                }
            }
            getdutiesandResp()
        } else {
            settableData([])
        }
        return () => {
            settableData([])
        }

    }, [checkData, Count])


    //edit data select
    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { jobdiscription_skillsSlno, job_desc } = data[0]
        const formData = {
            duties: job_desc
        }
        setFormData(formData)
        setSlno(jobdiscription_skillsSlno)
    }, [])

    const PersonalData = useMemo(() => {
        return {
            designation: selectDesignation,
            Dept_id: selectedDept,
            duties: duties
        }
    }, [selectDesignation, selectedDept, duties])

    //for save and edit
    const SubmitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (value === 0 && duties !== '') {
            const result = await axioslogin.post('/JobAndSkillDesc/InsertJobDesc', PersonalData)
            const { message, success } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(1)
                setFormData(defaultstate)
            }
            else {
                warningNofity(message)
            }
        }
        else if (duties === '' && value === 0) {
            infoNofity(" Add Job Description!!")
        }
        else {
            const patchDuties = {
                duties_and_resp: duties,
                duties_slno: slno
            }
            const result = await axioslogin.patch('/JobAndSkillDesc/updatedutieseach', patchDuties)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(1)
                setFormData(defaultstate)
                setSlno(0)
                setvalue(0)
            }
            else {
                warningNofity(message)
            }
        }

    }, [PersonalData, duties, selectDesignation, selectedDept, defaultstate, setCount, slno])


    //for delete
    const DeleteItem = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const value = data && data.map((val) => {
            return val.jobdiscription_skillsSlno
        })
        const deltevalue = async (value) => {
            const result = await axioslogin.delete(`/JobAndSkillDesc/deletedata/select/${value}`)
            const { success, message } = result.data
            if (success === 5) {
                succesNofity(message)
                setCount(1)
            }
            else {
                warningNofity(message)
            }
        }
        deltevalue(value)
    }, [setCount])


    return (
        <Box sx={{}}>
            <ToastContainer />
            <Box sx={{ flex: 1, mt: 1 }} >

                <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                    Job Descriptions
                </Typography>

            </Box>
            <Paper square variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                    <Box sx={{ flex: 1, pr: 1 }}>
                        <Textarea
                            label="Outlined"
                            placeholder="Job Description"
                            variant="outlined"
                            size="lg"
                            minRows={1}
                            maxRows={2}
                            name='duties'
                            value={duties}
                            onChange={(e) => updateDutiesandResponsibility(e)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Box sx={{ flex: 0, px: 0.5 }} >
                        <IconButton variant="outlined" size='sm'
                            onClick={SubmitFormData}
                            sx={{ color: 'green' }}>
                            <LibraryAddCheckOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
            <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={TableValues}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={30} headerHeight={30} />
            </Paper>
        </Box>)
}

export default memo(DutiesAndRes)