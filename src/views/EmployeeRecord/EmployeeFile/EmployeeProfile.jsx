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
                    <EmployeeProfileCardFooter id={empCredential} />
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
