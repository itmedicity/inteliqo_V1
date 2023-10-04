import React, { memo } from 'react'
import { IconButton } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import _ from 'underscore';
import TrainingTopicsRdx from 'src/views/Component/ReduxComponent/TrainingTopicsRdx';
import TrainerNamesRxd from 'src/views/Component/ReduxComponent/TrainerNamesRxd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import { Fragment } from 'react';

const DepartmentalDateSelectTable = ({ setTopic, setTrainer, setDates, dates }) => {
    const getValue = async (e, val) => {
        let arr = dates.map((item) => item.date === val.date ? { ...item, inValue: e } : item)
        setDates(arr)
    }
    return (
        <Fragment>
            <Paper elevation={0} sx={{
                mt: 1,
                width: "100%", height: 200, overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }}>
                {
                    dates?.map((val, ind) => {
                        <Box key={ind} sx={{ display: "flex", p: 1, flexDirection: "row" }}>
                            <Box sx={{ flex: 1 }}>{val.date}</Box>
                            <Box sx={{ flex: 1 }}><TrainingTopicsRdx getTopic={setTopic} /></Box>
                            <Box sx={{ flex: 1 }}><TrainerNamesRxd getTrainers={setTrainer} /></Box>
                            <Box>
                                <CommonCheckBox
                                    checked={val?.inValue || false}
                                    onChange={(e) => {
                                        getValue(e.target.checked, val)
                                    }}
                                />
                            </Box>
                            <Box sx={{ p: 0.5 }}>
                                <IconButton size="md" onClick={AddRow}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    })

                }
            </Paper>
        </Fragment>
    )
}

export default memo(DepartmentalDateSelectTable)
