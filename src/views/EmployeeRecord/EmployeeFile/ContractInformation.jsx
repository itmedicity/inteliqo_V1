import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import React, { Fragment, memo, useEffect, useState } from 'react'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory, useParams } from 'react-router'
import moment from 'moment';
import { TextField, Button } from '@material-ui/core'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { addDays } from 'date-fns'
import { employeeNumber, getProcessserialnum, getSerialnumberempnumber } from 'src/views/Constant/Constant'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import TextInput from 'src/views/Component/TextInput'
import FooterSaveClosebtn from 'src/views/CommonCode/FooterSaveClosebtn'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContractcategoryModel from 'src/views/CommonCode/ContractcategoryModel'
import ModelLeaveProcess from './EmpFileComponent/ModelLeaveProcess'
import compareAsc from 'date-fns/compareAsc'
import ContractRenewModel from './EmpFileComponent/ContractRenewModel'

const ContractInformation = () => {

    const [categorychge, setcategorychange] = useState(1)
    // use State for serial number
    const [processslno, setprocessslno] = useState(0)
    // to model message
    const [modelmessage, setmodelmessage] = useState('');
    // usestate for leaveprocess model
    const [modelvalue, setmodelvalue] = useState(0)
    // set open model true false for leave setting
    const [open, setOpen] = useState(false);
    const [openn, setOpenn] = useState(false);
    // usestae to check wheather category is saved 
    const [categorysave, setcategorysave] = useState(0)
    // check wheathe old or new
    const [olddata, setolddat] = useState(0)
    //  data based on employeee category
    const [leavestate, setleavestate] = useState({
        ecat_cl: 0,
        ecat_confere: 0,
        ecat_cont: 0,
        ecat_doff_allow: 0,
        ecat_el: 0,
        ecat_esi_allow: 0,
        ecat_fh: 0,
        ecat_lop: 0,
        ecat_mate: 0,
        ecat_nh: 0,
        ecat_prob: 0,
        ecat_woff_allow: 0,
        ecat_sl: 0,
        em_category: 0
    })
    // current process details
    const [leaveprocessid, leaveprocessidupdate] = useState({
        hrm_calcu: 0,
        hrm_clv: 0,
        hrm_cmn: 0,
        hrm_ern_lv: 0,
        hrm_hld: 0,
        lv_process_slno: 0,
        category_slno: 0
    });

    // destructuring current process details
    const [modelcateg, setmodelcate] = useState(0)
    const [modelrenew, setmodelrenew] = useState(0)
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
        contractstatus: "",
        em_category: ""
    })
    //destructuring
    const { remaining_days, em_no, em_id, startdate, endate, contractstatus, em_category } = formData
    //setting Contract start Date
    const setContractStartDate = (val) => {
        setcontstrtDate(val)
    }
    //setting Contract start Date
    const setContractEndDate = (val) => {
        setconendDate(val)
    }
    const getcontractInformation = async () => {
        const result = await axioslogin.get(`/empcontract/${no}`)
        const { success, data } = result.data
        if (success === 1) {
            const { em_cont_start, em_cont_end, em_no, em_id, em_cont_close, em_category } = data[0]
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
                endate: contendatee,
                em_category: em_category
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
                    contractstatus: contractstatus,
                    em_category: em_category
                }
                setformData(frmData)
            }
        }
        else if (success === 0) {
            Setenableclose(true)
            infoNofity("There Is No Contract Information Against This Employee")
        }
        else {
            errorNofity("Error Occured Please Contact EDP!!!!")
        }
    }
    //useEffect for getting employees's Contract Details
    useEffect(() => {
        getcontractInformation()
    }, [id, no, categorysave])
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
    //contract renew
    const contractRenew = async (e) => {
        e.preventDefault();
        const result = await axioslogin.get(`/empcontract/${no}`)
        const { success, data } = result.data
        if (success === 1) {
            const { cont_grace, em_cont_end, fine_status } = data[0]
            const result = addDays(new Date(em_cont_end), cont_grace)
            if ((new Date() < result)) {
                warningNofity('Cannot Renew Contract!!!Grace Period  not Exceeded')
                Setenablefield(true)
            }
            else if (fine_status === 0) {
                warningNofity('Cannot Renew Contract!!!There Is Pending Fine Against This Employee')
                Setenablefield(true)
            }
            else {
                setmodelcate(1)
                Setenablefield(false)
                getSerialnumberempnumber().then((val) => {
                    const newemno = val
                    Setnewempno(newemno)
                })
                getSerialnumberempnumber()
            }
        }
    }
    const RenewData = {
        old_emno: id,
        em_no: newempno,
        em_id: no,
        em_cont_start: moment(contractstartDate).format('YYYY-MM-DD'),
        em_cont_end: moment(contractendDate).format('YYYY-MM-DD'),
        create_user: employeeNumber(),
        em_cont_close_date: moment(new Date()).format('YYYY-MM-DD'),
        em_cont_close: 'C',
        em_cont_compl_status: 'C',
        em_cont_renew: 'R',
        em_cont_renew_date: moment(new Date()).format('YYYY-MM-DD'),
        changed_date: moment(new Date()).format('YYYY-MM-DD'),
        edit_user: employeeNumber(),
    }
    const handleClose = () => {
        // setmodellist(false)
    }
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.patch('/empcontract/contractrenew', RenewData)
        const { success, message } = result.data
        if (success === 2) {
            setmodelrenew(1)
            setOpenn(true)
            succesNofity(message)
            Setenablefield(true)
            if (categorysave === 1) {
                getProcessserialnum().then((val) => {
                    setprocessslno(val)
                })
                // get current data allowed  leave based on category
                const getcategorydata = async () => {
                    const result = await axioslogin.get(`/common/getannprocess/${no}`)
                    const { data } = result.data
                    setleavestate(data[0])
                }
                getcategorydata();
                const postFormdata =
                {
                    em_no: no,
                    em_id: id
                }
                const getdata = async () => {
                    // check the table where data present if present get the details process table
                    const result = await axioslogin.post('/yearleaveprocess/', postFormdata)
                    const { success, message } = result.data;
                    const { category_slno, hrm_calcu, hrm_clv, hrm_cmn, hrm_ern_lv, hrm_hld,
                        lv_process_slno, next_updatedate } = message[0]

                    const dataprvleave = {
                        hrm_calcu: hrm_calcu,
                        hrm_clv: hrm_clv,
                        hrm_cmn: hrm_cmn,
                        hrm_ern_lv: hrm_ern_lv,
                        hrm_hld: hrm_hld,
                        category_slno: category_slno,
                        lv_process_slno: lv_process_slno
                    }
                    // if no data available
                    if (success === 0) {
                        setcategorysave(0)
                        // if no data is present means new employee  set model
                        setmodelvalue(1)
                        setmodelmessage('Leave process is not done for the employee')
                        setolddat(1)
                        setOpen(true)
                    }
                    else if (success === 1) {
                        setcategorysave(0)
                        leaveprocessidupdate(dataprvleave)
                        // if employee process date has over 
                        if (compareAsc(new Date(), new Date(next_updatedate)) === 1) {
                            setOpen(true)
                            setmodelvalue(1)
                            setmodelmessage('Date Exceeded do you Want To Process')
                        }
                        else if (category_slno !== em_category) {
                            setcategorysave(0)
                            setmodelvalue(1)
                            setmodelmessage('Category Change Do You Want to  To Process')
                            setOpen(true)
                        }
                        // if process contain data and pending leave process is present
                        else if (hrm_calcu === 0 || hrm_clv === 0 || hrm_cmn === 0 || hrm_ern_lv === 0 || hrm_hld === 0) {
                            // setmodellist(true)
                        }
                    }
                }
                getdata()
            }
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
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const data = {
        emp_id: no,
        start: moment(firstDay).format('YYYY-MM-DD'),
        end: moment(new Date()).format('YYYY-MM-DD'),
    }
    return (
        <Fragment>
            {modelvalue !== 1 && modelrenew === 1 ? <ContractRenewModel data={data} open={openn} setOpenn={setOpenn} /> : null}
            {modelcateg === 1 ? <ContractcategoryModel em_category={em_category}//old category
                id={id}//employeenumber
                setcategorysave={setcategorysave} //setcategory change
                setmodelcate={setmodelcate}
                newempno={newempno}
            /> : null}

            {modelvalue === 1 ? <ModelLeaveProcess
                open={open}
                dataleave={leavestate} // {leaves available based on category}
                handleClose={handleClose}
                setOpen={setOpen}  //for open model
                id={id}//employee id
                no={no}//employee number
                valuemessage={modelmessage}//model message
                leaveprocessid={leaveprocessid} //current proceess details
                processslno={processslno}//processess serialno
                olddata={olddata}// check wheather new data
                setmodelvalue={setmodelvalue}
                categorychge={categorychge}
            /> : null}
            <PageLayout heading="Contract Information">
                <div className="col-md-12">
                    <form className={classes.root} onSubmit={submitFormData}>
                        <div className="card">
                            <div className="card-body">
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
                                    <div className="col-md-6 pb-2">
                                        <div className="col-md-12">
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 10 }} size="small" aria-label="a dense table">
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
                            </div>
                            <div className="card-footer text-muted">
                                <FooterSaveClosebtn
                                    redirect={RedirectToProfilePage}
                                    disable={enablefiled}
                                />
                            </div>
                        </div>
                    </form>
                </div>

            </PageLayout >
        </Fragment >
    )
}

export default memo(ContractInformation)
