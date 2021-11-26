import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, memo, useEffect, Fragment, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const CourseSelectionMast = () => {
    const [course, setCourse] = useState([]);
    const { selectCourse, updateCourse } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getCourse = async () => {
            const result = await axioslogin.get('/common/getCourse');
            const { data } = await result.data;
            setCourse(data)
        }
        getCourse()
        return (
            updateCourse(0)
        )
    }, [updateCourse]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectcourse"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectCourse}
                    onChange={(e) => updateCourse(e.target.value)}
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Course
                    </MenuItem>
                    {
                        course && course.map((val, index) => {
                            return <MenuItem key={index} value={val.cour_slno}>{val.cour_desc}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(CourseSelectionMast)
