import React, { Fragment, memo } from 'react'
import MaterialTable from 'material-table';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { useEffect } from 'react';
import { useState } from 'react';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import ResignationApproveModel from '../ResignationComponent/ResignationApproveModel';

const InchargeApprovalTable = ({ DeptSect }) => {
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0);
    useEffect(() => {
        if (DeptSect.length !== 0) {
            const deptid = DeptSect && DeptSect.map((val) => {
                return val.dept_section
            })
            const postData = {
                dept_id: deptid
            }
            const getInchargePending = async () => {
                const result = await axioslogin.post('/Resignation/resignlist', postData)
                const { success, data } = result.data
                if (success === 1) {
                    console.log(data)
                    setTableData(data)
                }
                else if (success === 0) {
                    setTableData([])
                }
            }
            getInchargePending()
        }
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
            title: 'Status', field: 'inch_app_status', cellStyle: { minWidth: 300, maxWidth: 400 }
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
                    tableData => (
                        {
                            icon: () => <AddTaskRoundedIcon color='success' />,
                            tooltip: "Click Here to Approve/Reject",
                            onClick: (e, data) => handleClickOpen(data.resig_slno),
                            disabled: tableData.inch_app_status == 'Approved'

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
}

export default memo(InchargeApprovalTable) 
