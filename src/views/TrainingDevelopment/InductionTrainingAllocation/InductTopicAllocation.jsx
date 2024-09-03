import React, { Fragment, memo, useState } from 'react'
import { useCallback } from 'react';
import { Box, Button, Table, Sheet, Typography } from '@mui/joy';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import JoyTrainingTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainingTypeSelect'
import { Tooltip } from '@mui/material';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import { TrainingTypeWiseTopics } from 'src/redux/actions/Training.Action';
import { format } from 'date-fns';
import InductEmpList from './InductEmpList';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const InductTopicAllocation = ({ SetDatefrmt, datefrmt, SetView }) => {

    const dispatch = useDispatch()

    const [topicDetails, setTopicDetails] = useState([])
    const [OpenEmplist, setOpenEmplist] = useState(false)
    const [type, setType] = useState(0)

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const ToshowTopics = useCallback(() => {
        if (type !== 0) {
            dispatch(TrainingTypeWiseTopics(type))
        }
        else {
            alert("Please Select Training Topic")
        }
    }, [dispatch, type])

    const topicData = useSelector((state) => state?.gettrainingData?.TrainingTypeTopic?.TrainingTypeTopicList)

    const ClickToAddEmployees = useCallback((row) => {
        setTopicDetails(row)
        setOpenEmplist(true)
    }, [])

    const handleClose = useCallback(() => {
        SetView(false)
    }, [SetView])

    return (
        <Fragment>
            <Box>
                {
                    OpenEmplist === true ? <InductEmpList setOpenEmplist={setOpenEmplist} OpenEmplist={OpenEmplist} setTopicDetails={setTopicDetails} topicDetails={topicDetails} SetDatefrmt={SetDatefrmt} datefrmt={datefrmt} em_id={em_id} /> : null
                }
                <Box sx={{ p: 0.5, display: 'flex', flexDirection: "row", backgroundColor: "#334257", color: "white", justifyContent: "space-between" }}>
                    <Typography level='h4' color="white">Select Topics</Typography>
                    {/* 394867   3C486B*/}
                    <HighlightOffIcon onClick={handleClose} />
                </Box>
                <Box sx={{ mt: 1, display: 'flex', flexDirection: "row", gap: 2 }}>

                    <Box sx={{ flex: 1 }} >
                        <JoyTrainingTypeSelect type={type} setType={setType} />
                    </Box>
                    <Tooltip title="Search">
                        <Button variant='outlined'>
                            <FindReplaceIcon
                                onClick={ToshowTopics}
                            />
                        </Button>
                    </Tooltip>
                </Box>
                <Box>
                    <Sheet variant="outlined" sx={{ mt: 2, height: 400, overflowY: "scroll" }}>
                        <Table variant="soft" borderAxis="bothBetween" stickyHeader>
                            <thead >
                                <tr>
                                    <th style={{ width: "10%", textAlign: 'center' }}>Sl No.</th>
                                    <th>Training Topics</th>
                                    <th>Trainers</th>
                                    <th style={{ width: "15%", textAlign: 'center' }}>Selected Date</th>
                                    <th style={{
                                        width: "10%", textAlign: 'center'
                                    }}>Add Employees</th>
                                </tr>
                            </thead>

                            <tbody style={{ textTransform: "capitalize" }}>
                                {topicData?.map((row, index) => (
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td>{row?.training_topic_name}</td>
                                        <td>{row?.trainers_name}</td>
                                        <td style={{ width: "15%", textAlign: 'center' }}>{format(new Date(datefrmt), "dd-MM-yyyy")}</td>
                                        <td style={{ textAlign: "center" }}><Tooltip title="add Employees"><GroupAddIcon onClick={(e) => { ClickToAddEmployees(row) }}
                                        /></Tooltip></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>

                </Box>

            </Box>

        </Fragment >
    )
}

export default memo(InductTopicAllocation)

