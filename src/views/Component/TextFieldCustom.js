import { CssVarsProvider } from '@mui/joy/'
import Input from "@mui/joy/Input"
import React, { Fragment } from 'react'

const TextFieldCustom = ({
    size,
    placeholder,
    type,
    startDecorator,
    endDecorator,
    style,
    onChange,
    value,
    defaultValue,
    name,
    disabled
}) => {
    // --- size --> sm,lg,md Default medium Size
    // Text Feild Custome Style 
    const textStyle = {}
    return (
        <Fragment>
            <CssVarsProvider>
                <FormControl size={size}>
                    <Input
                        placeholder={placeholder}
                        type={type}
                        startDecorator={startDecorator}
                        endDecorator={endDecorator}
                        sx={{ ...textStyle, ...style }}
                        onChange={(e) => onChange(e)}
                        value={value}
                        defaultValue={defaultValue}
                        name={name}
                        autoComplete="off"
                        disabled={disabled ?? false} />

                </FormControl>
            </CssVarsProvider>
        </Fragment >
    );
}

export default TextFieldCustom
