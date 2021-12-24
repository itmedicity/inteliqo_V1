import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useEffect, useState, useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'
import { infoNofity } from './Commonfunc'
const GetWageType = (props) => {
    const [wagedescription, setWageDescription] = useState([])
    const { earntypeDatacontext, selectWageDescription, updateWageDescription } = useContext(PayrolMasterContext)
    useEffect(() => {
        const getwageDescription = async () => {
            if (earntypeDatacontext !== 0) {
                const result = await axioslogin.get(`/earn/select/${earntypeDatacontext}`);
                const { success, data, message } = await result.data;
                if (success === 1) {
                    setWageDescription(data);
                }
                if (success === 0) {
                    setWageDescription(0)
                    infoNofity(message);
                }
            }
        }
        getwageDescription();
        return (
            updateWageDescription(0)
        )
    }, [earntypeDatacontext, updateWageDescription])
    return (
        <Fragment>
            <ToastContainer />
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectWageDescription"
                    value={selectWageDescription}
                    onChange={(e) => updateWageDescription(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Wage Description
                    </MenuItem>
                    {
                        wagedescription && wagedescription.map((val, index) => {
                            return <MenuItem key={index} value={val.earnded_id}>{val.earnded_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(GetWageType) 
