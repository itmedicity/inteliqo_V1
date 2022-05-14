import MaterialTable from 'material-table'
import React, { Fragment, memo, useState, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import ModelHodApproval from './ModelHodApproval';
import { axioslogin } from 'src/views/Axios/Axios';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import OTCancelModel from '../OTComponent/OTCancelModel';
import { HiTrash } from "react-icons/hi";

const OTApprovalHODTable = ({ DeptSect }) => {
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
            title: "Status", field: 'ot_hod_status', cellStyle: { minWidth: 1, maxWidth: 3 }
        },
    ]

    //Get Data
    useEffect(() => {
        if (DeptSect.length !== 0) {
            const deptid = DeptSect && DeptSect.map((val) => {
                return val.dept_section
            })
            const postData = {
                dept_id: deptid
            }
            const getOt = async () => {
                const result = await axioslogin.post('/overtimerequest/othod', postData)
                const { success, data } = result.data;
                if (success === 1) {
                    setTableData(data);
                } else {
                    setTableData(data);
                }
            }
            getOt();
        }
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

    const hodcancel = (data) => {
        setSlno(data)
        setcancelOpen(true);
    };


    return (
        < Fragment >
            {otno !== 0 ?
                <ModelHodApproval
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
                    heading={"Over Time HOD Cancel"}
                    slno={slno}
                    setCount={setCount}
                    count={count}
                />
                : null}
            <MaterialTable
                title="Over Time Approval HOD"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    data => ({
                        icon: () => <AddTaskRoundedIcon size={26} color='success' />,
                        tooltip: "Click here to Approve/Reject",
                        onClick: (e, data) => handleClickOpen(data.ot_slno),
                        disabled: data.ot_hod_status === 'Approved'

                    }),
                    {
                        icon: () => <HiTrash size={24} color='success' />,
                        tooltip: "Click here to Cancel",
                        onClick: (e, data) => hodcancel(data.ot_slno)
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

export default memo(OTApprovalHODTable)
