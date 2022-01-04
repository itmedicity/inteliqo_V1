import MaterialTable from 'material-table'
import React, { Fragment, memo } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';

const OTUpdationTable = () => {
    return (
        < Fragment >

            <MaterialTable
                title="Over Time Updation"
                //data={data}
                //columns={title}
                icons={tableIcons}
                // actions={[
                //     {
                //         icon: () =>
                //             <MdCheckCircle size={26} color="secondary" onClick={handleClickOpen} />,

                //     }
                // ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1
                }}
            />
        </Fragment >
    )
}

export default memo(OTUpdationTable)
