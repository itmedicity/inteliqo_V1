import { EditOutlined } from '@material-ui/icons'
import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'

const LeaveTypeMastTable = ({ update }) => {

    const history = useHistory()
    const [data, setData] = useState([])
    const title = [
        {
            title: '#', field: 'lvetype_slno'
        },
        {
            title: 'Leave Type', field: 'lvetype_desc'
        },
        {
            title: 'Code', field: 'lvetype_code'
        },
        {
            title: 'Status', field: 'status'
        }
    ]


    useEffect(() => {
        //getdata from data base
        const getTableData = async () => {
            const results = await axioslogin.get("/leaveType")
            const { success, data } = results.data
            if (success === 1) {
                setData(data)
            }
            else {
                warningNofity("Error Occured,Please Contact EDP")
            }
        }
        getTableData()
    }, [update])

    //get table data for edit

    const getTableData = (data) => {
        const { lvetype_slno } = data
        history.push(`/Home/LeaveTypeMastEdit/${lvetype_slno}`)
    }







    return (
        <Fragment>
            <MaterialTable
                title="Leave Type Table"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlined />,
                        tooltip: "Click Here to edit",
                        onClick: (e, data) => getTableData(data)
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

export default LeaveTypeMastTable
