import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState, useContext, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { axioslogin } from 'src/views/Axios/Axios'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import DesignationType from 'src/views/CommonCode/DesignationType'
import EmployeType from 'src/views/CommonCode/EmployeType'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { useHistory, useParams } from 'react-router-dom'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { memo } from 'react'
import Textinput from 'src/views/Component/TextInput'

const EmploymentTypeEdit = () => {

    const [cont_period, setcont_period] = useState(0)
    const [cont_grace, setcont_grace] = useState(0)
    const [desiggperiod, setdesiggperiod] = useState(0)
    // to get parameter 
    const { id } = useParams()
    const [data, setdata] = useState('')
    const classes = useStyles();
    const {
        selectEmployeeType,
        selectDesignationType,
        updateEmployeetype,
        updateDesignationType,
        earntypename,
        designattypename
    } = useContext(PayrolMasterContext);


    // use history
    const history = useHistory();
    const [employmentData, setEmploymentData] = useState({
        emt_name: '',
        emp_type: selectEmployeeType,
        des_type: selectDesignationType,
        lvetype_slno_cl: false,
        max_allowed_count_cl: 0,
        lvetype_slno_sick: false,
        max_allowed_count_sick: 0,
        lvetype_slno_conference: false,
        max_allowed_count_conference: 0,
        lvetype_slno_lop: false,
        max_allowed_count_lop: 0,
        lvetype_slno_maternity: false,
        max_allowed_count_maternity: 0,
        lvetype_slno_previlage: false,
        max_allowed_count_previlage: 0,
        cont_renw: false,
        contract_perd: 0,
        train_perd: 0,
        trapro: false,
        esi_yes: false,
        nahl_yes: false,
        fest_leav: false,
        dayoff: false,
        workoff: false,
        emp_status: false
    })

    // use effect for append
    useEffect(() => {
        const getyearlysettings = async () => {
            const result = await axioslogin.get(`/empcat/${id}`)
            const { data } = result.data;
            const {
                des_type,
                ecat_cl,
                ecat_cl_max,
                ecat_confere,
                ecat_confere_max,
                ecat_cont,
                ecat_cont_period,
                ecat_doff_allow,
                ecat_el,
                ecat_el_max,
                ecat_esi_allow,
                ecat_fh,
                ecat_lop,
                ecat_lop_max,
                ecat_mate,
                ecat_mate_max,
                ecat_name,
                ecat_nh,
                ecat_prob,
                ecat_prob_period,
                ecat_sl,
                ecat_sl_max,
                ecat_status,
                ecat_woff_allow,
                emp_type, empstat_period, cont_period, cont_grace } = data[0]

            const formdata = {
                lvetype_slno_cl: ecat_cl === 1 ? true : false,
                max_allowed_count_cl: ecat_cl_max,
                lvetype_slno_sick: ecat_sl === 1 ? true : false,
                max_allowed_count_sick: ecat_sl_max,
                lvetype_slno_conference: ecat_confere === 1 ? true : false,
                max_allowed_count_conference: ecat_confere_max,
                lvetype_slno_lop: ecat_lop === 1 ? true : false,
                max_allowed_count_lop: ecat_lop_max,
                lvetype_slno_maternity: ecat_mate === 1 ? true : false,
                max_allowed_count_maternity: ecat_mate_max,
                lvetype_slno_previlage: ecat_el === 1 ? true : false,
                max_allowed_count_previlage: ecat_el_max,
                cont_renw: ecat_cont === 1 ? true : false,
                contract_perd: ecat_cont_period,
                train_perd: ecat_prob_period,
                trapro: ecat_prob === 1 ? true : false,
                esi_yes: ecat_esi_allow === 1 ? true : false,
                nahl_yes: ecat_nh === 1 ? true : false,
                fest_leav: ecat_fh === 1 ? true : false,
                dayoff: ecat_doff_allow === 1 ? true : false,
                workoff: ecat_woff_allow === 1 ? true : false,
                emp_status: ecat_status === 1 ? true : false,

            }
            setEmploymentData(formdata)
            updateEmployeetype(emp_type)
            updateDesignationType(des_type)
            setdata(ecat_name)
            setcont_period(cont_period);
            setcont_grace(cont_grace);
            setdesiggperiod(empstat_period)
        }
        getyearlysettings();
        if (selectEmployeeType !== 0) {
            setdata(earntypename + '+' + designattypename)
            const getcontractdayrenew = async () => {
                // api for contract
                const result = await axioslogin.get(`/emptype/${selectEmployeeType}`)
                const contractdata = result.data.data[0]
                setcont_period(contractdata.cont_period);
                setcont_grace(contractdata.cont_grace);
            }
            getcontractdayrenew()
        }
        if (selectDesignationType !== 0) {
            setdata(earntypename + '+' + designattypename)

            const getdesignationperiod = async () => {
                const result = await axioslogin.get(`/empstat/${selectDesignationType}`)
                const period = result.data.data[0]
                setdesiggperiod(period.empstat_period)

            }
            getdesignationperiod();
        }

    }, [id, updateDesignationType, updateEmployeetype, selectDesignationType, selectEmployeeType, designattypename, earntypename])


    // destructuring employeedata
    const {
        lvetype_slno_cl,
        max_allowed_count_cl,
        lvetype_slno_sick,
        max_allowed_count_sick,
        lvetype_slno_conference,
        max_allowed_count_conference,
        lvetype_slno_lop,
        max_allowed_count_lop,
        lvetype_slno_maternity,
        max_allowed_count_maternity,
        lvetype_slno_previlage,
        max_allowed_count_previlage,
        cont_renw,
        contract_perd,
        train_perd,
        trapro,
        esi_yes,
        nahl_yes,
        fest_leav,
        dayoff,
        workoff,
        emp_status } = employmentData;





    const getEmploymentFormData = (e) => {

        if (selectEmployeeType === 0 && selectDesignationType === 0) {
            infoNofity("Please Select The Designation Type or EmployeeType")
        }
        else {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            console.log(value);
            setEmploymentData({ ...employmentData, [e.target.name]: value })
        }
    }

    // for submission data
    const postFormdata = {
        ecat_name: data,
        emp_type: selectEmployeeType,
        des_type: selectDesignationType,
        ecat_cont: cont_renw === true ? 1 : 0,
        ecat_cont_period: contract_perd,
        ecat_cont_type: 'M',
        ecat_prob: trapro === true ? 1 : 0,
        ecat_prob_period: train_perd,
        ecat_prob_type: 'M',
        ecat_cl: lvetype_slno_cl === true ? 1 : 0,
        ecat_cl_max: max_allowed_count_cl,
        ecat_el: lvetype_slno_previlage === true ? 1 : 0,
        ecat_el_max: max_allowed_count_previlage,
        ecat_sl: lvetype_slno_sick === true ? 1 : 0,
        ecat_sl_max: max_allowed_count_sick,
        ecat_nh: nahl_yes === true ? 1 : 0,
        ecat_fh: fest_leav === true ? 1 : 0,
        ecat_woff_allow: workoff === true ? 1 : 0,
        ecat_doff_allow: dayoff === true ? 1 : 0,
        ecat_esi_allow: esi_yes === true ? 1 : 0,
        ecat_confere: cont_renw === true ? 1 : 0,
        ecat_confere_max: max_allowed_count_conference,
        ecat_lop: lvetype_slno_lop === true ? 1 : 0,
        ecat_lop_max: max_allowed_count_lop,
        ecat_mate: lvetype_slno_maternity === true ? 1 : 0,
        ecat_mate_max: max_allowed_count_maternity,
        ecat_status: emp_status === true ? 1 : 0,
        category_slno: id,
        empstat_period: cont_period,
        cont_period: cont_grace,
        cont_grace: desiggperiod

    }

    const rest = {
        emt_name: '',
        emp_type: selectEmployeeType,
        des_type: selectDesignationType,
        lvetype_slno_cl: false,
        max_allowed_count_cl: 0,
        lvetype_slno_sick: false,
        max_allowed_count_sick: 0,
        lvetype_slno_conference: false,
        max_allowed_count_conference: 0,
        lvetype_slno_lop: false,
        max_allowed_count_lop: 0,
        lvetype_slno_maternity: false,
        max_allowed_count_maternity: 0,
        lvetype_slno_previlage: false,
        max_allowed_count_previlage: 0,
        cont_renw: false,
        contract_perd: 0,
        train_perd: 0,
        trapro: false,
        esi_yes: false,
        nahl_yes: false,
        fest_leav: false,
        dayoff: false,
        workoff: false,
        emp_status: false
    }



    // for submission
    const submitEmploymentForm = async (e) => {

        e.preventDefault();
        if (cont_renw === true && contract_perd === 0) {
            infoNofity("Select contract Period")

        } else if (trapro === true && train_perd === 0) {
            infoNofity("Select Training Period")

        } else {
            const result = await axioslogin.patch('/empcat', postFormdata);
            const { success, message } = result.data;


            if (success === 2) {
                succesNofity(message)
                setdata('')
                setEmploymentData(rest)
                // history.push('/Home/EmploymentType')
            } else if (success === 0) {
                errorNofity(message)
            } else if (success === 2) {
                infoNofity(message)
            }
        }

    }

    // for close button 
    const toSettings = () => {
        history.push('/Home/Settings');
    }
    // to view page 
    const employmentTypeTable = () => {
        history.push('/Home/EmploymentTypeList');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Employment Type</h5>
                </div>
                <form className={classes.root} onSubmit={submitEmploymentForm}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">

                                <div className="col-md-12 row">
                                    <div className="col-md-4">
                                        <EmployeType style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-4">
                                        <DesignationType style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-4">
                                        <Textinput
                                            // label="Employment Type Name"
                                            // fullWidth
                                            // disabled
                                            // size="small"
                                            // autoComplete="off"
                                            // variant="outlined"
                                            // required
                                            // name="emt_name"
                                            // value={data}
                                            // onChange={(e) => getEmploymentFormData(e)}
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Employment Type Name"
                                            changeTextValue={(e) => getEmploymentFormData(e)}
                                            value={data}
                                            name="emt_name"
                                        />
                                        <TextField
                                            name="cont_period"
                                            fullWidth
                                            value={cont_period}
                                            hidden
                                        />
                                        <TextField
                                            name="cont_grace"
                                            fullWidth
                                            value={cont_grace}
                                            hidden
                                        />
                                        <TextField
                                            name="desiggperiod"
                                            value={desiggperiod}
                                            hidden
                                        />
                                    </div>

                                </div>

                                {/* first row */}
                                <div className="col-md-12 row">
                                    <div className="col-md-3 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="lvetype_slno_cl"
                                                    color="secondary"
                                                    value={lvetype_slno_cl}
                                                    checked={lvetype_slno_cl}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Casual Leave"
                                        />
                                    </div>
                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            disabled
                                            format="###"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="casleave_perd"
                                            value={max_allowed_count_cl}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-3 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="lvetype_slno_maternity"
                                                    color="secondary"
                                                    value={lvetype_slno_maternity}
                                                    checked={lvetype_slno_maternity}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="ML"
                                        />
                                    </div>

                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            format="###"
                                            disabled
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="max_allowed_count_maternity"
                                            value={max_allowed_count_maternity}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-2 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="workoff"
                                                    color="secondary"
                                                    value={workoff}
                                                    checked={workoff}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Work Off"
                                        />
                                    </div>
                                    <div className="col-md-2 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="fest_leav"
                                                    color="secondary"
                                                    value={fest_leav}
                                                    checked={fest_leav}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Festival Leave "
                                        />
                                    </div>
                                </div>


                                {/* second row */}
                                <div className="col-md-12 row">
                                    <div className="col-md-3 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="lvetype_slno_previlage"
                                                    color="secondary"
                                                    value={lvetype_slno_previlage}
                                                    checked={lvetype_slno_previlage}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Earn Leave"
                                        />
                                    </div>
                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            disabled
                                            format="###"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="max_allowed_count_previlage"
                                            value={max_allowed_count_previlage}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-3 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="lvetype_slno_conference"
                                                    color="secondary"
                                                    value={lvetype_slno_conference}
                                                    checked={lvetype_slno_conference}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Conferance Leave"
                                        />
                                    </div>
                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            disabled
                                            format="###"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="max_allowed_count_conference"
                                            value={max_allowed_count_conference}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-2 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="dayoff"
                                                    color="secondary"
                                                    value={dayoff}
                                                    checked={dayoff}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Day off"
                                        />
                                    </div>
                                    <div className="col-md-2 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="nahl_yes"
                                                    color="secondary"
                                                    value={nahl_yes}
                                                    checked={nahl_yes}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="National Holiday"
                                        />
                                    </div>

                                </div>
                                {/* third row */}
                                <div className="col-md-12 row">
                                    <div className="col-md-3 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="lvetype_slno_sick"
                                                    color="secondary"
                                                    value={lvetype_slno_sick}
                                                    checked={lvetype_slno_sick}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Sick Leave"
                                        />
                                    </div>
                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            disabled
                                            format="###"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="max_allowed_count_sick"
                                            value={max_allowed_count_sick}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-3 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="lvetype_slno_lop"
                                                    color="secondary"
                                                    value={lvetype_slno_lop}
                                                    checked={lvetype_slno_lop}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="LOP"
                                        />
                                    </div>
                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            disabled
                                            format="###"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="loptxt"
                                            value={max_allowed_count_lop}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-2 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="esi_yes"
                                                    color="secondary"
                                                    value={esi_yes}
                                                    checked={esi_yes}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="ESI"
                                        />
                                    </div>
                                    <div className="col-md-2 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="emp_status"
                                                    color="secondary"
                                                    value={emp_status}
                                                    checked={emp_status}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Status"
                                        />
                                    </div>
                                </div>


                                {/* forth row */}
                                <div className="col-md-12 row">
                                    <div className="col-md-3 ">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="cont_renw"
                                                    color="secondary"
                                                    value={cont_renw}
                                                    checked={cont_renw}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Contract Renewal Period(Days)"
                                        />
                                    </div>
                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            format="###"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="contract_perd"
                                            value={contract_perd}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-3 ">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="trapro"
                                                    color="secondary"
                                                    value={trapro}
                                                    checked={trapro}
                                                    className="ml-2 "
                                                    onChange={(e) => getEmploymentFormData(e)}
                                                />
                                            }
                                            label="Training /Probation period (Days)"
                                        />
                                    </div>
                                    <div className="col-md-1 col-sm-4">
                                        <NumberFormat
                                            customInput={TextField}
                                            fullWidth
                                            format="###"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            type="text"
                                            thousandSeparator={false}
                                            allowNegative={false}
                                            name="train_perd"
                                            value={train_perd}
                                            onChange={(e) => getEmploymentFormData(e)}
                                        />
                                    </div>


                                </div>



                            </div>
                        </div>
                    </div>
                    <div className="card-footer">

                        <div className="row col-md-12">

                            <div className="col-md-6 row">
                                <div className="col-md-4 col-sm-12 col-xs-12 mb-1">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        type="Submit"
                                        className="ml-2"
                                    >
                                        Save
                                    </Button>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        className="ml-2"
                                        onClick={employmentTypeTable}
                                    >
                                        View
                                    </Button>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        className="ml-2"
                                        onClick={toSettings}
                                    >
                                        Close
                                    </Button>
                                </div>

                            </div>
                            <div className="col-md-6 row"></div>

                        </div>
                    </div>
                </form>

            </div>
        </Fragment>
    )
}

export default memo(EmploymentTypeEdit)
