import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const GradeeSelect = () => {
    // intializing use state
    const [GradeData, setGrade] = useState([]);

    // // useContext
    const { getgrade, udateGrade } = useContext(PayrolMasterContext)

    // useeffect 
    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/grade')
            const { success, data } = result.data;
            if (success === 1) {
                setGrade(data)
            }
        }
        getemptypedata()
        return (
            udateGrade(0)
        )


    }, [udateGrade]);



    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectedGradetype"
                    value={getgrade}
                    onChange={(e) => udateGrade(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Grade
                    </MenuItem>
                    {
                        GradeData && GradeData.map((val, index) => {
                            return <MenuItem key={index} value={val.grade_slno}>{val.grade_desc}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default GradeeSelect
