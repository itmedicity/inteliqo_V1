import MaterialTable from 'material-table'
import React, { Fragment } from 'react'
import { tableIcons } from '../Constant/MaterialIcon'

const Materialtable = (props) => {
    const { title, data, columns } = props
    return (
        <Fragment>
            <MaterialTable
                title={title}
                data={data}
                columns={columns}
                icons={tableIcons}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1,
                    exportButton: true,
                    rowStyle: {
                        backgroundColor: '#EEE',
                    },
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    filtering: true
                }}
            />
        </Fragment>
    )
}

export default Materialtable