import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';
const DueClearenceMastTable = ({ update }) => {
    const history = useHistory()
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const getDueClearenc = async () => {
            const result = await axioslogin.get('./duemast')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
        }
        getDueClearenc()
    }, [update])
    const title = [
        {
            title: 'Sl No', field: 'duemast_slno'
        },
        {
            title: 'Due Desc', field: 'due_desc'
        },
        {
            title: 'Due ShortName', field: 'due_shortname'
        },
        {
            title: 'Status', field: 'due_status'
        },
    ]
    //for edit
    const getDataTable = (data) => {
        const { duemast_slno } = data
        history.push(`/Home/DueClearenceEdit/${duemast_slno}`)
    }
    return (
        <Fragment>
            <MaterialTable
                title="Due Clearence List Table"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getDataTable(data)
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
};

export default memo(DueClearenceMastTable)
