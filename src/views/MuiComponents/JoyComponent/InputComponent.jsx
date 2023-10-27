import { CssVarsProvider } from "@mui/joy"
import Input from "@mui/joy/Input"
import React, { memo } from 'react'

const InputComponent = ({
    size,
    placeholder,
    type,
    startDecorator,
    endDecorator,
    style,
    onchange,
    value,
    min,
    defaultValue, name, disabled
}) => {
    return (
        <CssVarsProvider>
            <Input
                fullWidth
                placeholder={placeholder}
                type={type}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                sx={{ ...style }}
                onChange={(e) => onchange(e)}
                min={min}
                value={value}
                defaultValue={defaultValue}
                name={name}
                autoComplete="off"
                disabled={disabled}
            />
        </CssVarsProvider>
    )
}

export default memo(InputComponent)