import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const KraSelect = ({ value, setValue, style, label, setKraName }) => {
    const [KraMast, setKraMast] = useState([])
    //getting Kra Details
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get('/KraMast/byStatus')
            const { success, data } = result.data
            if (success === 1) {
                setKraMast(data)
            }
            else {
                setKraMast([])
            }
        }
        getData()
    }, [])
    const handleChange = (event) => {
        setValue(event.target.value);
        setKraName(event.nativeEvent.target.textContent)
    };

    return (
        <Fragment>
            <FormControl fullWidth sx={{
                "&.MuiFormControl-root": {
                    marginTop: '4px',
                },
            }} >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={handleChange}
                    // size="small"
                    fullWidth
                    displayEmpty
                    variant='outlined'
                    style={style}

                >
                    <MenuItem value='0' disabled>
                        {label}
                    </MenuItem>
                    {
                        KraMast && KraMast.map((val, index) => {
                            return <MenuItem key={index} value={val.kra_slno}>{val.kra_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default KraSelect