import { Avatar, Card, CardContent } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const EXistContractDetl = ({ id, no, fine, setFine, setgraceperiod }) => {
    // const dispatch = useDispatch()
    // const [view, setView] = useState(0)
    //use state for displaying existing contract details
    const [formData, setFormData] = useState({
        em_cont_start: '',
        em_cont_end: '',
        em_no: '',
        em_id: '',
        em_name: '',
        ecat_name: '',
        grace_period: '',
        dept_name: '',
        desg_name: '',
        sect_name: ''
    })
    const { em_cont_start, em_cont_end, em_no, em_name, ecat_name, desg_name, sect_name } = formData

    //use effect for getting existing contract details
    useEffect(() => {
        const getcontractInformation = async () => {
            const result = await axioslogin.get(`/empcontract/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_cont_start, em_cont_end, em_no, em_id, em_name, ecat_name, cont_grace,
                    dept_name, desg_name, sect_name } = data[0]
                const frmData = {
                    em_cont_start: em_cont_start === null ? 'NOT UPDATED' : em_cont_start,
                    em_cont_end: em_cont_end === null ? 'NOT UPDATED' : em_cont_end,
                    em_no: em_no,
                    em_id: em_id,
                    em_name: em_name === null ? 'NOT UPDATED' : em_name,
                    ecat_name: ecat_name === null ? 'NOT UPDATED' : ecat_name,
                    grace_period: cont_grace === null ? 'NOT UPDATED' : cont_grace,
                    dept_name: dept_name === null ? 'NOT UPDATED' : dept_name,
                    desg_name: desg_name === null ? 'NOT UPDATED' : desg_name,
                    sect_name: sect_name === null ? 'NOT UPDATED' : sect_name
                }
                setFormData(frmData)
                //  setContractEnd(em_cont_end)
                //  setContractStart(em_cont_start)
                setgraceperiod(cont_grace)
                //setOldctaegory(em_category)
                // const date = new Date(em_cont_end)
                // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                // const length = differenceInDays(new Date(em_cont_end), new Date(firstDay))
                // setattendanceDays(length)
            }
        }
        getcontractInformation()
    }, [no, setgraceperiod])

    //useEffect for getting fine Deatails
    useEffect(() => {
        const getFinedetl = async () => {
            const result = await axioslogin.get(`/empfinededuction/totalfine/byemid/${no}`)
            const { success, data } = result.data
            if (success === 1) {
                setFine(data[0].fine_sum)
            }
            else {
                setFine(0)
            }
        }
        getFinedetl()
    }, [no, setFine])

    //function for Closing first contract
    // const ContractClose = useCallback(() => {
    //     if ((em_cont_end !== '' && grace_period !== '') && (addDays(new Date(em_cont_end), grace_period) < new Date())) {
    //         dispatch({
    //             type: Actiontypes.FETCH_CONTRACT_CLOSE_DATA, payload: {
    //                 status: 1,
    //                 em_cont_close: 'C',
    //                 em_cont_compl_status: 'C',
    //                 em_cont_renew: 'R',
    //                 em_cont_close_date: moment(new Date()).format('YYYY-MM-DD'),
    //                 em_cont_renew_date: moment(new Date()).format('YYYY-MM-DD'),
    //                 em_no: id,
    //                 edit_user: employeeNumber()
    //             }
    //         })
    //         succesNofity("Contract Closed Successfully")
    //         setView(1)
    //     }
    //     else {
    //         warningNofity("Grace Period Not Completed")
    //         setView(0)
    //     }
    // }, [em_cont_end, grace_period, id, dispatch])

    // const { em_cont_start, em_cont_end, em_no, em_name, ecat_name, grace_period, desg_name, sect_name } = formData
    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                // to make the card resizable
                // overflow: 'auto',
                resize: 'horizontal',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Avatar src="" size="lg" />
                <Typography level="body1">{em_no}</Typography>
            </Box>
            <CardContent >
                <Typography level="title-lg">{em_name}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                    <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                    <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{sect_name}</Typography>
                    <Typography level="body-sm" fontFamily="monospace" >Designation</Typography>
                    <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{desg_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                    <Typography level="body-sm" fontFamily="monospace" >Contract:</Typography>
                    <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{em_cont_start}</Typography>
                    <Typography level="body-sm" fontFamily="monospace" >to</Typography>
                    <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{em_cont_end}</Typography>
                    <Typography level="body-sm" fontFamily="monospace" >Category</Typography>
                    <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{ecat_name}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default memo(EXistContractDetl) 