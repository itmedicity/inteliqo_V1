import { Alert, Button, Stack } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const ModelProcessComponent = ({ name, value, setsalaryprocess }) => {
    const salarydata = useSelector((state) => {
        return state.getContractClosedata.oldSalaryInform.SalaryData
    })
    const ProcessPersonalData = async (e) => {
        if (value === 4 && salarydata.length > 0) {
            const result = await axioslogin.post('/empearndeduction/insertSalaryContract', salarydata)
            const { success1, message } = result.data
            if (success1 === 1) {
                setsalaryprocess(1)
                succesNofity(" Copied Successfully")
            }
            else {
                errorNofity(message)
                setsalaryprocess(0)
            }
        }
        else {
            setsalaryprocess(1)
        }

    }
    return (
        <Fragment>
            <Stack sx={{ width: '100%', marginY: 0.2 }} spacing={2} direction="row" justifyContent="space-around" alignItems="center" >
                <Alert severity="info" style={{ paddingTop: 0, paddingBottom: 0, width: "100%" }} >{name}</Alert>
                <Button color="secondary" onClick={ProcessPersonalData} variant="outlined" >Process</Button>
            </Stack>
        </Fragment>
    )
}

export default ModelProcessComponent