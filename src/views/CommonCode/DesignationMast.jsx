import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DesignationMast = (props) => {
    const [designation, setDesignation] = useState([]);
    const { selectDesignation, updateDesignation } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getDesignation = async () => {
            const result = await axioslogin.get('/designation');
            const { success, data } = result.data;
            if (success === 1) {
                setDesignation(data);
            }
        }
        getDesignation();
        return (
            updateDesignation(0)
        )
    }, [updateDesignation]);
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
                    name="selectedSalutation"
                    value={selectDesignation}
                    onChange={(e) => updateDesignation(e.target.value)}
                    fullWidth
                    variant="outlined"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Select Designation
                    </MenuItem>
                    {
                        designation && designation.map((val, index) => {
                            return <MenuItem key={index} value={val.desg_slno}>{val.desg_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default DesignationMast
