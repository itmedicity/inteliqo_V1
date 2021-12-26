import MaterialTable from 'material-table'
import React, { Fragment, memo } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';


const ApprovalHODTable = () => {
    return (
        < Fragment >
            <MaterialTable
                title="Leave Approval HOD"
                //data={data}
                // columns={title}
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
                    actionsColumnIndex: 0
                }}
            />
        </Fragment >
    )
}

export default memo(ApprovalHODTable)
