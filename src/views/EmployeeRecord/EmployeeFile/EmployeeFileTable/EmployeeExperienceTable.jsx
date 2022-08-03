import EditOutlined from '@material-ui/icons/EditOutlined'
import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'

const EmployeeExperienceTable = ({ update }) => {
    const history = useHistory()
    const { id, no } = useParams()
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
                minWidth: 300,
                maxWidth: 400
            }
        },
        {
            title: 'Designation', field: 'desg_name', cellStyle: {
                minWidth: 300,
                maxWidth: 400
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
            title: 'Total Year', field: 'year', cellStyle: {
                minWidth: 150,
                maxWidth: 200
            }
        },
        {
            title: 'Total Month', field: 'month', cellStyle: {
                minWidth: 150,
                maxWidth: 200
            }
        },
        {
            title: 'Total Days', field: 'day', cellStyle: {
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
            const results = await axioslogin.get(`/experience/select/${id}`)
            const { success, data } = results.data
            if (success === 1) {
                setData(data)

            }
            else if (success === 0) {
                infoNofity("No Experience Is added to This Employee")
            }
            else {
                errorNofity("Error Occured,Please Contact EDP")
            }
        }
        getTableData()

    }, [id, update])
    //getting table data for edit
    const getTableData = (data) => {
        const { emexp_slno } = data
        history.push(`/Home/EmployeeExperienceEdit/${emexp_slno}/${id}/${no}`)
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
