import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const OTWageMastTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //Table
    const title = [
        {
            title: "Emp Id", field: "em_id", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Employee Name", field: "em_name", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Department ", field: "dept_name", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Department Section", field: "sect_name", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "OT Amount", field: "ot_amount"
        },
    ]
    //GetData
    useEffect(() => {
        const getOtWage = async () => {
            const result = await axioslogin.get('/OtWage')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getOtWage();
    }, [update]);

    //For Editing
    const getTableData = (data) => {
        const { em_id } = data
        history.push(`/Home/OTWageMasterEdit/${em_id}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="OT Wage Table"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
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

export default memo(OTWageMastTable)
