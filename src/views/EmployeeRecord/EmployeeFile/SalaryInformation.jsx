import { Typography } from '@material-ui/core';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import AmendmentStatus from './EmpFileComponent/AmendmentStatus';
import DeductedWages from './EmpFileComponent/DeductedWages';
import DeductionStatus from './EmpFileComponent/DeductionStatus';
import EarnedWages from './EmpFileComponent/EarnedWages';
import EarningStatus from './EmpFileComponent/EarningStatus';
import FixedWageSalary from './EmpFileComponent/FixedWageSalary';
import PreviousAmendChanges from './EmpFileComponent/PreviousAmendChanges';
import WageStatus from './EmpFileComponent/WageStatus';
import './EmpStyle.css'

const SalaryInformation = () => {
    const history = useHistory()
    const { id, no } = useParams()
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    //use State For sum of fixe wages
    const [sumfixedwages, setSumfixedwages] = useState(0)
    //use State For sum of earning
    const [sumearning, setSumearning] = useState(0)
    //use State For sum of deduction
    const [sumdeduction, sumDeduction] = useState(0)
    //use State for Gross Salary
    const [Grosssalary, setGrosssalary] = useState(0)
    //use State for fixed wage status
    const [FixedWage, setFixedWageState] = useState(0)
    const [EarnStatus, setEarnStatus] = useState(0)
    const [DeductStatus, SetDeductionStatus] = useState(0)
    const [AmendStatus, SetAmendStatus] = useState(0)
    useEffect(() => {
        //calculating gross salary
        const gross_slary = sumfixedwages + sumearning - sumdeduction
        setGrosssalary(gross_slary)
    }, [sumdeduction, sumearning, sumfixedwages])
    //calculating gross salary
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee Wages Information"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-1">
                    <div className="col-md-6">
                        <div className="card" >
                            <div className="card-header py-0">
                                <div className="d-flex justify-content-between">
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        Fixed Wages
                                    </Typography>
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        {sumfixedwages}
                                    </Typography>
                                </div>
                            </div>
                            <div className="card-salary-information">
                                {FixedWage === 1 ? <WageStatus /> : <FixedWageSalary emno={id} sumoffixedwage={setSumfixedwages} fixedwagestate={setFixedWageState} />}
                            </div>
                        </div>
                        <div className="card" >
                            <div className="card-header py-0">
                                <div className="d-flex justify-content-between">
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        Earnings
                                    </Typography>
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        {sumearning}
                                    </Typography>
                                </div>
                            </div>
                            <div className="card-salary-information">
                                {EarnStatus === 1 ? <EarningStatus /> : <EarnedWages emno={id} sumoferanedwages={setSumearning} earningstatus={setEarnStatus} />}
                            </div>
                        </div>
                        <div className="card" >
                            <div className="card-header py-0">
                                <div className="d-flex justify-content-between">
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        Deduction
                                    </Typography>
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        {-sumdeduction}
                                    </Typography>
                                </div>
                            </div>
                            <div className="card-salary-information">
                                {DeductStatus === 1 ? <DeductionStatus /> : <DeductedWages emno={id} sumofdeductsalary={sumDeduction} deductstatus={SetDeductionStatus} />}
                            </div>
                        </div>
                        <div className="card" >
                            <div className="card-header py-0">
                                <div className="d-flex justify-content-between"  >
                                    <div>
                                        <Typography variant="body1" gutterBottom className="my-0" >
                                            Gross Salary
                                        </Typography>
                                    </div>
                                    <div>{Grosssalary}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div className="card" >
                                <div className="card-header py-0">
                                    <Typography variant="body1" gutterBottom className="my-0" >
                                        Previous Amendment Information
                                    </Typography>
                                </div>
                                <div className="card" >
                                    <div className="card-header py-0">
                                        <div className="d-md-flex d-sm-flex justify-content-between"  >
                                            <div className="col-md-6 text-start">
                                                <Typography variant="body1" gutterBottom className="my-0" >
                                                    Description
                                                </Typography>
                                            </div>
                                            <div className="col-md-4 text-start" >Amendment Date</div>
                                            <div className="col-md-2 text-end" >Changes</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="previousAmentWindow">
                                    {AmendStatus === 1 ? <AmendmentStatus /> : <PreviousAmendChanges emp_id={no} amendStatus={SetAmendStatus} />}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default memo(SalaryInformation)
