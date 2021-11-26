import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { memo } from 'react';
import { useContext } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const DesignationType = () => {
    const [designationType, setDesignationtype] = useState([]);
    const { selectDesignationType, updateDesignationType, setdesigntypename } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getdesignationType = async () => {
            const result = await axioslogin.get('/empstat');
            const { success, data } = result.data;
            if (success === 1) {
                setDesignationtype(data);
            }
        }
        getdesignationType();
        return (
            updateDesignationType(0)
        )
    }, [updateDesignationType]);
    // labeldata 
    const getlaeldat = (e) => {
        const selectedText = e.nativeEvent.target.textContent
        setdesigntypename(selectedText)

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
                    name="selectedSalutation"
                    value={selectDesignationType}
                    onChange={(e) => {
                        updateDesignationType(e.target.value)
                        getlaeldat(e)
                    }}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Designation Type
                    </MenuItem>
                    {
                        designationType && designationType.map((val, index) => {
                            return <MenuItem key={index} value={val.emstats_slno}>{val.empstat_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(DesignationType)
