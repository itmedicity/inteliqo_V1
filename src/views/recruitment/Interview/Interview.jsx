import { Box, Typography, Tooltip } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'
import { useHistory } from 'react-router-dom';
import _ from 'underscore'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';

const InterviewModal = lazy(() => import('./InterviewModal'))

const Interview = () => {
    const [maindata, setmaindata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [personaldata, setpersonaldata] = useState([]);
    const [data, setdata] = useState([]);
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home');
    }
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department } = employeeProfileDetl;
    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get('/Applicationform/vacancylist')
            const { success, data } = result.data

            if (success === 1) {
                setdata(data)
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
                        const newEmp = data?.map(newFun)
                        const updatedNewEmp = newEmp.map((item) => {
                            const filteredStatusData = statusdata.filter((status) => status.desg_id === item.appdesg_id);
                            const updatedApslno = item.apslno.map((apslnoItem) => {
                                const foundStatus = filteredStatusData.find((statusItem) => statusItem.application_no === apslnoItem.application_no && statusItem.letter_status === 1);
                                return foundStatus ? { ...apslnoItem, status: foundStatus.status, letterstatus: foundStatus.letter_status } : apslnoItem;
                            });
                            return { ...item, apslno: updatedApslno };
                        });
                        setmaindata(updatedNewEmp);

                    }
                } else {
                    setmaindata([])
                }
            } else {
                setdata(data)
            }
        }
        fetchData()
    }, [])
    //expand icon to show the details
    const handleExpand = useCallback((index) => {
        setOpenRowIndex((prevIndex) => (prevIndex === index ? null : index));
    }, [setOpenRowIndex]);

    const handleonclick = useCallback(async (e, item) => {
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
                if (data1 && data1.length > 0) {
                    const arr = data.map((val) => {
                        return {
                            ...val, desgid: item?.desg_id
                        }
                    })

                    setpersonaldata(arr)
                    setIsModalOpen(true)
                } else {
                    setpersonaldata([])
                }
            } else {
                const arr = data.map((val) => {
                    return {
                        ...val, desgid: item?.desg_id
                    }
                })
                setpersonaldata(arr)
                setIsModalOpen(true)
            }
        }
        else {
            setpersonaldata([])
        }
    }, [setpersonaldata]);


    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: window.innerHeight - 100, overflowX: "auto" }}>
            <DasboardCustomLayout title={"Interview List"} displayClose={true} setClose={toRedirectToHome}>
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
                                    {data.map((val, index) => {
                                        if (val.dept_id === em_department) {
                                            const matchingMainData = maindata.find(item => item.desg_id === val.desg_id && val.dept_id === em_department);
                                            const isRowOpen = openRowIndex === index;
                                            return (
                                                <React.Fragment key={val.desg_id}>
                                                    <TableRow>
                                                        <TableCell size='small' padding='none' sx={{ ml: 1, textAlign: "center" }}>
                                                            <Tooltip title="Show Applied Document">
                                                                <ExpandMoreIcon
                                                                    fontSize="small"
                                                                    onClick={() => handleExpand(index)}
                                                                />
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell size='small'  >{val.desg_name}</TableCell>
                                                        <TableCell size='small'  >{val.manpower_required_no}</TableCell>
                                                        <TableCell size='small'  >{val.dept_name}</TableCell>
                                                        <TableCell size='small' ></TableCell>
                                                        <TableCell size='small' ></TableCell>
                                                    </TableRow>

                                                    {isRowOpen && (
                                                        <TableRow padding='none' sx={{ backgroundColor: "#F8F6F4" }}>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}></Typography></TableCell>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Name</Typography></TableCell>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Email</Typography></TableCell>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Application No</Typography></TableCell>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}></Typography>Mobile No</TableCell>
                                                            <TableCell size='small' >View Data</TableCell>
                                                        </TableRow>
                                                    )}

                                                    {isRowOpen && matchingMainData && matchingMainData.apslno.map((item, idx) => {
                                                        if (item?.status === 1) {

                                                            return (

                                                                <TableRow key={idx} sx={{ backgroundColor: "#F8F6F4" }}>
                                                                    <TableCell size='small'></TableCell>
                                                                    <TableCell size='small'>{item?.first_name}</TableCell>
                                                                    <TableCell size='small'>{item?.email}</TableCell>
                                                                    <TableCell size='small'>{item?.application_no}</TableCell>
                                                                    <TableCell size='small' >{item?.mobile_num}</TableCell>
                                                                    <TableCell size='small'><SlideshowIcon onClick={(e) => handleonclick(e, item)} /></TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </React.Fragment>
                                            )
                                        } return null;
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </DasboardCustomLayout >
            <InterviewModal
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                personaldata={personaldata}
            />
        </Box>
    )
}

export default memo(Interview)