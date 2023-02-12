import React, { memo } from 'react'
import { useCallback } from 'react'
import { Form } from 'react-bootstrap'

const TextInputBootStrap = ({ type, style, placeholder, disabled, value, onChange }) => {
    return (
        <Form.Control
            type={type}
            style={{ ...style, textAlign: 'left' }}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={useCallback((e) => onChange(e.target.value))}
        />
    )
}

export default memo(TextInputBootStrap)