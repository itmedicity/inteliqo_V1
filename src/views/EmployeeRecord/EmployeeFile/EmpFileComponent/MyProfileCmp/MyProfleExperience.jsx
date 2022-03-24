import { Avatar, Card, CardContent, CardHeader, IconButton, List } from '@mui/material'
import React, { Fragment, memo } from 'react'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PushPinIcon from '@mui/icons-material/PushPin';
import ProfessionalExp from './ProfessionalExp';


const MyProfleExperience = () => {
    return (
        <Fragment>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }} className="mt-1" >
                <CardHeader
                    title="Professional Experience"
                    titleTypographyProps={{
                        variant: 'button',
                    }}
                    avatar={
                        <Avatar sx={{ bgcolor: '#49599a' }} aria-label="recipe">
                            <PersonPinIcon />
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
                        <ProfessionalExp />
                        <ProfessionalExp />
                    </List>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default memo(MyProfleExperience)