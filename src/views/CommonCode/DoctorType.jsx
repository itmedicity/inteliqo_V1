import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, useEffect, useState, Fragment } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DoctorType = () => {
    // intializing use state
    const [doctortype, setDoctortype] = useState([]);

    // // useContext
    const { getDoctype, updatedoctortype } = useContext(PayrolMasterContext)

    // useeffect 
    useEffect(() => {
        const getdoctypedata = async () => {
            const result = await axioslogin.get('/doctype/select')
            const { success, data } = result.data;
            if (success === 1) {
                setDoctortype(data)
            }
        }
        getdoctypedata()
        return (
            updatedoctortype(0)
        )
    }, [updatedoctortype]);

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
                    value={getDoctype}
                    onChange={(e) => updatedoctortype(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Doctor Type
                    </MenuItem>
                    {
                        doctortype && doctortype.map((val, index) => {
                            return <MenuItem key={index} value={val.doctype_slno}>{val.doctype_desc}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>

        </Fragment>
    )
}

export default DoctorType
