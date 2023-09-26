import { FormControl, MenuItem, Select } from '@mui/material'
import { useEffect, React, useState, Fragment, memo } from 'react';
import { axioslogin } from '../Axios/Axios';

const SelectTrainer = ({ value, setValue }) => {

    const [view, setView] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/TrainingAfterJoining/SelectTrainer`)
            const { data, success } = result.data
            setView(data);
            if (success === 2) {
                setView(data);
            } else {
                setView([]);
            }
        }
        getData()

    }, [])
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
                >
                    <MenuItem disabled value={value.length === 0} >
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

export default memo(SelectTrainer)
