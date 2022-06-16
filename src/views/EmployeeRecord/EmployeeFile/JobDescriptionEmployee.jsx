import React, { Fragment, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
const JobDescriptionEmployee = () => {
    const { id, no } = useParams();
    const history = useHistory();
    //redirecting to home page
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    const [JobDesc, setJobDesc] = useState([])
    const [jobsummary, setjobsummary] = useState([])
    const empdata = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })
    useEffect(() => {
        const postData = {
            designation: empdata.em_designation,
            department: empdata.em_department
        }
        const getjobdescription = async () => {
            const result = await axioslogin.post('/jobdescription/jobdesc', postData)
            const { success, data } = result.data
            if (success === 1) {
                console.log(data)
                setJobDesc(data)
                const jobsummary = data.filter((val) => {
                    if (val.job_Summary !== null) {
                        return 1
                    }
                })
                setjobsummary(jobsummary)
            }
            else {
                setJobDesc([])
            }
        }
        getjobdescription()
    }, [empdata.em_designation, empdata.em_department])
    console.log(jobsummary)
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Job Description"
                redirect={RedirectToProfilePage}
            >
                <div className="card">
                    <div className="card-body">
                        <div className="card">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-1"></div>
                                    <div className="col-md-4">
                                        <div className="row p-2">
                                            <div className="col-md-4">
                                                <Typography noWrap>Job Description</Typography>
                                            </div>
                                            <div className="col-md-6">
                                                <Typography noWrap>{empdata.dept_name}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row pt-2">
                                            <div className="col-md-4">
                                                <Typography noWrap>Job Title</Typography>
                                            </div>
                                            <div className="col-md-4">
                                                <Typography noWrap>{empdata.desg_name}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-1"></div>
                                    <div className="col-md-2">
                                        <Typography noWrap>Job Summary:</Typography>
                                    </div>
                                    <div className="col-md-6 p-0">
                                        <Typography noWrap>{jobsummary.length === 0 ? '' : jobsummary[0].job_Summary}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="col-md-12">
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow style={{ backgroundColor: "#a2a3ac", height: '1rem' }} >
                                                    <TableCell align="left" className="p-0" style={{ width: '2rem', }}></TableCell>
                                                    <TableCell align="left" className="p-0" style={{ width: '20rem', }}>Job Description</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    JobDesc && JobDesc.map((val) => {
                                                        return <TableRow key={val.description_slno}>
                                                            <TableCell align="left" className="p-0" style={{ width: '2rem', }}>{val.description_slno}</TableCell>
                                                            <TableCell align="left" className="p-0" style={{ width: '20rem', }}>{val.job_desription}</TableCell>
                                                        </TableRow>
                                                    })
                                                }
                                            </TableBody>
                                        </Table>

                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </PageLayoutCloseOnly>

        </Fragment>
    )
}

export default JobDescriptionEmployee