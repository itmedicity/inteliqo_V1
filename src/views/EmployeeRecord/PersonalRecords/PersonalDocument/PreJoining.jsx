import { Box, List, Typography } from '@mui/joy';
import React, { memo, useCallback, useState } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const PreJoining = ({ selectedRowData, setFiles, setflag }) => {
  const [open, setOpen] = useState(false);

  const main = [
    { id: 1, name: 'Application For Employment' },
    { id: 2, name: 'Bio Data' },
    { id: 3, name: 'Interview Assessment Sheet' },
    { id: 4, name: 'Offer Letter' },
    { id: 5, name: 'Pre Employment Health Check Up Form' },
  ];
  const handleToggleExpand = useCallback(async (e, item) => {
    setflag(3)
    if (selectedRowData?.em_id > 0) {
      const postData = {
        checklistid: item?.id,
        em_id: selectedRowData?.em_id
      }
      const response = await axioslogin.post('/upload/files', postData)
      const { success, data } = response.data
      if (success === 1) {
        const data = response.data;
        const fileNames = data.data
        // Construct URLs for each file using the file names
        const fileUrls = fileNames.map((fileName) => {
          return `http://192.168.22.5/NAS/PersonalRecords/${selectedRowData?.em_id}/checklist/${item?.id}/${fileName}`;
        });

        fileUrls.forEach((fileUrl) => {
          setFiles(fileUrls)
        });
      } else {
        warningNofity("no data uploded")
      }
    } else {
      warningNofity("no Employee Found")
    }
  }, [setflag, selectedRowData]);
  return (
    <ListItem
      nested
      sx={{ my: 1 }}
      startAction={
        <Box
          variant="plain"
          size="sm"
          color="neutral"
          onClick={() => setOpen(!open)}
        >
          <KeyboardArrowDown
            sx={{ transform: open ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
          />
        </Box>
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
          {main?.map((item, index) => (
            <ListItem key={item.id}>
              <ListItemButton onClick={(e) => handleToggleExpand(e, item)}>
                {`${item.id}. ${item.name}`}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </ListItem>
  );
};

export default memo(PreJoining)