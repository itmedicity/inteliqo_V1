import MaterialTable from 'material-table'
import React from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { useHistory } from 'react-router-dom'

const EmployeeRecordTableView = ({ tableData }) => {
    const title = [
        {
            title: 'Emp Id', field: 'em_no', cellStyle: { minWidth: 1, maxWidth: 50 }
        },
        {
            title: 'Emp Name', field: 'emp_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Branch', field: 'branch_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: { minWidth: 150, maxWidth: 200 }
        },
        {
            title: 'Date of Join', field: 'em_doj', cellStyle: { minWidth: 200, maxWidth: 350 }
        },

    ]
    const history = useHistory()
    const ToProfile = async (data) => {
        const { em_id, em_no } = data
        history.push(`/Home/EmployeeRecordEdit/${em_no}/${em_id}`)
    }

    return (

        <MaterialTable
            title={"Employee Verification Table"}
            data={tableData}
            columns={title}
            icons={tableIcons}
            actions={[
                {
                    icon: () => <ModeEditOutlineIcon color='success' />,
                    tooltip: "Edit Employee",
                    onClick: (e, data) => ToProfile(data)

                }
            ]}
            options={{
                paginationType: "stepped",
                showFirstLastPageButtons: false,
                padding: "dense",
                actionsColumnIndex: -1
            }}
        />
    )
}

export default EmployeeRecordTableView