import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';

const QualificationTable = ({ update }) => {
    const [data, setTableData] = useState([]);
    const title = [
        {
            title: '#', field: 'qual_slno'
        },
        {
            title: 'Qualification', field: 'qual_name'
        },
        {
            title: 'Status', field: 'status'
        }
    ]

    useEffect(() => {
        const getQualificationDetl = async () => {
            const result = await axioslogin.get('/qal');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            }
        }
        getQualificationDetl();
    }, [update]);

    return (
        <Fragment>
            <MaterialTable
                title="Qualification List"
                data={data}
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

export default memo(QualificationTable)
