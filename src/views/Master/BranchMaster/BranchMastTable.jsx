import MaterialTable from 'material-table'
import React, { Fragment } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { useEffect } from 'react';
import { useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const BranchMastTable = ({ update }) => {
    const [tableData, setTableData] = useState([]);
    const title = [
        {
            title: '#', field: 'branch_slno'
        },
        {
            title: 'Branch Name', field: 'branch_name'
        },
        {
            title: 'Status', field: 'status'
        },
    ]

    useEffect(() => {
        const gettablelist = async () => {
            const result = await axioslogin.get('/branch');
            const { success, data, message } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                infoNofity(message);
            }
        }
        gettablelist();
    }, [update]);
    return (
        <Fragment>
            <MaterialTable
                title="Designation Type"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => null
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
}

export default BranchMastTable
