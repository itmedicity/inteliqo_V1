import { Box, List, Typography } from '@mui/joy';
import React, { memo, useState, useCallback } from 'react';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import ListItem from '@mui/joy/ListItem';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';


const JoiningFormalities = ({ selectedRowData, setFiles, setflag, setShowGeneral, Setitem, setEmpdata, setid }) => {
    const [open2, setOpen2] = useState(false);
    const main = [
        { id: 6, name: 'Personnel Data Form' },
        { id: 7, name: 'Self Attested Copies Of Academic Certificates' },
        { id: 8, name: 'Self Attested Copy Of Registration Certificates' },
        { id: 9, name: 'Self Attested Copies Of Experience Certificates' },
        { id: 10, name: 'Self Attested Copy Of Photo ID Proof' },
        { id: 11, name: 'Antecedent Verification Form' },
        { id: 12, name: 'Credential Verification Form' },
        { id: 13, name: 'Credentialing And  Privileging Form' },
        { id: 14, name: 'Job Description And Job Specification' },
        { id: 15, name: 'Appoinment Letter' },
        { id: 16, name: 'Joining Letter' },
        { id: 17, name: 'Competency Assessment' },
        { id: 18, name: 'Statutory Records' },
        { id: 19, name: 'Induction Records' },
        { id: 20, name: 'Department Orientation Checklists' },
        { id: 21, name: 'Employee Rights and Responsibilities' },
        { id: 22, name: 'Vaccination Card' },
        { id: 23, name: 'Review of Probation Period' },
        { id: 24, name: 'Confirmation Letter' },
    ];
    const handleToggleExpand = useCallback(async (e, item) => {
        setShowGeneral(2)
        Setitem(item?.name)
        setFiles([])
        setid(item.id)
        if (selectedRowData?.em_id > 0) {
            const postdata = {
                em_no: selectedRowData?.em_no,
            };
            // Data to the form page
            if (item.id >= 6) {
                const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
                const { success, data } = result.data
                if (success === 1) {
                    setEmpdata(data[0])
                }
                else {
                    setEmpdata([])
                }
            }
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
                // warningNofity("no data uploded")
            }
        } else {
            warningNofity("no Employee Found")
        }
    }, [setShowGeneral, selectedRowData, setFiles, Setitem, setid, setEmpdata]);
    return (
        <ListItem
            nested
            sx={{ my: 1 }}
            startAction={
                <Box
                    variant="plain"
                    size="sm"
                    color="neutral"
                    onClick={() => setOpen2((bool) => !bool)}
                >
                    <KeyboardArrowDown
                        sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
                    />
                </Box>
            }
        >
            <ListItem>
                <Typography
                    level="inherit"
                    sx={{
                        pl: 2,
                        fontWeight: open2 ? 'bold' : undefined,
                        color: open2 ? 'text.primary' : 'inherit',
                    }}
                >
                    Joining Formalities
                </Typography>
            </ListItem>
            {open2 && (
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

export default memo(JoiningFormalities)