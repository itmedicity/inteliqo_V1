import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useEffect, useState, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DepartmentSelect = (props) => {
    const [deptData, setdeptData] = useState([]);
    const { selectedDept, updateSelected } = useContext(PayrolMasterContext);
    useEffect(() => {
        const fetchDeptData = async () => {

            const result = await axioslogin.get('/common/getdept')
                .then((response) => {
                    setdeptData(response.data.data)
                    return response.data.data;
                })
                .catch((error) => {
                    return error;
                });
            return result;
        }
        fetchDeptData();
        return (
            updateSelected(0)
        )
    }, [updateSelected]);

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
                    value={selectedDept}
                    onChange={(e) => updateSelected(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-3"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Select Department
                    </MenuItem>
                    {
                        deptData.map((val, index) => {
                            return <MenuItem key={index} value={val.dept_id}>{val.dept_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment >
    )
}

export default memo(DepartmentSelect)
