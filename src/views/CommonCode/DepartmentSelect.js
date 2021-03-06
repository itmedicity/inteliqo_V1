import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useEffect, useState, useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { setDepartment } from '../../redux/actions/Department.action';
import { useDispatch, useSelector } from 'react-redux';

const DepartmentSelect = ({ style, disabled }) => {
    const dispatch = useDispatch()
    const [deptData, setdeptData] = useState([]);
    const { selectedDept, updateSelected } = useContext(PayrolMasterContext);
    const departments = useSelector((state) => {
        return state.getDepartmentList.empDepartmentList
    })

    useEffect(() => {
        const fetchDeptData = async () => {
            if (Object.keys(departments).length > 0) {
                setdeptData(departments)
            }
        }
        fetchDeptData();
        return (
            updateSelected(0)
        )
    }, [updateSelected, departments]);


    useEffect(() => {
        dispatch(setDepartment())
    }, [])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                size='small'
            // className="mt-1"
            // style={{ backgroundColor: "yellow" }}
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectedDept"
                    value={selectedDept}
                    onChange={(e) => updateSelected(e.target.value)}
                    fullWidth
                    variant="outlined"
                    // className="ml-3"
                    defaultValue={0}
                    style={{ ...style }}
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
