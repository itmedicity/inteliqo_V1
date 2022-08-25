import React, { Fragment, memo, useEffect } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { setGradeList } from 'src/redux/actions/Grade.Action';

const GradeSelect = ({ value, setValue, style, label }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setGradeList());
    }, [dispatch])

    /** get Garde list from redux */
    const grade = useSelector((state) => {
        return state.getGradeList.gradeList || 0
    })

    /** get selected grade from select list */
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
                        grade && grade.map((val, index) => {
                            return <MenuItem key={index} value={val.grade_slno}>{val.grade_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default memo(GradeSelect)