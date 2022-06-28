import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { Fragment, memo } from 'react'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const JobDescriptionEmp = ({ data }) => {
    const { job_desription } = data;
    return (
        <Fragment>
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#7986cb' }} >
                        <AssignmentTurnedInIcon sx={{ color: 'white', fontSize: '18px' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {job_desription}
                            </Typography>
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}

export default memo(JobDescriptionEmp)