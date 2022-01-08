import { DataUsage } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'
import { employeeNumber } from '../Constant/Constant'

const Employeedetails = () => {

    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    useEffect(() => {
        const getEmpData = async () => {
            const result = await axioslogin.get(`/common/getempid/${employeeNumber()}`)
            const { success, data } = result.data
            if (success === 1) {
                const { emp_id } = data[0]
                const getempdetailsresult = await axioslogin.get(`/common/getempdetails/${emp_id}`)
                updateemployeedetails(getempdetailsresult.data.data[0])
            }
        }
        getEmpData()
    }, [])
    return (
        <Fragment>

        </Fragment>
    )
}

export default Employeedetails
