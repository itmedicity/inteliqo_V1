import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { addDays } from 'date-fns/esm'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Paper } from '@mui/material'
import JoyBranchSelect from 'src/views/MuiComponents/JoyComponent/JoyBranchSelect'
import SaveIcon from '@mui/icons-material/Save';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import { Button, Textarea, Tooltip } from '@mui/joy'
import { useMemo } from 'react'
import { useCallback } from 'react'
import { format } from 'date-fns'

const Hrm_Announcement = () => {

    const [branch, setBranch] = useState(0)
    const [announcement, setannouncement] = useState('')
    const [announcemntexprdays, setannouncemntexprdays] = useState(0)
    const [announcemnthead, setannouncemnthead] = useState('')

    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id)

    const postData = useMemo(() => {
        return {
            Announcement: announcement,
            expr_days: format(addDays(new Date(), parseInt(announcemntexprdays)), 'yyyy-MM-dd'),
            created_user: em_id,
            Announcementheading: announcemnthead
        }
    }, [announcement, announcemntexprdays, announcemnthead, em_id])

    //save
    const submitFormData = useCallback(async () => {
        if (announcemntexprdays !== 0) {
            const result = await axioslogin.post('/hrmAnnouncement', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setBranch(0)
                setannouncement('')
                setannouncemntexprdays(0)
                setannouncemnthead('')
            }
            else if (success === 2) {
                warningNofity(message)
                setBranch(0)
                setannouncement('')
                setannouncemntexprdays(0)
                setannouncemnthead('')
            }
            else {
                errorNofity("Error Occured!!!Please Contact IT")
                setBranch(0)
                setannouncement('')
                setannouncemntexprdays(0)
                setannouncemnthead('')
            }
        }
        else {
            warningNofity("Announcement Expiry Days Is Null")
        }
    }, [announcemntexprdays, postData])

    return (
        <CustomLayout title="Announcement" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Paper variant="outlined" sx={{
                    width: '100%', p: 0.5, display: 'flex',
                    flexDirection: 'row',
                }}  >
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <JoyBranchSelect value={branch} setValue={setBranch} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <JoyInput
                            placeholder="Announcement Expiry Days"
                            type="number"
                            size="sm"
                            name="announcemntexprdays"
                            onchange={setannouncemntexprdays}
                        />

                    </Box>
                </Paper>
                <Paper variant="outlined" sx={{
                    width: '100%', p: 0.5, display: 'flex',
                    flexDirection: 'row',
                }}  >
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <JoyInput
                            placeholder="Announcement Titile"
                            type="text"
                            size="sm"
                            name="announcement"
                            onchange={setannouncement}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 3 }} >
                        <Textarea
                            label="Outlined"
                            placeholder="Announcement"
                            variant="outlined"
                            color="warning"
                            size="sm"
                            minRows={1}
                            maxRows={2}
                            onChange={(e) => setannouncemnthead(e.target.value)}
                            sx={{ flex: 1 }}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                        justifyContent: 'flex-start', pl: 0.5,
                    }} >
                        <Tooltip title="Save" followCursor placement='top' arrow >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="neutral"
                                onClick={submitFormData}
                                fullWidth
                                startDecorator={<SaveIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Save
                            </Button>
                        </Tooltip>
                    </Box>
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(Hrm_Announcement) 