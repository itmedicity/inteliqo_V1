import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const LeaveRequestTypeTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //Table
    const title = [
        {
            title: "SlNo", field: "lrequest_slno"
        },
        {
            title: "Leave Request Type", field: "lrequest_type"
        },
        {
            title: "Request Short Name", field: "lrequest_short"
        },
        {
            title: "Status", field: "lrequest_status"
        },
    ]

    //GetData
    useEffect(() => {
        const getTypeList = async () => {
            const result = await axioslogin.get('/leaveRequestType')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getTypeList();
    }, [update]);

    //For Editing
    const getDataTable = (data) => {
        const { lrequest_slno } = data
        history.push(`/Home/LeaveRequestTypeEdit/${lrequest_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Leave Request Type"
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

export default memo(LeaveRequestTypeTable)
