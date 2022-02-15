import MaterialTable from 'material-table';
import React, { Fragment, useEffect, useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { errorNofity } from 'src/views/CommonCode/Commonfunc';
import DueclearenceHrModel from './DueclearenceHrModel';

const DueClearenceHRTable = () => {
    const [tableData, setTableData] = useState([]);
    const [slno, setSlno] = useState(0);
    const [deptsec, setDeptSec] = useState(0);
    const [count, SetCount] = useState(0)
    useEffect(() => {
        const getHrpendingList = async () => {
            const result = await axioslogin.get('/dueclearence')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 0) {
                setTableData([])
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        getHrpendingList()
    }, [count])
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
            title: 'Relieving Date', field: 'relieving_date', cellStyle: { minWidth: 300, maxWidth: 400 }
        },
    ]
    const [open, setOpen] = useState(false);
    const handleClickOpen = (data1, data2) => {
        setSlno(data1)
        setDeptSec(data2)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            {slno !== 0 ? <DueclearenceHrModel open={open} handleClose={handleClose} slno={slno} deptsec={deptsec} count={count} SetCount={SetCount} /> : null}
            <MaterialTable
                title="Due Clearence HR Approval"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    tableData => (
                        {
                            icon: () => <AddTaskRoundedIcon color='success' />,
                            tooltip: "Click Here to Approve/Reject",
                            onClick: (e, data) => handleClickOpen(data.em_id, data.sect_id),
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

export default DueClearenceHRTable;
