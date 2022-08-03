import { Checkbox } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const CommonCheckBox = ({ value, name, onChange, checked, style }) => {
    return (
        <Fragment>
            <Checkbox
                color="primary"
                size="lg"
                variant="outlined"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                style={{ ...style }}
            />
        </Fragment>
    )
}

export default memo(CommonCheckBox) 