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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelLeaveProcess = ({ open,
    handleClose,
    dataleave,// {leaves available based on category}
    setOpen, //for open model
    id,//employee id
    no,//employee number
    valuemessage,//model message
    leaveprocessid,//current proceess details
    processid,
    olddata,// check wheather new data
    processslno, //processess serialno
    setcastable,// rerender the table on process clickk
    setnodatacl,
    setnodatael,
    setnodatahl,
    setnodatafixed



}) => {


    // open model ModelAvailLeavelist
    const [openleavelist, setopenleavelist] = useState(false);
    // destructuring  dataleave
    const { ecat_cl, ecat_confere, ecat_cont, ecat_doff_allow, ecat_el, ecat_esi_allow,
        ecat_fh, ecat_lop, ecat_mate, ecat_nh, ecat_prob, ecat_sl, ecat_woff_allow,
        em_category, em_conf_end_date, em_contract_end_date, em_prob_end_date,
        em_retirement_date } = dataleave

    // destructuring  leaveprocessid
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
        if (em_category != category_slno) {
            const processdataold = {
                lv_process_slno: processslno,
                em_no: id,
                category_slno: em_category,
                process_user: employeeNumber(),
                em_id: no,
                hrm_clv: hrm_clv != 2 ? hrm_clv : ecat_cl === 1 ? 0 : 2,
                hrm_ern_lv: 0,
                hrm_hld: hrm_hld != 2 ? hrm_hld : (ecat_nh === 1 || ecat_fh === 1) ? 0 : 2,
                hrm_cmn: hrm_cmn != 2 ? hrm_cmn : (ecat_esi_allow === 1 || ecat_el === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1) ? 0 : 2,
                hrm_calcu: 0,
                hrm_process_status: 'A',
                next_updatedate: ecat_cont === 1 ? em_contract_end_date : ecat_prob === 1 ? em_prob_end_date : '2021-12-31'
            }
            return processdataold
        }
        else {
            // for save  data
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
                next_updatedate: ecat_cont === 1 ? em_contract_end_date : ecat_prob === 1 ? em_prob_end_date : '2021-12-31'
            }
            return processdata
        }
    }

    // for new employee prime data
    const processdatanew = {
        lv_process_slno: processslno,
        em_no: id,
        category_slno: em_category,
        process_user: employeeNumber(),
        em_id: no,
        hrm_clv: ecat_cl === 1 ? 0 : 2,
        hrm_ern_lv: 0,
        hrm_hld: (ecat_nh === 1 || ecat_fh === 1) ? 0 : 2,
        hrm_cmn: (ecat_esi_allow === 1 || ecat_el === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1) ? 0 : 2,
        hrm_calcu: 0,
        hrm_process_status: 'A',
        next_updatedate: ecat_cont === 1 ? em_contract_end_date : ecat_prob === 1 ? em_prob_end_date : '2021-12-31'
    }


    // for update data
    const updata = {
        lv_process_slno: lv_process_slno
    }
    // function
    const datayearsave = async (data) => {
        const result = await axioslogin.post('/yearleaveprocess/create', data)

        const { message, success } = result.data
        if (success === 1) {
            succesNofity(message)
            setopenleavelist(true)
            setOpen(false)

        } else if (success === 0) {
            infoNofity(message)
        } else {
            infoNofity(message)
        }
    }
    // on click yes process  
    const annualleaveprocess = async () => {

        // for updateing processes table  if previous data
        const resultupdate = await axioslogin.patch('/yearleaveprocess/', updata)
        const { message, success } = resultupdate.data
        if (success === 2) {
            if (olddata === 1) {
                datayearsave(processdatanew)
            }
            else {
                datayearsave(funprocessdata(em_category, category_slno))
            }
        } else if (success === 0) {
            infoNofity(message)
        } else {
            infoNofity(message)
        }
    }
    const handleClosee = () => {
        setopenleavelist(false)
    }
    const handleClleaveprocess = () => {

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
