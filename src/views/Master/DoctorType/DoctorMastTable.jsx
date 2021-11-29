import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const DoctorMastTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //Table
    const title = [
        {
            title: "SlNo", field: "doctype_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Doctor Type", field: "doctype_desc", cellStyle: { minWidth: 100, maxWidth: 200 }
        },
        {
            title: "Status", field: "doctype_status"
        },
    ]

    //GetData
    useEffect(() => {
        const getTypeList = async () => {
            const result = await axioslogin.get('/doctype')
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
        const { doctype_slno } = data
        history.push(`/Home/DoctorMastEdit/${doctype_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Doctor Type"
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

export default memo(DoctorMastTable)

