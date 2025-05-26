import React, { Suspense, useEffect } from 'react'
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { ListDivider, ListItemContent, ListItemDecorator } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { colorList } from 'src/views/Constant/Constant';
import { setBirthdayAlert } from 'src/redux/actions/Birthday.Action';
import CustomAvatar from './CustomAvatar';
import { CircularProgress } from '@mui/material';

const AnnouncementList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBirthdayAlert());
        // setflag(true)
    }, [dispatch])
    /** get announcement list from redux */
    const Announcementlist = useSelector((state) => {
        return state.getAnnouncementList.AnnouncementList
    })

    /**get birthday employee details*/
    const empBirthday = useSelector((state) => {
        return state.getBirthdayList.empBirthdayList
    })
    const list = [...Announcementlist, ...empBirthday]
    const msg = "Happy Birthday!!"

    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 1,
                borderRadius: 'sm',
                Width: '100%',
                height: 470,

            }}
        >
            <Typography
                id="member"
                sx={{
                    textTransform: 'uppercase',
                    fontSize: 'xs2',
                    letterSpacing: 'lg',
                    fontWeight: 'lg',
                    color: 'text.secondary',
                    mb: 2,
                }}
            >
                Today &apos; s Announcement
            </Typography>
            <Box role="group" aria-labelledby="member" >
                <List
                    aria-labelledby="ellipsis-list-demo"
                    sx={{ '--List-decorator-width': '56px', }}
                >
                    <Box sx={{ height: 410, overflowY: "auto", '::-webkit-scrollbar': { display: "none" } }} className="ListItemScrol" >
                        {
                            list && list.map((val, ind) => {

                                const Announcementheading = val.Announcementheading && val.Announcementheading.toLowerCase();
                                const empName = val.em_name && val.em_name.toLowerCase();
                                const sectname = val?.sect_name?.toLowerCase()

                                return <Box key={ind}>
                                    <ListItem variant='soft' sx={{ borderRadius: 4, backgroundColor: colorList[ind], }}   >
                                        <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                                            <Suspense fallback={<CircularProgress />} >
                                                <CustomAvatar id={val.em_id} />
                                            </Suspense>
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <Typography sx={{ textTransform: 'capitalize', mt: 1, ml: 0.5, }}>
                                                {val.showStatus === 1 ? `${empName} (${sectname})` : Announcementheading}
                                            </Typography>
                                            <Typography level="body2"

                                                sx={{
                                                    mt: 1,
                                                    color: 'white',
                                                    display: 'inline-block',
                                                    // whiteSpace: 'nowrap',
                                                    overflow: 'none',
                                                    width: '100%', // Set this to the desired width
                                                    animation: 'marquee 20s linear infinite',
                                                }} >
                                                {val.showStatus === 1 ? msg : val.Announcement}
                                                <style>
                                                    {`
                                                        @keyframes marquee {
                                                        0% { transform: translateX(100%); }
                                                        100% { transform: translateX(-100%); }
                                                        }
                                                    `}
                                                </style>
                                            </Typography>
                                        </ListItemContent>
                                    </ListItem>
                                    <ListDivider inset="gutter" />
                                </Box>
                            })
                        }
                    </Box>
                </List>
            </Box>
        </Sheet>
    )
}

export default AnnouncementList