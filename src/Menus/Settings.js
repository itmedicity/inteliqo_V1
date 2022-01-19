import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
    return (
        <div>
            {/* Payroll Master */}
            <div className="card"  >

                {/* Payroll Master User Rights Start Here */}

                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h5 >Payroll Master</h5>
                </div>
                <div className="card-body">
                    <div className="row" >
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <Link to="/Home/DepartmentMaster" className="list-group-item pt-1 pb-1"  > Department Name</Link>
                                <Link to="/Home/DeptSection" className="list-group-item pt-1 pb-1"  > Department Section</Link>
                                <Link to="/Home/EmployeeType" className="list-group-item pt-1 pb-1"  > Employee Type</Link>
                                <Link to="/Home/DesignationType" className="list-group-item pt-1 pb-1"  > Designation Type</Link>
                                <Link to="/Home/Designation" className="list-group-item pt-1 pb-1"  > Designation</Link>
                                <Link to="/Home/Qualification" className="list-group-item pt-1 pb-1"  > Qualification</Link>
                                <Link to="/Home/District" className="list-group-item pt-1 pb-1"  > District</Link>
                                <Link to="/Home/LeaveTypeMaster" className="list-group-item pt-1 pb-1"  > Leave Type</Link>
                                <Link to="/Home/EducationMaster" className="list-group-item pt-1 pb-1"  > Education Master</Link>
                                <Link to="/Home/DepartmentShift" className="list-group-item pt-1 pb-1"  > Department Shift Master</Link>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <Link to="/Home/University" className="list-group-item pt-1 pb-1"  > University</Link>
                                <Link to="/Home/Specialization" className="list-group-item pt-1 pb-1"  > Specialization</Link>
                                <Link to="/Home/EmpDesignationType" className="list-group-item pt-1 pb-1"  > Employee Institution Type</Link>
                                <Link to="/Home/Branch" className="list-group-item pt-1 pb-1"  > Branch Master</Link>
                                <Link to="/Home/Bank" className="list-group-item pt-1 pb-1"  > Bank</Link>
                                <Link to="/Home/Region" className="list-group-item pt-1 pb-1"  > Region</Link>
                                <Link to="/Home/DoctorType" className="list-group-item pt-1 pb-1"  > Doctor Type</Link>
                                <Link to="/Home/YearlyLeaveCount" className="list-group-item pt-1 pb-1"  >Yearly Leave Count</Link>
                                <Link to="/Home/CourseMaster" className="list-group-item pt-1 pb-1"  > Course Master</Link>
                                <Link to="/Home/LeaveRequestType" className="list-group-item pt-1 pb-1"  > Leave Request Type Master</Link>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <Link to="/Home/EmploymentType" className="list-group-item pt-1 pb-1"  >Employee Category</Link>
                                <Link to="/Home/EarnDeduct" className="list-group-item pt-1 pb-1"  > Earning/Deduction</Link>
                                <Link to="/Home/EarnType" className="list-group-item pt-1 pb-1"  > Earn Type Master</Link>
                                <Link to="/Home/ShiftMaster" className="list-group-item pt-1 pb-1"  > Shift Master</Link>
                                <Link to="/Home/Grade" className="list-group-item pt-1 pb-1"  > Grade Master</Link>
                                <Link to="/Home/State" className="list-group-item pt-1 pb-1"  > State</Link>
                                <Link to="/Home/ReligionMaster" className="list-group-item pt-1 pb-1"  >Religion Master</Link>
                                <Link to="/Home/YearlyLeaveCalendar" className="list-group-item pt-1 pb-1"  >Yearly Leave Calendar</Link>
                                <Link to="/Home/RegistrationType" className="list-group-item pt-1 pb-1"  >Registration Type</Link>
                                <Link to="/Home/BoardEdu" className="list-group-item pt-1 pb-1">Board Master</Link>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* User Management Start Here */}

                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h5 >User Management</h5>
                </div>

                <div className="card-body">
                    <div className="row" >
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                <Link to="/Home/ModuleGroupMaster" className="list-group-item pt-1 pb-1"  > Module Group Master</Link>
                                <Link to="/Home/ModuleUserRights" className="list-group-item pt-1 pb-1"  > User Group Rights</Link>
                                <Link to="/Home/UserGroup" className="list-group-item pt-1 pb-1"  > Group Master</Link>
                                <Link to="/Home/GroupRights" className="list-group-item pt-1 pb-1"  > Group Rights</Link>
                                <Link to="/Home/Authorisation" className="list-group-item pt-1 pb-1"  >Assign Authorisation</Link>
                                <Link to="/Home/HodMark" className="list-group-item pt-1 pb-1"  > HOD Authorisation Mark</Link>
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {/* <Link to="/Home/University" className="list-group-item pt-1 pb-1"  > University</Link>
                                <Link to="/Home/Specialization" className="list-group-item pt-1 pb-1"  > Specialization</Link>
                                <Link to="/Home/EmpDesignationType" className="list-group-item pt-1 pb-1"  > Employee Institution Type</Link>
                                <Link to="/Home/Branch" className="list-group-item pt-1 pb-1"  > Branch Master</Link>
                                <Link to="/Home/Bank" className="list-group-item pt-1 pb-1"  > Bank</Link>
                                <Link to="/Home/Region" className="list-group-item pt-1 pb-1"  > Region</Link> */}
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {/* <Link to="/Home/EmploymentType" className="list-group-item pt-1 pb-1"  >Employee Category</Link>
                                <Link to="/Home" className="list-group-item pt-1 pb-1"  > Earning/Deduction</Link>
                                <Link to="/Home" className="list-group-item pt-1 pb-1"  > Earn Type Master</Link>
                                <Link to="/Home" className="list-group-item pt-1 pb-1"  > Shift Master</Link>
                                <Link to="/Home" className="list-group-item pt-1 pb-1"  > Grade Master</Link>
                                <Link to="/Home" className="list-group-item pt-1 pb-1"  > Blood Group</Link> */}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Another User rights Start Here */}

            </div>

        </div>
    )
}

export default Settings
