import React, { Fragment, useEffect } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { setHODInchargeNameList } from 'src/redux/actions/HodIncharge.Action';

const HODInchargeNameSelect = ({ value, setValue, style, label }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setHODInchargeNameList());
    }, [dispatch])

    /** get names list from redux */
    const names = useSelector((state) => {
        return state.getHODInchargeNameList.nameList || 0
    })

    /** get selected names from select list */
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Fragment>
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={handleChange}
                    // size="small"
                    fullWidth
                    displayEmpty
                    variant='outlined'
                    //sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                    style={style}
                // sx={{
                //     height: 26,
                //     lineHeight: 1,
                //     ...style,
                //     "&.MuiOutlinedInput-root": {
                //         // height: '1px',
                //     },
                // }}
                >
                    <MenuItem value='0' disabled>
                        {label}
                    </MenuItem>
                    {
                        names && names.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default HODInchargeNameSelect

