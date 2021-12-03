import { EditOutlined } from '@material-ui/icons'
import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'

const ReligionMastTable = ({ update }) => {
    const history = useHistory()
    const [data, setData] = useState([])
    const title = [
        {
            title: '#', field: 'relg_slno'
        },
        {
            title: 'Religion Name', field: 'relg_name'
        },
        {
            title: 'Religion Status', field: 'relg_status'
        }
    ]

    useEffect(() => {
        //get data from data base
        const getTableData = async () => {
            const results = await axioslogin.get("/Religion")
            const { success, data } = results.data
            if (success === 1) {
                setData(data)
            }
            else {
                errorNofity("Error Occured,Please Contact EDP")
            }
        }
        getTableData()
    }, [update])

    //getting table data for edit
    const getTableData = (data) => {
        const { relg_slno } = data
        history.push(`/Home/ReligionMastEdit/${relg_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Religion Table"
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

export default memo(ReligionMastTable)
