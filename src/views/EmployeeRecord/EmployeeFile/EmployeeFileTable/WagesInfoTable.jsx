import MaterialTable from 'material-table';
import React, { Fragment, memo } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const WagesInfoTable = () => {
    return (
        <Fragment>
            <MaterialTable
                title="Wages Information "
                icons={tableIcons}
                // actions={[
                //     {
                //         icon: () => <EditOutlinedIcon />,
                //         tooltip: "Click here to Edit",
                //         // onClick: (e, data) => getDataTable(data)
                //     }
                // ]}
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

export default memo(WagesInfoTable)
