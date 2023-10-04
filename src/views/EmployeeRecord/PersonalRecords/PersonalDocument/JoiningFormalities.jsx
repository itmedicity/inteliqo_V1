import { List, Typography } from '@mui/joy';
import React, { memo, useState } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';


const JoiningFormalities = () => {
    const [open2, setOpen2] = useState(false);
    const main = [
        { id: 7, name: 'Personnel Data Form' },
        { id: 8, name: 'Self Attested Copies Of Academic Certificates' },
        { id: 9, name: 'Self Attested Copy Of Registration Certificates' },
        { id: 10, name: 'Self Attested Copies Of Experience Certificates' },
        { id: 11, name: 'Self Attested Copy Of Photo ID Proof' },
        { id: 12, name: 'Antecedent Verification Form' },
        { id: 13, name: 'Credential Verification Form' },
        { id: 14, name: 'Credentialing And  Privileging Form' },
        { id: 15, name: 'Job Description And Job Specification' },
        { id: 16, name: 'Appoinment Letter' },
        { id: 17, name: 'Joining Letter' },
        { id: 18, name: 'Competency Assessment' },
        { id: 19, name: 'Statutory Records' },
        { id: 20, name: 'Induction Records' },
        { id: 21, name: 'Department Orientation Checklists' },
        { id: 22, name: 'Employee Rights and Responsibilities' },
        { id: 23, name: 'Vaccination Card' },
        { id: 24, name: 'Review of Probation Period' },
        { id: 25, name: 'Confirmation Letter' },

    
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
            onClick={() => setOpen2((bool) => !bool)}
        >
            <KeyboardArrowDown
                sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
            />
        </IconButton>
    }
>
    <ListItem>
        <Typography
            level="inherit"
            sx={{
                fontWeight: open2 ? 'bold' : undefined,
                color: open2 ? 'text.primary' : 'inherit',
            }}
        >
            Joining Formalities
        </Typography>
    </ListItem>
          {open2 && (
               <List sx={{ '--List-item-paddingY': '8px' }}>
               {main.map((item, index) => (
         <ListItem key={item.id}>
           <ListItemButton>{`${item.id}. ${item.name}`}</ListItemButton>
         </ListItem>
       ))}
     </List>
    )}
</ListItem>
  )
}

export default memo(JoiningFormalities)