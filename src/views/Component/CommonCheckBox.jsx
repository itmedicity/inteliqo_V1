import { Checkbox, CssVarsProvider } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const CommonCheckBox = ({ value, name, onChange, checked, style }) => {
    return (

        <CssVarsProvider>
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
        </CssVarsProvider>

    )
}

export default memo(CommonCheckBox) 