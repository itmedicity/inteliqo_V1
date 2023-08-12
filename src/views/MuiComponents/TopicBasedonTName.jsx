import { FormControl, MenuItem, Select } from '@mui/material'
import { useEffect, React, useState, Fragment, memo } from 'react';
import { axioslogin } from '../Axios/Axios';

const TopicBasedonTName = ({ trainingname, value, setValue }) => {

    const [view, setView] = useState([]);
    useEffect(() => {
        const getData = async (trainingname) => {
            const result = await axioslogin.get(`/DepartmentalTrainingSchedule/select/${trainingname}`)
            const { data, success } = result.data
            setView(data);
            if (success === 1) {
                setView(data);
            } else {
                setView([]);
            }
        }
        getData(trainingname)

    }, [trainingname])
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

export default memo(TopicBasedonTName)
