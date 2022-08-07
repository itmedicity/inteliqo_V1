import React from 'react'
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { ListDivider, ListItemContent, ListItemDecorator } from '@mui/joy';
import image1 from '../../../assets/images/avatars/1.jpg';
import { useSelector } from 'react-redux';
import { colorList } from 'src/views/Constant/Constant';
const AnnouncementList = () => {

    const Announcementlist = useSelector((state) => {
        return state.getAnnouncementList.AnnouncementList
    })

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
                            Announcementlist && Announcementlist.map((val, ind) => {
                                return <Box key={ind}>
                                    <ListItem variant='soft' sx={{ borderRadius: 4, backgroundColor: colorList[ind], }}   >
                                        <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                                            <Avatar src={image1} />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <Typography>Brunch this weekend?</Typography>
                                            <Typography level="body2" noWrap sx={{ color: "white" }} >
                                                {val.Announcement}
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