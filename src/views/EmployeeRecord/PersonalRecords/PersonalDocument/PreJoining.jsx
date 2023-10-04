import { List, Typography } from '@mui/joy';
import React, { memo, useState } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';

const PreJoining = ({}) => {
  const [open, setOpen] = useState(false);

  const main = [
    { id: 2, name: 'Application For Employment' },
    { id: 3, name: 'Bio Data' },
    { id: 4, name: 'Interview Assessment Sheet' },
    { id: 5, name: 'Offer Letter' },
    { id: 6, name: 'Pre Employment Health Check Up Form' },
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
          onClick={() => setOpen(!open)}
        >
          <KeyboardArrowDown
            sx={{ transform: open ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
          />
        </IconButton>
      }
    >
      <ListItem>
        <Typography
          level="inherit"
          sx={{
            fontWeight: open ? 'bold' : undefined,
            color: open ? 'text.primary' : 'inherit',
          }}
        >
          Pre-Joining
        </Typography>
      </ListItem>
      {open && (
        <List sx={{ '--List-item-paddingY': '8px' }}>
                  {main.map((item, index) => (
            <ListItem key={item.id}>
              <ListItemButton>{`${item.id}. ${item.name}`}</ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </ListItem>
  );
};

export default memo(PreJoining)
