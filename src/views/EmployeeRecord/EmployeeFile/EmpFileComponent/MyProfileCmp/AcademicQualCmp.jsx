import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import SchoolIcon from '@mui/icons-material/School';

const AcademicQualCmp = () => {
    return (
        <Fragment>
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#7986cb' }} >
                        <SchoolIcon sx={{ color: 'white' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="MBA"
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                Human Resource Management
                            </Typography>
                            {"— Kerala Univercity"}
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
                                2019
                            </Typography>
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}

export default AcademicQualCmp