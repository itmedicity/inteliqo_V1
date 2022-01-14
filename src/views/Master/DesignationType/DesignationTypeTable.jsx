import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState, memo } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router';

const DesignationTypeTable = ({ update }) => {
    const [tableData, settableData] = useState([]);
    const columstitle = [
        {
            title: '#', field: 'emstats_slno', width: '5%'
        },
        {
            title: 'Type', field: 'empstat_name'
        },
        {
            title: 'CL', field: 'status', width: '10%'
        },

    ]

    useEffect(() => {
        const getDesigTypeData = async () => {
            const result = await axioslogin.get('/empstat');
            const { success, data, message } = result.data;
            success === 1 ? settableData(data) : infoNofity(message);
        }
        getDesigTypeData();
    }, [update])
    const history = useHistory();
    const getDataTable = (data) => {
        const { emstats_slno } = data
        history.push(`/Home/DesignationTypeedit/${emstats_slno}`)

    }

    return (
        <Fragment>
            <MaterialTable
                title="Designation Type"
                data={tableData}
                columns={columstitle}
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

export default memo(DesignationTypeTable)
