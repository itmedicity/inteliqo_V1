import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { tableIcons } from 'src/views/Constant/MaterialIcon';

const EarnTypeTable = (update) => {

    const [tableData, setTableData] = useState()
    const title = [
        {
            title: '#', field: 'erning_type_id'
        },
        {
            title: 'Earn Type', field: 'earning_type_name'
        },
        {
            title: 'Deduction', field: 'deduction'
        },
        {
            title: 'Status', field: 'status'
        },
    ]

    useEffect(() => {
        const gettablelist = async () => {
            const result = await axioslogin.get('/Earntype');
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
                title="Earn Type"
                data={tableData}
                columns={title}
                icons={tableIcons}
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

export default EarnTypeTable
