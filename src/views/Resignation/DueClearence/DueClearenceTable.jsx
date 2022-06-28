import MaterialTable from 'material-table';
import React, { Fragment, useContext, useEffect } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';
import { errorNofity } from 'src/views/CommonCode/Commonfunc';
import DueClearenceApprovalModel from './DueClearenceApprovalModel';

const DueClearenceTable = () => {
    const [tableData, setTableData] = useState([]);
    const { authorization, employeedetails } = useContext(PayrolMasterContext)
    const { em_dept_section } = employeedetails
    const { is_incharge, is_hod } = authorization
    const [count, setCount] = useState(0)
    //getting due Clearence List
    useEffect(() => {
        if (is_incharge === 1 || is_hod === 1) {
            const postData = {
                due_dept_code: em_dept_section
            }
            const getClearenceList = async () => {
                const result = await axioslogin.post('/dueclearence/select', postData)
                const { success, data } = result.data
                if (success === 1) {
                    setTableData(data)
                }
                else if (success === 0) {
                    setTableData([])
                }
                else {
                    errorNofity("Error Occured!!!!Please Contact EDP")
                }
            }
            getClearenceList()
        }
    }, [em_dept_section, is_incharge, is_hod, count])
    const title = [
        {
            title: 'slno', field: 'due_slno', cellStyle: { minWidth: 1, maxWidth: 50 }
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
            title: 'Status', field: 'due_dept_status', cellStyle: { minWidth: 300, maxWidth: 400 }
        },
    ]
    const [open, setOpen] = useState(false);
    const [slno, setSlno] = useState(0);
    const handleClickOpen = (tableData) => {
        setSlno(tableData)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        < Fragment >
            {slno !== 0 ? <DueClearenceApprovalModel open={open} handleClose={handleClose} slno={slno} setCount={setCount} count={count} /> : null}
            <AuthorizationDetails />
            <MaterialTable
                title="Due Clearence List"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    tableData => (
                        {
                            icon: () => <AddTaskRoundedIcon color='success' />,
                            tooltip: "Click Here to Approve/Reject",
                            onClick: (e, data) => handleClickOpen(data.due_slno),

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
        </Fragment >
    )
};

export default DueClearenceTable;
