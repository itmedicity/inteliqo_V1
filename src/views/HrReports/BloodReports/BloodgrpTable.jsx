import React, { Fragment } from 'react'
import Materialtable from 'src/views/Component/Materialtable'

const BloodgrpTable = ({ tableData }) => {
    const title = [
        {
            title: 'Emp ID', field: 'em_no', cellStyle: { minWidth: 200, maxWidth: 250 }
        },
        {
            title: 'Emp Name', field: 'em_name', cellStyle: { minWidth: 300, maxWidth: 400 }
        },
        {
            title: 'Gender', field: 'gender', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Blood Group', field: 'group_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Branch', field: 'branch_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: { minWidth: 300, maxWidth: 400 }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: { minWidth: 300, maxWidth: 400 }
        },
        {
            title: 'Emp Type', field: 'inst_emp_type', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Designation', field: 'desg_name', cellStyle: { minWidth: 300, maxWidth: 500 }
        },
        {
            title: 'Employee Category', field: 'ecat_name', cellStyle: { minWidth: 200, maxWidth: 400 }
        },
        {
            title: 'Date of Join', field: 'em_doj', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
        {
            title: 'Mobile', field: 'em_mobile', cellStyle: { minWidth: 200, maxWidth: 400 }
        }
    ]
    return (
        <Fragment>
            <Materialtable
                data={tableData} columns={title}
            />
        </Fragment>
    )
}

export default BloodgrpTable