import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useState, memo, useContext } from 'react'
import { useEffect } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const BrnachMastSelection = (props) => {
    const [branchMast, setBranchMast] = useState([]);
    const { selectBranchMast, updateBranchSelected } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getBranchName = async () => {
            const result = await axioslogin.get('/branch');
            const { success, data } = await result.data;
            if (success === 1) {
                setBranchMast(data);
            }
        }
        getBranchName();
        return (
            updateBranchSelected(0)
        )
    }, [updateBranchSelected]);
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
                    name="selectedBranch"
                    value={selectBranchMast}
                    onChange={(e) => updateBranchSelected(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-2"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Branch Master
                    </MenuItem>
                    {
                        branchMast && branchMast.map((val, index) => {
                            return <MenuItem key={index} value={val.branch_slno}>{val.branch_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment >
    )
}

export default memo(BrnachMastSelection)
