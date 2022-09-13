import React, { useEffect, useState } from 'react'
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { ListDivider, ListItemContent, ListItemDecorator } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { colorList } from 'src/views/Constant/Constant';
import { setBirthdayAlert } from 'src/redux/actions/Birthday.Action'
import CustomAvatar from './CustomAvatar';
import CakeIcon from '@mui/icons-material/Cake';

const BirthdayList = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBirthdayAlert());
    }, [dispatch])

    const empBirthday = useSelector((state) => {
        return state.getBirthdayList.empBirthdayList
    })

    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 1,
                borderRadius: 'sm',
                Width: '100%',
                height: 250,

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
                Today &apos; s Birthday
            </Typography>
            <Box role="group" aria-labelledby="member" >
                <List
                    aria-labelledby="ellipsis-list-demo"
                    sx={{ '--List-decorator-width': '56px', }}
                >
                    <Box sx={{ height: 410, overflowY: "auto" }} className="ListItemScrol" >
                        {
                            empBirthday && empBirthday.map((val, ind) => {
                                return <Box key={ind}>
                                    <ListItem variant='soft' sx={{ borderRadius: 4, backgroundColor: colorList[ind], }}   >
                                        <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                                            <CustomAvatar id={val.em_id} />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            <Typography>{val.em_name}</Typography>
                                            <Typography level="body2" noWrap sx={{ color: "white" }} >
                                                Happy Birthday!!!
                                                <CakeIcon fontSize='small' />
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

export default BirthdayList