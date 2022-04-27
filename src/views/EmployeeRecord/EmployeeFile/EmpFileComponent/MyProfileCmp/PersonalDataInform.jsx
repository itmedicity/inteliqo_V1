import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { Fragment, memo } from 'react'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { format } from 'date-fns';

const PersonalDataInform = ({ name, sub_name, data }) => {

    const datecurrent = format(new Date(), 'MMMM yyyy')

    return (
        <Fragment>
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#7986cb' }} >
                        <WorkOutlineIcon sx={{ color: 'white' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={name}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {sub_name}

                            </Typography>
                            {data}

                        </Fragment>
                    }

                />

                <ListItemText sx={{ textAlignLast: "right" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="subtitle1"
                                color="text.primary"
                            >
                                {datecurrent}
                            </Typography>
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}

export default memo(PersonalDataInform)