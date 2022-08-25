import React, { Fragment, memo, Suspense } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import newYear from '../../../assets/images/newYear.jpg'
import { useSelector } from 'react-redux';
import { CircularProgress, Paper } from '@mui/material';
//import AnnouncementList from './AnnouncementList';
import { CssVarsProvider } from '@mui/joy';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
//import BirthdayList from './BirthdayList';

const Birthlist = React.lazy(() => import('./BirthdayList'))
const AnnList = React.lazy(() => import('./AnnouncementList'))


const Announcement = () => {
    // const [announcement, setannouncement] = useState([])
    const Announcementlist = useSelector((state) => {
        return state.getAnnouncementList.AnnouncementList
    })

    // useEffect(() => {
    //     if (Object.keys(Announcementlist).length > 0) {
    //         setannouncement(Announcementlist)
    //     }
    // }, [])

    const annouStyle = {
        Width: '100%',
        height: 320,
        bgcolor: 'background.paper',
        overflow: "hidden",
        marginTop: 0,
        overflowY: "auto",

    }
    return (
        <Fragment>
            <Paper square elevation={3} sx={{ width: '100%', height: { xl: 795, lg: 600, md: 500, sm: 500 } }} >
                <Card sx={{ width: '100%', height: "100%", borderRadius: 0 }} >
                    <CssVarsProvider>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', px: 1, pt: 1 }}>
                            <Chip
                                variant="outlined"
                                color="success"
                                size="lg"
                                sx={{ width: '100%', "--Chip-radius": "10px", color: "#808066" }}
                                startDecorator={<CampaignOutlinedIcon sx={{ fontSize: 25, color: "black" }} variant="plain" />}
                            // endDecorator={<CheckIcon fontSize="md" />}
                            >
                                Announcement
                            </Chip>
                        </Box>
                    </CssVarsProvider>
                    <CardMedia
                        component="img"
                        image={newYear}
                        alt="Paella dish"
                        // className='img-fluid rounded'
                        sx={{
                            height: '30%', width: '100%', objectFit: "cover", borderRadius: 3, p: 1,
                        }}
                    />
                    <CardContent sx={{ width: "100%", p: 1 }} >
                        {/* <AnnouncementList /> */}
                        {/* <Suspense fallback={<CircularProgress />} >
                            <Birthlist />
                        </Suspense> */}

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