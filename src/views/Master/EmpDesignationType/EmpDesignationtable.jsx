import MaterialTable from 'material-table'
import React, { Fragment, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

const EmpDesignationtable = ({ update }) => {
    const [tbdata, setTableData] = useState([]);
    const history = useHistory()
    const title = [
        {
            title: 'Sl No', field: 'inst_slno',
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

    //For Editing
    const getDataTable = (data) => {
        const { inst_slno } = data
        history.push(`/Home/EmpInstitutionTypeTableEdit/${inst_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Employee Institution Type"
                data={tbdata}
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

export default EmpDesignationtable
