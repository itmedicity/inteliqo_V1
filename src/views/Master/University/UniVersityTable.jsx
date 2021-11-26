import React, { Fragment, memo, useEffect, useState } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MaterialTable from 'material-table';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router';

const UniVersityTable = ({ update }) => {
    const history = useHistory()
    const [data, setTableData] = useState([]);

    //Table
    const title = [
        {
            title: 'Slno', field: 'unver_slno'
        },
        {
            title: 'Name', field: 'unver_name'
        },
        {
            title: 'Alias', field: 'unver_alias'
        },
        {
            title: 'Status', field: 'unver_status'
        },
    ]

    //GetData
    useEffect(() => {
        const getUniversityDetl = async () => {
            const result = await axioslogin.get('/university');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity("Error Occured Contact EDP");
            }
        }
        getUniversityDetl();
    }, [update]);

    //For Edit
    const getDataTable = (data) => {
        const { unver_slno } = data
        history.push(`/Home/UniversityMastEdit/${unver_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Designation Type"
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

export default memo(UniVersityTable)
