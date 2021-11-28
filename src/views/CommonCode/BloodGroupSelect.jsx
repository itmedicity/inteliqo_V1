import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, useEffect, useState, Fragment } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const BloodGroupSelect = (props) => {
    // intializing Bloodgroup
    const [bloodgroupData, setbllodgroup] = useState([]);
    // // useContext
    const { getbloodgroup, updatebloodgroup } = useContext(PayrolMasterContext)
    // useeffect 
    useEffect(() => {
        const getbloodpedata = async () => {
            const result = await axioslogin.get('/bloodgroup')
            const { success, data } = result.data;
            if (success === 1) {
                setbllodgroup(data)
            }
        }
        getbloodpedata()
        return (
            updatebloodgroup(0)
        )
    }, [updatebloodgroup]);
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectedEarntype"
                    value={getbloodgroup}
                    onChange={(e) => updatebloodgroup(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Blood Group
                    </MenuItem>
                    {
                        bloodgroupData && bloodgroupData.map((val, index) => {
                            return <MenuItem key={index} value={val.group_slno}>{val.group_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>

        </Fragment>

    )
}

export default BloodGroupSelect
