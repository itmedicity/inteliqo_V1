import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, memo, useEffect, Fragment, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EducationSelection = (props) => {
    const [edu, setEdu] = useState([]);
    const { selectEducation, updateEducation } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getEdu = async () => {
            const result = await axioslogin.get('/common/getEducation');
            const { data } = await result.data;
            setEdu(data)
        }
        getEdu()
        return (
            updateEducation(0)
        )
    }, [updateEducation]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selecteducation"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectEducation}
                    onChange={(e) => updateEducation(e.target.value)}
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Select Education
                    </MenuItem>
                    {
                        edu && edu.map((val, index) => {
                            return <MenuItem key={index} value={val.edu_slno}>{val.edu_desc}
                            </MenuItem>
                        })

                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EducationSelection)
