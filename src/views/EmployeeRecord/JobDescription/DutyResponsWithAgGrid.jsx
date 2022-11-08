import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Paper, TextareaAutosize } from '@mui/material'
import React, { Fragment, useMemo, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
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

const DutyResponsWithAgGrid = ({ jobedit, selectDesignation, selectedDept, selectDeptSection }) => {

    const [slno, setSlno] = useState(0)
    const [value, setvalue] = useState(0)
    const [submitflag, setsubmitflag] = useState(0)

    //table
    const [tableData, settableData] = useState([])
    const [deletecount, setdeletecount] = useState(0)
    const [count, setcount] = useState(0)

    const [formData, setFormData] = useState({
        duties: ''
    })
    const defaultstate = {
        duties: ''
    }
    const { duties } = formData
    const updateDutiesandResponsibility = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }
    //colomun for table
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', width: 50, },
        { headerName: 'Duties & Responsibilities ', field: 'duties_and_resp', autoHeight: true, wrapText: true, minWidth: 200, },
        //{ headerName: 'Department', field: 'dept_name', width: 60, },
        //{ headerName: 'Designation', field: 'desg_name', width: 60, },
        { headerName: 'Edit', width: 20, cellRenderer: params => <EditIcon onClick={() => EditData(params)} /> },
        { headerName: 'Delete', width: 20, cellRenderer: params => <DeleteIcon onClick={() => DeleteItem(params)} /> },
    ])
    const checkData = {
        designation: selectDesignation,
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }

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
                }
                else {
                    settableData([])
                }
            }
            getdutiesandResp()
        }
        else {
            settableData([])
        }

        return () => {
            settableData([])
        }

    }, [jobedit, deletecount, submitflag])

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
    }, [])

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
    })

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
                    setcount(count + 1)
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
    }, [checkData, count])

    return (
        <Fragment>
            <ToastContainer />
            {/* Description */}
            <Box sx={{ p: 1, display: "flex" }} >
                <CssVarsProvider>
                    <Typography
                        startDecorator={<DragIndicatorOutlinedIcon color='success' />}
                        level="body2"
                        sx={{ flex: 2 }}
                    >
                        Duties & Responsibilities
                    </Typography>
                </CssVarsProvider>
                {/* <Box sx={{ flex: 0 }} >
                    <IconButton variant="outlined" size='sm'
                        //onClick={SubmitFormData} 
                        sx={{ color: 'green' }}>
                        <LibraryAddCheckOutlinedIcon />
                    </IconButton>
                </Box> */}
            </Box>

            {/* Dutieds And Responsibilities */}

            <Paper square elevation={3} sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                    <Box sx={{ flex: 1, pr: 1 }}>
                        <TextareaAutosize
                            style={{ width: "100%", display: "flex" }}
                            minRows={2}
                            placeholder="Duties & Responsibilities"
                            value={duties}
                            name="duties"
                            onChange={(e) => updateDutiesandResponsibility(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 0, }} >
                        <IconButton variant="outlined" size='sm'
                            onClick={SubmitFormData}
                            sx={{ color: 'blue' }}>
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>

                </Box>
            </Paper>
            <Paper square elevation={0} sx={{
                pt: 1,
                mt: 0.5,
                display: 'flex',
                flexDirection: "column"
            }} >
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