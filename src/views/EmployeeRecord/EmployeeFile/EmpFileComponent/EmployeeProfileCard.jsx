import { PhotoCamera } from '@material-ui/icons'
import { Card, CardActionArea, CardMedia, Stack, Avatar, Typography, CardContent, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Constant'
import ProfilePic from '../../../../assets/images/default.png'

const EmployeeProfileCard = () => {
    const { id, no } = useParams()

    // console.log(PUBLIC_NAS_FOLDER + no)

    try {
        var imageUrl = `${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`
    } catch (err) {
        console.log(err)
    }

    return (
        <Fragment>
            <Card sx={{ maxWidth: 280, borderRadius: 8, boxShadow: 10 }}>
                <CardActionArea>
                    <CardMedia>
                        <Stack
                            direction="row"
                            spacing={3}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ paddingTop: 4, paddingBottom: 4 }} >
                            <Avatar
                                alt="Remy Sharp"
                                // src={ProfilePic}
                                src={`${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`}
                                sx={{ width: 150, height: 150, opacity: 10, border: 2, borderColor: "white" }}
                            />
                        </Stack>

                    </CardMedia>
                    <CardContent className="d-flex flex-column justify-content-center  align-items-center" >
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
            </Card>
        </Fragment>
    )
}

export default EmployeeProfileCard
