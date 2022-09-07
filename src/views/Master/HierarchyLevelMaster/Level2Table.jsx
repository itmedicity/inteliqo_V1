import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const Level2Table = ({ count }) => {

    const [value, setValue] = useState([])
    useEffect(() => {
        const getLevel2Data = async () => {
            const result = await axioslogin.get('/HierarchyLevel/data1')
            const { success, data } = result.data
            if (success === 1) {
                setValue(data)
            }
            else {
                setValue([])
            }
        }
        getLevel2Data()
    }, [count])

    const title = [
        {
            title: "SlNo", field: "hierarchylevel_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Highlevel name", field: "highlevel_name", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Department Section", field: "sect_name", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
    ]

    //For Editing
    const getTableData = (data) => {
        const { pgrade_slno } = data
        //history.push(`/Home/PerformanceGradeEdit/${pgrade_slno}`)
    }

    return (
        <MaterialTable
            title="Hierarchy Level2 Details "
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

export default Level2Table