import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const GradeSelect = (props) => {
    //useState For Setting Grade
    const [grade, setGrade] = useState([]);
    //context For Grade select
    const { selectGrade, UpdateGrade } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getGradeType = async () => {
            const result = await axioslogin.get('/grade')
            const { success, data } = result.data;
            if (success === 1) {
                setGrade(data)
            }
        }
        getGradeType();
        return (UpdateGrade(0))
    }, [UpdateGrade])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-0"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    style={props.style}
                    name="selectGrade"
                    value={selectGrade}
                    onChange={(e) => UpdateGrade(e.target.value)}
                    variant="outlined"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Grade
                    </MenuItem>
                    {
                        grade && grade.map((val, index) => {
                            return <MenuItem key={index} value={val.grade_slno}>{val.grade_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(GradeSelect)
