import { Switch, Typography, Stack, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import TextInput from 'src/views/Component/TextInput'
import { CARD_HEADER_COLOR, CARD_SUB_HEADER_COLOR } from 'src/views/Constant/Constant'
import './EmpStyle.css'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import SalaryIncrementMainCard from './EmpFileComponent/SalaryIncrementMainCard'
import FixedWagesSalaryIncre from './EmpFileComponent/FixedWagesSalaryIncre'

const SalaryIncrement = () => {
    const history = useHistory()
    // const classes = useStyles();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }

    const list = [
        {
            desc: "Basic+Dearness Allowance",
            amount: 20000.00,
            lastChange: "01-12-2021 12:32 AM",
            startFrom: "01-12-2021",
            increment: true
        },
        {
            desc: "House Rent Allowance",
            amount: 10000.00,
            lastChange: "01-12-2021 12:32 AM",
            startFrom: "01-12-2021",
            increment: false
        },
        {
            desc: "Travel Allowance",
            amount: 2000.00,
            lastChange: "01-12-2021 12:32 AM",
            startFrom: "01-12-2021",
            increment: true
        },
        {
            desc: "Refreshment",
            amount: 2000.00,
            lastChange: "01-12-2021 12:32 AM",
            startFrom: "01-12-2021",
            increment: false
        },
        {
            desc: "Over Time",
            amount: 200.00,
            lastChange: "01-12-2021 12:32 AM",
            startFrom: "01-12-2021",
            increment: true
        }
    ]

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Salary Increment Process"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-1">
                    <div className="col-md-12">
                        <SalaryIncrementMainCard wageName="Fixed Wages" >
                            {
                                list.map((value, index) => {
                                    return <FixedWagesSalaryIncre value={value} key={index} />
                                })
                            }
                        </SalaryIncrementMainCard>
                    </div>
                    <div className="col-md-12">
                        <SalaryIncrementMainCard wageName="Earnings">
                            {
                                list.map((value, index) => {
                                    return <FixedWagesSalaryIncre value={value} key={index} />
                                })
                            }
                        </SalaryIncrementMainCard>
                    </div>
                    <div className="col-md-12">
                        <SalaryIncrementMainCard wageName="Deducation">
                            {
                                list.map((value, index) => {
                                    return <FixedWagesSalaryIncre value={value} key={index} />
                                })
                            }
                        </SalaryIncrementMainCard>
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default SalaryIncrement
