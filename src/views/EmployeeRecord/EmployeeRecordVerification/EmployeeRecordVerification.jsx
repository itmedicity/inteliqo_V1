import MaterialTable from 'material-table'
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { useHistory } from 'react-router-dom'

const EmployeeRecordVerification = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        const getempverification = async () => {
            const result = await axioslogin.get('/empVerification')
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
            title: 'ID', field: 'em_no', cellStyle: { minWidth: 3, maxWidth: 100 }
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
            title: 'Dept Section', field: 'sect_name', cellStyle: { minWidth: 150, maxWidth: 200 }
        },
        {
            title: 'Date of Join', field: 'em_doj', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
        {
            title: 'Verification Remark', field: 'verification_Remark', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
    ]
    const history = useHistory()
    const ToProfile = async (data) => {
        const { em_id, em_no } = data
        history.push(`/Home/ApplicationForm/${em_no}/${em_id}/${1}`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee Record Verification"
            >
                <MaterialTable
                    title={"Employee Verification Table"}
                    data={data}
                    columns={title}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <CheckCircleRoundedIcon />,
                            tooltip: "Click Here to Verify",
                            onClick: (e, data) => ToProfile(data)

                        }
                    ]}
                    options={{
                        paginationType: "stepped",
                        showFirstLastPageButtons: false,
                        padding: "dense",
                        actionsColumnIndex: -1,
                        rowStyle: (data, index) => data.verification_status === 2 ? { background: "#ef9a9a" } : null
                    }}
                />
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default EmployeeRecordVerification