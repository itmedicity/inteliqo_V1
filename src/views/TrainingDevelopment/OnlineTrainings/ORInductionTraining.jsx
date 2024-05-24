import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton as OpenIcon, Paper } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { OnlineInductionTrainingTopicListOfEmp } from 'src/redux/actions/Training.Action';
import { addHours, addMinutes, format } from 'date-fns';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PdfViewerQR from '../OnlineTraining/PdfViewerQR';
import VideoPlayerPageQR from '../OnlineTraining/VideoPlayerPageQR';

const ORInductionTraining = () => {
    const dispatch = useDispatch()
    const [tabledata, setTabledata] = useState([]);
    const [count, Setcount] = useState(0);
    const [open, setOpen] = useState(false);
    const [Userdata, setUserdata] = useState([]);
    const [Pdfopen, setPdfopen] = useState(false);

    const { emId, id } = useParams();

    useEffect(() => {
        dispatch(OnlineInductionTrainingTopicListOfEmp(emId))
        Setcount(0);
    }, [dispatch, emId, count])

    //login employee topics
    const InductEmpOnlineTopics = useSelector((state) => state?.gettrainingData?.InductionOnlineTraining?.InductionOnlineTrainingList, _.isEqual)

    useEffect(() => {
        const displayData = InductEmpOnlineTopics?.map((val) => {
            const check_date = addMinutes(new Date(val.exact_date), val.video_time)
            const vdotimeformat = format(new Date(addMinutes(new Date(check_date), 5)), "yyyy-MM-dd hh:mm:ss")
            const getpdf = addHours(new Date(val.exact_date), val.pdf_time)
            const pdftimeformat = format(new Date(getpdf), "yyyy-MM-dd hh:mm:ss")

            const object = {
                sno: val.sno,
                induction_slno: val.induction_slno,
                indct_emp_no: val.indct_emp_no,
                schedule_topic: val.schedule_topic,
                training_status: val.training_status,
                pretest_status: val.pretest_status,
                posttest_status: val.posttest_status,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                online_status: val.online_status,
                both_status: val.both_status,
                video_link: val.video_link,
                upload_status: val.upload_status,
                video_time: val.video_time,
                pdf_time: val.pdf_time,
                posttest_permission: val.posttest_permission,
                exact_date: val.exact_date,
                checkVdo: val.upload_status === 0 ? vdotimeformat : null,
                checkPDF: val.upload_status === 1 ? pdftimeformat : null,
                current_tym: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
                em_id: val.em_id,
                em_name: val.em_name,
                question_count: val.question_count
            }
            return object;

        })
        setTabledata(displayData)
    }, [InductEmpOnlineTopics, setTabledata])

    const handleClickOpen = useCallback((params) => {
        const { upload_status } = params.data
        if (upload_status !== 0) {
            setPdfopen(true)
            setOpen(true);
            setUserdata(params.data);
        }
        else {
            setOpen(true);
            setUserdata(params.data);
        }
    }, [setOpen, setPdfopen, setUserdata]);

    const reset = useCallback(() => {
        setOpen(false)
        setPdfopen(false)
    }, [])

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
        },
    ])

    return (
        <Fragment>
            {open === true ?
                <VideoPlayerPageQR count={count} id={id} Setcount={Setcount} open={open} setOpen={setOpen} Userdata={Userdata} reset={reset} />
                :
                <Box sx={{ width: "100%", p: 1 }}>
                    <Paper variant='outlined' square sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tabledata}
                            sx={{
                                height: 650,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Paper>
                </Box>
            }
            {Pdfopen === true ? <PdfViewerQR id={id} Userdata={Userdata} setOpen={setOpen} open={open} reset={reset} /> : null}
        </Fragment>
    )
}

export default memo(ORInductionTraining)

