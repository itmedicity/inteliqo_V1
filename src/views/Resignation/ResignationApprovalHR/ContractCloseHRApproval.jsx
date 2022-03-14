import MaterialTable from 'material-table';
import React, { Fragment, useEffect } from 'react';
import { tableIcons } from "src/views/Constant/MaterialIcon";
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { axioslogin } from "src/views/Axios/Axios";
import { useState } from 'react';
import ContractCloseHrApprovalModel from './ContractCloseHrApprovalModel';

const ContractCloseHRApproval = () => {
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const getContractCloseresign = async () => {
            const result = await axioslogin.get('/empcontract')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
        }
        getContractCloseresign()

    }, [count])
    const title = [
        {
            title: 'Emp ID', field: 'em_no', cellStyle: { minWidth: 1, maxWidth: 50 }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Emp Name', field: 'em_name', cellStyle: { minWidth: 150, maxWidth: 200 }
        },
        {
            title: 'Contract Close Date', field: 'em_cont_close_date', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
    ]
    const handleClickOpen = (data) => {
        setSlno(data)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            {slno !== 0 ? <ContractCloseHrApprovalModel open={open} handleClose={handleClose} slno={slno}
                count={count} setCount={setCount} /> : null}
            <MaterialTable
                title="Resignation Request HR Approval"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <AddTaskRoundedIcon color='success' />,
                        tooltip: "Click Here to Approve/Reject",
                        onClick: (e, data) => handleClickOpen(data.em_id),
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

export default ContractCloseHRApproval;
