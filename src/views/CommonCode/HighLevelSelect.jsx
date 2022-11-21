import React, { Fragment, memo, useEffect } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { setHighLevelData } from 'src/redux/actions/HighLevel.Action';

const HighLevelSelect = ({ value, setValue, style, label }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setHighLevelData());
    }, [dispatch])

    /** get data list from redux */
    const HighLevel = useSelector((state) => {
        return state.getHighLevelData.HighLevelData || 0
    })

    /** get selected data from select list */
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
                        HighLevel && HighLevel.map((val, index) => {
                            return <MenuItem key={index} value={val.highlevel_slno}>{val.highlevel_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default memo(HighLevelSelect)

