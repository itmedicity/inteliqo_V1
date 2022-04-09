import MaterialTable from 'material-table'
import React, { Fragment, memo } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { useHistory } from 'react-router-dom';

const Contractdetl_TableByDate = ({ tableData }) => {
    const history = useHistory()
    const title = [
        {
            title: 'Emp Id', field: 'em_no', cellStyle: { minWidth: 1, maxWidth: 50 }
        },
        {
            title: 'Department', field: 'sect_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Emp Name', field: 'em_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Designation', field: 'desg_name', cellStyle: { minWidth: 150, maxWidth: 200 }
        },
        {
            title: 'Date of Join', field: 'em_doj', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
        {
            title: 'Contract End', field: 'em_contract_end_date', cellStyle: { minWidth: 200, maxWidth: 400 }
        },
    ]
    //category change
    const CategoryChange = (data) => {
        const { em_no, em_id } = data
        history.push(`/Home/ContractInformation/${em_no}/${em_id}`)
    }
    return (
        <Fragment>
            <MaterialTable
                title="Probaton End List"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <AddTaskRoundedIcon color='success' />,
                        tooltip: "Click Here to Renew Contract",
                        onClick: (e, data) => CategoryChange(data)


                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1,
                    rowStyle: (data, index) => data.contract_falg === 1 ? { background: "#E3E4FA" } : null
                }}
            />
        </Fragment>
    )

}

export default memo(Contractdetl_TableByDate) 