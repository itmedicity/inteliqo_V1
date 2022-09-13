import { Avatar, Box, CssVarsProvider, List, ListItem, ListItemDecorator, Typography, ListItemContent } from '@mui/joy'
import React, { memo } from 'react'
import SchoolIcon from '@mui/icons-material/School';

const AcademicDropListCmp = ({ value }) => {
    const { edu_desc, cour_desc, spec_desc, unver_name } = value;
    return (
        <CssVarsProvider>
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }} >
                <List
                    aria-labelledby="ellipsis-list-demo"
                    sx={{ '--List-decorator-size': '56px' }}
                >
                    <ListItem>
                        <ListItemDecorator sx={{ alignSelf: 'flex-start', pr: 0.8 }}>
                            <Avatar color="info">
                                <SchoolIcon color='primary' />
                            </Avatar>
                        </ListItemDecorator>
                        <ListItemContent>
                            <Typography level="body2"  >{edu_desc}</Typography>
                            <Typography level="body2" noWrap sx={{ textTransform: 'capitalize' }} >
                                &nbsp;{`${cour_desc === 'NILL' ? '' : cour_desc.toLowerCase()} ${spec_desc === 'NILL' ? '' : spec_desc.toLowerCase()}`}
                                {unver_name === 'NILL' ? '' : ` — ${unver_name.toLowerCase()}`}
                            </Typography>
                        </ListItemContent>
                    </ListItem>
                </List>
            </Box>
        </CssVarsProvider>
    )
}

export default memo(AcademicDropListCmp)