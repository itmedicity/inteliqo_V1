import Chip from '@mui/material/Chip'
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import WagesInfoTable from '../EmployeeFileTable/WagesInfoTable'
import { IoCheckmarkDoneSharp, IoBan } from "react-icons/io5";
import { Checkbox, FormControlLabel } from '@material-ui/core'
import ModalOne from 'src/views/CommonCode/ModalOne'
import WageDescripErnDeductSelect from 'src/views/CommonCode/WageDescripErnDeductSelect'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import { useHistory, useParams } from 'react-router';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import moment from 'moment';
import { employeeNumber } from 'src/views/Constant/Constant'

const EmpAllowanceTableEdit = () => {
    const classes = useStyles();
    const { slno, id, no } = useParams();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const { updateWageType, selectWage, updateWage } = useContext(PayrolMasterContext)
    const [toggle, settoggle] = useState(true)
    const [toggle_end, settoggle_end] = useState(true)
    const [monthstart, setMonthstart] = useState(new Date());
    const [monthend, setMonthend] = useState(new Date());

    //Initializing
    const [wageType, setWageType] = useState({
        earning_type_name: '',
        include_esi: 0,
        include_pf: 0,
        include_lwf: 0,
        include_protax: 0,
        em_amount: '',
        last_amount: '',
        start_month: true,
        end_month: true,
        monthstart: '',
        monthend: ''
    });

    //Destructuring
    const { earning_type_name, last_amount, em_amount, include_esi, include_pf, include_lwf, include_protax, start_month, end_month } = wageType;
    const updateAllowance = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setWageType({ ...wageType, [e.target.name]: value })
    }

    //Get data 
    useEffect(() => {
        const getWageType = async () => {
            const result = await axioslogin.get(`/empearndeduction/select/${slno}`);
            const { success, data } = result.data;
            if (success === 1) {
                const { em_salary_desc, earning_type_name, include_esi, include_pf, include_lwf, include_protax, em_amount, em_start_date, em_end_date } = data[0]
                const formdata = {
                    earning_type_name: earning_type_name,
                    include_esi: include_esi,
                    include_pf: include_pf,
                    include_lwf: include_lwf,
                    include_protax: include_protax,
                    em_amount: em_amount,
                    last_amount: em_amount,
                    start_month: false,
                    end_month: false,
                }
                updateWage(em_salary_desc)
                setWageType(formdata)
                setMonthstart(em_start_date)
                setMonthend(em_end_date)
            }
            else {
            }
        }
        getWageType()
        updateWage(0)
    }, [slno, updateWage]);


    // month update function
    const updateMonthstart = (val) => {
        setMonthstart(val)
    }
    const updateMonthend = (val) => {
        setMonthend(val)
    }
    //moment start month
    const month_start = moment(monthstart).format('YYYY-MM-DD')
    //moment end month
    const month_end = moment(monthend).format('YYYY-MM-DD')

    // post data
    const updateData = {
        em_id: no,
        em_salary_desc: selectWage,
        em_amount: em_amount,
        last_wage: last_amount,
        em_start_date: month_start,
        em_end_date: month_end,
        edit_user: employeeNumber(),
        ernded_slno: slno,

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
        last_amount: 0,
        start_month: false,
        end_month: false
    }
    const reset = () => {
        updateWageType(0);
        updateWage(0);
    }

    //Update data
    const submitAllowance = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/empearndeduction', updateData)
        const { message, success } = result.data;
        if (success === 2) {
            setWageType(resetForm);
            history.push(`/Home/EmployeeAllowance/${id}/${no}`)
            succesNofity(message);
            reset();
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    const startmonth = async (e) => {
        e.target.value === 'false' ? settoggle(false) : settoggle(true)
    }
    const endmonth = async (e) => {
        e.target.value === 'false' ? settoggle_end(false) : settoggle_end(true)
    }

    //Redirect
    const handleClose = () => {
        setOpen(false);
    };
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    return (
        <Fragment>
            <ModalOne open={open} handleClose={handleClose} />
            <PageLayoutSave
                heading="Earnings - Deducation"
                redirect={RedirectToProfilePage}
                // submit={handleClickOpen}
                submit={submitAllowance}
            >
                <div className="row g-1">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <form className={classes.root} onSubmit={submitAllowance}>
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
                                            <input
                                                type="text"
                                                className="hiddenvalue"
                                                value={last_amount}
                                                name="last_amount"
                                                hidden
                                                onChange={(e) => updateAllowance(e)}
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
                                                    label={include_lwf === 1 ? "LWF" : "LWF"}
                                                    color={include_lwf === 1 ? "success" : "error"}
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
                                                        minDate={monthstart}
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
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card">
                            <WagesInfoTable />
                        </div>
                    </div>
                </div>
            </PageLayoutSave >
        </Fragment>
    )
}

export default EmpAllowanceTableEdit
