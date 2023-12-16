import { Box, List, Typography } from '@mui/joy';
import React, { memo, useState, useCallback } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
const ExitDocument = ({ selectedRowData, setFiles, setflag }) => {
    const [open5, setOpen5] = useState(false);
    const main = [
        { id: 32, name: 'Dues Clearance Certificate' },
        { id: 33, name: 'Exit Questionnaire' },
    ];
    const handleToggleExpand = useCallback(async (e, item) => {
        setflag(3)

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
    }, [setflag, selectedRowData, setFiles]);
    return (
        <ListItem
            nested
            sx={{ my: 1 }}
            startAction={
                <Box
                    variant="plain"
                    size="sm"
                    color="neutral"
                    onClick={() => setOpen5((bool) => !bool)}
                >
                    <KeyboardArrowDown color="disabled"
                        sx={{ transform: open5 ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
                    />
                </Box>
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

            </ListItem>
            {open5 && (
                <List sx={{ '--List-item-paddingY': '8px' }}>
                    {main?.map((item, index) => (
                        <ListItem key={item.id}>
                            <ListItemButton onClick={(e) => handleToggleExpand(e, item)}>{`${item.id}.${item.name}`}</ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </ListItem>
    )
}

export default memo(ExitDocument)