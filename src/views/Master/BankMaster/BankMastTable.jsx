import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import MaterialTable from 'material-table';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router';

const BankMastTable = ({ update }) => {
    const [data, settableData] = useState([]);
    const history = useHistory()
    const title = [
        {
            title: 'Sl No', field: 'bank_slno'
        },
        {
            title: 'Bank Name', field: 'bank_name'
        },
        {
            title: 'IFSC', field: 'bank_ifsc'
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
                warningNofity("Error Occured Contact EDP");
            }

        }
        getTableData();
    }, [update]);

    //For Edit
    const getDataTable = (data) => {
        const { bank_slno } = data
        history.push(`/Home/BankMastTableEdit/${bank_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Bank "
                data={data}
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

export default memo(BankMastTable)
