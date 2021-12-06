import React, { Fragment, memo } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import MaterialTable from 'material-table';

const FineAndDeductionTable = () => {
    return (
        <Fragment>
            <MaterialTable
                // title="Fines And Other Deducation Information"
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
                    actionsColumnIndex: 0,
                    showTitle: false,
                }}
            />
        </Fragment>
    )
}

export default memo(FineAndDeductionTable)
