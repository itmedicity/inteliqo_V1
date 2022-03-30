import { Select, FormControl, MenuItem } from '@material-ui/core'

import React, { Fragment } from 'react'

const Compensatoryoffcomponent = ({ name, select, style, onChange, coff, getcoff }) => {

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={`hol${name}`}
                    // name={holname}
                    onChange={onChange}
                    fullWidth
                    value={getcoff.getcoffvalvalue}
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} disabled selected >{select}</MenuItem>
                    {coff && coff.map((val, index) => {
                        return <MenuItem key={index} value={val.hrm_calc_holiday} disabled={val.hl_lv_taken === 1 ? true : null} >{val.calculated_date}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Fragment >
    )
}

export default Compensatoryoffcomponent