import { Box, Tooltip, Typography } from '@mui/joy'
import React, { useCallback, useState, lazy, useEffect } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'
import { useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SlideshowIcon from '@mui/icons-material/Slideshow';


const SubmittedModal = lazy(() => import('./SubmittedModal'))

const SubmittedForm = () => {
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const [data, setdata] = useState([]);
    const [personaldata, setpersonaldata] = useState([]);
    const [count, setcount] = useState(0);
    const [maindata, setmaindata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const history = useHistory();
    const [detail, setDetails] = useState({
        status: 0
    })
    const { status } = detail;
    const toRedirectToHome = () => {
        history.push('/Home');
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get('/Applicationform/vacancylist')
            const { success, data } = result.data
            if (success === 1) {
                setdata(data)
                setcount(0)
                const result = await axioslogin.get('/Applicationform/application')
                const { success, data1 } = result.data
                if (success === 1) {
                    const newFun = (val) => {
                        const array = data1.filter(e => e.Job_applied.includes(val.desg_id))

                        return {
                            ...val,
                            // "apslno": array.filter(key => key.application_slno),
                            "apslno": array.map(key => ({ ...key, "desg_id": val.desg_id, })),
                            "appdesg_id": val.desg_id
                        }
                    }
                    const newEmp = data?.map(newFun)
                    setmaindata(newEmp)
                } else {
                    setmaindata([])
                }
            } else {
                setdata(data)
            }
        }
        fetchData()
    }, [count])
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
            setDetails({ status: 0 })

            const result = await axioslogin.post('/Applicationform/statusdetails', statusdata)
            const { success1, data1 } = result.data
            if (success1 === 1) {
                if (data1 && data1.length > 0) {
                    const { status } = data1[0]
                    const details = {
                        status: status
                    }
                    setDetails(details)
                    const arr = data.map((val) => {

                        return {
                            ...val, desgid: item?.desg_id, status: status
                        }
                    })
                    setpersonaldata(arr)
                    setIsModalOpen(true)
                    setDetails({ status: 0 })
                } else {
                    setDetails({ status: 0 })
                }
            } else {
                setDetails({ status: 0 })
                const arr = data.map((val) => {

                    return {
                        ...val, desgid: item?.desg_id, status: status
                    }
                })
                setpersonaldata(arr)
                setIsModalOpen(true)
            }
        }
        else {
            setpersonaldata([])
        }
    }, [setpersonaldata, status]);
    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: window.innerHeight - 100, }}>
            <DasboardCustomLayout title={"Submitted Application"} displayClose={true} setClose={toRedirectToHome}>
                <Box sx={{ display: 'flex', flex: 1, py: 0.5, }}>
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

                                    const matchingMainData = maindata.find(item => item.desg_id === val.desg_id);
                                    const isRowOpen = openRowIndex === index;
                                    // matchingMainData.matchingDesigId = val.desg_id

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
                                                    <TableCell size='small' padding='normal'></TableCell>
                                                    <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>slno</Typography></TableCell>
                                                    <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Name</Typography></TableCell>
                                                    <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Email</Typography></TableCell>
                                                    <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Application No</Typography></TableCell>
                                                    <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>View Application </Typography></TableCell>
                                                </TableRow>
                                            )}
                                            {isRowOpen && matchingMainData && matchingMainData.apslno.map((item, idx) => (

                                                < TableRow key={idx} sx={{ backgroundColor: "#F8F6F4" }}>
                                                    <TableCell size='small' ></TableCell>
                                                    <TableCell size='small' >{idx + 1}</TableCell>
                                                    <TableCell size='small' >{item.first_name} {item.last_name}</TableCell>
                                                    <TableCell size='small' >{item.email}</TableCell>
                                                    <TableCell size='small' >{item.application_no}</TableCell>
                                                    <TableCell size='small'   ><SlideshowIcon onClick={(e) => handleonclick(e, item)} /></TableCell>
                                                </TableRow>
                                            ))}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DasboardCustomLayout >
            <SubmittedModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                personaldata={personaldata}
                setpersonaldata={setpersonaldata}
                setcount={setcount}
                count={count}
            />
        </Box >
    )
}

export default SubmittedForm;