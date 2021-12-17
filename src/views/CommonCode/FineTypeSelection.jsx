import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useContext, memo, useEffect, Fragment, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const FineTypeSelection = ({ update, style }) => {
    const [fine, setFine] = useState([]);
    const { selectFine, updateFine, finecount } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getFine = async () => {
            const result = await axioslogin.get('/common/getfineded');
            const { data } = await result.data;
            setFine(data)
        }
        getFine()
        return (updateFine(0))
    }, [updateFine, finecount]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    name="selectFine"
                    value={selectFine}
                    onChange={(e) => updateFine(e.target.value)}
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value='0' disabled>Select Fine/Deduction</MenuItem>
                    {
                        fine && fine.map((val, index) => {
                            return <MenuItem key={index} value={val.fine_slno}>{val.fine_desc}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(FineTypeSelection)
