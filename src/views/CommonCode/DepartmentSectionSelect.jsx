import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useState, useContext, useEffect, memo } from 'react'
import { ToastContainer } from 'react-toastify';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';
import { infoNofity } from './Commonfunc';

const DepartmentSectionSelect = (props) => {
    const [departmentSection, setDepartmentSection] = useState([]);
    const { selectDeptSection, updateDepartmentSection, selectedDept } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getDepartmentSection = async () => {
            if (selectedDept !== 0) {
                const result = await axioslogin.get(`/section/sect/${selectedDept}`);
                const { success, data, message } = await result.data;
                if (success === 1) {
                    setDepartmentSection(data);
                }
                if (success === 0) {
                    setDepartmentSection(0)
                    infoNofity(message);
                }
            }
        }
        getDepartmentSection();
        return (
            updateDepartmentSection(0)
        )
    }, [updateDepartmentSection, selectedDept]);

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
                    name="selectDepartmentSection"
                    value={selectDeptSection}
                    onChange={(e) => updateDepartmentSection(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Select Department Section
                    </MenuItem>
                    {
                        departmentSection && departmentSection.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(DepartmentSectionSelect)
