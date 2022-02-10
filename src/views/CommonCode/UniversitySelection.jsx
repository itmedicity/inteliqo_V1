import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

export const UniversitySelection = (props) => {

    const [university, setUniversity] = useState([]);
    // const [disable, setDisable] = useState(false)
    const { selectUniversity, updateUniversity, selectEducation } = useContext(PayrolMasterContext);

    useEffect(() => {
        const getUniversity = async () => {
            const result = await axioslogin.get('/common/getUniver');
            const { data } = await result.data;
            setUniversity(data)
        }
        getUniversity()
        return (
            updateUniversity(0)
        )

    }, [updateUniversity, selectEducation]);

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectUniversity"
                    fullWidth
                    variant="outlined"
                    disabled={props.disable}
                    className="ml-1"
                    value={selectUniversity}
                    onChange={(e) => updateUniversity(e.target.value)}
                    defaultValue={0}
                    style={props.style}

                >
                    <MenuItem value='0' disabled>
                        Select University
                    </MenuItem>
                    {
                        university && university.map((val, index) => {
                            return <MenuItem key={index} value={val.unver_slno}>{val.unver_name}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}
