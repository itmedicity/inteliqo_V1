import { EditOutlined } from '@material-ui/icons'
import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'

const YearlyLeaveCalendarTable = ({ update }) => {
    const [data, setData] = useState([])
    const history = useHistory()
    const title = [
        {
            title: '#', field: 'hld_slno', cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        },
        {
            title: 'Leave Type', field: 'lvetype_desc', cellStyle: {
                minWidth: 198,
                maxWidth: 250
            }
        },
        {
            title: 'Holiday Name', field: 'hld_desc', cellStyle: {
                minWidth: 198,
                maxWidth: 250
            }

        },
        {
            title: 'Holiday Date', field: 'hld_date', cellStyle: {
                minWidth: 298,
                maxWidth: 350
            }
        },
        {
            title: 'Year', field: 'hld_year', cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        },
        {
            title: 'Status', field: 'hld_status', cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        }
    ]
    //get data from data base
    useEffect(() => {
        const getTableData = async () => {
            const results = await axioslogin.get("/holidaylist")
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
        const { hld_slno } = data
        history.push(`/Home/YearlyLeaveCalendarEdit/${hld_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Holiday Calendar"
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
                    actionsColumnIndex: 0,
                }}
            />
        </Fragment>
    )
}

export default memo(YearlyLeaveCalendarTable)
