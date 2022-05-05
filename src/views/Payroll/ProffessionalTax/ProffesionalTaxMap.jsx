import React, { Fragment, memo, Suspense } from 'react'
import { LinearProgress, TableCell } from '@mui/material';

const ProffesionalTaxMap = ({ gross, tax }) => {
    const amt = tax.map((val) => {
        if (gross !== 0) {
            if ((val.salary_from < gross) && (gross < val.salary_to)) {
                return (val.tax_amt)
            }
        }
        else {
            return 0
        }
    })

    return (
        <Fragment>
            <Suspense fallback={<LinearProgress />} >
                <TableCell align="center" style={{ padding: 0, width: '10rem', height: '1rem' }}>{amt}</TableCell>
            </Suspense>
        </Fragment>
    )
}

export default memo(ProffesionalTaxMap)