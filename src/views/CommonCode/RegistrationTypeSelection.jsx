import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useState, useEffect, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const RegistrationTypeSelection = (props) => {
    const [reg, setreg] = useState([]);
    const { selectreg, updatereg } = useContext(PayrolMasterContext)

    //get RegistrationType 
    useEffect(() => {
        const getreg = async () => {
            const result = await axioslogin.get('/common/getRegistration')
            const { data } = await result.data;
            setreg(data)
        }
        getreg()
        return (
            updatereg(0)
        )
    }, [updatereg])
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectreg"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectreg}
                    onChange={(e) => updatereg(e.target.value)}
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Select Registration Type
                    </MenuItem>
                    {
                        reg && reg.map((val, index) => {
                            return <MenuItem key={index} value={val.reg_id}>{val.registration_name}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(RegistrationTypeSelection)
