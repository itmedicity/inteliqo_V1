import { Box, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, lazy, memo, useCallback, useEffect, useState } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Interview } from 'src/redux/actions/Interview.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import _ from 'underscore';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

const AppoinmentModal = lazy(() => import('./AppoinmentModal'))

const AppoinmentLetter = () => {
    const [maindata, setmaindata] = useState([]);
    const [dataitem, setdata] = useState([]);
    const [personaldata, setpersonaldata] = useState([]);
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const [date, setdate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [isModalOpen, setIsModalOpen] = useState(false)

    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home');
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(Interview())
    }, [dispatch])
    const Interviewlist = useSelector((state) => state?.getInterviewquestion.InterviewType.InterviewList, _.isEqual)

    useEffect(() => {
        const fetchData = async () => {
            if (Interviewlist?.length !== 0) {
                // setdata(data)
                const result = await axioslogin.get('/Applicationform/application')
                const { success, data1 } = result.data
                if (success === 1) {
                    const result = await axioslogin.post('/Applicationform/statusdata')
                    const { success1, data1: statusdata } = result.data
                    if (success1 === 1) {
                        const newFun = (val) => {
                            const array = data1.filter(e => e.Job_applied.includes(val.desg_id))
                            return {
                                ...val,
                                "apslno": array.map(key => ({ ...key, "desg_id": val.desg_id, })),
                                "appdesg_id": val.desg_id,
                            };
                        }

                        const newEmp = Interviewlist?.map(newFun)
                        const updatedNewEmp = newEmp.map((item) => {
                            const filteredStatusData = statusdata.filter((status) => status.desg_id === item.appdesg_id);

                            //for showing the drop down details
                            const updatedApslno = item.apslno.map((apslnoItem) => {
                                const foundStatus = filteredStatusData.find((statusItem) => statusItem.application_no === apslnoItem.application_no && statusItem.letter_status === 1
                                    && statusItem.interview_status === 1 && statusItem.selected_status === 1 && statusItem.offer_letterstatus === 1);

                                return foundStatus ? {
                                    ...apslnoItem, status: foundStatus.status, letterstatus: foundStatus.letter_status, designation_name: foundStatus.desg_name,
                                    offerletter_status: foundStatus.offer_letterstatus, appointment_status: foundStatus.appointment_status,
                                    appmt_ltr_cancel_status: foundStatus.appmt_ltr_cancel_status
                                } : apslnoItem;
                            });
                            return { ...item, apslno: updatedApslno };
                        });

                        setmaindata(updatedNewEmp);
                        // setcount(0)
                    }
                } else {
                    setmaindata([])

                }
            } else {
                setmaindata([])

            }
        }
        fetchData()
    }, [Interviewlist])
    //expand icon to show the details
    const handleExpand = useCallback((index) => {
        setOpenRowIndex((prevIndex) => (prevIndex === index ? null : index));
    }, [setOpenRowIndex]);


    // pdf open
    const handleonclick = useCallback(async (idx, item, val) => {

        const postData = {
            applicationno: item?.application_no
        }
        const statusdata = {
            applicationno: item?.application_no,
            desg: item?.desg_id
        }
        const result = await axioslogin.post('/Applicationform/empdetails', postData)
        const { success, data } = result.data
        if (success === 1) {
            const result = await axioslogin.post('/Applicationform/statusdetails', statusdata)
            const { success1, data1 } = result.data
            if (success1 === 1) {
                const { assigned_join_date, salary, em_contract_end_date, em_no } = data1[0]
                if (data1 && data1.length > 0) {
                    const arr = data.map((val) => {
                        return {
                            ...val, desgid: item?.desg_id, dateofjoing: assigned_join_date, currentdate: date, salary: salary, em_cont_end: em_contract_end_date, em_no: em_no
                        }
                    })


                    // appointment letter data
                    const AppointmentData = {
                        applicationno: item?.application_no,
                        desg: item?.desg_id,
                        date: date,
                        desgname: val?.desg_name,
                        deptname: val?.dept_name,
                        name: item?.first_name + " " + item?.last_name,
                        salary: salary,
                        em_cont_end: em_contract_end_date,
                        dateofjoing: assigned_join_date,
                        em_no: em_no,
                        status: 1
                    }
                    const checkdata = {
                        application_no: item?.application_no,
                        desgid: item?.desg_id
                    }
                    const result = await axioslogin.post('/Applicationform/pdfdata', checkdata)
                    const { success } = result.data
                    if (success === 1) {

                        setIsModalOpen(true)
                        setpersonaldata(arr)
                        setdata(val)
                    }
                    else {
                        const result = await axioslogin.post('/Applicationform/insertappointment', AppointmentData)
                        const { success } = result.data
                        if (success === 1) {
                            setIsModalOpen(true)
                            setpersonaldata(arr)
                            setdata(val)
                        }
                        else {
                            setpersonaldata([])
                        }
                    }

                } else {
                    // Appointmentpdf()
                    setpersonaldata([])
                }
            } else {

                const { assigned_join_date, salary, em_contract_end_date, em_no } = data1[0]
                const arr = data.map((val) => {
                    return {
                        ...val, desgid: item?.desg_id, dateofjoing: assigned_join_date, salary: salary, em_cont_end: em_contract_end_date, currentdate: date, em_no: em_no
                    }
                })

                // Appointmentpdf(val, arr[0])
                setpersonaldata(arr)
                // setcount(count + 1)
                setIsModalOpen(true)
            }
        }
        else {
            // Appointmentpdf()
            setpersonaldata([])
            setdate(moment(new Date()).format('DD-MM-yyyy'))
        }


    }, [date]);
    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: window.innerHeight - 100, overflowX: "auto" }}>
            <DasboardCustomLayout title={"Appointment Letter"} displayClose={true} setClose={toRedirectToHome}>
                <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }}>
                    <Box sx={{ py: 0.5, }}>
                        <TableContainer sx={{}}>
                            <Table sx={{ p: 0, width: '100%' }}>
                                <TableHead >
                                    <TableRow>
                                        <TableCell ></TableCell>
                                        <TableCell ><Typography>Desgnation</Typography></TableCell>
                                        <TableCell ><Typography>Required no</Typography></TableCell>
                                        <TableCell ><Typography>Department</Typography></TableCell>
                                        <TableCell ></TableCell>
                                        <TableCell ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Interviewlist?.map((val, index) => {
                                        const matchingMainData = maindata.find(item => item.desg_id === val.desg_id);
                                        const isRowOpen = openRowIndex === index;
                                        return (
                                            <Fragment key={val.desg_id}>
                                                <TableRow>
                                                    <TableCell size='small' padding='none' sx={{ ml: 1, textAlign: "center" }}>
                                                        <Tooltip title="Show Applied Document" sx={{ cursor: 'pointer' }}>
                                                            <ExpandMoreIcon
                                                                fontSize="small"
                                                                onClick={() => handleExpand(index)}
                                                            />
                                                        </Tooltip>
                                                    </TableCell>
                                                    <TableCell size='small' >{val.desg_name}</TableCell>
                                                    <TableCell size='small' >{val.manpower_required_no}</TableCell>
                                                    <TableCell size='small' >{val.dept_name}</TableCell>
                                                    <TableCell ></TableCell>
                                                    <TableCell ></TableCell>
                                                </TableRow>

                                                {isRowOpen && (
                                                    <TableRow padding='none' sx={{ backgroundColor: "#F8F6F4" }}>
                                                        <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}></Typography></TableCell>
                                                        <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Name</Typography></TableCell>
                                                        <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Email</Typography></TableCell>
                                                        <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Application No</Typography></TableCell>
                                                        <TableCell size='small' ><Typography sx={{ color: "#808B97", }}>Appointment Letter</Typography></TableCell>
                                                        <TableCell size='small' ><Typography sx={{ color: "#808B97", }}>Appointment Letter status</Typography></TableCell>
                                                    </TableRow>
                                                )}

                                                {isRowOpen && matchingMainData && matchingMainData.apslno.map((item, idx) => {
                                                    if (item?.status === 1) {
                                                        return (
                                                            <TableRow key={idx} sx={item?.appointment_status === 1 ? { backgroundColor: "#CDFADB" } :
                                                                item?.appmt_ltr_cancel_status === 1 ? { backgroundColor: "#FFACAC" } :
                                                                    { backgroundColor: "#F8F6F4" }}>
                                                                <TableCell size='small'></TableCell>
                                                                <TableCell size='small'>{item?.first_name}</TableCell>
                                                                <TableCell size='small'>{item?.email}</TableCell>
                                                                <TableCell size='small'>{item?.application_no}</TableCell>
                                                                {item?.appointment_status === 1 || item?.appmt_ltr_cancel_status === 1 ?
                                                                    <TableCell size='small' sx={{ cursor: 'pointer' }} >
                                                                        <PreviewIcon />
                                                                    </TableCell> :
                                                                    <TableCell size='small' sx={{ cursor: 'pointer' }} >
                                                                        <PreviewIcon onClick={(e) => handleonclick(e, item, val)} />
                                                                    </TableCell>
                                                                }
                                                                {item?.appointment_status === 1 ?
                                                                    <TableCell size='small' sx={{ cursor: 'pointer' }} >
                                                                        Appointment Letter Downloaded
                                                                    </TableCell> :
                                                                    item?.appmt_ltr_cancel_status === 1 ?
                                                                        <TableCell size='small' sx={{ cursor: 'pointer' }} >
                                                                            Appointment Letter Canceled
                                                                        </TableCell> :
                                                                        <TableCell size='small' sx={{ cursor: 'pointer' }} >
                                                                            Download Pending
                                                                        </TableCell>
                                                                }

                                                            </TableRow>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </Fragment>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </DasboardCustomLayout >
            <AppoinmentModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                personaldata={personaldata}
                dataitem={dataitem}
            />
        </Box>
    )
}

export default memo(AppoinmentLetter)