import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
const KraTable = ({ count }) => {
    const [data, setData] = useState([])
    //getting Kra Table Data
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/KraMast')
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
            title: "SlNo", field: "kra_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Kra Desc", field: "kra_desc", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Kra Status", field: "kra_status", cellStyle: { minWidth: 100, maxWidth: 200 }
        }

    ]

    return (
        <Fragment>
            <MaterialTable
                title="Key Result Areas "
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: " Click here to Edit",
                        onClick: (e, data) => null
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

export default KraTable