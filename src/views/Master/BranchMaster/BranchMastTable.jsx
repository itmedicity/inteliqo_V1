import MaterialTable from 'material-table'
import React, { Fragment, useEffect, memo, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { useHistory } from 'react-router';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const BranchMastTable = ({ update }) => {
    const [tableData, setTableData] = useState([]);
    const history = useHistory();
    const title = [
        {
            title: 'Sl No', field: 'branch_slno'
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

    //for edit
    const getDataTable = (data) => {
        const { branch_slno } = data
        history.push(`/Home/BranchMastTableEdit/${branch_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Branch "
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getDataTable(data)
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0
                }}
            />
        </Fragment>
    )
}

export default memo(BranchMastTable)
