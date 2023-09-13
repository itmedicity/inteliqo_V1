import { Avatar, Box, CssVarsProvider, List, ListItem, ListItemDecorator, Typography, ListItemContent } from '@mui/joy'
import React, { memo } from 'react'
import WorkIcon from '@mui/icons-material/Work';

const ExperiDropListCmp = ({ value }) => {
    const { em_institution, desg_name, em_total_year } = value;
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
                                <WorkIcon color='primary' />
                            </Avatar>
                        </ListItemDecorator>
                        <ListItemContent>
                            <Typography level="body2" sx={{ textTransform: 'capitalize' }} >{desg_name?.toLowerCase()}</Typography>
                            <Typography level="body2" noWrap sx={{ textTransform: 'capitalize' }} >
                                &nbsp;{em_institution?.toLowerCase()}{` — ${em_total_year}`} < Typography level="body4" > Year</Typography>
                            </Typography>
                        </ListItemContent>
                    </ListItem>
                </List>
            </Box>
        </CssVarsProvider >
    )
}

export default memo(ExperiDropListCmp)