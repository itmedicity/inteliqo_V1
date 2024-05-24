import { Box, List, Typography } from '@mui/joy';
import React, { memo, useState, useCallback } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';


const AnnualMandatory = ({ selectedRowData, setFiles, setShowGeneral, Setitem, setid }) => {
  const [open3, setOpen3] = useState(false);
  const main = [
    { id: 25, name: 'Training Record' },
    { id: 26, name: 'BLS/ACLS/PALS/NALS/Training' },
    { id: 27, name: 'Performance Appraisal Forms' },
    { id: 28, name: 'Annual Health Check-Up Form' },

  ];
  const handleToggleExpand = useCallback(async (e, item) => {
    setShowGeneral(2)
    Setitem(item?.name)
    setFiles([])
    setid(item.id)
    if (selectedRowData?.em_id > 0) {
      const postData = {
        checklistid: item?.id,
        em_id: selectedRowData?.em_id
      }
      const response = await axioslogin.post('/upload/files', postData)
      const { success, } = response.data
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
  }, [setShowGeneral, selectedRowData, setFiles, Setitem, setid]);
  return (
    <ListItem
      nested
      sx={{ my: 1 }}
      startAction={
        <Box
          variant="plain"
          size="sm"
          color="neutral"
          onClick={() => setOpen3((bool) => !bool)}
        >
          <KeyboardArrowDown
            sx={{ transform: open3 ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
          />
        </Box>
      }
    >
      <ListItem>
        <Typography
          level="inherit"
          sx={{
            pl: 2,
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
              <ListItemButton onClick={(e) => handleToggleExpand(e, item)} sx={{ p: .5, m: 0, border: 'none' }}>
                <Typography level="body-xs" sx={{}}> {`${item.id}. ${item.name}`}</Typography>

              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </ListItem>
  )
}

export default memo(AnnualMandatory) 