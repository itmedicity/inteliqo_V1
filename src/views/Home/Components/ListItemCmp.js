import { Avatar, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import DonutSmallIcon from '@mui/icons-material/DonutSmall';

const ListItemCmp = ({ holidayName, allowed, credited, balance }) => {
    const avatarStyle = {
        width: 20,
        height: 20,
        fontSize: 14,
        fontWeight: 700
    }
    return (
        <ListItem dense disableGutters disablePadding sx={{ padding: 0 }} >
            <ListItemButton dense sx={{ paddingY: 0 }}>
                <ListItemIcon>
                    <IconButton edge="start" aria-label='comment'  >
                        <DonutSmallIcon sx={{ fontSize: 15, color: "#1B3440" }} />
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={holidayName} />
                <ListItemIcon>
                    <Avatar sx={{ ...avatarStyle, bgcolor: "#F2845C", color: '#6A1B00' }}>{allowed}</Avatar>
                </ListItemIcon>
                <ListItemIcon>
                    <Avatar sx={{ ...avatarStyle, bgcolor: "#F2845C", color: '#6A1B00' }}>{credited}</Avatar>
                </ListItemIcon>
                <ListItemIcon>
                    <Avatar sx={{ ...avatarStyle, bgcolor: "#F2845C", color: '#6A1B00' }}>{balance}</Avatar>
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}

export default ListItemCmp