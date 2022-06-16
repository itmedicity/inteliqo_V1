import { IconButton, TextareaAutosize } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { FcPlus } from "react-icons/fc";
import { axioslogin } from 'src/views/Axios/Axios';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';

const JobDescriptionEdit = ({ jobslno, count, setcount, setjobslno }) => {
    const { selectDesignation, updateDesignation, selectedDept, updateSelected } = useContext(PayrolMasterContext);
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
        job_Summary: job_summary,
        description_slno: jobslno
    }
    const InsertJobDescription = async () => {
        const result = await axioslogin.patch('/jobdescription', postData)
        const { success, message } = result.data
        if (success === 2) {
            setFormData(defaultState)
            setcount(count + 1)
            succesNofity("Job Description Added")
            setjobslno(0)
        }
        else {
            warningNofity(message)
        }
    }
    useEffect(() => {
        const getjobdescBySlno = async () => {
            const result = await axioslogin.get(`/jobdescription/select/${jobslno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { designation, job_desription, department, job_Summary } = data[0]
                const frmdata = {
                    job_description: job_desription,
                    job_summary: job_Summary === null ? '' : job_Summary
                }
                updateDesignation(designation)
                updateSelected(department)
                setFormData(frmdata)
            }
        }
        getjobdescBySlno()
    }, [jobslno])
    return (
        <Fragment>
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
                            placeholder="Job Description"
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
        </Fragment>
    )
}

export default JobDescriptionEdit