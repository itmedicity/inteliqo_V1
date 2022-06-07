import React, { Fragment, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { useHistory, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import TextInput from 'src/views/Component/TextInput'
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
    const empdata = useSelector((state) => {
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })
    useEffect(() => {
        const getjobdescription = async () => {
            const result = await axioslogin.get(`/jobdescription/${empdata.em_designation}`)
            const { success, data } = result.data
            if (success === 1) {
                setJobDesc(data)
            }
            else {
                setJobDesc([])
            }
        }
        getjobdescription()
    }, [empdata.em_designation])
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
                                    <div className="col-md-3">
                                        <div className="row p-2">
                                            <div className="col-md-3">
                                                <Typography>Emp ID:</Typography>
                                            </div>
                                            <div className="col-md-3">
                                                <Typography>{empdata.em_no}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="row pt-2">
                                            <div className="col-md-4">
                                                <Typography>Employee Name</Typography>
                                            </div>
                                            <div className="col-md-4">
                                                <Typography>{empdata.em_name}</Typography>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="row pt-2">
                                            <div className="col-md-4">
                                                <Typography>Designation</Typography>
                                            </div>
                                            <div className="col-md-4">
                                                <Typography>{empdata.desg_name}</Typography>
                                            </div>
                                        </div>
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
                                                    <TableCell align="center" className="p-0" style={{ width: '20rem', }}>Job Description</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    JobDesc && JobDesc.map((val) => {
                                                        return <TableRow key={val.description_slno}>
                                                            <TableCell align="left">{val.job_desription}</TableCell>
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