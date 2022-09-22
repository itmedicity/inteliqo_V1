import { Checkbox, CssVarsProvider } from '@mui/joy'
import React, { Fragment, memo } from 'react'

const CommonCheckBox = ({ value, name, onChange, checked, style, label, uncheckedIcon, color, size }) => {
    return (

        <CssVarsProvider>
            <Checkbox
                color={color}
                size={size}
                variant="outlined"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                style={{ ...style }}
                label={label}
                uncheckedIcon={uncheckedIcon}
            />
        </CssVarsProvider>

    )
}

export default memo(CommonCheckBox) 