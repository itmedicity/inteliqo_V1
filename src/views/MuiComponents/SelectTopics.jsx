import { FormControl, MenuItem, Select } from '@mui/material'
import { useEffect, React, useState, Fragment, memo } from 'react';
import { axioslogin } from '../Axios/Axios';

const SelectTopics = ({ value, setValue }) => {

    const [view, setView] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/TrainingAfterJoining/selecttopic`)
            const { data, success } = result.data
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
                    <MenuItem disabled value={0}  >
                        Select Topics
                    </MenuItem>

                    {
                        view?.map((val, index) => {
                            return <MenuItem key={index} value={val.topic_slno}>{val.training_topic_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(SelectTopics)
