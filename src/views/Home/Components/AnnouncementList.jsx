import React, { Suspense, useEffect, useState } from 'react'
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
    const [flag, setflag] = useState(false)

    useEffect(() => {
        dispatch(setBirthdayAlert());
        setflag(true)
    }, [dispatch])
    /** get announcement list from redux */
    const Announcementlist = useSelector((state) => {
        return state.getAnnouncementList.AnnouncementList
    })

    /**get birthday employee details*/
    const empBirthday = useSelector((state) => {
        return state.getBirthdayList.empBirthdayList
    })

    //Announcementlist.push(...empBirthday)
    const list = [...Announcementlist, ...empBirthday]
    // const [List, setList] = useState(Announcementlist)
    // useEffect(() => {
    //     if (empBirthday.length !== 0) {
    //         setList([...List, ...empBirthday])
    //     }
    // }, [empBirthday])
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
                    <Box sx={{ height: 410, overflowY: "auto" }} className="ListItemScrol" >
                        {
                            list && list.map((val, ind) => {

                                const Announcementheading = val.Announcementheading && val.Announcementheading.toLowerCase();
                                const empName = val.em_name && val.em_name.toLowerCase();

                                return <Box key={ind}>
                                    <ListItem variant='soft' sx={{ borderRadius: 4, backgroundColor: colorList[ind], }}   >
                                        <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                                            {/* <Avatar src={image1} /> */}

                                            <Suspense fallback={<CircularProgress />} >
                                                <CustomAvatar id={val.em_id} />
                                            </Suspense>

                                            {/* <CustomAvatar id={val.em_id} src={image1} /> */}
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <Typography sx={{ textTransform: 'capitalize' }} >{Announcementheading || empName}</Typography>
                                            <Typography level="body2" noWrap sx={{ color: "white" }} >
                                                {val.Announcement || msg}
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