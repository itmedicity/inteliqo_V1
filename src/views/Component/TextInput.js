import React from 'react'

const TextInput = (props) => {
    const { type, id, Placeholder, value, classname } = props;
    return (
        <div>
            <input
                type={type}
                className={classname}
                id={id}
                placeholder={Placeholder}
                aria-label=".form-control-sm"
                value={value}
            />
        </div>
    )
}

export default TextInput
