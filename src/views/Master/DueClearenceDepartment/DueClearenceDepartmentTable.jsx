import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlined from '@material-ui/icons/EditOutlined'
const DueClearenceDepartmentTable = ({ update }) => {
    const [count, setCount] = useState(0)
    const history = useHistory()
    const [data, setData] = useState([])
    const title = [
        {
            title: '#', field: 'due_dept_slno', cellStyle: { minWidth: 1, maxWidth: 10 }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: { minWidth: 150, maxWidth: 250 }
        }
    ]


    useEffect(() => {
        //get table Data
        const getTableData = async () => {
            const results = await axioslogin.get("/Duedepartment/select")
            const { success, data } = results.data
            if (success === 1) {
                setData(data)
            }
            else if (success === 0) {
                warningNofity("No Record Found")
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        getTableData()
    }, [update])


    const getTableData = (data) => {
        setCount(count + 1)
        const { due_dept_slno } = data
        history.push(`/Home/DueClearenceDeptEdit/${due_dept_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Due Clearence Department"
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
};

export default memo(DueClearenceDepartmentTable);
