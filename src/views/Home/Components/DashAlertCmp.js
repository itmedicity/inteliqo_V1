import { Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ApiIcon from '@mui/icons-material/Api';
import CodeIcon from '@mui/icons-material/Code';
// import CommitIcon from '@mui/icons-material/Commit';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Widjet from '../Components/Widjet';
import DraftsIcon from '@mui/icons-material/Drafts';


const DashAlertCmp = () => {

    const icon1 = <DraftsIcon />;
    const icon2 = <AccessAlarmIcon />;
    const icon3 = <ApiIcon />;
    const icon4 = <CodeIcon />;

    return (
        <Fragment>
            <Card sx={{ marginTop: 1 }} >
                <CardContent>
                    <Grid container spacing={1}  >
                        <Grid item sm={4} md={3} >
                            <Widjet avatarIcons={icon1} widgetName="Leave Request" count={30} />
                        </Grid>
                        <Grid item sm={4} md={3} >
                            <Widjet avatarIcons={icon2} widgetName="Contract Renewal" count={10} />
                        </Grid>
                        <Grid item sm={4} md={3} >
                            <Widjet avatarIcons={icon3} widgetName="Training Confirmation" count={50} />
                        </Grid>
                        <Grid item sm={4} md={3} >
                            <Widjet avatarIcons={icon4} widgetName="Resignation" count={45} />
                        </Grid>
                        <Grid item sm={4} md={3} >
                            <Widjet avatarIcons={icon4} widgetName="Contract Closed" count={45} />
                        </Grid>
                        <Grid item sm={4} md={3} >
                            <Widjet avatarIcons={icon4} widgetName="Overtime Request" count={45} />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default DashAlertCmp