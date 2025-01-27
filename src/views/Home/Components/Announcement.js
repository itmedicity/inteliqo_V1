import React, { Fragment, memo, Suspense } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CircularProgress, Paper } from '@mui/material';
import { CssVarsProvider } from '@mui/joy';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'

const AnnList = React.lazy(() => import('./AnnouncementList'))

const Announcement = () => {

    return (
        <Fragment>
            <Paper square elevation={3} sx={{ width: '100%', height: { xl: 795, lg: 660, md: 500, sm: 500 } }} >
                <Card sx={{ width: '100%', height: "100%", borderRadius: 0 }} >
                    <CssVarsProvider>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', px: 1, pt: 1 }}>
                            <Chip
                                variant="outlined"
                                color="success"
                                size="lg"
                                sx={{ width: '100%', "--Chip-radius": "10px", color: "#808066" }}
                                startDecorator={<CampaignOutlinedIcon sx={{ fontSize: 25, color: "black" }} variant="plain" />}
                            >
                                Announcement
                            </Chip>
                        </Box>
                    </CssVarsProvider>
                    <CardMedia
                        component="img"
                        // fileURL={`${PUBLIC_NAS_FOLDER}/ResignationReq/${attachment}`}
                        image={`${PUBLIC_NAS_FOLDER}/Logo/image.jpg`}
                        alt="Paella dish"
                        // className='img-fluid rounded'
                        sx={{
                            height: '30%', width: '100%', objectFit: "cover", borderRadius: 3, p: 1,
                        }}
                    />
                    <CardContent sx={{ width: "100%", p: 1 }} >
                        <Suspense fallback={<CircularProgress />} >
                            <AnnList />
                        </Suspense>

                    </CardContent>
                </Card>
            </Paper>
        </Fragment>
    )
}

export default memo(Announcement) 