import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';

const HODInchargeTable = ({ count }) => {

    const history = useHistory();

    const [value, setValue] = useState([])
    /** get appraisal data from databse */
    useEffect(() => {
        const getAPrraisalRights = async () => {
            const result = await axioslogin.get('/performanceappriasalrights/selectbyhod/data')
            const { success, data } = result.data
            if (success === 1) {
                setValue(data)
            }
            else {
                setValue([])
            }
        }
        getAPrraisalRights()
    }, [count])

    const title = [
        {
            title: "SlNo", field: "p_rights_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Department", field: "dept_name", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Rights", field: "rights_needed", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
    ]

    const getTableData = (data) => {
        const { p_rights_slno } = data
        history.push(`/Home/HODInchargeEdit/${p_rights_slno}`)
    }

    return (
        <MaterialTable
            title="HOD/Incharge Appraisal Rights "
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
        ></MaterialTable>
    )
}

export default HODInchargeTable




