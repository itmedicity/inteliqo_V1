import MaterialTable from 'material-table';
import React, { Fragment, useEffect, memo, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const DesignationTable = ({ update }) => {

    const [data, setTableData] = useState();
    const history = useHistory();
    const title = [
        {
            title: "Sl No", field: "desg_slno"
        },
        {
            title: "Designation", field: "desg_name"
        },
        {
            title: "Notice Period", field: "desg_notice_prd"
        },
        {
            title: "Status", field: "status"
        },
    ]

    useEffect(() => {
        const getDesigList = async () => {
            const result = await axioslogin.get('/designation')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getDesigList();

    }, [update]);

    //For Editing
    const getDataTable = (data) => {
        const { desg_slno } = data
        history.push(`/Home/DesignationMastTableEdit/${desg_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Designation"
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

export default memo(DesignationTable)
