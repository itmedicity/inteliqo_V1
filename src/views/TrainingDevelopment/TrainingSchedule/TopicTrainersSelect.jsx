import React, { Fragment, memo, useState } from 'react'
import { CssVarsProvider, IconButton } from '@mui/joy';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import SelectTrainer from 'src/views/MuiComponents/SelectTrainer';
import CheckIcon from '@mui/icons-material/Check';
import { useCallback } from 'react';

const TopicTrainersSelect = ({ val }) => {
    const [topic, setTopic] = useState(0);
    const [trainer, setTrainer] = useState([]);
    const { date } = val;


    const HandleCheck = useCallback(() => {


    }, [])
    return (
        <Fragment>
            <td>{date}</td>
            <td>
                <SelectTopics setTopic={setTopic} />

            </td>

            <td>
                <SelectTrainer setTrainer={setTrainer} />

            </td>
            <td>
                <CssVarsProvider>
                    <IconButton
                        variant="outlined"
                        size='sm'
                        color='primary'
                        onClick={() => HandleCheck()}
                        sx={{ color: '#347aeb' }}
                    >
                        <CheckIcon />
                    </IconButton>
                </CssVarsProvider>

            </td>
        </Fragment>

    )
}

export default memo(TopicTrainersSelect)
