import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';

const PerformanceGradeTable = ({ count }) => {
    const history = useHistory();

    const [value, setValue] = useState([])
    useEffect(() => {
        const getPerformanceGrade = async () => {
            const result = await axioslogin.get('/performanceGrade/getperformancegrade')
            const { success, data } = result.data
            if (success === 1) {
                setValue(data)
            }
            else {
                setValue([])
            }
        }
        getPerformanceGrade()
    }, [count])

    const title = [
        {
            title: "SlNo", field: "pgrade_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Score", field: "p_score", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Grade", field: "p_grade", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Performance Description", field: "p_descrption", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "% Fixed Pay", field: "fixed_pay_inc", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "% Variable Pay", field: "variable_pay_inc", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Status", field: "p_status", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
    ]

    //For Editing
    const getTableData = (data) => {
        const { pgrade_slno } = data
        history.push(`/Home/PerformanceGradeEdit/${pgrade_slno}`)
    }

    return (
        <MaterialTable
            title="Performance Grade Details "
            data={value}
            columns={title}
            icons={tableIcons}
            actions={[
                {
                    icon: () => <EditOutlinedIcon />,
                    tooltip: " Click here to Edit",
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
    )
}

export default PerformanceGradeTable