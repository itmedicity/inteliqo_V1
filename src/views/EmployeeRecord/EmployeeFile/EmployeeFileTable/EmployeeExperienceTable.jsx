import EditOutlined from '@material-ui/icons/EditOutlined'
import MaterialTable from 'material-table'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'

const EmployeeExperienceTable = ({ update }) => {
    const history = useHistory()
    const { no } = useParams()
    const { getemployeenumber } = useContext(PayrolMasterContext)
    const [data, setData] = useState([])
    const title = [
        {
            title: '#', field: 'emexp_slno', cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        },
        {
            title: 'Emp No', field: 'em_no', cellStyle: {
                minWidth: 150,
                maxWidth: 250
            }
        },
        {
            title: 'Institution', field: 'em_institution', cellStyle: {
                minWidth: 200,
                maxWidth: 300
            }
        },
        {
            title: 'Designation', field: 'desg_name', cellStyle: {
                minWidth: 200,
                maxWidth: 300
            }
        },
        {
            title: 'Start Date', field: 'em_from', cellStyle: {
                minWidth: 200,
                maxWidth: 250
            }
        },
        {
            title: 'End Dtae', field: 'em_to', cellStyle: {
                minWidth: 200,
                maxWidth: 250
            }
        },
        {
            title: 'Total Year', field: 'em_total_year', cellStyle: {
                minWidth: 150,
                maxWidth: 200
            }
        },
        {
            title: 'Gross salary', field: 'em_salary', cellStyle: {
                minWidth: 150,
                maxWidth: 200
            }
        }
    ]

    useEffect(() => {
        //getdata from data base
        const getTableData = async () => {
            const results = await axioslogin.get(`/experience/select/${getemployeenumber}`)
            const { success, data } = results.data
            if (success === 1) {
                setData(data)

            }
            else {
                errorNofity("Error Occured,Please Contact EDP")
            }
        }
        getTableData()

    }, [update, getemployeenumber])
    //getting table data for edit
    const getTableData = (data) => {
        const { emexp_slno } = data
        history.push(`/Home/EmployeeExperienceEdit/${emexp_slno}/${no}`)
    }
    return (
        <Fragment>
            <MaterialTable
                title="Employee Experience Table"
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

export default memo(EmployeeExperienceTable)
