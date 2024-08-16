import { Box, Button, Option, Select, Textarea, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { axioslogin } from 'src/views/Axios/Axios';
import PdfContent from './PdfContent'
import moment from 'moment';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
// import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import _ from 'underscore'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const PdfContent = lazy(() => import('./PdfContent'))

const OfferletterSend = ({ details, data, setIsModalOpen, count, setcount, setOpenBkDrop, item }) => {
    console.log(details);
    const [phonecall_status, setPhonecallstatus] = useState(false)
    const [Reject_status, setReject_statusstatus] = useState(false)
    const [OnHold_status, setOnHold_statusstatus] = useState(false)
    const [remark, setremark] = useState('')
    const [Empno, setEmpNo] = useState(0)
    const [Emno, setEmNo] = useState([])
    const [date, setdate] = useState(moment(new Date()).format('YYYY-MM-DD'));

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const { em_no } = employeeState[0];

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get('/Applicationform/empselect')
            const { success, data } = result.data
            if (success === 1) {
                setEmNo(data)
            }
            else {
                setEmNo([])
            }

        }
        fetchData()

    }, [])

    // for checkbox
    const handleCheckBoxChange = useCallback((name) => {
        if (name === 'phonecall_status') {
            setPhonecallstatus(true);
            setReject_statusstatus(false);
            setOnHold_statusstatus(false);
        } else if (name === 'Reject_status') {
            setPhonecallstatus(false);
            setReject_statusstatus(true);
            setOnHold_statusstatus(false);
        } else if (name === 'OnHold_status') {
            setPhonecallstatus(false);
            setReject_statusstatus(false);
            setOnHold_statusstatus(true);
        }
    }, [setPhonecallstatus, setReject_statusstatus, setOnHold_statusstatus]);



    const handleGeneratePDF = useCallback(async () => {
        setOpenBkDrop(true)
        if (phonecall_status === false && Reject_status === false && OnHold_status === false) {
            setIsModalOpen(false)
            warningNofity("Please Tick the Check Box")
            setOpenBkDrop(false)
        } else if (Empno === 0) {
            setIsModalOpen(false)
            setOpenBkDrop(false)
            warningNofity("Please enter the Employee Number")
        } else if (remark === '') {
            setIsModalOpen(false)
            setOpenBkDrop(false)
            warningNofity("Please enter the Remark")
        } else {
            const pdfcontent = {
                //to the pdf page
                content: [
                    ...PdfContent({ details, data, date, item }),
                ],
            };
            const pdfBlob = await new Promise((resolve) => {
                pdfMake.createPdf(pdfcontent).getBlob(resolve);
            });

            const formData = new FormData();
            formData.append('pdf', pdfBlob);
            formData.append('appno', details?.application_no);
            formData.append('desig_id', data?.desg_id);
            formData.append('date', date);
            formData.append('remark', remark);
            formData.append('emid', Empno);
            formData.append('Select_status', phonecall_status === true ? 1 : 0);
            formData.append('Reject_status', Reject_status === true ? 1 : 0);
            formData.append('Hold_status', OnHold_status === true ? 1 : 0);
            formData.append('saved_emid', em_no);
            formData.append('email', details?.email);
            const postData = {
                applicationno: details?.application_no,
                desg: data?.desg_id,
                Reject_status: Reject_status === true ? 1 : 0,
                Select_status: phonecall_status === true ? 1 : 0,
                Hold_status: OnHold_status === true ? 1 : 0,
                saved_emid: em_no,
                emid: Empno,
                remark: remark
            }
            const result = await axioslogin.post('/EmailandPdf/offerletter', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const { success } = result.data;
            if (success === 1) {
                setOpenBkDrop(false)
                const result = await axioslogin.post('/EmailandPdf/Selectstatus', postData)
                const { success } = result.data
                if (success === 1) {
                    setOpenBkDrop(false)
                    setIsModalOpen(false)
                    setcount(count + 1)
                    succesNofity("Offer Letter Sent successfully")
                }

            } else {
                setOpenBkDrop(false)
                warningNofity("Something Went Wrong")
            }
        }


    }, [details, data, Empno, date, remark, phonecall_status, Reject_status, count, setcount, OnHold_status, em_no, setIsModalOpen, item, setOpenBkDrop]);

    // for reject
    const handlereject = useCallback(async () => {
        if (phonecall_status === false && Reject_status === false && OnHold_status === false) {
            setIsModalOpen(false)
            warningNofity("Please Tick the Check Box")
        } else if (Empno === 0) {
            setIsModalOpen(false)
            warningNofity("Please select the Employee Number")
        } else if (remark === '') {
            setIsModalOpen(false)
            warningNofity("Please enter the Remark")
        } else {
            const postData = {
                applicationno: details?.application_no,
                desg: data?.desg_id,
                Reject_status: Reject_status === true ? 1 : 0,
                Select_status: phonecall_status === true ? 1 : 0,
                Hold_status: OnHold_status === true ? 1 : 0,
                saved_emid: em_no,
                emid: Empno,
                remark: remark
            }
            const result = await axioslogin.post('/EmailandPdf/rejectemp', postData)
            const { success } = result.data
            if (success === 1) {
                const result = await axioslogin.post('/EmailandPdf/rejectstatus', postData)
                const { success } = result.data
                if (success === 1) {
                    setIsModalOpen(false)
                    succesNofity("Rejected successfully")
                }

            } else {
                warningNofity("Something Went Wrong")
            }
        }


    }, [details, Empno, data, remark, phonecall_status, Reject_status, OnHold_status, setIsModalOpen, em_no]);

    return (
        <Box sx={{ mt: 1 }}>
            <CustmTypog title={'Mail Send And Phone Call'} />
            <Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                    <Box sx={{ pt: .5 }}><Typography>Joining Date:</Typography></Box>
                    <Box sx={{ width: '50%', ml: 1 }}>
                        <JoyInput
                            type="date"
                            value={date}
                            onchange={setdate}
                            size="sm"
                        />
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', }}>
                    <Box sx={{ mt: 1, pt: .5 }}>
                        <JoyCheckbox
                            label='Accept'
                            name="phonecall_status"
                            checked={phonecall_status}
                            onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                        />
                    </Box>
                    <Box sx={{ mt: 1, pt: .5, ml: 1 }}>
                        <JoyCheckbox
                            label=' Reject'
                            name="Reject_status"
                            checked={Reject_status}
                            onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                        />
                    </Box>
                    <Box sx={{ mt: 1, pt: .5, ml: 1 }}>
                        <JoyCheckbox
                            label='On Hold'
                            name="OnHold_status"
                            checked={OnHold_status}
                            onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                        />
                    </Box>


                </Box>


                <Box sx={{ display: "flex", mt: 1, width: "62%" }}>
                    <Box sx={{ mt: 1 }}><Typography>Applicent Accept Verificanted Employee:</Typography></Box>
                    <Tooltip title="Employee Number" followCursor placement='top' arrow>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }}>
                            <Select
                                onChange={(event, newValue) => {
                                    setEmpNo(newValue)
                                }}
                                // disabled={false}
                                placeholder="Select Employe"
                                size="md"
                                variant="outlined"
                                value={Empno}
                            //onChange={(e) => seteducation(e.target.value)}                       
                            >
                                {Emno?.map((val, idx) => <Option key={idx} value={val?.em_no} >{val.em_name}</Option>)}
                            </Select>
                        </Box>
                    </Tooltip>
                </Box>

                {OnHold_status === true ?
                    <Box sx={{ display: "flex", mt: 2 }}>
                        <Box sx={{ pt: .5 }}><Typography>Employee prefer Joining Date:</Typography></Box>
                        <Box sx={{ width: '36%', ml: 1 }}>
                            <JoyInput
                                type="date"
                                value={date}
                                onchange={setdate}
                                size="sm"
                            />
                        </Box>
                    </Box> : null
                }

                <Box sx={{ mt: 1 }}>

                    <Textarea name="Outlined" placeholder="Remark here..." minRows={5}
                        variant="outlined" onChange={(e) => setremark(e.target.value)} />

                </Box>
            </Box>

            {Reject_status === true ?
                <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                    <Button sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="danger" onClick={handlereject}>
                        Reject the Employee
                    </Button>
                </Box> :

                <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
                    <Button sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success" onClick={handleGeneratePDF}>
                        Generate PDF and Email Send
                    </Button>
                </Box>

            }

        </Box>


    )
}

export default memo(OfferletterSend)


