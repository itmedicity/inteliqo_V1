import MaterialTable from "material-table";
import React, { Fragment, useContext, useEffect } from "react";
import { useState } from "react";
import { memo } from "react";
import { axioslogin } from "src/views/Axios/Axios";
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import AuthorizationDetails from "src/views/CommonCode/AuthorizationDetails";
import { PayrolMasterContext } from "src/Context/MasterContext";
import CEOApprovalComponent from "./CEOApprovalComponent";
const CeoApprovalTable = () => {
    const { authorization } = useContext(PayrolMasterContext)
    const { is_ceo } = authorization
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0);
    useEffect(() => {
        if (is_ceo === 1) {
            const getCeoRequest = async () => {
                const result = await axioslogin.get("/Resignation")
                console.log(result)
                const { success, data } = result.data
                if (success === 1) {
                    setTableData(data)
                }
            }
            getCeoRequest()
        }
    }, [is_ceo, count])
    const [open, setOpen] = useState(false);
    const handleClickOpen = (data) => {
        setSlno(data)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const title = [
        {
            title: 'slno', field: 'resig_slno', cellStyle: { minWidth: 1, maxWidth: 50 }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Emp ID', field: 'em_no', cellStyle: { minWidth: 150, maxWidth: 200 }
        },
        {
            title: 'Emp Name', field: 'em_name', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
        {
            title: 'Request Date', field: 'request_date', cellStyle: { minWidth: 200, maxWidth: 400 }
        },
        {
            title: 'Status', field: 'ceo_appr_status', cellStyle: { minWidth: 300, maxWidth: 400 }
        },
    ]
    return (
        <Fragment>
            {slno !== 0 ? <CEOApprovalComponent open={open} handleClose={handleClose} slno={slno} setCount={setCount} count={count} /> : null}
            <AuthorizationDetails />
            <MaterialTable
                title="Resignation Request CEO Approval"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    tableData => (
                        {
                            icon: () => <AddTaskRoundedIcon color='success' />,
                            tooltip: "Click Here to Approve/Reject",
                            onClick: (e, data) => handleClickOpen(data.resig_slno),
                            disabled: tableData.ceo_appr_status == 'Approved'

                        }
                    )

                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1
                }}
            />
        </Fragment>
    )
};
export default memo(CeoApprovalTable)
