import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, memo, useEffect, Fragment, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const WageDescripErnDeductSelect = (props) => {
    const [wage, setWage] = useState([]);
    const { selectWage, updateWage } = useContext(PayrolMasterContext)

    //Get wage Description
    useEffect(() => {
        const getWage = async () => {
            const result = await axioslogin.get('/common/getWageDescription');
            const { data } = await result.data;
            setWage(data)
        }
        getWage()
        return (updateWage(0))
    }, [updateWage])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectwage"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectWage}
                    defaultValue={0}
                    onChange={(e) => updateWage(e.target.value)}
                    style={props.style}
                >
                    <MenuItem value={0} disabled>
                        Select Wage Description
                    </MenuItem>
                    {
                        wage && wage.map((val, index) => {
                            return <MenuItem key={index} value={val.earnded_id}>{val.earnded_name}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(WageDescripErnDeductSelect)
