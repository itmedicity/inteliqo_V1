import React, { Fragment, memo } from 'react'
import { useCallback } from 'react';
import { Typography, Box, Modal, ModalDialog, Sheet, CssVarsProvider, Table } from '@mui/joy';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import ModalClose from '@mui/joy/ModalClose';
import { axioslogin } from 'src/views/Axios/Axios';
import { Paper } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';

const ViewDetailedModal = ({ open, setOpen, rowdata }) => {

    const [displayData, setdisplayData] = useState([])
    const [showdata, setShowData] = useState([])
    const [getTrainers, setgetTrainers] = useState([])
    const [showtrainers, setshowtrainers] = useState([])

    const [data, setdata] = useState({
        topic_slno: 0,
        induction_date: '',
        trainingtype_slno: 0,
        training_topic_name: '',
        trainer_name: ''
    })
    const { topic_slno, induction_date, trainingtype_slno, training_topic_name } = data;

    useEffect(() => {
        if (Object.keys(rowdata).length !== 0) {
            const { topic_slno, induction_date, trainingtype_slno, training_topic_name } = rowdata;
            const obj = {
                topic_slno: topic_slno,
                induction_date: induction_date,
                trainingtype_slno: trainingtype_slno,
                training_topic_name: training_topic_name,
            }
            setdata(obj);
        }
    }, [rowdata])

    useEffect(() => {
        const Data = displayData?.map((val) => {
            const object = {
                employee_name: val.employee_name,
                training_topic_name: val.training_topic_name,
                sect_name: val.sect_name,
                indct_emp_no: val.indct_emp_no,
                emno: val.emno
            }
            return object;
        })
        setShowData(Data)

    }, [setShowData, displayData])


    useEffect(() => {
        if (trainingtype_slno !== 0 && topic_slno !== 0 && induction_date !== '') {
            const obj = {
                trainingtype_slno: trainingtype_slno,
                topic_slno: topic_slno,
                induction_date: moment(induction_date).format("YYYY-MM-DD HH:mm:ss")
            }
            const getData = (async () => {
                const results = await axioslogin.post('/InductionTraining/getcalEmpdetails', obj)
                const { success, data } = results.data
                if (success === 2) {
                    setdisplayData(data)
                }
                else {
                    setdisplayData([])
                }
            })
            getData()
        }
        else {
            setdisplayData([])
        }
    }, [trainingtype_slno, topic_slno, induction_date])

    useEffect(() => {
        const Data = getTrainers?.map((val) => {
            const object = {
                trainer_name: val.trainer_name,
            }
            return object;
        })
        setshowtrainers(Data)

    }, [setshowtrainers, getTrainers])

    //for get trainers
    useEffect(() => {
        if (trainingtype_slno !== 0 && topic_slno !== 0 && induction_date !== '') {
            const obj = {
                trainingtype_slno: trainingtype_slno,
                topic_slno: topic_slno,
                induction_date: moment(induction_date).format("YYYY-MM-DD HH:mm:ss")
            }
            const getData = (async () => {
                const results = await axioslogin.post('/InductionTraining/getcalTrainers', obj)
                const { success, data } = results.data
                if (success === 2) {
                    setgetTrainers(data)
                }
                else {
                    setgetTrainers([])
                }
            })
            getData()
        }
        else {
            setgetTrainers([])
        }
    }, [trainingtype_slno, topic_slno, induction_date])

    const Handleclose = useCallback((e) => {
        setOpen(false)
    }, [setOpen])

    return (
        <Fragment>

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={Handleclose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="lg"  >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box variant='outlined' sx={{ p: 1 }}>
                        <Paper sx={{ p: 1 }}>
                            <Typography
                                fontSize="xl2"
                                lineHeight={1}
                                startDecorator={
                                    <ViewListIcon sx={{ color: 'green' }}
                                    />
                                }
                                sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                            >
                                {moment(induction_date).format("DD-MM-YYYY")}
                            </Typography>
                        </Paper>
                        <Paper variant='outlined' sx={{ p: 1, mt: 1 }}>
                            <Box sx={{ p: 1 }}>
                                <Box sx={{ p: 1, display: "flex", flexDirection: "row", gap: 2, backgroundColor: "#C4DFDF" }}>
                                    <Box>
                                        <Typography >Topic :</Typography>
                                        <Typography>Trainers :</Typography>
                                    </Box>
                                    <Box sx={{ textTransform: "capitalize" }}>
                                        <Typography >{training_topic_name.toLowerCase()}</Typography>
                                        <Typography > {showtrainers?.trainer_name} </Typography>
                                        {showtrainers?.map((val, index) => (
                                            <Typography key={index}> {val?.trainer_name.toLowerCase()} </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: "row", p: 1, gap: 5, height: 500 }}>
                                <Sheet sx={{
                                    overflow: 'auto',
                                    '::-webkit-scrollbar': { display: "none" },
                                    width: "100%", backgroundColor: "#F8F6F4"
                                }}>
                                    <CssVarsProvider>
                                        <Table borderAxis="both" stickyHeader >
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "15%" }}>Employee ID</th>
                                                    <th>Name</th>
                                                    <th>Department Section</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {showdata?.map((val, index) => (
                                                    <tr key={index} style={{
                                                        overflow: "hidden",
                                                        overflowY: "scroll"
                                                    }}>
                                                        <td>{val?.emno}</td>
                                                        <td>{val?.employee_name}</td>
                                                        <td>{val?.sect_name}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </CssVarsProvider>
                                </Sheet>
                            </Box>
                        </Paper>
                    </Box>
                </ModalDialog>
            </Modal>

        </Fragment >
    )
}

export default memo(ViewDetailedModal)
