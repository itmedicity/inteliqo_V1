import { FormControl, MenuItem, Select } from '@mui/material'
import { useEffect, React, useState, Fragment, memo } from 'react';
import { axioslogin } from '../Axios/Axios';

const TraineesBasedonDept = ({ dept, value, setValue }) => {
    const [view, setView] = useState([]);
    useEffect(() => {
        const getData = async (dept) => {
            const result = await axioslogin.get(`/TrainerName/select/${dept}`)
            const { data, success } = result.data
            setView(data);
            if (success === 1) {
                setView(data);
            } else {
                setView([]);
            }
        }
        getData(dept)
    }, [dept])

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
                    multiple
                    sx={{ minWidth: "100%" }}
                >
                    <MenuItem disabled value={0}  >
                        Select Employees
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

export default memo(TraineesBasedonDept)

