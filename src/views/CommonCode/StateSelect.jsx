import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';
import { memo } from 'react';

const StateSelect = () => {
    const [state, setState] = useState([]);
    const { selectState, updateState } = useContext(PayrolMasterContext);

    useEffect(() => {
        const getState = async () => {
            const result = await axioslogin.get('/common/getState');
            const { data } = await result.data;
            setState(data)
        }
        getState()
        return (
            updateState(0)
        )
    }, [updateState]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectState"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectState}
                    onChange={(e) => updateState(e.target.value)}
                    defaultValue={0}
                >

                    <MenuItem value='0' disabled>
                        Select State
                    </MenuItem>
                    {
                        state && state.map((val, index) => {
                            return <MenuItem key={index} value={val.state_slno}>{val.state_name}
                            </MenuItem>
                        })

                    }
                </Select>

            </FormControl>
        </Fragment>
    )
}

export default memo(StateSelect)
