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
import { employeeNumber, getSerialnumberempnumber } from 'src/views/Constant/Constant'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import TextInput from 'src/views/Component/TextInput'
import FooterSaveClosebtn from 'src/views/CommonCode/FooterSaveClosebtn'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ContractInformation = () => {

    const classes = useStyles()
    const history = useHistory()
    const { id, no } = useParams()
    const [enablefiled, Setenablefield] = useState(true)
    const [enable, Setenable] = useState(true)
    const [newempno, Setnewempno] = useState(0)//new employee no
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
    getSerialnumberempnumber().then((val) => {
        const newemno = val
        Setnewempno(newemno)
    })
    getSerialnumberempnumber()


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
            else {
                submitFormData(e)
            }

        }
    }
    const RenewData = {
        em_no: newempno,
        em_id: no,
        em_cont_start: moment(contractstartDate).format('YYYY-MM-DD'),
        em_cont_end: moment(contractendDate).format('YYYY-MM-DD'),
        create_user: employeeNumber()
    }

    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/empcontract/contractrenew', RenewData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
        }
    }
    //redirecting to home page
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    function createData(name, calories) {
        return { name, calories, };
    }
    const rows = [
        createData('Employee Number', em_no),
        createData('Contract Start Date', startdate),
        createData('Contract End Date', endate),
        createData('Remaining Days', remaining_days),
        createData('', contractstatus),
    ];
    return (
        <Fragment>
            <PageLayout heading="Contract Information">
                <div className="col-md-12">
                    <form className={classes.root} >

                        <div className="col-md-12 row">
                            <div className="col-md-4">
                                <div className="col-md-12 pl-0" style={{
                                    paddingLeft: '0.5rem',
                                    paddingRight: '-0.1rem',
                                }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disabled={enablefiled}
                                            name="contractstartDate"
                                            type="date"
                                            clearable
                                            value={contractstartDate}
                                            onChange={(e) => {
                                                setContractStartDate(e)
                                                setContractEndDateforRenew()

                                            }}
                                            InputProps={{
                                                className: classes.customInputFeild
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
                                <div className="col-md-12" style={{
                                    paddingLeft: '0.5rem', paddingRight: '-0.1rem',
                                    paddingTop: '0.5rem'

                                }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            disabled={enablefiled}
                                            name="contractendDate"
                                            type="date"
                                            clearable
                                            value={contractendDate}
                                            onChange={(e) => {
                                                setContractEndDate(e)

                                            }}
                                            InputProps={{
                                                className: classes.customInputFeild
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
                                <div className="col-md-12 pl-3 " style={{
                                    paddingLeft: '0.7rem', paddingRight: '-0.1rem',
                                    paddingTop: '0.5rem'
                                }}>
                                    <TextInput
                                        disabled={enablefiled}
                                        type="text"
                                        Placeholder="Remaining Days"
                                        classname="form-control form-control-sm"
                                        name="remaining_days"
                                        value={remaining_days}
                                    />
                                </div>
                            </div>

                            <div className="col-md-2">
                                <div className="col-md-12 pt-2 pl-1">
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
                                <div className="col-md-12 pt-2 pl-1">
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
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-4 pb-2">
                                <div className="col-md-12">
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
                                            {/* <TableHead>
                                                <TableRow>
                                                    <TableCell>Employee Details</TableCell>
                                                    <TableCell align="right"></TableCell>

                                                </TableRow>
                                            </TableHead> */}
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <FooterSaveClosebtn
                                redirect={RedirectToProfilePage}
                                disable={enablefiled}
                            />
                        </div>
                    </form>
                </div>

            </PageLayout >
        </Fragment >
    )
}

export default memo(ContractInformation)
