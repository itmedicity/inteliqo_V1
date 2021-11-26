import React, { Fragment } from 'react'
import { CardContent, CardMedia } from '@material-ui/core'
import { Card, Button, CardActionArea, CardActions, Stack } from '@mui/material'
import Typography from '@mui/material/Typography';
import ProfilePic from '../../../assets/images/abhi.JPG'
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router';

const EmployeeProfileCard = () => {
    const history = useHistory()
    const toEmplyeeFile = () => {
        history.push('/Home/EmployeeFile')
    }
    return (
        <Fragment>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea >
                    <CardMedia>
                        <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ paddingTop: 4, backgroundColor: "#2f5c89", paddingBottom: 4 }} >
                            <Avatar
                                alt="Remy Sharp"
                                src={ProfilePic}
                                sx={{ width: 150, height: 150, opacity: 10, border: 2, borderColor: "white" }}
                            />
                        </Stack>
                    </CardMedia>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Abhijith A
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            Manager - Information Technology
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={toEmplyeeFile} >
                        Home
                    </Button>
                </CardActions>
            </Card>
        </Fragment>
    )
}

export default EmployeeProfileCard
