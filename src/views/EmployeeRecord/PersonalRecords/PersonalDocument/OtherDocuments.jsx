import { List, Typography } from '@mui/joy';
import React, { memo, useState } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';
const OtherDocuments = () => {
    const [open4, setOpen4] = useState(false);
    const main = [
        { id: 30, name:'Any Disciplinary Record' },
        { id: 31, name:'Any Grievance Record' },
        { id: 32, name:'Any Other Record' }, 
      ];
  return (
    <ListItem
    nested
    sx={{ my: 1 }}
    startAction={
        <IconButton
            variant="plain"
            size="sm"
            color="neutral"
            onClick={() => setOpen4((bool) => !bool)}
        >
            <KeyboardArrowDown
                sx={{ transform: open4 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
            />
        </IconButton>
    }
>
    <ListItem>
        <Typography
            level="inherit"
            sx={{
                fontWeight: open4 ? 'bold' : undefined,
                color: open4 ? 'text.primary' : 'inherit',
            }}
        >
            Other  Documents
        </Typography>
  
    </ListItem>
    {open4 && (
       <List sx={{ '--List-item-paddingY': '8px' }}>
       {main.map((item, index) => (
       <ListItem key={item.id}>
        <ListItemButton>{`${item.id}.${item.name}`}</ListItemButton>
       </ListItem>
          ))}
       </List>
       )}
</ListItem>
  )
}

export default memo(OtherDocuments)