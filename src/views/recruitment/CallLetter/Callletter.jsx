import { Box, Button, Tooltip, Typography } from '@mui/joy'
import React, { useCallback, useState, lazy, useEffect, memo } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'
import { useHistory } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import SaveIcon from '@mui/icons-material/Save';

const CallLetterModal = lazy(() => import('./CallLetterModal'))


const Callletter = () => {
    const [openRowIndex, setOpenRowIndex] = useState(null);
    const [data, setdata] = useState([]);
    const [maindata, setmaindata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formdata, setformdata] = useState([]);
    const history = useHistory();


    const toRedirectToHome = () => {
        history.push('/Home');
    }

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
                                // "apslno": array.filter(key => key.application_slno),
                                "apslno": array.map(key => ({ ...key, "desg_id": val.desg_id, })),
                                "appdesg_id": val.desg_id
                            }
                        }
                        const newEmp = data?.map(newFun)
                        const updatedNewEmp = newEmp.map((item) => {
                            const filteredStatusData = statusdata.filter((status) => status.desg_id === item.appdesg_id);
                            const updatedApslno = item.apslno.map((apslnoItem) => {
                                const foundStatus = filteredStatusData.find((statusItem) => statusItem.application_no === apslnoItem.application_no);
                                return foundStatus ? { ...apslnoItem, status: foundStatus.status } : apslnoItem;
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
    const handleExpand = useCallback((index) => {
        setformdata([])
        setOpenRowIndex((prevIndex) => (prevIndex === index ? null : index));
    }, [setOpenRowIndex]);

    const updateBoard = useCallback((e, item) => {
        if (e.target.type === 'checkbox' && e.target.checked) {
            const newdata = {
                email: item?.email,
                appslno: item?.application_no,
                desigid: item?.desg_id,
                letter_status: 1
            }
            const newdatas = [...formdata, newdata]
            setformdata(newdatas)
        } else {
            const newDataFiltered = formdata.filter(data => (
                data.email !== item?.email || data.appslno !== item?.application_no
            ));
            setformdata(newDataFiltered);
        }
    }, []);

    //for call leter save and sending email
    const submitmanpower = useCallback(async (event) => {
        event.preventDefault()
        setIsModalOpen(true)

    }, [setIsModalOpen])

    return (
        <>
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: window.innerHeight - 100, }}>
                <DasboardCustomLayout title={"Call Letter Preperation"} displayClose={true} setClose={toRedirectToHome}>
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
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Call Letter</Typography></TableCell>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Name</Typography></TableCell>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Email</Typography></TableCell>
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>Application No</Typography></TableCell>
                                                            {/* <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}>View Application </Typography></TableCell> */}
                                                            <TableCell size='small' padding='normal'><Typography sx={{ color: "#808B97", }}></Typography></TableCell>
                                                            <TableCell size='small' ></TableCell>

                                                        </TableRow>
                                                    )}
                                                    {isRowOpen && matchingMainData && matchingMainData.apslno.map((item, idx) => {

                                                        if (item.status === 1) {
                                                            return (
                                                                <TableRow key={idx} sx={{ backgroundColor: "#F8F6F4" }}>
                                                                    <TableCell size='small'>
                                                                        <JoyCheckbox
                                                                            name="call Letter"
                                                                            onchange={(e) => updateBoard(e, item)}
                                                                        />

                                                                    </TableCell>
                                                                    <TableCell size='small'>{item.first_name}</TableCell>
                                                                    <TableCell size='small'>{item.email}</TableCell>
                                                                    <TableCell size='small'>{item.application_no}</TableCell>
                                                                    {/* <TableCell size='small'><SlideshowIcon onClick={(e) => handleonclick(e, item)} /></TableCell> */}
                                                                    <TableCell size='small'></TableCell>
                                                                    <TableCell size='small' ></TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </React.Fragment>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ ml: 2, mt: 2 }}>
                            <Tooltip title="Save">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitmanpower}
                                >
                                    <SaveIcon />
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                </DasboardCustomLayout >
                <CallLetterModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    formdata={formdata} />

            </Box >
        </>
    )
}

export default memo(Callletter)