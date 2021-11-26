import MaterialTable from 'material-table'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { useHistory } from 'react-router'

const GroupmasterTable = ({ update }) => {

    const [tableData, setTableData] = useState([])
    const history = useHistory()

    const title = [
        {
            title: '#', field: 'user_grp_slno'
        },
        {
            title: 'Group Name', field: 'user_group_name'
        },
        {
            title: 'Status', field: 'grp_status'
        },
    ]

    useEffect(() => {
        const getGroupmaster = async () => {
            const result = await axioslogin.get('/usergroup')
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
            } else {
                infoNofity("Somthing Went Wrong , Contact EDP!!")
            }
        }
        getGroupmaster()
    }, [update])

    const getUserGroupByID = (data) => {

        const { user_grp_slno } = data
        history.push(`/Home/UserGroupEdit/${user_grp_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="User Group Master"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getUserGroupByID(data)
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

export default memo(GroupmasterTable)
