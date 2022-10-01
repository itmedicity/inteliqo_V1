import { Checkbox, CssVarsProvider } from '@mui/joy'
import React, { memo } from 'react'

const CommonCheckBox = ({ value, name, onChange, checked, style, label, uncheckedIcon, color, size, disabled }) => {
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
                disabled={disabled}
            />
        </CssVarsProvider>

    )
}

export default memo(CommonCheckBox) 