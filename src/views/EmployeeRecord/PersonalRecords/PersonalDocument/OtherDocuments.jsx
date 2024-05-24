import { Box, List, Typography } from '@mui/joy';
import React, { memo, useState, useCallback } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const OtherDocuments = ({ selectedRowData, setFiles, setShowGeneral, Setitem }) => {
    const [open4, setOpen4] = useState(false);
    const main = [
        { id: 29, name: 'Any Disciplinary Record' },
        { id: 30, name: 'Any Grievance Record' },
        { id: 31, name: 'Any Other Record' },
    ];
    const handleToggleExpand = useCallback(async (e, item) => {
        setShowGeneral(2)
        Setitem(item?.name)
        setFiles([])
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
    }, [setShowGeneral, selectedRowData, setFiles, Setitem]);
    return (
        <ListItem
            nested
            sx={{ my: 1 }}
            startAction={
                <Box
                    variant="plain"
                    size="sm"
                    color="neutral"
                    onClick={() => setOpen4((bool) => !bool)}
                >
                    <KeyboardArrowDown
                        sx={{ transform: open4 ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
                    />
                </Box>
            }
        >
            <ListItem>
                <Typography
                    level="inherit"
                    sx={{
                        pl: 2,
                        fontWeight: open4 ? 'bold' : undefined,
                        color: open4 ? 'text.primary' : 'inherit',
                    }}
                >
                    Other  Documents
                </Typography>

            </ListItem>
            {open4 && (
                <List sx={{ '--List-item-paddingY': '8px' }}>
                    {main?.map((item, index) => (
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

export default memo(OtherDocuments)