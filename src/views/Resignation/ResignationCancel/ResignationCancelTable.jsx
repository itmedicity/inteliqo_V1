import MaterialTable from "material-table";
import React, { Fragment, memo, useEffect, useState } from "react";
import { tableIcons } from "src/views/Constant/MaterialIcon";
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { axioslogin } from "src/views/Axios/Axios";
import ResignationCancelModel from "./ResignationCancelModel";

const ResignationCancelTable = () => {
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    useEffect(() => {
        const getResignCancel = async () => {
            const result = await axioslogin.get('/Resignation/resign/resigncancel')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        getResignCancel()
    }, [count])
    const [open, setOpen] = useState(false);
    const [slno, setSlno] = useState(0);
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
            title: 'Approve Date', field: 'hr_app_date', cellStyle: { minWidth: 200, maxWidth: 400 }
        },
        {
            title: 'Status', field: 'hr_app_status', cellStyle: { minWidth: 1, maxWidth: 50 }
        },
    ]
    return (
        <Fragment>
            {slno !== 0 ? <ResignationCancelModel open={open} handleClose={handleClose} slno={slno} setCount={setCount} count={count} /> : null}
            <MaterialTable
                title="Resignation Cancel"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[

                    {
                        icon: () => <AddTaskRoundedIcon color='success' />,
                        tooltip: "Click Here to Cancel",
                        onClick: (e, data) => handleClickOpen(data.resig_slno),

                    }
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

export default ResignationCancelTable;
