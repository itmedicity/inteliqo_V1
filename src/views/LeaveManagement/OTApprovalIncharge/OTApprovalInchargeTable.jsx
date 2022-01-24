import MaterialTable from 'material-table'
import React, { Fragment, memo, useState, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { MdCheckCircle } from "react-icons/md"
import ModelOTApprove from '../LeaveCommonComponent/ModelOTApprove';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const OTApprovalInchargeTable = () => {
    const [data, setTableData] = useState();
    //Table
    const title = [
        {
            title: "SlNo", field: "ot_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Emp_No", field: "emp_no", cellStyle: { minWidth: 198, maxWidth: 250 }
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
            title: "Amount", field: "ot_amount", cellStyle: { minWidth: 1, maxWidth: 2 }
        },


    ]
    //Get Data
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.get('/overtimerequest/incharge/list')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getOt();
    }, []);


    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        < Fragment >
            <ModelOTApprove open={open} handleClose={handleClose} />
            <MaterialTable
                title="OT Approval Incharge"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <MdCheckCircle size={26} color="secondary" />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => handleClickOpen()
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

export default memo(OTApprovalInchargeTable)
