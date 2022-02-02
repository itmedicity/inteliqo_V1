import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, memo, useEffect, useState, Fragment } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DeptSecSelectAuth = (props) => {
    const [deptsec, setDeptsec] = useState([]);
    const { selectDeptSec, updateDeptSec, updatedeptname } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getdeptsection = async () => {
            const result = await axioslogin.get('/section/select/all')
            const { success, data } = result.data;
            if (success === 1) {
                setDeptsec(data)
            }
        }
        getdeptsection()
        return (
            updateDeptSec(0)
        )
    }, [updateDeptSec]);
    const getLabel = (e) => {
        const selectedText = e.nativeEvent.target.textContent
        updatedeptname(selectedText)
    }

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
                    value={selectDeptSec}
                    onChange={(e) => {
                        updateDeptSec(e.target.value)
                        getLabel(e)
                    }}
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
                        deptsec && deptsec.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment >
    )
}

export default DeptSecSelectAuth
