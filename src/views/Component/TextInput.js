import React from 'react'

const TextInput = (props) => {
    const { type, id, Placeholder, value, classname, changeTextValue } = props;
    return (
        <div>
            <input
                type={type}
                className={classname}
                id={id}
                placeholder={Placeholder}
                aria-label=".form-control-sm"
                value={value}
                onChange={changeTextValue}
            />
        </div>
    )
}

export default TextInput
