import { Checkbox, CssVarsProvider } from '@mui/joy'
import React, { memo } from 'react'

const JoyCheckbox = ({
    size,
    label,
    color,
    checked,
    onchange,
    style,
    value,
    defaultChecked,
    name,
    disabled
}) => {
    return (
        <CssVarsProvider>
            <Checkbox
                label={label}
                size={size}
                defaultChecked={defaultChecked}
                color={color}
                checked={checked}
                onChange={(e) => onchange(e)}
                name={name}
                sx={{ ...style }}
                value={value}
                disabled={disabled}
            />
        </CssVarsProvider>
    )
}

export default memo(JoyCheckbox) 