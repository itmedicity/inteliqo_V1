import { IconButton, TableCell, TableRow } from '@mui/material'
import React, { Fragment, useState, memo } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { axioslogin } from 'src/views/Axios/Axios';
import { compareAsc } from 'date-fns';
import ModelLeaveProcess from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelLeaveProcess';
import { getProcessserialnum } from 'src/views/Constant/Constant';
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { lastDayOfYear, startOfYear } from 'date-fns';
import moment from 'moment'
import ModelAvailLeavelist from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/ModelAvailLeavelist';
const Leavprccompnt = ({ name, holidaycount, year }) => {
    // use sate for causltable rerender
    const [castable, setcastable] = useState(0)
    // use State foe serial number
    const [nameel, setname] = useState([])
    const [processslno, setprocessslno] = useState(0)
    // to check wheather data is present
    const [nodatacl, setnodatacl] = useState(0)
    const [nodatahl, setnodatahl] = useState(0)
    const [nodatael, setnodatael] = useState(0)
    const [nodatafixed, setnodatafixed] = useState(0)
    // set open model 
    const [open, setOpen] = useState(false);
    const [emnoid, setemnoid] = useState({
        no: 0,
        id: 0
    })
    // check wheathe old or new
    const [olddata, setolddat] = useState(0)
    // to model message
    const [modelmessage, setmodelmessage] = useState('');
    const { no, id } = emnoid

    //  data based on employeee category
    const [leavestate, setleavestate] = useState({})
    // const { ecat_cl, ecat_confere, ecat_cont, ecat_doff_allow, ecat_el,
    //     ecat_esi_allow, ecat_fh, ecat_lop, ecat_mate, ecat_nh, ecat_prob,
    //     ecat_woff_allow, ecat_sl,
    //     em_category
    // } = leavestate
    // to open model ModelLeaveProcess consition
    const [modelvalue, setmodelvalue] = useState(0)
    // to open model leave  list
    const [modellist, setmodellist] = useState(false)
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
    const { lv_process_slno } = leaveprocessid
    const getempldata = async (namee) => {
        setname(namee)
        setemnoid({
            no: namee.em_no,
            id: namee.em_id
        })
        getProcessserialnum().then((val) => {
            setprocessslno(val)
        }
        )
        // data based on the calculation of earn leave
        const datatoselect = {
            emp_no: namee.em_id,
            startdate: moment(startOfYear(new Date(year))).format('YYYY-MM-DD'),
            endate: moment(lastDayOfYear(new Date(year))).format('YYYY-MM-DD'),
        }
        const result = await axioslogin.get(`/common/getannprocess/${namee.em_id}`)
        const { data, success } = result.data
        if (success === 1) {
            setleavestate(data[0])
            const { ecat_cont,
                em_category
            } = data[0]
            const resultselect = await axioslogin.post('/yearleaveprocess/select_yearlyprocess', datatoselect)
            if (resultselect.data.success === 2) {
                const postFormdata =
                {
                    em_no: namee.em_id,
                    em_id: namee.em_no
                }
                // check the table where data present if present get the details process table
                const result = await axioslogin.post('/yearleaveprocess', postFormdata)
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
                    // if no data is present means new employee  set model
                    setmodelvalue(1)
                    setmodelmessage('Leave process is not done for the employee')
                    setolddat(1)
                    setOpen(true)
                }
                else if (success === 1) {
                    leaveprocessidupdate(dataprvleave)
                    // if employee process date has over 
                    if (compareAsc(new Date(), new Date(next_updatedate)) === 1) {
                        if (ecat_cont === 1 && (new Date(next_updatedate) >= new Date())) {
                            setOpen(true)
                            setmodelvalue(1)
                            setmodelmessage('Date Exceeded do you Want To Process')
                        }
                        else {
                            warningNofity('Please do contract renewal')
                        }
                    }
                    else if (category_slno !== em_category) {
                        setmodelvalue(1)
                        setmodelmessage('Category Change Do You Want to  To Process')
                        setOpen(true)
                    }
                    // if process contain data and pending leave process is present
                    else if (hrm_calcu === 0 || hrm_clv === 0 || hrm_cmn === 0 || hrm_ern_lv === 0 || hrm_hld === 0) {
                        setmodellist(true)
                    }
                }
            } else if (resultselect.data.success === 1) {
                const yearlyleavedata = {
                    em_no: namee.em_no,
                    em_id: namee.em_id,
                    proceeuser: 1,
                    year_of_process: moment(startOfYear(new Date(year))).format('YYYY-MM-DD')
                }
                const resultinsert = await axioslogin.post('/yearleaveprocess/insertyearly', yearlyleavedata)
                if (resultinsert.data.success === 1) {
                    setOpen(true)
                    setmodelvalue(1)
                    setmodelmessage('Date Exceeded do you Want To Process')
                }
                else {
                    warningNofity('Please Contact Edp')
                }
            }

        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }

    }

    const handleClose = () => {
        setmodellist(false)
    }
    return (
        <Fragment>

            {modelvalue === 1 ? <ModelLeaveProcess
                open={open}
                dataleave={leavestate} // {leaves available based on category}
                handleClose={handleClose}
                setOpen={setOpen}  //for open model
                id={no}//employee id
                no={id}//employee number
                valuemessage={modelmessage}//model message
                leaveprocessid={leaveprocessid} //current proceess details
                processslno={processslno}//processess serialno
                olddata={olddata}// check wheather new data
                castable={castable}
                setcastable={setcastable}//casual leave table rerender
                nodatacl={nodatacl}
                nodatahl={nodatahl}
                nodatael={nodatael}
                nodatafixed={nodatafixed}
                setnodatacl={setnodatacl}//dataset render  for rerendering the casual leave
                setnodatael={setnodatael} //dataset render  for rerendering the earnleave
                setnodatahl={setnodatahl}//dataset render  for rerendering the holiday
                setnodatafixed={setnodatafixed}//dataset render  for rerendering the datafixed
                setmodelvalue={setmodelvalue}
                modellist={modellist}
                nameel={nameel}
            /> : null}
            {modellist === true ? <ModelAvailLeavelist
                open={modellist} //for open model
                handleClose={handleClose}
                dataleave={leavestate} // {leaves available based on category}
                lv_process_slnocurrent={lv_process_slno}//previous process data
                setcastable={setcastable}//casual leave table rerender
                setnodatacl={setnodatacl}//dataset render  for rerendering the casual leave
                setnodatael={setnodatael} //dataset render  for rerendering the earnleave
                setnodatahl={setnodatahl}//dataset render  for rerendering the holiday
                setnodatafixed={setnodatafixed}//dataset render  for rerendering the datafixed
                nodatafixed={nodatafixed}
                nameel={nameel}
            /> : null}
            {name && name.map((val, index) => {
                return <TableRow key={val.em_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_no}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.em_name}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.duty_day}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.ecat_el === 0 ? "Not Applicalble" : parseInt(val.duty_day / 20)}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{val.ecat_cl === 0 ? "Not Applicalble" : '12'}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{(val.ecat_nh === 0 || val.ecat_fh === 0) ? "Not Applicalble" : holidaycount}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '2rem' }} >{(val.em_gender !== 2) ? "Not Applicalble" : '180'}</TableCell>
                    <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }}>
                        <IconButton
                            aria-label="add"
                            style={{ padding: '0rem' }}
                            onClick={(e) => getempldata(val)}
                        >
                            <AddTaskRoundedIcon size={26} color='success' />
                        </IconButton>

                    </TableCell>
                </TableRow>
            })}
        </Fragment>
    )
}

export default memo(Leavprccompnt)