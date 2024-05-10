import { Box, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { Fragment, memo, useCallback } from 'react'
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';


const AddnewTrainings = ({ SetAddtraining }) => {
    const ScheduleTrainings = useCallback(() => {
        SetAddtraining(1)
    }, [SetAddtraining])

    return (
        <Fragment>
            <Paper sx={{ boxShadow: 4, p: 1, backgroundColor: "#FFFFFF" }}>
                <Box sx={{ mt: 1 }}>
                    <Button onClick={ScheduleTrainings} sx={{ color: "white", backgroundColor: "#77037B" }} startDecorator={<Add />}>
                        <Typography color="white">Add New Trainings</Typography>
                    </Button>
                    <Typography sx={{ mt: 1 }}>Create Trainings for employees</Typography>
                </Box>
            </Paper>
        </Fragment>

    )
}

export default memo(AddnewTrainings)
