import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const ReligionSelect = (props) => {
    // intializing use state
    const [ReligionData, setReliogion] = useState([]);

    // useContext
    const { getreligion, udatereligion } = useContext(PayrolMasterContext)

    // useeffect 
    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/Religion')
            const { success, data } = result.data;
            if (success === 1) {
                setReliogion(data)
            }
        }
        getemptypedata()
        return (
            udatereligion(0)
        )
    }, [udatereligion]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-labels"
                    id="demo-simple-selects"
                    name="getreligion"
                    value={getreligion}
                    onChange={(e) => udatereligion(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value={0} disabled>
                        Religion
                    </MenuItem>
                    {
                        ReligionData && ReligionData.map((val, index) => {
                            return <MenuItem key={index} value={val.relg_slno}>{val.relg_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>

    )
}

export default ReligionSelect
