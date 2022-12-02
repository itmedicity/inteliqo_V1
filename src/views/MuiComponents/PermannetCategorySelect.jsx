import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios'

const PermannetCategorySelect = ({ value, setValue, style, disable }) => {

    const [permanentData, setPermanentData] = useState([])

    useEffect(() => {
        const getPermanent = async () => {
            const result = await axioslogin.get(`/empcat/permanent/data`)
            const { success, data } = result.data
            if (success === 1) {
                setPermanentData(data)
            }
            else {
                setPermanentData([])
            }
        }
        getPermanent()
    }, [])
    return (
        <Fragment>
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectCategory"
                    value={value}
                    onChange={(e) => { setValue(e.target.value) }}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                    style={style}
                    disabled={disable}
                >
                    <MenuItem value='0' disabled>
                        Employee Permanent Category
                    </MenuItem>
                    {
                        permanentData && permanentData.map((val, index) => {
                            return <MenuItem key={index} value={val.category_slno}>{val.ecat_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default PermannetCategorySelect