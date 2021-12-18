import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useEffect, memo, useContext, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EmployeeInstitutiontype = (props) => {
    const [institutionType, setInstitutionType] = useState([]);
    const { selectInstiType, updateInstituteSeleted } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getInstituionType = async () => {
            const result = await axioslogin.get('/inst');
            const { success, data } = result.data;
            if (success === 1) {
                setInstitutionType(data);
            }
        }
        getInstituionType();
        return (
            updateInstituteSeleted(0)
        )
    }, [updateInstituteSeleted]);
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
                    value={selectInstiType}
                    onChange={(e) => updateInstituteSeleted(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-2"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Employee Institution Type
                    </MenuItem>
                    {
                        institutionType && institutionType.map((val, index) => {
                            return <MenuItem key={index} value={val.inst_slno}>{val.inst_emp_type}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EmployeeInstitutiontype)
