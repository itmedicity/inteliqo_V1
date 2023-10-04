import { List, Typography } from '@mui/joy';
import React, { memo, useState } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';

const AnnualMandatory = () => {
  const [open3, setOpen3] = useState(false);
  const main = [
    { id: 26, name: 'Training Record' },
    { id: 27, name: 'BLS/ACLS/PALS/NALS/Training' },
    { id: 28, name: 'Performance Appraisal Forms' },
    { id: 29, name: 'Annual Health Check-Up Form' },

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
          onClick={() => setOpen3((bool) => !bool)}
        >
          <KeyboardArrowDown
            sx={{ transform: open3 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
          />
        </IconButton>
      }
    >
      <ListItem>
        <Typography
          level="inherit"
          sx={{
            fontWeight: open3 ? 'bold' : undefined,
            color: open3 ? 'text.primary' : 'inherit',
          }}
        >
          Annual Mandatory Events
        </Typography>
      </ListItem>
      {open3 && (
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

export default memo(AnnualMandatory) 