import MaterialTable from 'material-table'
import React, { Fragment, memo } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { MdCheckCircle } from "react-icons/md"
const OTUpdationTable = () => {
    //Table
    const title = [
        {
            title: "SlNo", field: "SlNo"
        },
        {
            title: "Emp_no", field: "Emp_no"
        },
        {
            title: "Employee name", field: "Employee_name"
        },
        {
            title: "Department Section", field: "Department_section"
        },
        {
            title: "Date", field: "date"
        },
        {
            title: "Status", field: "Status"
        },

    ]
    const data = [
        {
            SlNo: 1,
            Emp_no: 18,
            Employee_name: 'Reshma',
            Department_section: 'IT',
            date: '27/12/2021',
            Status: 'pending'
        },
        {
            SlNo: 1,
            Emp_no: 18,
            Employee_name: 'Reshma',
            Department_section: 'IT',
            date: '27/12/2021',
            Status: 'pending'
        },
        {
            SlNo: 1,
            Emp_no: 18,
            Employee_name: 'Reshma',
            Department_section: 'IT',
            date: '27/12/2021',
            Status: 'pending'
        },
        {
            SlNo: 1,
            Emp_no: 18,
            Employee_name: 'Reshma',
            Department_section: 'IT',
            date: '27/12/2021',
            Status: 'pending'
        },
    ]
    return (
        < Fragment >
            <MaterialTable
                title="Over Time Updation"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () =>
                            <MdCheckCircle size={26} color="secondary" />,
                        onClick: (e, data) => null

                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    selection: true,
                    actionsColumnIndex: -1
                }}
            />
        </Fragment >
    )
}

export default memo(OTUpdationTable)
