import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState, memo } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

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
            title: 'CL', field: 'empstat_cl', width: '10%'
        },
        {
            title: 'EL', field: 'empstat_el', width: '10%'
        },
        {
            title: 'HD', field: 'empstat_hd', width: '10%'
        },
        {
            title: 'ESI', field: 'empstat_esi', width: '10%'
        },
        {
            title: 'PF', field: 'empstat_pf', width: '10%'
        },
        {
            title: 'Period', field: 'empstat_period', width: '10%'
        }
    ]

    useEffect(() => {
        const getDesigTypeData = async () => {
            const result = await axioslogin.get('/empstat');
            const { success, data, message } = result.data;
            success === 1 ? settableData(data) : infoNofity(message);
        }
        getDesigTypeData();
    }, [update])

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

export default memo(DesignationTypeTable)
