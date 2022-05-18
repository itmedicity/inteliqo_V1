import { Autocomplete } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';
const Autocompletetest = () => {
    const [inputValue, setInputValue] = useState('');
    // intializing use state
    const [regiondata, setregion] = useState([]);
    // useContext
    const { udateregion } = useContext(PayrolMasterContext)
    useEffect(() => {
        const getregiondata = async () => {
            const result = await axioslogin.get('/region')
            const { success, data } = result.data;
            if (success === 1) {
                setregion(data)
            }
        }
        getregiondata()
        return (
            udateregion(0)
        )

    }, [udateregion]);
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
                    value={inputValue}
                    onChange={(event, newValue) => {
                        udateregion(newValue === null ? 0 : newValue.value);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    options={regiondata && regiondata.map((val) => {
                        return { label: val.reg_name, value: val.reg_slno }
                    })}
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

export default Autocompletetest