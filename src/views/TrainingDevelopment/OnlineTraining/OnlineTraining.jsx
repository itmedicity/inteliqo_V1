import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton as OpenIcon, Paper } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { OnlineTrainingTopicListOfEmp } from 'src/redux/actions/Training.Action';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import VideoPlayerPage from './VideoPlayerPage';

const OnlineTraining = () => {
    const dispatch = useDispatch()
    const [tabledata, setTabledata] = useState([]);
    const [count, Setcount] = useState(0);
    const [open, setOpen] = useState(false);
    const [Userdata, setUserdata] = useState([]);


    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    useEffect(() => {
        dispatch(OnlineTrainingTopicListOfEmp(em_id))
        Setcount(0);
    }, [dispatch, em_id, count])

    //login employee topics
    const EmpOnlineTopics = useSelector((state) => state?.gettrainingData?.OnlineTraining?.OnlineTrainingList, _.isEqual)

    useEffect(() => {
        const displayData = EmpOnlineTopics?.map((val) => {
            const object = {
                sno: val.sno,
                slno: val.slno,
                emp_name: val.emp_name,
                topic: val.topic,
                training_status: val.training_status,
                pretest_status: val.pretest_status,
                posttest_status: val.posttest_status,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                online_status: val.online_status,
                both_status: val.both_status,
                video_link: val.video_link,
            }
            return object;
        })
        setTabledata(displayData)
    }, [EmpOnlineTopics, setTabledata])

    // const handleClickOpen = useCallback((params) => {
    //     const data = params.api.getSelectedRows()
    //     setOpen(true);
    //     const { slno } = data[0]
    //     setSno(slno);
    //     setUserdata(data);
    // }, [setOpen, setUserdata]);

    const handleClickOpen = useCallback((params) => {
        setOpen(true);
        setUserdata(params.data);
    }, [setOpen, setUserdata]);


    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'sno', filter: true, width: 100 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 200 },

        {
            headerName: 'Action', cellRenderer: params =>
                <OpenIcon sx={{ paddingY: 0.5 }}
                    onClick={(e) => handleClickOpen(params)}
                >
                    <LaunchIcon color='primary' />
                </OpenIcon>
        }
    ])

    return (
        <CustomLayout title="Online Training" displayClose={true} >
            {open === true ?
                <VideoPlayerPage count={count} Setcount={Setcount} open={open} setOpen={setOpen} Userdata={Userdata} />
                :
                <Box sx={{ width: "100%", p: 1 }}>
                    <Paper variant='outlined' square sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tabledata}
                            sx={{
                                height: 700,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Paper>
                </Box>
            }
        </CustomLayout >
    )
}

export default memo(OnlineTraining)
