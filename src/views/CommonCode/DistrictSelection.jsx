import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { memo } from 'react';
import { useEffect } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DistrictSelection = () => {
    const [district, setDistrict] = useState([]);
    const { selectDistrict, updateDisSelected } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getDistrictDetl = async () => {
            const result = await axioslogin.get('/common/getdist');
            const { data } = await result.data;
            setDistrict(data);
        }
        getDistrictDetl()

        return (
            updateDisSelected(0)
        )
    }, [updateDisSelected]);
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectedDept"
                    value={selectDistrict}
                    onChange={(e) => updateDisSelected(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-2"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select District
                    </MenuItem>
                    {
                        district && district.map((val, index) => {
                            return <MenuItem key={index} value={val.dist_slno}>{val.dist_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(DistrictSelection)
