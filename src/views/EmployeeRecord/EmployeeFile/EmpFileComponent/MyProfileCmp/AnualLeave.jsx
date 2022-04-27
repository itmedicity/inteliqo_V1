import { Avatar, Card, CardContent, CardHeader, IconButton, List } from '@mui/material'
import React, { Fragment, memo } from 'react'
import PushPinIcon from '@mui/icons-material/PushPin';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LeaveCalender from 'src/views/LeaveManagement/LeaveRequest/LeaveCalender'

const AnualLeave = () => {
    return (
        <Fragment>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }} className="mt-1" >
                <CardHeader
                    title="Annual Leave Information"
                    titleTypographyProps={{
                        variant: 'button',
                    }}
                    avatar={
                        <Avatar sx={{ bgcolor: '#49599a' }} aria-label="recipe">
                            <ExitToAppIcon />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" >
                            <PushPinIcon color="warning" />
                        </IconButton>
                    }
                    className="pb-0"
                />
                <CardContent className='pt-0' >
                    <List className='p-0' >
                        <LeaveCalender em_id={1} />
                    </List>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default memo(AnualLeave)