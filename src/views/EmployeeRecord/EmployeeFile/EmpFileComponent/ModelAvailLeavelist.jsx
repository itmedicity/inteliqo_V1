import React, { Fragment, memo, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import AnnualProcessComponent from 'src/views/CommonCode/AnnualProcessComponent';
import { axioslogin } from 'src/views/Axios/Axios';
import AnnualLeaveProcessComplete from 'src/views/CommonCode/AnnualLeaveProcessComplete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ModelAvailLeavelist = ({
    open,//open model
    dataleave,//{leaves available based on category}
    lv_process_slnocurrent,//current proceess SLNumber 
    handleClose,
    setcastable,// rerender the table on process clickk
    setnodatacl,
    setnodatael,
    setnodatahl,
    setnodatafixed, categorychge, nodatafixed, nameel

}) => {
    const [processCount, setProcessCount] = useState(0)
    const {
        ecat_cl, ecat_lop, ecat_esi_allow, ecat_el,
        ecat_fh, ecat_mate, ecat_nh, ecat_sl } = dataleave;
    const [leaveproceedaata, setleaveprocedata] = useState({
        category_slno: "",
        em_id: " ",
        em_no: "",
        hrm_calcu: " ",
        hrm_clv: " ",
        hrm_cmn: " ",
        hrm_ern_lv: " ",
        hrm_hld: " ",
        hrm_process_status: " ",
        lv_process_slno: " ",
        next_updatedate: " ",
        process_enddate: " ",
        process_updatedate: " ",
        process_user: " "
    })
    const {
        em_id,
        em_no,
        hrm_clv,
        hrm_cmn,
        hrm_ern_lv,
        hrm_hld
    } = leaveproceedaata
    useEffect(() => {
        const getleaveprocessdata = async () => {
            //Get The Process Details from the "hrm_leave_process" table using the current process Serial Nulber (lv_process_slnocurrent)
            const result = await axioslogin.get(`/yearleaveprocess/${lv_process_slnocurrent}`)
            const { success, data } = result.data
            if (success === 0) {
                setleaveprocedata(data[0])
            }
        }
        getleaveprocessdata()
    }, [processCount, lv_process_slnocurrent])

    return (
        <Fragment>
            <div>
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
                        {
                            (ecat_cl === 1 && hrm_clv === 0) ? <AnnualProcessComponent
                                name={'Caual Leave'}
                                value={1}
                                dataleave={dataleave}//{leaves available based on category}
                                em_no={em_no}
                                em_id={em_id}
                                lv_process_slnocurrent={lv_process_slnocurrent}
                                count={setProcessCount}
                                countdata={processCount}
                                setcastable={setcastable}//casual leave table rerender
                                setnodatacl={setnodatacl}
                                setnodatael={setnodatael}
                                setnodatahl={setnodatahl}
                                setnodatafixed={setnodatafixed}
                                categorychge={categorychge}
                                nameel={nameel}
                            /> : hrm_clv === 1 ? <AnnualLeaveProcessComplete name={'Casual Leave'} /> : null
                        }
                        {
                            ((ecat_nh === 1 || ecat_fh === 1) && hrm_hld === 0) ? <AnnualProcessComponent
                                name={'Holiday Leave'}
                                value={2}
                                dataleave={dataleave}
                                em_no={em_no}
                                em_id={em_id}
                                lv_process_slnocurrent={lv_process_slnocurrent}
                                count={setProcessCount}
                                countdata={processCount}
                                setnodatahl={setnodatahl}
                                categorychge={categorychge}
                                nameel={nameel}
                            /> : hrm_hld === 1 ? <AnnualLeaveProcessComplete name={'Holiday Leave'} /> : null
                        }
                        {
                            (ecat_esi_allow === 1 || ecat_lop === 1 || ecat_mate === 1 || ecat_sl === 1) && (hrm_cmn === 0 || nodatafixed === 1) ?
                                <AnnualProcessComponent name={'Common Leave'}
                                    dataleave={dataleave}
                                    value={3}
                                    em_no={em_no}
                                    em_id={em_id}
                                    lv_process_slnocurrent={lv_process_slnocurrent}
                                    count={setProcessCount}
                                    countdata={processCount}
                                    setnodatafixed={setnodatafixed}
                                    categorychge={categorychge}
                                    nameel={nameel}
                                /> : (hrm_cmn === 1) ?
                                    <AnnualLeaveProcessComplete name={'Common Leave'} /> : null
                        }

                        {

                            (ecat_el === 1 && hrm_ern_lv === 0) ? <AnnualProcessComponent
                                name={'Earn Leave'}
                                value={4}
                                dataleave={dataleave}//{leaves available based on category}
                                em_no={em_no}
                                em_id={em_id}
                                lv_process_slnocurrent={lv_process_slnocurrent}
                                count={setProcessCount}
                                setnodatael={setnodatael}
                                countdata={processCount}
                                categorychge={categorychge}
                                nameel={nameel}
                            /> : hrm_ern_lv === 1 ? <AnnualLeaveProcessComplete name={'Earn Leave'} /> : null
                        }


                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={handleClose} >close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Fragment>
    )
}

export default memo(ModelAvailLeavelist)
