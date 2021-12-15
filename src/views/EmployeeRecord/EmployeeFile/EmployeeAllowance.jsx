import Chip from '@mui/material/Chip'
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import WagesInfoTable from './EmployeeFileTable/WagesInfoTable'
import { IoCheckmarkDoneSharp, IoBan } from "react-icons/io5";
import { Checkbox, FormControlLabel } from '@material-ui/core'
import ModalOne from 'src/views/CommonCode/ModalOne'
import WageDescripErnDeductSelect from 'src/views/CommonCode/WageDescripErnDeductSelect'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import moment from 'moment';
import { employeeNumber } from 'src/views/Constant/Constant'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const EmployeeAllowance = () => {
    const history = useHistory()
    const classes = useStyles();
    const { id, no } = useParams();
    const [open, setOpen] = React.useState(false);
    const [toggle, settoggle] = useState(true)
    const [toggle_end, settoggle_end] = useState(true)
    const { updateWageType, selectWage, updateWage } = useContext(PayrolMasterContext)
    const [monthstart, setMonthstart] = useState(new Date());
    const [monthend, setMonthend] = useState(new Date());
    const [count, setcount] = useState(0);

    //Initializing
    const [wageType, setWageType] = useState({
        earning_type_name: '',
        em_earning_type: '',
        include_esi: 0,
        include_pf: 0,
        include_lwf: 0,
        include_protax: 0,
        em_amount: '',
        start_month: false,
        end_month: false
    });

    //Destructuring
    const { earning_type_name, em_earning_type, em_amount, include_esi, include_pf, include_lwf, include_protax, start_month, end_month } = wageType;
    const updateAllowance = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setWageType({ ...wageType, [e.target.name]: value })
    }

    //Get data 
    useEffect(() => {
        if (selectWage !== 0) {
            const getWageType = async () => {
                const result = await axioslogin.get(`/common/getEarnings/${selectWage}`);
                const { data, success } = await result.data;
                if (success === 1) {
                    const { earning_type_name, erning_type_id, include_esi, include_pf, include_lwf, include_protax } = data[0]
                    const formdata = {
                        earning_type_name: earning_type_name,
                        em_earning_type: erning_type_id,
                        include_esi: include_esi,
                        include_pf: include_pf,
                        include_lwf: include_lwf,
                        include_protax: include_protax,
                        start_month: false,
                        end_month: false,
                    }
                    setWageType(formdata)
                }
                else {
                }
            }
            getWageType()
            return (
                updateWageType(0)
            )
        }
    }, [updateWageType, selectWage]);

    //start month update function
    const updateMonthstart = (val) => {
        setMonthstart(val)
    }
    // end month update function
    const updateMonthend = (val) => {
        setMonthend(val)
    }
    //moment start month
    const month_start = moment(monthstart).format('YYYY-MM-DD')
    //moment end month
    const month_end = moment(monthend).format('YYYY-MM-DD')

    // post data
    const postData = {
        em_no: id,
        em_id: no,
        em_salary_desc: selectWage,
        em_earning_type: em_earning_type,
        em_amount: em_amount,
        em_start_date: month_start,
        em_end_date: month_end,
        create_user: employeeNumber(),
    }

    //Form reset
    const resetForm = {
        em_salary_desc: '',
        earning_type_name: '',
        include_esi: 0,
        include_pf: 0,
        include_lwf: 0,
        include_protax: 0,
        em_amount: 0,
        start_month: false,
        end_month: false
    }
    const reset = () => {
        updateWageType(0);
        updateWage(0);
    }

    //Submit data
    const submitAllowance = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/empearndeduction', postData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setcount(count + 1)
            setWageType(resetForm);
            reset();
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Redirection
    const handleClose = () => {
        setOpen(false);
    };
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    //reset disable in date selection
    const startmonth = async (e) => {
        e.target.value === 'false' ? settoggle(false) : settoggle(true)
    }
    const endmonth = async (e) => {
        e.target.value === 'false' ? settoggle_end(false) : settoggle_end(true)
    }

    return (
        <Fragment>
            <ModalOne open={open} handleClose={handleClose} />
            <PageLayoutSave
                heading="Earnings - Deducation"
                redirect={RedirectToProfilePage}
                submit={submitAllowance}
            >
                <div className="row g-1">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-2">
                                    <div className="col-md-12 pt-1">
                                        <WageDescripErnDeductSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Wage type Description (Fixed ,Earning, Deducation)"
                                            value={earning_type_name}
                                            disabled="disabled"
                                        />
                                        <input
                                            type="text"
                                            className="hiddenvalue"
                                            value={em_earning_type}
                                            name="em_earning_type"
                                            hidden
                                            onChange={(e) => updateAllowance(e)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Amount "
                                            value={em_amount}
                                            name="em_amount"
                                            changeTextValue={(e) => updateAllowance(e)}
                                        />
                                    </div>
                                    <div className="d-flex align-items-center" >
                                        <div className="col-md-3 text-center">
                                            <Chip
                                                size="small"
                                                icon={include_esi === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label={include_esi === 1 ? "ESI" : "ESI"}
                                                color={include_esi === 1 ? "success" : "error"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-3 col-sx-6 text-center">
                                            <Chip
                                                size="small"
                                                icon={include_pf === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label={include_pf === 1 ? "PF" : "PF"}
                                                color={include_pf === 1 ? "success" : "error"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-3 col-sx-6 text-center">
                                            <Chip
                                                size="small"
                                                icon={include_lwf === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                color={include_lwf === 1 ? "success" : "error"}
                                                label={include_lwf === 1 ? "LWF" : "LWF"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-3 col-sx-6 text-center ">
                                            <Chip
                                                size="small"
                                                icon={include_protax === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label={include_protax === 1 ? "Pro Tax" : "Pro Tax"}
                                                color={include_protax === 1 ? "success" : "error"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* 
                                        In Default thiese dates are disabled state. 

                                    */}
                                    <div className="row g-1 d-flex flex-row justify-content-between align-items-center">
                                        <div className="col-md-5 ">
                                            <FormControlLabel
                                                className=""
                                                control={
                                                    <Checkbox
                                                        name="start_month"
                                                        color="secondary"
                                                        value={start_month}
                                                        checked={start_month}
                                                        className="ml-2"
                                                        onChange={(e) => {
                                                            updateAllowance(e)
                                                            startmonth(e)
                                                        }}
                                                    />
                                                }
                                                label="Start Date"
                                            />
                                        </div>
                                        <div className="col-md-5 g-2 " style={{
                                            paddingLeft: '0.5rem', paddingRight: '-0.5rem'
                                        }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    type="date"
                                                    name="monthstart"
                                                    value={monthstart}
                                                    disabled={toggle}
                                                    onChange={(e) => { updateMonthstart(e) }}
                                                    InputProps={{
                                                        className: classes.customInputFeild
                                                    }}
                                                    renderInput={(params) => <TextField {...params}
                                                    />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                    <div className="row g-1 d-flex flex-row justify-content-between align-items-center">
                                        <div className="col-md-5 ">
                                            <FormControlLabel
                                                className=""
                                                control={
                                                    <Checkbox
                                                        name="end_month"
                                                        color="secondary"
                                                        value={end_month}
                                                        checked={end_month}
                                                        className="ml-2"
                                                        onChange={(e) => {
                                                            updateAllowance(e)
                                                            endmonth(e)
                                                        }}
                                                    />
                                                }
                                                label="End Date"
                                            />
                                        </div>
                                        <div className="col-md-5 g-2" style={{
                                            paddingLeft: '0.5rem', paddingRight: '-0.5rem'
                                        }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    type="date"
                                                    value={monthend}
                                                    disabled={toggle_end}
                                                    onChange={(e) => { updateMonthend(e) }}
                                                    InputProps={{
                                                        className: classes.customInputFeild
                                                    }}
                                                    renderInput={(params) => <TextField {...params}
                                                    />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card">
                            <WagesInfoTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayoutSave >
        </Fragment>
    )
}

export default EmployeeAllowance

