import { Box, Button, Textarea } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { axioslogin } from 'src/views/Axios/Axios';
import { JoiningLetterpdf } from './JoiningLetterpdf'
import { JoiningLetterpdf2 } from './JoiningLetterpdf2'
import { JoiningLetterpdf3 } from './JoiningLetterpdf3'
import { JoiningLetterpdf4 } from './JoiningLetterpdf4'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
const Joiningpdfview = ({ details, setIsModalOpen }) => {

    // pdf open
    const [value, setvalue] = useState('');
    const [remark, setremark] = useState('')

    const handleonclick = useCallback(async () => {
        const postdata = {
            application_no: details?.application_no,
            desgid: details?.desgid,
            value: value
        }
        const result = await axioslogin.post('/Applicationform/Joinpdfdata', postdata)
        const { success, data } = result.data
        if (success === 1) {
            if (value === 'Pdf Format 1') {
                const result = await axioslogin.post('/Applicationform/joinpdfstatus', postdata)
                const { success } = result.data
                if (success === 1) {
                    JoiningLetterpdf(data[0])
                } else {
                    warningNofity("something went wrong")
                }

            } else if (value === 'Pdf Format 2') {
                const result = await axioslogin.post('/Applicationform/joinpdfstatus', postdata)
                const { success } = result.data
                if (success === 1) {
                    JoiningLetterpdf2(data[0])
                } else {
                    warningNofity("something went wrong")
                }

            }
            else if (value === 'Pdf Format 3') {
                const result = await axioslogin.post('/Applicationform/joinpdfstatus', postdata)
                const { success } = result.data
                if (success === 1) {
                    JoiningLetterpdf3(data[0])
                } else {
                    warningNofity("something went wrong")
                }

            }
            else if (value === 'Pdf Format 4') {
                const result = await axioslogin.post('/Applicationform/joinpdfstatus', postdata)
                const { success } = result.data
                if (success === 1) {
                    JoiningLetterpdf4(data[0])
                } else {
                    warningNofity("something went wrong")
                }

            } else {
                succesNofity("Please Select The Pdf Format")
            }

        }

    }, [details, value]);
    const handleonclickCancel = useCallback(async () => {
        const postdata = {
            application_no: details?.application_no,
            desgid: details?.desgid,
            remark: remark
        }
        if (remark === "") {
            warningNofity("Please Enter the Remark")
            setIsModalOpen(false)
        } else {
            const result = await axioslogin.post('/Applicationform/joincancel', postdata)
            const { success } = result.data
            if (success === 1) {
                setIsModalOpen(false)
                succesNofity("Appointment Letter Canceled")
            } else {
                setIsModalOpen(false)
                warningNofity("something went wrong")
            }
        }


    }, [details, setIsModalOpen, remark]);
    return (
        <Box sx={{}}>
            <CustmTypog title={'Select PDF format'} />

            <Box>
                <Select
                    onChange={(event, newValue) => {
                        setvalue(newValue);
                    }}
                    sx={{ mt: 1, width: "100%", }}
                    placeholder="Select Pdf Format"
                    size="sm"
                    variant="outlined"
                    value={value}
                >
                    <Option value="Pdf Format 1">Pdf Format 1</Option>
                    <Option value="Pdf Format 2">Pdf Format 2</Option>
                    <Option value="Pdf Format 3">Pdf Format 3</Option>
                    <Option value="Pdf Format 4">Pdf Format 4</Option>
                </Select>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Textarea name="Outlined" placeholder="Remark for cancel Appointment Letter" minRows={5}
                    variant="outlined" onChange={(e) => setremark(e.target.value)} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                <Button sx={{ p: 0, width: "40%", mr: .5 }} size='sm' variant="outlined" color="danger" onClick={handleonclickCancel}>
                    Cancel Appointment Letter
                </Button>
                <Button sx={{ p: 0, width: "40%" }} size='sm' variant="outlined" color="success" onClick={handleonclick}>
                    Download Appointment Letter
                </Button>

            </Box>
        </Box>
    )
}

export default memo(Joiningpdfview) 