import MaterialTable from 'material-table'
import React, { Fragment, memo } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';

const LeaveCancelHRTable = () => {
    return (
        < Fragment >
            <MaterialTable
                title="Leave Cancel HR"
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

export default LeaveCancelHRTable
