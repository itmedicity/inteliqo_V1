import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router-dom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';

const ContractRenewApprovalList = () => {
    const history = useHistory()
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    useEffect(() => {
        const getProbationEnd = async () => {
            const result = await axioslogin.get('/empcontract/contractrenewapprlist/renewlist')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        getProbationEnd()
    }, [count])
    const title = [
        {
            title: 'Em Id', field: 'em_no', cellStyle: { minWidth: 100, maxWidth: 150 }
        },
        {
            title: 'Department', field: 'sect_name', cellStyle: { minWidth: 300, maxWidth: 500 }
        },
        {
            title: 'Emp Name', field: 'em_name', cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: 'Designation', field: 'desg_name', cellStyle: { minWidth: 250, maxWidth: 300 }
        },
        {
            title: 'Date of Join', field: 'em_doj', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
        {
            title: 'Contract Start', field: 'em_cont_start', cellStyle: { minWidth: 200, maxWidth: 350 }
        },
        {
            title: 'Contract End', field: 'em_cont_end', cellStyle: { minWidth: 200, maxWidth: 400 }
        },
    ]
    const redirect = () => {
        history.push('/Home')
    }
    //Contract Renewal Process
    const DirectContractRenewProcess = (data) => {
        const { em_no, em_id } = data
        history.push(`/Home/ContractRenewalProcess/${em_no}/${em_id}`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Contract Renew Approval List"
                redirect={redirect}
            >
                <MaterialTable
                    title="Contract Renew List"
                    data={tableData}
                    columns={title}
                    icons={tableIcons}
                    actions={[
                        {
                            icon: () => <TaskAltIcon color='primary' />,
                            tooltip: "Contract Renew",
                            onClick: (e, data) => DirectContractRenewProcess(data)

                        }

                    ]}
                    options={{
                        paginationType: "stepped",
                        showFirstLastPageButtons: false,
                        padding: "dense",
                        actionsColumnIndex: 0,
                        // rowStyle: (data, index) => data.em_cont_end <= moment(new Date()).format('YYYY-MM-DD') ? { background: "#bbdefb" } : null
                    }}
                />
            </PageLayoutCloseOnly>

        </Fragment>
    )
}

export default memo(ContractRenewApprovalList)