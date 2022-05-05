import MaterialTable from 'material-table'
import React, { Fragment, memo, useState, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import ModelHRApproval from './ModelHRApproval';
import { HiTrash } from "react-icons/hi";
import OTCancelModel from '../OTComponent/OTCancelModel';

const OTApprovalHRTableSec = ({ DeptSect }) => {
    const [data, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [otno, setOtno] = useState(0);
    const [slno, setSlno] = useState(0);
    //Table
    const title = [
        {
            title: "SlNo", field: "ot_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Emp_ID", field: "em_no", cellStyle: { minWidth: 198, maxWidth: 250 }
        },
        {
            title: "Emp_Name", field: 'em_name', cellStyle: { minWidth: 1, maxWidth: 3 }
        },
        {
            title: "OT Date", field: "ot_days", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Requested Date", field: "ot_date", cellStyle: { minWidth: 198, maxWidth: 250 }
        },
        {
            title: "OT in Minutes", field: 'over_time', cellStyle: { minWidth: 1, maxWidth: 3 }
        },
        {
            title: "Status", field: 'who', cellStyle: { minWidth: 1, maxWidth: 3 }
        },
    ]

    //Get Data
    useEffect(() => {
        const postData = {
            dept_id: DeptSect
        }
        const getOt = async () => {
            const result = await axioslogin.post('/overtimerequest/othr', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                setTableData(data);
                warningNofity("Error Occured Please Contact EDP")
            }
        }
        getOt();
    }, [DeptSect, count]);

    const [open, setOpen] = useState(false);
    const [cancelopen, setcancelOpen] = useState(false);
    const handleClickOpen = (data) => {
        setOtno(data)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };
    const cancelClose = () => {
        setcancelOpen(false);
    };

    const hrcancel = (data) => {
        setSlno(data)
        setcancelOpen(true);
    };


    return (
        < Fragment >
            {otno !== 0 ?
                <ModelHRApproval
                    open={open}
                    handleClose={handleClose}
                    otno={otno}
                    setCount={setCount}
                    count={count}
                />
                : null}
            {slno !== 0 ?
                <OTCancelModel
                    cancelopen={cancelopen}
                    cancelClose={cancelClose}
                    heading={"Over Time HR Cancel"}
                    slno={slno}
                    setCount={setCount}
                    count={count}
                />
                : null}
            <MaterialTable
                title="OT Approval HR"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    data => ({
                        icon: () => <AddTaskRoundedIcon size={26} color='success' />,
                        tooltip: "Click here to Approve/Reject",
                        onClick: (e, data) => handleClickOpen(data.ot_slno),
                        disabled: data.ot_hr_status === 'Approved'

                    }),
                    {
                        icon: () => <HiTrash size={24} color='success' />,
                        tooltip: "Click here to Cancel",
                        onClick: (e, data) => hrcancel(data.ot_slno)
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1
                }}
            />
        </Fragment >
    )
}

export default memo(OTApprovalHRTableSec)
