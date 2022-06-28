import MaterialTable from 'material-table'
import React, { Fragment } from 'react'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const EmployeeInactiveTable = ({ empData, selectDeptSection, selectedDept, setCount, count }) => {

    const postDeptData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection,
    }
    const title = [
        {
            title: 'Emp ID', field: 'em_no', cellStyle: { minWidth: 1, maxWidth: 20 }
        },
        {
            title: 'Emp Name', field: 'em_name', cellStyle: { minWidth: 20, maxWidth: 200 }
        },
        {
            title: 'Designation', field: 'desg_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Date of Join', field: 'em_doj', cellStyle: { minWidth: 1, maxWidth: 20 }
        },
    ]
    const InactiveEmp = async (id) => {
        const postData = {
            em_id: id
        }
        if (selectDeptSection !== 0 && selectedDept !== 0) {
            const results = await axioslogin.post('/Duedepartment/duedept', postDeptData)
            const { success1, data1 } = results.data
            if (success1 === 1) {
                const { due_dept_code } = data1[0]
                const duedepartment = JSON.parse(due_dept_code)
                const duedeptdetl = duedepartment.map((val) => {
                    return { deptcode: val.deptcode, deptname: val.deptdesc, emp_id: id }
                })
                //inactive employee
                const result = await axioslogin.patch('/empmast/empmaster/Inactiveemp', postData)
                const { success } = result.data
                if (success === 2) {
                    const result = await axioslogin.post('/dueclearence', duedeptdetl)
                    const { success } = result.data
                    if (success === 1) {
                        succesNofity("Employee Inactivated")
                        setCount(count + 1)
                    }
                }
            }
            else {
                warningNofity("Please Map Due Clearence Department for this department Section ")
            }
        }


    }
    return (
        <Fragment>
            <MaterialTable
                title="Employee Inactive"
                data={empData}
                columns={title}
                icons={tableIcons}
                actions={[
                    empData => (
                        {
                            icon: () => <AddTaskRoundedIcon color='success' />,
                            tooltip: "Click Here to In Active Employee",
                            onClick: (e, data) => InactiveEmp(data.em_id),

                        }
                    )

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

export default EmployeeInactiveTable