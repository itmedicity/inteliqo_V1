import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router';

const GradeMasterTable = (update) => {
    const hsitory = useHistory()

    // to get table data
    const getTabledata = async (data) => {
        const { grade_slno } = data
        hsitory.push(`/Home/GradeTableEdit/${grade_slno}`)
    }

    const [tableData, setTabbleData] = useState([])

    const title = [
        {
            title: '#', field: 'grade_slno'
        },
        {
            title: 'Grade Name', field: 'grade_desc'
        },
        {
            title: 'Status', field: 'grade_status'
        },


    ]
    useEffect(() => {
        const getabledata = async () => {
            const result = await axioslogin.get('/grade')
            const { success, data, message } = result.data
            if (success === 1) {
                setTabbleData(data)
            } else {
                infoNofity(message)
            }
        }
        getabledata();
    }, [update])
    return (
        <Fragment>
            <MaterialTable
                title="Grade Type"
                data={tableData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getTabledata(data)
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

export default GradeMasterTable
