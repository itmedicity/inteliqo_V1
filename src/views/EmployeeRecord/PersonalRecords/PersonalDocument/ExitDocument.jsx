import { List, Typography } from '@mui/joy';
import React, { memo, useState } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';

const ExitDocument = () => {
    const [open5, setOpen5] = useState(false);
    const main = [
        { id: 33, name: 'Dues Clearance Certificate' },
        { id: 34, name: 'Exit Questionnaire' },


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
                    onClick={() => setOpen5((bool) => !bool)}
                >
                    <KeyboardArrowDown
                        sx={{ transform: open5 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                    />
                </IconButton>
            }
        >
            <ListItem>
                <Typography
                    level="inherit"
                    sx={{
                        fontWeight: open5 ? 'bold' : undefined,
                        color: open5 ? 'text.primary' : 'inherit',
                    }}
                >
                    Exit Documents
                </Typography>
                {/* <Typography component="span" level="body3" sx={{ ml: 1 }}>
                        2
                    </Typography> */}
            </ListItem>
            {open5 && (
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

export default memo(ExitDocument)