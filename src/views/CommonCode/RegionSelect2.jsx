import { Autocomplete } from '@mui/material'
import React, { Fragment, useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { PayrolMasterContext } from 'src/Context/MasterContext';

const RegionSelect2 = () => {
    //getting region list from redux
    const regionList = useSelector((state) => {
        return state.getRegionList.RegionList
    })
    // intializing use state
    const [inputValue, setInputValue] = useState('');
    const [input, setInput] = useState('');
    // useContext
    const { udateregion2 } = useContext(PayrolMasterContext)
    return (
        <Fragment>
            <label>
                <Autocomplete
                    sx={{
                        display: "inline-block",
                        "& input": {
                            width: 250,
                            bgcolor: "background.paper",
                            height: 28,
                            borderRadius: 0.9,
                            fontSize: 15,
                            border: 0.1,
                            fontFamily: "inherit",
                            fontStyle: 'normal',
                            paddingLeft: 1.5,
                            color: "#898a8c",
                            borderColor: '#b1b7c1',
                            color: (theme) =>
                                theme.palette.getContrastText(theme.palette.background.paper),
                        }
                    }}
                    value={input}
                    onChange={(event, newValue) => {
                        udateregion2(newValue === null ? 0 : newValue.value);
                        setInput(newValue)
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    options={regionList && regionList.map((val) => {
                        return { label: val.reg_name, value: val.reg_slno }
                    })}
                    isOptionEqualToValue={(option, value) => (option.label === value.label)}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <input placeholder='Region' type="text" {...params.inputProps}
                                style={{
                                    borderColor: '#b1b7c1',
                                }} />
                        </div>
                    )}
                />
            </label>

        </Fragment>
    )
}

export default RegionSelect2
