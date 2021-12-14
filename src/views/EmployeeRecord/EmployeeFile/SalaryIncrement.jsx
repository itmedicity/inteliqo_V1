import { Switch, Typography, Stack, IconButton } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import TextInput from 'src/views/Component/TextInput'
import { CARD_HEADER_COLOR, CARD_SUB_HEADER_COLOR } from 'src/views/Constant/Constant'
import './EmpStyle.css'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import SalaryIncrementMainCard from './EmpFileComponent/SalaryIncrementMainCard'
import FixedWagesSalaryIncre from './EmpFileComponent/FixedWagesSalaryIncre'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const SalaryIncrement = () => {
    const history = useHistory()
    const { id, no } = useParams()
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    const [fixedWages, setFixedwages] = useState([])
    const [Earnings, setEarnings] = useState([])
    const [Deduction, setDeduction] = useState([])
    useEffect(() => {
        const getFixedWages = async () => {
            const result = await axioslogin.get(`/common/getfixedwagesSalary/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setFixedwages(data)
            }
            else if (success === 0) {
                infoNofity('No Fixed wages is set to this employee')
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedWages()
        const getFixedEarnings = async () => {
            const result = await axioslogin.get(`/common/getfixedearnings/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setEarnings(data)

            }
            else if (success === 0) {

            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedEarnings()
        const getFixeddeduction = async () => {
            const result = await axioslogin.get(`/common/getfixeddeduction/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setDeduction(data)
            }
            else if (success === 0) {

            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixeddeduction()
    }, [id])


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
                                fixedWages.map((value, index) => {
                                    return <FixedWagesSalaryIncre value={value} key={index} emno={id} emid={no} />
                                })

                            }
                        </SalaryIncrementMainCard>
                    </div>
                    <div className="col-md-12">
                        <SalaryIncrementMainCard wageName="Earnings">
                            {
                                Earnings.map((value, index) => {
                                    return <FixedWagesSalaryIncre value={value} key={index} emno={id} emid={no} />
                                })
                            }
                        </SalaryIncrementMainCard>
                    </div>
                    <div className="col-md-12">
                        <SalaryIncrementMainCard wageName="Deducation">
                            {
                                Deduction.map((value, index) => {
                                    return <FixedWagesSalaryIncre value={value} key={index} emno={id} emid={no} />
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
