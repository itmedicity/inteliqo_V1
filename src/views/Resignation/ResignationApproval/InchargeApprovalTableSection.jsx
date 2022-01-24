import React, { Fragment, memo } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MaterialTable from 'material-table';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';
import { useState } from 'react';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { IconButton } from '@mui/material';
import ResignationApproveModel from '../ResignationComponent/ResignationApproveModel';

const InchargeApprovalTableSection = ({ DeptSect }) => {
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0);
    useEffect(() => {
        const postData = {
            dept_id: DeptSect
        }
        const getInchargePending = async () => {
            const result = await axioslogin.post('/Resignation/resignlist', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
        }
        getInchargePending()
    }, [DeptSect, count])
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
            title: 'slno', field: 'resig_slno'
        },
        {
            title: 'Department', field: 'dept_name'
        },
        {
            title: 'Department Section', field: 'sect_name'
        },
        {
            title: 'Emp ID', field: 'em_no'
        },
        {
            title: 'Emp Name', field: 'em_name'
        },
        {
            title: 'Resignation Request Date', field: 'request_date'
        },
    ]
    return (
        <Fragment>
            {slno !== 0 ? <ResignationApproveModel open={open} handleClose={handleClose} slno={slno} setCount={setCount} count={count} /> : null}
            <MaterialTable
                title="Resignation Request Incharge Approval"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <AddTaskRoundedIcon color='success' />,
                        tooltip: "Click Here to Approve/Reject",
                        onClick: (e, data) => handleClickOpen(data.resig_slno)
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

export default memo(InchargeApprovalTableSection);
