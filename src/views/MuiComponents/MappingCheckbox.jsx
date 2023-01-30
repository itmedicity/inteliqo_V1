import { Checkbox, CssVarsProvider } from '@mui/joy'
import React, { Fragment, memo } from 'react'
const MappingCheckbox = ({ value, onChange, name, label, checkedValue, onClick }) => {
    return (
        <Fragment>
            <CssVarsProvider>
                <Checkbox
                    variant="outlined"
                    color='danger'
                    label={label}
                    checked={checkedValue !== undefined && checkedValue !== value ? false : true}
                    onChange={(e) => {
                        onChange(e.target.checked === true ? value : null)

                    }}
                    onClick={onClick}
                    name={name}
                //disabled={checkedValue !== undefined && checkedValue !== val.value ? true : false}
                />
            </CssVarsProvider >
        </Fragment >
    )
}

export default memo(MappingCheckbox)