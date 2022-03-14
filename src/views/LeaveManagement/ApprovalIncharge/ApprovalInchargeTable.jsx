import MaterialTable from 'material-table';
import React, { Fragment, memo, useContext, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { MdCheckCircle } from "react-icons/md"
import ModelApproveReject from '../LeaveCommonComponent/ModelApproveReject';
import { axioslogin } from 'src/views/Axios/Axios';
import { format, differenceInDays } from 'date-fns';
import ModelaprvrejcHalf from '../LeaveCommonComponent/ModelaprvrejcHalf';
import ModelNopunch from '../LeaveCommonComponent/ModelNopunch';
import ModelCompenOff from '../LeaveCommonComponent/ModelCompenOff';
import { PayrolMasterContext } from 'src/Context/MasterContext';
const ApprovalInchargeTable = ({ leavereq, levtpevalue, authority, setleavereq, getDeptSection }) => {
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    // get leave mast data
    const [leavereqtabledata, setleavereqtabledata] = useState([])
    const [leaveremastdata, setleavereqmastdata] =
        useState([
            {
                emno: '',
                leave_date: '',
                leavetodate: '',
                nodays: '',
                reqtype: '',
                lve_uniq_no: ''
            }
        ])
    // get leave detail data 
    const [leavestatedetail, setleavestatedetails] = useState([])
    //get halfday data 
    const [hafdaydata, sethalfdata] = useState([])
    // get nopunch data
    const [nopunch, setnopunch] = useState([])
    // get compensatory off 
    const [comoffsetdata, setcomoff] = useState([])
    // to set reqtype 
    const [reqtype, setreqtype] = useState([])
    //Table
    useEffect(() => {
        if (authority === 1) {
            const filterleavereq = leavereq.filter((val) => {
                return (val.increq === 1 && val.incaprv !== 1) ||
                    (val.increq === 1 && val.incaprv === 1) && (val.hr_apprv === 0)

            })
            setleavereqtabledata(filterleavereq)
        } else if (authority === 2) {
            const filterleavereq = leavereq.filter((val) => {
                return (
                    ((val.increq === 1 && val.incaprv === 1) ||
                        (val.increq === 0 && val.incaprv === 0)))
                    && (val.hod_req === 1 && val.hodaprv === 0) ||
                    (val.hod_req === 1 && val.hodaprv === 1) && (val.hr_apprv === 0)

            })

            setleavereqtabledata(filterleavereq)
        } else if (authority === 3) {
            const filterleavereq = leavereq.filter((val) => {
                return (
                    ((val.increq === 1 && val.incaprv === 1) ||
                        (val.increq === 0 && val.incaprv === 0)))
                    && ((val.hod_req === 1 && val.hodaprv === 1) ||
                        (val.hod_req === 0 && val.hodaprv === 0))
                    && (val.ceo_req === 1 && val.ceo_apprv === 0) ||
                    (val.ceo_req === 1 && val.ceo_apprv === 1) && (val.hr_apprv === 0)

            })
            // console.log(filterleavereq)
            setleavereqtabledata(filterleavereq)
        }
        else if (authority === 4) {
            const filterleavereq = leavereq.filter((val) => {
                return (
                    ((val.increq === 1 && val.incaprv === 1) ||
                        (val.increq === 0 && val.incaprv === 0)))
                    && ((val.hod_req === 1 && val.hodaprv === 1) ||
                        (val.hod_req === 0 && val.hodaprv === 0))
                    && (val.hrreq === 1 && val.hr_apprv === 0)

            })
            // console.log(filterleavereq)
            setleavereqtabledata(filterleavereq)
        }
        else if (authority === 5) {
            const filterleavereq = leavereq.filter((val) => {
                return (
                    (val.hrreq === 1 && val.hr_apprv === 1))
            })
            setleavereqtabledata(filterleavereq)
        }
    }, [leavereq])
    const title = [
        {
            title: "SlNo", field: "SlNo"
        },
        {
            title: "Emp_no", field: "Emp_no"
        },
        {
            title: "Employee name", field: "Employee_name"
        },
        {
            title: "Department Section", field: "Department_section"
        },
        {
            title: "Status", field: "Status"
        },
    ]
    useEffect(() => {
    }, [levtpevalue])
    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [opencompen, setOpencompen] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);
    // on click detail icon 
    const handleClickOpen = async (leavereq) => {
        setreqtype(leavereq.req_type)
        //if type is leave request 
        if (leavereq.req_type === 1) {
            // get master data 
            const result = await axioslogin.get(`/LeaveRequestApproval/${leavereq.SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                const leaveredat =
                    data.map((val) => {
                        const d1 = {
                            leave_date: format(new Date(val.leave_date), 'yyyy-MM-dd'),
                            leavetodate: format(new Date(val.leavetodate), 'yyyy-MM-dd'),
                            nodays: differenceInDays(new Date(val.leavetodate), new Date(val.leave_date)),
                            reqtype: val.reqtype,
                            leave_slno: val.leave_slno,
                            emno: val.em_no,
                            lve_uniq_no: val.lve_uniq_no
                        }
                        return d1
                    })
                setleavereqmastdata(leaveredat)
            }
            // get leave detail data
            const resultdel = await axioslogin.get(`/LeaveRequestApproval/getlevereqdetl/${leavereq.SlNo}`)
            if (resultdel.data.success === 1) {
                setleavestatedetails(resultdel.data.data)
            }
            setOpenleave(true)
        }
        // if leave request type is half day 
        else if (leavereq.req_type === 2) {
            const result = await axioslogin.get(`/LeaveRequestApproval/half/gethalfdaydetl/${leavereq.SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                sethalfdata(data)
            }
            setOpenhalf(true)
        } else if (leavereq.req_type === 3) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/nopunch/getnopunchreq/${leavereq.SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                setnopunch(data)
            }
            setOpennopunch(true)
        } else if (leavereq.req_type === 4) {
            const result = await axioslogin.get(`/LeaveRequestApproval/leave/com/compensatory/compensatoryoffdata/${leavereq.SlNo}`)
            const { success, data } = result.data;
            if (success === 1) {
                setcomoff(data)
            }
            setOpencompen(true);
        }
        // setOpen(true);
    };
    const handleClose = () => {
        setOpenleave(false);
        setOpennopunch(false);
        setOpencompen(false);
        setOpenhalf(false);
    };
    return (
        < Fragment >
            {
                reqtype === 1 ? <ModelApproveReject open={openleave} handleClose={handleClose} leaveremastdata={leaveremastdata} leavestatedetail={leavestatedetail} authority={authority} setleavereq={setleavereq} em_id={em_id} /> :
                    reqtype === 2 ? <ModelaprvrejcHalf open={openhalf} handleClose={handleClose} hafdaydata={hafdaydata} authority={authority} setleavereq={setleavereq} em_id={em_id} /> :
                        reqtype === 3 ? <ModelNopunch open={opennopunch} handleClose={handleClose} hafdaydata={nopunch} authority={authority} setleavereq={setleavereq} em_id={em_id} /> :
                            reqtype === 4 ? <ModelCompenOff open={opencompen} handleClose={handleClose} hafdaydata={comoffsetdata} authority={authority} setleavereq={setleavereq} em_id={em_id} /> : null
            }
            <MaterialTable
                title="Leave Approval"
                data={leavereqtabledata}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <MdCheckCircle size={26} color="secondary" />,
                        onClick: (e, leavereq) => handleClickOpen(leavereq),
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1,
                    // rowStyle: {
                    //     backgroundColor: '#EEE',
                    // }
                }}
            />
        </Fragment>
    )
}
export default memo(ApprovalInchargeTable)
