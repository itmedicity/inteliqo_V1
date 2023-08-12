import { FormControl, MenuItem, Select } from '@mui/material'
import { useEffect, React, useState, Fragment, memo } from 'react';
import { axioslogin } from '../Axios/Axios';

const EmpBasedonDept = ({ depttype, value, setValue }) => {

    const [view, setView] = useState([]);
    useEffect(() => {
        const getData = async (depttype) => {
            const result = await axioslogin.get(`/TrainerName/select/${depttype}`)
            const { data, success } = result.data
            setView(data);
            if (success === 1) {
                setView(data);
            } else {
                setView([]);
            }
        }
        getData(depttype)

    }, [depttype])
    return (
        <Fragment>
            <FormControl
                fullWidth
                size='small'
            >
                <Select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                >
                    <MenuItem disabled value={0}  >
                        Select Trainer Name
                    </MenuItem>

                    {
                        view?.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EmpBasedonDept)
