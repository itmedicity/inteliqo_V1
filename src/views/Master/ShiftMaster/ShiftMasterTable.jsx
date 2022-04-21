import { EditOutlined } from '@material-ui/icons'
import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'

const ShiftMasterTable = ({ update }) => {
    const history = useHistory()
    const [data, setData] = useState([])
    const title = [
        {
            title: '#', field: 'shft_slno', cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        },
        {
            title: 'Shift Name', field: 'shft_desc', cellStyle: {
                minWidth: 300,
                maxWidth: 500
            }
        },
        {
            title: 'Shift Code', field: 'shft_code', cellStyle: {
                minWidth: 200,
                maxWidth: 250
            }
        },
        {
            title: 'ChecK In Time', field: 'shft_chkin_time', cellStyle: {
                minWidth: 200,
                maxWidth: 250
            }
        },
        {
            title: 'ChecK Out Time', field: 'shft_chkout_time', cellStyle: {
                minWidth: 200,
                maxWidth: 250
            }
        },
        {
            title: 'Status', field: 'shft_status', cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        }
    ]
    useEffect(() => {
        const getTableData = async () => {
            const results = await axioslogin.get("/shift")
            const { success, data } = results.data
            if (success === 1) {
                setData(data)
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }

        }
        getTableData()
    }, [update])
    //getting table data for edit
    const getTableData = (data) => {
        const { shft_slno } = data
        history.push(`/Home/ShiftMasterEdit/${shft_slno}`)
    }
    return (
        <Fragment>
            <MaterialTable
                title="Shift Master Table"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlined />,
                        tooltip: "Click Here To Edit",
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

export default memo(ShiftMasterTable)
