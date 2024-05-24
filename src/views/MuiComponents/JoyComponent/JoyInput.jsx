import { CssVarsProvider } from "@mui/joy"
import Input from "@mui/joy/Input"
import React, { memo } from 'react'

const JoyInput = ({
    size,
    placeholder,
    type,
    startDecorator,
    endDecorator,
    style,
    onchange,
    value,
    min,
    defaultValue, name, disabled, variant, color
}) => {
    const textStyle = { width: "100%", height: "100%" }
    return (
        <CssVarsProvider>
            <Input
                variant={variant}
                placeholder={placeholder}
                type={type}
                size={size}
                startDecorator={startDecorator}
                endDecorator={endDecorator}
                sx={{ ...textStyle, ...style }}
                onChange={(e) => onchange(e.target.value)}
                min={min}
                value={value}
                defaultValue={defaultValue}
                name={name}
                color={color}
                autoComplete="off"
                disabled={disabled}
            />
        </CssVarsProvider>
    )
}

export default memo(JoyInput)