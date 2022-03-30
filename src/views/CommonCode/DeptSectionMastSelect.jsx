import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, memo, useEffect, useState, Fragment } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DeptSectionMastSelect = (props) => {
    // intializing use state
    const [dept, setDept] = useState([]);

    // useContext
    const { getDeptSection, updateDeptSection } = useContext(PayrolMasterContext)

    // useffect 
    useEffect(() => {
        const getdeptsection = async () => {
            const result = await axioslogin.get('/section/select/all')
            const { success, data } = result.data;
            if (success === 1) {
                setDept(data)
            }
        }
        getdeptsection()
        return (
            updateDeptSection(0)
        )
    }, [updateDeptSection]);

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
                    name="selectedDept"
                    value={getDeptSection}
                    onChange={(e) => updateDeptSection(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Department Section
                    </MenuItem>
                    {
                        dept && dept.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(DeptSectionMastSelect)
