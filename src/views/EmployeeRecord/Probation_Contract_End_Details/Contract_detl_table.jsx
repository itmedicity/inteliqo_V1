import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import CancelIcon from '@mui/icons-material/Cancel';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';

const Contract_detl_table = () => {
    const history = useHistory()
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    useEffect(() => {
        const getProbationEnd = async () => {
            const result = await axioslogin.get('/empcat/contract/detl')
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
    //Contract Renewal Process
    const DirectContractRenewProcess = (data) => {
        const { em_no, em_id } = data
        history.push(`/Home/ContractRenewalProcess/${em_no}/${em_id}`)
    }
    //Direct Contract close
    const DirectContractClose = (data) => {
        const { em_no, em_id } = data
        history.push(`/Home/Direct_Contract_Close/${em_no}/${em_id}`)
    }
    //contreact Renew Process

    const ContractRenew = async (data) => {
        const { em_no } = data
        const conractrenew = {
            contract_renew_appr: 1,
            em_no: em_no
        }
        const result = await axioslogin.patch('/empcontract/contractrenewapprove', conractrenew)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
        }
        else {
            errorNofity("Error Occured!!Please Contact EDP")
        }
    }
    return (
        <Fragment>
            <MaterialTable
                title="Contract End List"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <CancelIcon color='primary' />,
                        tooltip: "Direct Contract Close",
                        onClick: (e, data) => DirectContractClose(data)

                    },
                    {
                        icon: () => <LibraryAddCheckIcon color='primary' />,
                        tooltip: "Contract Renew Process",
                        onClick: (e, data) => ContractRenew(data)

                    },
                    {
                        icon: () => <TaskAltIcon color='primary' />,
                        tooltip: "Direct Contract Renew",
                        onClick: (e, data) => DirectContractRenewProcess(data)

                    }

                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0,
                    rowStyle: (data, index) => data.em_cont_end <= moment(new Date()).format('YYYY-MM-DD') ? { background: "#bbdefb" } : null
                }}
            />
        </Fragment>
    )
}

export default memo(Contract_detl_table)