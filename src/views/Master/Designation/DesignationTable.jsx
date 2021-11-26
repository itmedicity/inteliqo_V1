import MaterialTable from 'material-table';
import React, { Fragment, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { memo } from 'react';

const DesignationTable = ({ update }) => {

    const [data, setTableData] = useState();
    const title = [
        {
            title: "#", field: "desg_slno"
        },
        {
            title: "Designation", field: "desg_name"
        },
        {
            title: "Status", field: "status"
        },
    ]

    useEffect(() => {
        const getDesigList = async () => {
            const result = await axioslogin.get('/designation')
            const { data } = result.data;
            setTableData(data);
        }
        getDesigList();

    }, [update]);


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
                        onClick: (e, data) => null
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1
                }}

            />
        </Fragment>
    )
}

export default memo(DesignationTable)
