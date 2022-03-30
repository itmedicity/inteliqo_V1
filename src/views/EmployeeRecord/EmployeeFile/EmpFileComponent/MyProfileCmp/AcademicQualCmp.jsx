import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from '@mui/material'
import React, { Fragment, memo } from 'react'
import SchoolIcon from '@mui/icons-material/School';

const AcademicQualCmp = ({ data }) => {
    console.log(data)
    const { edu_desc, cour_desc, spec_desc, unver_name } = data;
    return (
        <Fragment>
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#7986cb' }} >
                        <SchoolIcon sx={{ color: 'white' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={edu_desc}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {`${cour_desc === 'NILL' ? '' : cour_desc} ${spec_desc === 'NILL' ? '' : spec_desc}`}
                            </Typography>

                            <Typography variant="caption" >
                                {unver_name === 'NILL' ? '' : ` — ${unver_name}`}
                            </Typography>
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

                            </Typography>
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}

export default memo(AcademicQualCmp)