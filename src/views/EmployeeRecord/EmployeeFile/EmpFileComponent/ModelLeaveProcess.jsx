import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import ModelAvailLeavelist from './ModelAvailLeavelist';
import { axioslogin } from 'src/views/Axios/Axios';
import { employeeNumber } from 'src/views/Constant/Constant';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { lastDayOfYear } from 'date-fns';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelLeaveProcess = ({
    open,
    handleClose,
    dataleave,// {leaves available based on category} 
    setOpen, //for open model
    id,//employee id
    no,//employee number
    valuemessage,//model message
    leaveprocessid,//current proceess details //old process
    olddata,// check wheather new data
    processslno, //processess serialno//new process slno
    setcastable,// rerender the table on process clickk
    setnodatacl,
    setnodatael,
    setnodatahl,
    setnodatafixed, setmodelvalue, categorychge, nameel
}) => {
    // open model ModelAvailLeavelist
    const [openleavelist, setopenleavelist] = useState(false);

    // destructuring  dataleave --> Available Leves and other details from the database based on Category ID
    const { ecat_cl, ecat_cont, ecat_el, ecat_esi_allow,
        ecat_fh, ecat_lop, ecat_mate, ecat_nh, ecat_prob, ecat_sl,
        em_category, em_contract_end_date, em_prob_end_date } = dataleave


    // destructuring  leaveprocessid --> Data From the "hrm_leave_process" table if status is "A"
    const {
        hrm_calcu,
        hrm_clv,
        hrm_cmn,
        hrm_ern_lv,
        hrm_hld,
        lv_process_slno,
        category_slno
    } = leaveprocessid
    // function for process data
    const funprocessdata = (em_category, category_slno) => {
        // if  employee category changed

        if (em_category !== category_slno) {

            //if the employee category slno is diffrent in "hrm_emp_mast" table and "hrm_leave_process" table 
            const processdataold = {
                lv_process_slno: processslno,
                em_no: id,
                category_slno: em_category,
                process_user: employeeNumber(),
                em_id: no,
                hrm_clv: ((hrm_clv === 1) && (ecat_cl === 1)) ? 1 : ((hrm_clv === 0) && (ecat_cl === 1)) ? 0 : ((hrm_clv === 2) && (ecat_cl === 1)) ? 0 : 2,
                hrm_ern_lv: ((hrm_ern_lv === 1) && (ecat_el === 1)) ? 1 : ((hrm_ern_lv === 0) && (ecat_el === 1)) ? 0 : ((hrm_ern_lv === 2) && (ecat_el === 1)) ? 0 : 2,
                hrm_hld: (ecat_nh === 1 || ecat_fh === 1) && (hrm_hld === 1) ? 1 : (ecat_nh === 1 || ecat_fh === 1) && (hrm_hld === 2) ? 0 : (ecat_nh === 1 || ecat_fh === 1) && (hrm_hld === 0) ? 0 : (ecat_nh === 0 && ecat_fh === 0) ? 2 : 2,
                hrm_cmn: hrm_cmn !== 2 ? hrm_cmn : (ecat_esi_allow === 1 || ecat_el === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1) ? 0 : 2,
                hrm_calcu: 0,
                hrm_process_status: 'A',
                next_updatedate: ecat_cont === 1 ? em_contract_end_date : ecat_prob === 1 ? em_prob_end_date : moment(lastDayOfYear(new Date())).format('YYYY-MM-DD')
                // "next_updatedate"  if employee is in contract "contract end date" : if is in probation "probation end date" other wise last day of year
            }
            return processdataold
        }
        else {
            // for save  data // Same data from the "hrm_leave_process" table only change is the "next_updatedate" date
            const processdata = {
                lv_process_slno: processslno,
                em_no: id,
                category_slno: em_category,
                process_user: employeeNumber(),
                em_id: no,
                hrm_clv: hrm_clv,
                hrm_ern_lv: hrm_ern_lv,
                hrm_hld: hrm_hld,
                hrm_cmn: hrm_cmn,
                hrm_calcu: hrm_calcu,
                hrm_process_status: 'A',
                next_updatedate: ecat_cont === 1 ? em_contract_end_date : ecat_prob === 1 ? em_prob_end_date : moment(lastDayOfYear(new Date())).format('YYYY-MM-DD')
                // "next_updatedate"  if employee is in contract "contract end date" : if is in probation "probation end date" other wise last day of year
            }
            return processdata
        }
    }

    // for new employee Primary data 
    // If it is a new Employee following new data will be inserted in the table
    const processdatanew = {
        lv_process_slno: processslno,
        em_no: id,
        category_slno: em_category,
        process_user: employeeNumber(),
        em_id: no,
        hrm_clv: ecat_cl === 1 ? 0 : 2,
        hrm_ern_lv: ecat_el === 1 ? 0 : 2,
        hrm_hld: (ecat_nh === 1 || ecat_fh === 1) ? 0 : 2,
        hrm_cmn: (ecat_esi_allow === 1 || ecat_el === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1) ? 0 : 2,
        hrm_calcu: 0,
        hrm_process_status: 'A',
        next_updatedate: ecat_cont === 1 ? em_contract_end_date : ecat_prob === 1 ? em_prob_end_date : moment(lastDayOfYear(new Date())).format('YYYY-MM-DD')
    }

    // for update data
    const updata = {
        lv_process_slno: lv_process_slno
    }
    // update leave table
    const updatedetllable = {
        new_process: processslno,
        oldprocessslno: lv_process_slno
    }
    /*
        Function for inserting initial data in to the "hrm_leave_process" table
    */
    const datayearsave = async (data) => {
        const result = await axioslogin.post('/yearleaveprocess/create', data)
        const { message, success } = result.data
        if (success === 1) {
            succesNofity(message)
            setopenleavelist(true) //After insert data into the "hrm_leave_process" table open the Model ( Listing the )
            setOpen(false)

        } else if (success === 0) {
            infoNofity(message)
        } else {
            infoNofity(message)
        }
    }
    // on click yes process  
    const annualleaveprocess = async () => {
        // setmodelvalue(0)
        // for updateing processes table  if previous data
        /*
            When Open the Process model for a new leave Process and on Click the  "Yes" button 
            then --> check
                if there is any old data in the "hrm_leave_process" table --> if yes , "hrm_process_status" column  status changed as "N" ,means Inactive ( "A" --> "N" )
            Following API will updated the coulmn as "N"
        */
        const resultupdate = await axioslogin.patch('/yearleaveprocess/', updata)
        const { message, success } = resultupdate.data

        if (success === 2) {
            // Success === 2 means "hrm_process_status" coulumn status successfully updated as "N" in the table "<ModelAvailLeavelist/>"
            if (olddata === 1) {
                // New Process || initial Process
                datayearsave(processdatanew)
            }
            else {
                datayearsave(funprocessdata(em_category, category_slno))
            }

            if ((em_category !== category_slno)) {
                {
                    /*
                        Update the all leaves inactive as value "1" / this data consider for the carry forward
                        Update casual leave inactive (as "1" ) // inactive status --> "1" consider for the leave carry forward
                    */
                    if ((ecat_cl === 0 && hrm_clv === 1)) {
                        await axioslogin.post('/yearleaveprocess/updatecasualleaveupdateslno', updatedetllable)
                        // const { message, success } = updatecasualleaveupdateslno.data
                    }
                    //    holiday leaves update
                    if ((ecat_nh === 0 || ecat_fh === 0) && hrm_hld === 1) {

                        await axioslogin.post('/yearleaveprocess/updateholidayupdateslno', updatedetllable)
                        // const { message, success } = updateholidayupdateslno.data
                    }
                    // earn leave update
                    if ((ecat_el === 0) && hrm_ern_lv === 1) {
                        await axioslogin.post('/yearleaveprocess/updateeanleaveupdate', updatedetllable)
                        // const { message, success } = updateholidayupdateslno.data
                    }
                }
            }
        } else if (success === 0) { // If any error from the updated API
            infoNofity(message)
        } else {
            // Any Other Error
            infoNofity(message)
        }
    }
    const handleClosee = () => {
        setmodelvalue(0)
        setopenleavelist(false)
    }
    const handleClleaveprocess = () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <div>
                {openleavelist === true ? <ModelAvailLeavelist
                    open={openleavelist}//open model
                    dataleave={dataleave}//{leaves available based on category}
                    lv_process_slnocurrent={processslno}//current proceess details
                    setcastable={setcastable}//casual leave table rerender
                    setnodatacl={setnodatacl}//dataset render  for rerendering the casual leave
                    setnodatael={setnodatael} //dataset render  for rerendering the earnleave
                    setnodatahl={setnodatahl}//dataset render  for rerendering the holiday
                    setnodatafixed={setnodatafixed}//dataset render  for rerendering the datafixed
                    handleClose={handleClosee}
                    categorychge={categorychge}
                    nameel={nameel}

                /> : null}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-descriptiona">
                    <DialogContent sx={{
                        minWidth: 600,
                        maxWidth: 600
                    }}>
                        <DialogContentText id="alert-dialog-slide-descriptiona">
                            {valuemessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={annualleaveprocess} color="secondary" >YES</Button>
                        <Button onClick={handleClleaveprocess} color="secondary" >NO</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>
    )
}

export default ModelLeaveProcess
