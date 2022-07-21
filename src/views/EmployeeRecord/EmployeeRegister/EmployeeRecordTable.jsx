import MaterialTable from 'material-table'
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { useHistory } from 'react-router-dom'

const EmployeeRecordTable = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        const getempverification = async () => {
            const result = await axioslogin.get('/empmast/empverify/verification')
            const { success, data } = result.data
            if (success === 1) {
                setdata(data)
            }
            else {
                setdata([])
            }
        }
        getempverification()
    }, [])
    const title = [
        {
            title: 'Emp Id', field: 'em_no', cellStyle: { minWidth: 1, maxWidth: 50 }
        },
        {
            title: 'Emp Name', field: 'em_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Branch', field: 'branch_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: { minWidth: 150, maxWidth: 200 }
        },
        {
            title: 'Date of Join', field: 'em_doj', cellStyle: { minWidth: 200, maxWidth: 350 }
        },

    ]
    const history = useHistory()
    const ToProfile = async (data) => {
        const { em_id, em_no } = data
        history.push(`/Home/EmployeeRecordEdit/${em_no}/${em_id}`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee Record Edit"
            >
                <MaterialTable
                    title={"Employee Verification Table"}
                    data={data}
                    columns={title}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <ModeEditOutlineIcon color='success' />,
                            tooltip: "Click Here to Verify",
                            onClick: (e, data) => ToProfile(data)

                        }
                    ]}
                    options={{
                        paginationType: "stepped",
                        showFirstLastPageButtons: false,
                        padding: "dense",
                        actionsColumnIndex: -1
                    }}
                />
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default EmployeeRecordTable