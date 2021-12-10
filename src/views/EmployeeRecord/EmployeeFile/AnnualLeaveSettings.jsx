import { CircularProgress, Typography } from '@mui/material';
import React, { Fragment, Suspense } from 'react'
import { useHistory } from 'react-router';
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess';
import { CARD_HEADER_COLOR, CARD_SUB_HEADER_COLOR } from 'src/views/Constant/Constant';
import CalculatedOffDays from './EmpFileComponent/CalculatedOffDays';
import CardLeaveContainer from './EmpFileComponent/CardLeaveContainer';
import CardLeaveContainerTwo from './EmpFileComponent/CardLeaveContainerTwo';
import CarryForwardLeaveList from './EmpFileComponent/CarryForwardLeaveList';
import FixedOffDaysInformation from './EmpFileComponent/FixedOffDaysInformation';
import HolidayLeaveList from './EmpFileComponent/HolidayLeaveList';
import SickLeaveList from './EmpFileComponent/SickLeaveList';
import './EmpStyle.css'
const CasualLeaveList = React.lazy(() => import('./EmpFileComponent/CasualLeaveList'))



const AnnualLeaveSettings = () => {
    const history = useHistory()
    const classes = useStyles();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }

    const CasualLeave = {
        mainHeading: "Casual Leaves",
        headingOne: "Month",
        headingTwo: "Allowed",
        headingThee: "Credited",
        headingFour: "Taken"
    }

    const SickLeave = {
        mainHeading: "Sick Leaves",
        headingOne: "Month",
        headingTwo: "Allowed",
        headingThee: "Credited",
        headingFour: "Taken"
    }

    const Holidy = {
        mainHeading: "National & Festival Holiday",
        headingOne: "Days",
        headingTwo: "Allowed",
        headingThee: "Credited",
        headingFour: "Taken"
    }

    const EarnLeave = {
        mainHeading: "Earn Leave (Privilage Leave)",
        headingOne: "Month",
        headingTwo: "Allowed",
        headingThee: "Credited",
        headingFour: "Taken"
    }

    const Carryfoward = {
        mainHeading: "Carry Forward Leave",
        headingOne: "Leave Name",
        headingTwo: "Date",
        headingThee: "Credited",
        headingFour: "Taken"
    }

    const CalculatedLeave = {
        mainHeading: "Approved off Days",
        headingOne: "Date",
        headingTwo: "Off",
        headingThee: "Credited",
        headingFour: "Taken"
    }

    const FixedLeaves = {
        mainHeading: "Fixed Off Days Information",
        headingOne: "Leaves Name",
        headingThee: "Allowed",
        headingFour: "Taken"
    }

    return (
        <Fragment>
            <PageLayoutProcess
                heading="Anual Leave Information"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-1 pb-1">
                    <div className="col-md-4">
                        <CardLeaveContainer title={CasualLeave}  >
                            <Suspense fallback={<CircularProgress />} >
                                <div className="card-casual-leave">
                                    <CasualLeaveList />
                                </div>
                            </Suspense>
                        </CardLeaveContainer>
                    </div>
                    <div className="col-md-4">
                        <CardLeaveContainer title={SickLeave}  >
                            <Suspense fallback={<CircularProgress />} >
                                <div className="card-casual-leave">
                                    <SickLeaveList />
                                </div>
                            </Suspense>
                        </CardLeaveContainer>
                    </div>
                    <div className="col-md-4">
                        <CardLeaveContainer title={Holidy}  >
                            <Suspense fallback={<CircularProgress />} >
                                <div className="card-casual-leave">
                                    <HolidayLeaveList />
                                </div>
                            </Suspense>
                        </CardLeaveContainer>
                    </div>
                </div>
                <div className="row g-1 pb-1">
                    <div className="col-md-4">
                        <CardLeaveContainer title={EarnLeave}  >
                            <Suspense fallback={<CircularProgress />} >
                                <div className="card-casual-leave">
                                    <CasualLeaveList />
                                </div>
                            </Suspense>
                        </CardLeaveContainer>
                    </div>
                    <div className="col-md-4">
                        <CardLeaveContainer title={Carryfoward}  >
                            <Suspense fallback={<CircularProgress />} >
                                <div className="card-casual-leave">
                                    <CarryForwardLeaveList />
                                </div>
                            </Suspense>
                        </CardLeaveContainer>
                    </div>
                    <div className="col-md-4">
                        <CardLeaveContainer title={CalculatedLeave}  >
                            <Suspense fallback={<CircularProgress />} >
                                <div className="card-casual-leave">
                                    <CalculatedOffDays />
                                </div>
                            </Suspense>
                        </CardLeaveContainer>
                    </div>
                </div>
                <div className="row g-1 d-flex justify-content-center">
                    <div className="col-md-12 col-lg-12">
                        <CardLeaveContainerTwo title={FixedLeaves} >
                            <Suspense fallback={<CircularProgress />} >
                                <div className="card-casual-leave-fixed">
                                    <FixedOffDaysInformation />
                                </div>
                            </Suspense>
                        </CardLeaveContainerTwo>
                    </div>
                </div>
            </PageLayoutProcess>
        </Fragment>
    )
}

export default AnnualLeaveSettings
