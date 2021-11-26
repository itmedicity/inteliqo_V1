import MaterialTable from 'material-table'
import React, { Fragment, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';

const RegionMastTable = ({ update }) => {
    const [tableData, setTableData] = useState([]);
    const title = [
        {
            title: '#', field: 'reg_slno', width: '10%'
        },
        {
            title: 'Region', field: 'reg_name'
        },
        {
            title: 'PinCode', field: 'reg_pincode'
        },
        {
            title: 'Status', field: 'reg_status'
        },
    ]

    useEffect(() => {
        const getRegionList = async () => {
            const result = await axioslogin.get('/region');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            }
        }
        getRegionList();
    }, [update]);
    return (
        <Fragment>
            <MaterialTable
                title="Region List"
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

export default RegionMastTable
