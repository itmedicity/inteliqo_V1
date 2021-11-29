import { Stack } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import React, { Fragment, memo, useEffect, useState } from 'react'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory, useParams } from 'react-router'
import moment from 'moment';
import { Card, CardActionArea, CardContent, CardMedia, TextField, Button } from '@material-ui/core'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { addDays } from 'date-fns'
//import { getSerialnumberempnumber } from 'src/views/Constant/Constant'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'


const ContractInformation = () => {

    const classes = useStyles()
    const history = useHistory()
    const { id, no } = useParams()
    const [enablefiled, Setenablefield] = useState(true)
    const [enable, Setenable] = useState(true)
    // const [newempno, Setnewempno] = useState(0)//new employee no
    const [enableclose, Setenableclose] = useState(false)
    const [contractstartDate, setcontstrtDate] = useState(new Date())
    const [contractendDate, setconendDate] = useState(new Date())
    const [formData, setformData] = useState({
        remaining_days: "",
        em_no: "",
        em_id: "",
        startdate: "",
        endate: "",
        contractstatus: ""
    })
    //destructuring
    const { remaining_days, em_no, em_id, startdate, endate, contractstatus } = formData

    //setting Contract start Date
    const setContractStartDate = (val) => {
        setcontstrtDate(val)
    }
    //setting Contract start Date
    const setContractEndDate = (val) => {
        setconendDate(val)
    }
    //useEffect for getting employees's Contract Details
    useEffect(() => {
        const getcontractInformation = async () => {
            const result = await axioslogin.get(`/empcontract/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_cont_start, em_cont_end, em_no, em_id, em_cont_close } = data[0]
                setcontstrtDate(em_cont_start)
                setconendDate(em_cont_end)
                const a = moment(em_cont_end)
                const b = moment(new Date())
                const c = a.diff(b, 'days')
                const contstartdatee = moment(em_cont_start).format('DD-MM-YYYY')
                const contendatee = moment(em_cont_end).format('DD-MM-YYYY')
                const frmData = {
                    remaining_days: c,
                    em_no: em_no,
                    em_id: em_id,
                    startdate: contstartdatee,
                    endate: contendatee
                }
                setformData(frmData)
                if (c <= 0) {
                    Setenable(false)
                }
                if (em_cont_close === 'C') {
                    Setenableclose(true)
                    Setenable(true)
                    var contractstatus = 'Contract Closed'
                    const frmData = {
                        remaining_days: c,
                        em_no: em_no,
                        em_id: em_id,
                        startdate: contstartdatee,
                        endate: contendatee,
                        contractstatus: contractstatus
                    }
                    setformData(frmData)
                }
            }
        }
        getcontractInformation()
    }, [id])

    //data to close a request
    const closeData = {
        em_cont_close_date: moment(new Date()).format('YYYY-MM-DD'),
        em_cont_close: 'C',
        em_no: id,
        em_id: em_id
    }
    ///function for Contract close
    const contractClose = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/empcontract/contractclose', closeData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            Setenableclose(true)
            Setenable(true)

        }
        else {
            errorNofity('Error Occured!!!!Please Contact EDP')
        }
    }
    const setContractEndDateforRenew = () => {

        const endDate = addDays(new Date(contractstartDate), 365)
        setconendDate(endDate)

    }
    // getSerialnumberempnumber().then((val) => {
    //     const newemno = val
    //     Setnewempno(newemno)
    // })
    // getSerialnumberempnumber()


    //contract renew
    const contractRenew = async (e) => {
        e.preventDefault();
        Setenablefield(false)
        const result = await axioslogin.get(`/empcontract/${id}`)
        const { success, data } = result.data
        if (success === 1) {
            const { cont_grace, em_cont_end } = data[0]
            const result = addDays(new Date(em_cont_end), cont_grace)
            if ((new Date() < result)) {
                warningNofity('Cannot Renew Contract!!!Grace Period  not Exceeded')
                Setenablefield(true)
            }
            // else {
            //     submitFormData(e)
            // }

        }
    }
    // const RenewData = {
    //     em_no: newempno,
    //     em_id: no,
    //     em_cont_start: moment(contractstartDate).format('YYYY-MM-DD'),
    //     em_cont_end: moment(contractendDate).format('YYYY-MM-DD'),
    //     create_user: employeeNumber()
    // }
    // console.log(RenewData)
    // const submitFormData = async (e) => {
    //     e.preventDefault()
    //     const result = await axioslogin.patch('/empcontract/contractrenew', RenewData)
    //     const { success, message } = result.data
    //     if (success === 2) {
    //         succesNofity(message)
    //     }
    // }
    //redirecting to home page
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    return (
        <Fragment>
            <PageLayout heading="Contract Information">
                <div className="col-md-8">
                    <form className={classes.root} >
                        <div className="row">
                            <div className="col-md-4">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        disabled={enablefiled}
                                        label="Contract Start Date"
                                        name="contractstartDate"
                                        type="date"
                                        clearable
                                        value={contractstartDate}
                                        onChange={(e) => {
                                            setContractStartDate(e)
                                            setContractEndDateforRenew()

                                        }}
                                        renderInput={(params) => <TextField {...params}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                        />}

                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="col-md-4">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        disabled={enablefiled}
                                        label="Contract Start Date"
                                        name="contractendDate"
                                        type="date"
                                        clearable
                                        value={contractendDate}
                                        onChange={(e) => {
                                            setContractEndDate(e)

                                        }}
                                        renderInput={(params) => <TextField {...params}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                        />}

                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="col-md-4">
                                <TextField
                                    disabled={enablefiled}
                                    label="Remaining Days"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="remaining_days"
                                    value={remaining_days}
                                />
                            </div>
                        </div>
                        <div className="row col-md-12 pt-2">
                            <div className="col-md-2 col-sm-6 col-xs-12 mb-1 pt-2 pl-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                    type="Button"
                                    disabled={enable}
                                    onClick={contractRenew}
                                >
                                    Contract Renew
                                </Button>
                            </div>
                            <div className="col-md-2 col-sm-6 col-xs-12 mb-1 pt-2 pl-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                    type="Button"
                                    disabled={enableclose}
                                    onClick={contractClose}
                                >
                                    Contract Close
                                </Button>
                            </div>
                            <div className="col-md-2 col-sm-6 col-xs-12 mb-1 pt-2 pl-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                    type="Submit"
                                    disabled={enablefiled}
                                // onClick={submitFormData}

                                >
                                    Save
                                </Button>
                            </div>
                            <div className="col-md-2 col-sm-6 col-xs-12 mb-1 pt-2 pl-2">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    fullWidth
                                    type="Submit"
                                    onClick={RedirectToProfilePage}

                                >
                                    Close
                                </Button>
                            </div>
                        </div>


                    </form>

                </div>
                <div className="col-md-4">
                    <Card sx={{ maxWidth: 350, maxHeight: 800 }}>
                        <CardActionArea >
                            <CardMedia>
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    //justifyContent="center"
                                    //alignItems="center"
                                    sx={{
                                        backgroundColor: "#f8ffd7"
                                    }} >
                                    <CardContent>
                                        <label style={{ fontWeight: 'bold', alignContent: 'left' }}>Employee Number : {em_no}</label><br />
                                        <label style={{ fontWeight: 'bold', alignContent: 'left' }}>Contract Start Date : {startdate}</label><br />
                                        <label style={{ fontWeight: 'bold', alignContent: 'left' }}>Contract End Date: {endate}</label><br />
                                        <label style={{ fontWeight: 'bold', alignContent: 'left' }}>Remaining Days : {remaining_days}</label>
                                        <label style={{ fontWeight: 'bold', alignContent: 'left' }}>{contractstatus}</label>
                                    </CardContent>
                                </Stack>
                            </CardMedia>

                        </CardActionArea>
                    </Card >
                </div>
            </PageLayout >
        </Fragment >
    )
}

export default memo(ContractInformation)
