import {
    CardHeader, Divider
} from '@mui/material';
import React, { Fragment } from 'react';

import { useParams } from 'react-router';
import EmployeeProfileCard from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EmployeeProfileCard';
import EmployeeProfileCardMenuList from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EmployeeProfileCardMenuList';
import EmployeeProfileCardFooter from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EmployeeProfileCardFooter';
import EmployeeProfileMessage from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EmployeeProfileMessage';
import EmployeeProfileNotification from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EmployeeProfileNotification';
import EmployeeProfileAlert from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/EmployeeProfileAlert';
import SessionCheck from 'src/views/Axios/SessionCheck';
import { ToastContainer } from 'react-toastify';

const EmployeeProfile = () => {

    const empCredential = useParams()

    // const history = useHistory()
    // const { id, no } = useParams()
    // // Application Form Route
    // const appplicationform = () => {
    //     history.push(`/Home/ApplicationForm/${4516}`)
    // }
    // // Personal Information
    // const personalInformation = () => {
    //     history.push(`/Home/PersonalInformation/${id}/${no}`)
    // }
    // //Employee Qualification
    // const EmpQualification = () => {
    //     history.push(`/Home/EmployeeQualification/${id}/${no}`)
    // }
    // //Employee Experience
    // const Employeexperience = () => {
    //     history.push(`/Home/EmployeeExperience/${id}/${no}`)
    // }
    // //Statutory Informnation
    // const StatutoryInformation = () => {
    //     history.push(`/Home/StatutoryInformation/${id}/${no}`)
    // }
    // //Contract Informnation
    // const ContractInformation = () => {
    //     history.push(`/Home/ContractInformation/${id}/${no}`)
    // }
    // //Employee Company
    // const EmployeeCompany = () => {
    //     history.push(`/Home/EmployeeCompany/${4516}`)
    // }
    // //Salary Information
    // const SalaryInformation = () => {
    //     history.push(`/Home/SalaryInformation/${4516}`)
    // }
    // //Allownace Information
    // const allowance = () => {
    //     history.push(`/Home/EmployeeAllowance/${id}/${no}`)
    // }
    // //Annual Leave Settngs
    // const AnnualLeaveSettings = () => {
    //     history.push(`/Home/AnnualLeaveSettings/${4516}`)
    // }
    // //Employee Training
    // const EmployeeTrainingInformation = () => {
    //     history.push(`/Home/EmployeeTraining/${4516}`)
    // }
    // //Salary Increment Settings
    // const SalaryIncrementSettings = () => {
    //     history.push(`/Home/SalaryIncrement/${4516}`)
    // }
    // //Employee document checklist
    // const Employeedocumentchecklist = () => {
    //     history.push(`/Home/EmployeeDocumentChecklist/${4516}`)
    // }
    // //Vaccination Information
    // const Vaccinationinformation = () => {
    //     history.push(`/Home/VaccinationInformation/${4516}`)
    // }
    // //fine or other deduction
    // const fineorotherdeduction = () => {
    //     history.push(`/Home/FineorDeduction/${4516}`)
    // }
    // //employee end of service
    // const endofservice = () => {
    //     history.push(`/Home/EmployeeEndofService/${4516}`)
    // }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card "
                style={
                    {
                        borderRadius: 20,
                        top: '10%',
                        bottom: '10%',
                    }
                }>
                <CardHeader
                    titleTypographyProps={{
                        variant: 'button',
                    }}
                    title="Employee Personal  Record"
                    sx={{
                        textAlign: "left",
                        paddingY: 1
                    }}
                />
                <Divider variant="middle" />
                <div className="card-body align-items-center"
                    style={
                        {
                            backgroundColor: '#EEF4F7',
                            // borderTopLeftRadius: 20,
                            // borderTopRightRadius: 20,
                            height: '50%'
                        }
                    } >
                    <div className="row g-2 ">
                        <div className="col-md-3 col-sm-12 d-flex justify-content-evenly">
                            <EmployeeProfileCard />
                        </div>
                        <div className="col-md-9 d-flex justify-content-evenly">
                            <div className="col-md-11 col-lg-12">
                                <EmployeeProfileCardMenuList empid={empCredential} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <EmployeeProfileCardFooter />
                </div>
            </div>

            <div className="card mt-2" style={{ borderRadius: 15 }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <EmployeeProfileMessage />
                        </div>
                        <div className="col-md-4">
                            <EmployeeProfileNotification />
                        </div>
                        <div className="col-md-4">
                            <EmployeeProfileAlert />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmployeeProfile
