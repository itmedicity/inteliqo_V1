import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { FormControl, MenuItem, Select } from '@material-ui/core';

const DepartmentSelect = ({ style, disabled }) => {
    const { selectedDept, updateSelected, updateSelectedName } = useContext(PayrolMasterContext);
    const [deptData, setdeptData] = useState([]);

    //const dispatch = useDispatch()
    const dept = useSelector((state) => {
        return state.getdept.departmentlist
    })

    useEffect(() => {
        const fetchDeptData = async () => {
            if (Object.keys(dept).length > 0) {
                setdeptData(dept)
            }
        }
        fetchDeptData();
        return (
            updateSelected(0)
        )
    }, [updateSelected, dept]);
    // labeldata 
    const getlaeldat = (e) => {
        const selectedText = e.nativeEvent.target.textContent
        updateSelectedName(selectedText)

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
                    value={selectedDept}
                    onChange={(e) => {
                        updateSelected(e.target.value)
                        getlaeldat(e)
                    }}
                    fullWidth
                    variant="outlined"
                    className="ml-3"
                    defaultValue={0}
                    style={style}
                    disabled={disabled}
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