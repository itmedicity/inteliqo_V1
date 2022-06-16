import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextareaAutosize } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { FcPlus } from "react-icons/fc";
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { TableContainer } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useHistory } from 'react-router'
import JobDescriptionEdit from './JobDescriptionEdit';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';

const JobDescription = () => {
    const history = useHistory()
    const { selectDesignation, selectedDept } = useContext(PayrolMasterContext);
    const [JobDesc, setJobDesc] = useState([])
    const [count, setcount] = useState(0)
    const [jobsumry, setjobsumry] = useState(0)
    const [jobslno, setjobslno] = useState(0)
    const [formData, setFormData] = useState({
        job_description: '',
        job_summary: ''
    })
    const defaultState = {
        job_description: '',
        job_summary: ''
    }
    const { job_description, job_summary } = formData
    const updatejob_description = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        designation: selectDesignation,
        department: selectedDept,
        job_desription: job_description,
        job_Summary: jobsumry === 1 ? null : job_summary
    }
    const InsertJobDescription = async () => {
        const result = await axioslogin.post('/jobdescription', postData)
        const { success, message } = result.data
        if (success === 1) {
            setcount(count + 1)
            succesNofity("Job Description Added")
            setFormData(defaultState)
        }
        else {
            warningNofity(message)
        }
    }
    useEffect(() => {
        const postData = {
            designation: selectDesignation,
            department: selectedDept
        }
        if (selectDesignation !== 0 && selectedDept !== 0) {
            const getjobdescription = async () => {
                const result = await axioslogin.post('/jobdescription/jobdesc', postData)
                const { success, data } = result.data
                if (success === 1) {
                    setJobDesc(data)
                    const jobsummary = data.filter((val) => {
                        if (val.job_Summary !== null) {
                            return 1
                        }
                    })
                    const frmdata = {
                        job_summary: jobsummary[0].job_Summary
                    }
                    setFormData(frmdata)
                    jobsummary.length === 0 ? setjobsumry(0) : setjobsumry(1)

                }
                else {
                    setJobDesc([])
                }
            }
            getjobdescription()
        }

    }, [selectDesignation, count, selectedDept])
    //edit job description
    const getJobDescription = async (slno) => {
        setjobslno(slno)

    }
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Job Description"
                redirect={RedirectToProfilePage}
            >

                <div className="card">
                    <div className="card-body">
                        {
                            jobslno === 0 ?
                                <div className="col-md-12">
                                    <div className="row g-1">
                                        <div className="col-md-2 pt-2">
                                            <DepartmentSelect style={SELECT_CMP_STYLE} />
                                        </div>
                                        <div className="col-md-2 pt-2">
                                            <DesignationMast style={SELECT_CMP_STYLE} />
                                        </div>
                                        <div className="col-md-3">
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Job Summary"
                                                style={{ width: 380, height: 60 }}
                                                name="job_summary"
                                                value={job_summary}
                                                onChange={(e) => updatejob_description(e)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <TextareaAutosize
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Job Description"
                                                style={{ width: 500, height: 60 }}
                                                name="job_description"
                                                value={job_description}
                                                onChange={(e) => updatejob_description(e)}
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <IconButton
                                                aria-label="add"
                                                style={{ padding: '0.9rem' }}
                                                onClick={InsertJobDescription}
                                            >
                                                <FcPlus className="text-info" size={30} />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                                : <JobDescriptionEdit jobslno={jobslno} count={count} setcount={setcount} setjobslno={setjobslno} />
                        }

                        {
                            selectDesignation !== 0 && selectedDept !== 0 ?
                                <div className="card">
                                    <div className="col-md-12">
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }} >
                                                        <TableCell align="left" className="p-0" style={{ width: '1rem', }}>Sl No</TableCell>
                                                        <TableCell align="left" className="p-0" style={{ width: '20rem', }}>Job Description</TableCell>
                                                        <TableCell align="center" className="p-0" style={{ width: '0.5rem', }}>
                                                            <IconButton
                                                                aria-label="add"
                                                                disabled={true}
                                                                color="primary"
                                                            >
                                                                <EditOutlinedIcon size={10} color="primary" />
                                                            </IconButton></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        JobDesc && JobDesc.map((val) => {
                                                            return <TableRow key={val.description_slno}>
                                                                <TableCell align="left">{val.description_slno}</TableCell>
                                                                <TableCell align="left">{val.job_desription}</TableCell>
                                                                <TableCell align="center" >
                                                                    <IconButton
                                                                        aria-label="add"
                                                                        color="primary"
                                                                        onClick={(e) => {
                                                                            getJobDescription(val.description_slno)
                                                                        }}
                                                                    >
                                                                        <EditOutlinedIcon size={30} color="primary" />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default JobDescription