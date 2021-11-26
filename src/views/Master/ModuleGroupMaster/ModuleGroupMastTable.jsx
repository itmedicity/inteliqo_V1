import React, { Fragment, useEffect, useMemo, useState } from 'react'
import MaterialTable from 'material-table'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router';

const ModuleGroupMastTable = ({ update }) => {
    const [tableData, setTableData] = useState([])
    const tbleData = useMemo(() => tableData, [tableData])
    const history = useHistory()
    const title = [
        {
            title: '#', field: 'mdgrp_slno'
        },
        {
            title: 'Module Group Name', field: 'module_group_name'
        },
    ]

    useEffect(() => {

        const getModuleGroupNameList = async () => {
            const result = await axioslogin.get('/modulegroup/select')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                infoNofity(success);
            }
        }
        getModuleGroupNameList()
    }, [update])

    // To the Module Group Edit Form
    const moduleGroupMastEdit = (data) => {
        const { mdgrp_slno } = data;
        history.push(`/Home/MdulGrpMastEdit/${mdgrp_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Module Group Master"
                data={tbleData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => moduleGroupMastEdit(data)
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

export default ModuleGroupMastTable
