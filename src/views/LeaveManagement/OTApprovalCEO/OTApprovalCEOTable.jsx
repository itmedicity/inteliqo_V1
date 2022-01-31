import MaterialTable from 'material-table'
import React, { Fragment, memo, useState, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import ModelCEOApproval from './ModelCEOApproval';

const OTApprovalCEOTable = () => {
    const [data, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [otno, setOtno] = useState(0);
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
            title: "Status", field: 'ot_ceo_status', cellStyle: { minWidth: 1, maxWidth: 3 }
        },
    ]

    //Get Data
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.get('/overtimerequest/otceo')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity("Error Occured Please Contact EDP")
            }
        }
        getOt();
    }, []);

    const [open, setOpen] = useState(false);
    const handleClickOpen = (data) => {
        setOtno(data)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        < Fragment >
            {otno !== 0 ?
                <ModelCEOApproval
                    open={open}
                    handleClose={handleClose}
                    otno={otno}
                    setCount={setCount}
                    count={count}
                />
                : null}
            <MaterialTable
                title="OT Approval CEO"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <AddTaskRoundedIcon size={26} color='success' />,
                        tooltip: "Click here to Approve/Reject",
                        onClick: (e, data) => handleClickOpen(data.ot_slno)
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

export default memo(OTApprovalCEOTable)
