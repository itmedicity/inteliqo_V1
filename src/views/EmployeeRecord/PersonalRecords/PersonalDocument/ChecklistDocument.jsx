import { List, Typography } from '@mui/joy';
import React, { memo } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItem from '@mui/joy/ListItem';
import ReceiptLong from '@mui/icons-material/ReceiptLong';

const ChecklistDocument = () => {
    return (
        <ListItem nested>
            <ListItem component="div" startAction={<ReceiptLong />}>
                <Typography level="body3" sx={{ textTransform: 'uppercase' }}>
                    Documentation
                </Typography>
            </ListItem>
            <List sx={{ '--List-gap': '0px' }}>
                <ListItem>
                    <ListItemButton selected>Checklist For Documents</ListItemButton>
                </ListItem>
            </List>
        </ListItem>
    )
}

export default memo(ChecklistDocument)