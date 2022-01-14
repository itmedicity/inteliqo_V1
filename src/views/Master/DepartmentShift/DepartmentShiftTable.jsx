import EditOutlined from '@material-ui/icons/EditOutlined'
import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'

const DepartmentShiftTable = ({ update }) => {
    const [count, setCount] = useState(0)
    const history = useHistory()
    const [data, setData] = useState([])
    const title = [
        {
            title: '#', field: 'dept_shift_Slno', cellStyle: { minWidth: 1, maxWidth: 10 }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: { minWidth: 150, maxWidth: 250 }
        }
    ]


    useEffect(() => {
        //get table Data
        const getTableData = async () => {
            const results = await axioslogin.get("/departmentshift/select")
            const { success, data } = results.data
            if (success === 1) {
                setData(data)
            }
            else if (success === 0) {
                warningNofity("No Record Found")
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        getTableData()
    }, [update])


    const getTableData = (data) => {
        setCount(count + 1)
        const { dept_shift_Slno } = data
        history.push(`/Home/DepartmentShiftEdit/${dept_shift_Slno}`)
    }


    return (
        <Fragment>
            <MaterialTable
                title="Department Shift Table"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlined />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getTableData(data)
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

export default memo(DepartmentShiftTable) 
