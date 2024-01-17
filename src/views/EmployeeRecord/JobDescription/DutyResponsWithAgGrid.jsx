import { CssVarsProvider, Textarea } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper } from '@mui/material'
import React, { Fragment, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { memo } from 'react';
import { useCallback } from 'react';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { IconButton as OpenIcon } from '@mui/material';

const DutyResponsWithAgGrid = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {

    const [slno, setSlno] = useState(0)
    const [value, setvalue] = useState(0)
    const [submitflag, setsubmitflag] = useState(0)

    //table
    const [tableData, settableData] = useState([])
    const [deletecount, setdeletecount] = useState(0)

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

    //colomun for table
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', width: 50, },
        { headerName: 'Duties & Responsibilities ', field: 'duties_and_resp', autoHeight: true, wrapText: true, minWidth: 200, },
        {
            headerName: 'Edit', width: 20, cellRenderer: params =>
                <OpenIcon sx={{ mb: 1 }} size='sm' color='primary' onClick={() => EditData(params)}>
                    <EditIcon />
                </OpenIcon>
        },
        {
            headerName: 'Delete', width: 20, cellRenderer: params =>
                <OpenIcon sx={{ mb: 1 }} size='sm' color='primary' onClick={() => DeleteItem(params)}>
                    <DeleteIcon />
                </OpenIcon>
        },
    ])

    const checkData = useMemo(() => {
        return {
            designation: selectDesignation,
            dept_id: selectedDept,
            sect_id: selectDeptSection
        }
    }, [selectDesignation, selectedDept, selectDeptSection])

    useEffect(() => {
        if (selectDesignation !== 0) {
            settableData([])
        }
    }, [selectDesignation])
    //use effect for getting data for edit

    useEffect(() => {
        if (jobedit > 0 || submitflag === 1) {
            const getdutiesandResp = async () => {
                const result = await axioslogin.post('/jobsummary/getJobDuties', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    settableData(data)
                    setdeletecount(0)
                } else {
                    settableData([])
                }
            }
            getdutiesandResp()
        } else {
            settableData([])
        }

        return () => {
            settableData([])
        }

    }, [jobedit, deletecount, checkData, submitflag])

    const TableValues = useMemo(() => tableData, [tableData])

    //for deletion process
    const DeleteItem = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const value = data && data.map((val) => {
            return val.duties_slno
        })
        const deltevalue = async (value) => {
            const result = await axioslogin.delete(`/jobsummary/deletedata/select/${value}`)
            const { success, message } = result.data
            if (success === 5) {
                succesNofity(message)
                setdeletecount(deletecount + 1)
                //setflag(1)
            }
            else {
                warningNofity(message)
            }
        }
        deltevalue(value)
    }, [deletecount,])

    //edit data select
    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { duties_slno, duties_and_resp } = data[0]
        const formData = {
            duties: duties_and_resp
        }
        setFormData(formData)
        setSlno(duties_slno)
    }, [])

    const SubmitFormData = useCallback((e) => {
        e.preventDefault();
        //submit new data
        const submitFunc = async (checkData) => {
            const result = await axioslogin.post('/jobsummary/check', checkData)
            const { data, success } = result.data
            if (success === 1) {
                const { summary_slno } = data[0]
                const saveDuties = {
                    job_id: summary_slno,
                    duties_and_resp: duties,
                    dept_id: selectedDept,
                    designation: selectDesignation,
                    sect_id: selectDeptSection
                }
                const result = await axioslogin.post('/jobsummary/jobduties', saveDuties)
                const { success, message } = result.data
                if (success === 1) {
                    setFormData(defaultstate)
                    setdeletecount(deletecount + 1)
                    setsubmitflag(1)
                    setvalue(0)
                    succesNofity(message)
                } else {
                    errorNofity(message)
                }
            }
            else if (success === 0) {
                infoNofity("Please Save Job Summary Before Saving Job Specification")
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }

        //update data to database
        const updateEach = async () => {
            const patchDuties = {
                duties_and_resp: duties,
                duties_slno: slno
            }
            const result = await axioslogin.patch('/jobsummary/updatedutieseach', patchDuties)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setdeletecount(deletecount + 1)
                setFormData(defaultstate)
                setSlno(0)
                setvalue(0)
            }
            else {
                warningNofity(message)
            }
        }
        if (value === 0 && duties !== '') {
            submitFunc(checkData)
        }
        else if (duties === '' && value === 0) {
            infoNofity("Please Add Duties and Responsiblities!!")
        }
        else {
            updateEach()
        }
    }, [checkData, deletecount, duties, selectDeptSection, selectDesignation, selectedDept, value, defaultstate, slno])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ flex: 1 }} >
                <CssVarsProvider>
                    <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                        Duties & Responsibilities
                    </Typography>
                </CssVarsProvider>
            </Box>
            <Paper square variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                    <Box sx={{ flex: 1, pr: 1 }}>
                        <Textarea
                            label="Outlined"
                            placeholder="Duties & Responsibilities"
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
                        <IconButton variant="outlined" size='sm' onClick={SubmitFormData} sx={{ color: 'green' }}>
                            <LibraryAddCheckOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Paper>
            <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                <CommonAgGrid columnDefs={columnDef}
                    tableData={TableValues}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={30} headerHeight={30} />
            </Paper>
        </Fragment>
    )
}

export default memo(DutyResponsWithAgGrid)