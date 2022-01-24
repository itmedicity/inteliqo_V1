import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const SpecializationSelection = (props) => {
    const [spec, setSpec] = useState([]);
    const { selectSpec, updateSpec, selectCourse } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getSpec = async () => {
            const result = await axioslogin.get(`/common/getSpec/${selectCourse}`);
            const { data } = await result.data;
            setSpec(data)
        }
        getSpec()
        return (
            updateSpec(0)
        )

    }, [updateSpec, selectCourse]);

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
                    name="selectspec"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectSpec}
                    onChange={(e) => updateSpec(e.target.value)}
                    defaultValue={0}
                    style={props.style}
                    disabled={props.disable}
                >
                    <MenuItem value='0' disabled>
                        Select Secialization
                    </MenuItem>
                    {
                        spec && spec.map((val, index) => {
                            return <MenuItem key={index} value={val.spec_slno}>{val.spec_desc}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(SpecializationSelection)
