import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { Fragment, memo } from 'react'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const ProfessionalExp = () => {
    return (
        <Fragment>
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#7986cb' }} >
                        <WorkOutlineIcon sx={{ color: 'white' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="System Administrator"
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                NetBios Technologies PVT Ltd
                            </Typography>
                            {"— Kochi"}
                        </Fragment>
                    }
                // secondaryTypographyProps={{ variant: "body1" }}
                />
                {/* <ListSubheader>2019</ListSubheader> */}
                <ListItemText sx={{ textAlignLast: "right" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="subtitle1"
                                color="text.primary"
                            >
                                2009
                            </Typography>
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}

export default memo(ProfessionalExp)