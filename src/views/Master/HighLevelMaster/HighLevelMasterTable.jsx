import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';

const HighLevelMasterTable = ({ count }) => {

    const history = useHistory();
    const [data, setData] = useState([])
    //getting High Level Table Data
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/HighLevel/list')
            const { success, data } = result.data
            if (success === 1) {
                setData(data)
            }
            else {
                setData([])
            }
        }
        getData()
    }, [count])
    //table
    const title = [
        {
            title: "SlNo", field: "highlevel_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "High level Desg", field: "highlevel_name", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "High Level Status", field: "highlevel_status", cellStyle: { minWidth: 100, maxWidth: 200 }
        }
    ]
    //For Editing
    const getTableData = (data) => {
        const { highlevel_slno } = data
        history.push(`/Home/HighLevelMasterEdit/${highlevel_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="High Level Table "
                data={data}
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
        </Fragment>
    )
}

export default HighLevelMasterTable

