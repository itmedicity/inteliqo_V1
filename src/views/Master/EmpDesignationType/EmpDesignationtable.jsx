import MaterialTable from 'material-table'
import React, { Fragment, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';

const EmpDesignationtable = ({ update }) => {
    const [tbdata, setTableData] = useState([]);
    const title = [
        {
            title: '#', field: 'inst_slno',
        },
        {
            title: 'Employee Type', field: 'inst_emp_type',
        },
        {
            title: 'Status', field: 'status',
        },
    ]

    useEffect(() => {
        const getemptypedetil = async () => {
            const result = await axioslogin.get('/inst');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            }
        }
        getemptypedetil();
    }, [update]);

    return (
        <Fragment>
            <MaterialTable
                title="Employee Designation Type"
                data={tbdata}
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

export default EmpDesignationtable
