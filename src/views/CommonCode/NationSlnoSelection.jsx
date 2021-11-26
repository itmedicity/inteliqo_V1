import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';
import { memo } from 'react';

const NationSlnoSelection = () => {

    const [nation, setNation] = useState([]);
    const { selectNation, updateNation } = useContext(PayrolMasterContext);



    useEffect(() => {
        const getNation = async () => {
            const result = await axioslogin.get('/common/getNation');
            const { data } = await result.data;
            setNation(data)


        }
        getNation()

        return (
            updateNation(0)
        )

    }, [updateNation]);





    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectNation"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectNation}
                    onChange={(e) => updateNation(e.target.value)}
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Nation
                    </MenuItem>
                    {
                        nation && nation.map((val, index) => {
                            return <MenuItem key={index} value={val.nat_slno}>{val.nat_name}
                            </MenuItem>
                        })
                    }


                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(NationSlnoSelection)
