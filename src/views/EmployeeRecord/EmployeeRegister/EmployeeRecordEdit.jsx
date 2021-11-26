import MaterialTable from 'material-table'
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HomeIcon from '@material-ui/icons/Home';
import { tableIcons } from 'src/views/Constant/MaterialIcon';

const EmployeeRecordEdit = () => {
    const title = [
        {
            title: '#', field: 'category_slno', width: '5%'
        },
        {
            title: 'Name', field: 'ecat_name'
        },
        {
            title: 'Employee-Type', field: 'emptype_name'
        },
        {
            title: 'Designation-Type', field: 'empstat_name'
        },
        {
            title: 'Status', field: 'status'
        },
    ]



    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />

            <MaterialTable
                title="Employment Type List"
                // data={tablelist}
                columns={title}
                icons={tableIcons}
                // actions={[
                //     {
                //         icon: () => <EditOutlinedIcon />,
                //         tooltip: "Click here to Edit",
                //         // onClick: (e, data) => getTablerowData(data)
                //     },
                //     {
                //         icon: () => <HomeIcon color="secondary" />,
                //         tooltip: "Go Back To Home ",
                //         // onClick: (e, data) => tohomeMaster(),
                //         // isFreeAction: true
                //     }
                // ]}
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

export default EmployeeRecordEdit
