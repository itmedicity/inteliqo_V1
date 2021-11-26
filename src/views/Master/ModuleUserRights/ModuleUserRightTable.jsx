import MaterialTable from 'material-table'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router';

const ModuleUserRightTable = ({ update }) => {
    const history = useHistory();
    const title = [
        {
            title: '#', field: 'mdrte_slno'
        },
        {
            title: 'EMP No', field: 'emp_slno'
        },
        {
            title: 'Name', field: 'em_name'
        },
        {
            title: 'Module Group', field: 'module_group_name'
        },
        {
            title: 'User Group', field: 'user_group_name'
        },
        {
            title: 'Status', field: 'status'
        },
    ]
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const getUserModuleTablelist = async () => {
            const result = await axioslogin.get('/moduleRights')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
            } else {
                infoNofity("Somthing Went Wrong , Contact EDP!!")
            }
        }
        getUserModuleTablelist()
    }, [update])

    const getModuleUserRightSlno = (data) => {
        const { mdrte_slno } = data
        history.push(`/Home/ModuleUserRightEdit/${mdrte_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Module Group Master"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getModuleUserRightSlno(data)
                    }
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

export default memo(ModuleUserRightTable)
