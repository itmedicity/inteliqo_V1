import { TableCell } from '@material-ui/core'
import React, { Fragment, memo } from 'react'

const AttandanceDatecmpont = ({ date }) => {
    return (
        <Fragment>
            {
                date.map((val, key) => {
                    return <TableCell align="center" key={key} className="p-2" style={{ width: '8rem' }}>
                        {val.date}
                    </TableCell>
                })
            }
        </Fragment>
    )
}

export default memo(AttandanceDatecmpont)