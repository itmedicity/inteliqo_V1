import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { useHistory } from 'react-router';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const EducationMastTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //Table
    const title = [
        {
            title: "SlNo", field: "edu_slno"
        },
        {
            title: "Education", field: "edu_desc"
        },
        {
            title: "Status", field: "edu_status"
        },
        {
            title: "User ID", field: "edu_create"
        },
    ]

    // Get data
    useEffect(() => {
        const getEdu = async () => {
            const result = await axioslogin.get('/edu')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity("Error occured, Please contact EDP")
            }
        }
        getEdu();
    }, [update]);

    //For Editing
    const getDataTable = (data) => {
        const { edu_slno } = data
        history.push(`/Home/EducationTableEdit/${edu_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Education "
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getDataTable(data)
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

export default memo(EducationMastTable)
