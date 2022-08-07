import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';

const ListItemHoliday = ({ holidayName, holidayDesc }) => {
    // const avatarStyle = {
    //     width: 20,
    //     height: 20,
    //     fontSize: 14,
    //     fontWeight: 700
    // }
    return (
        <ListItem dense disableGutters disablePadding sx={{ padding: 0, }} >
            <ListItemButton dense sx={{ paddingY: 0, width: '100%' }}>
                <ListItemIcon>
                    <IconButton edge="start" aria-label='comment'  >
                        <DataSaverOffIcon sx={{ fontSize: 15, color: "#1B3440" }} />
                    </IconButton>
                </ListItemIcon>
                <ListItemText primary={holidayName} sx={{ width: '40%' }} />
                <ListItemText primary={holidayDesc} sx={{ width: '40%' }} />
            </ListItemButton>
        </ListItem>
    )
}
export default ListItemHoliday