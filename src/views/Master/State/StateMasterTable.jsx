import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { errorNofity } from 'src/views/CommonCode/Commonfunc';

const StateMasterTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //Table
    const title = [
        {
            title: "SlNo", field: "state_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "State Name", field: "state_name", cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: "Nation ", field: "nat_name", cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: "Status", field: "state_status"
        },
    ]

    //Getdata
    useEffect(() => {
        const getTypeList = async () => {
            const result = await axioslogin.get('/state')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                errorNofity(" Error occured contact EDP")
            }
        }
        getTypeList();
    }, [update]);

    //For Editing
    const getDataTable = (data) => {
        const { state_slno } = data
        history.push(`/Home/StateMastEdit/${state_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="State "
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

export default memo(StateMasterTable)
