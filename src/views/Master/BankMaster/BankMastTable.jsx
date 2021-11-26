import React, { Fragment, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import MaterialTable from 'material-table';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const BankMastTable = ({ update }) => {
    const [tbleData, settableData] = useState([]);
    const title = [
        {
            title: '#', field: 'bank_slno'
        },
        {
            title: 'Bank Name', field: 'bank_name'
        },
        {
            title: 'Ifsc', field: 'bank_ifsc'
        },
        {
            title: 'Status', field: 'status'
        },
    ]

    useEffect(() => {
        const getTableData = async () => {
            const result = await axioslogin.get('/bank');
            const { success, data, message } = result.data;
            if (success === 1) {
                settableData(data);
            } else {
                infoNofity(message);
            }

        }
        getTableData();
    }, [update]);

    return (
        <Fragment>
            <MaterialTable
                title="Designation Type"
                data={tbleData}
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

export default BankMastTable
