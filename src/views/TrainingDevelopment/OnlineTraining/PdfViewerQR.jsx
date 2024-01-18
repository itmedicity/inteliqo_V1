import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Button, Paper } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PdfViewerQR = ({ setOpen, id, open, reset, Userdata }) => {
    const history = useHistory()

    const [uploads, setUploads] = useState([]);

    const handleClose = useCallback(() => {
        setOpen(false);
        reset();
    }, [setOpen, reset]);

    const [dis, setDis] = useState({
        video_link: '',
        em_id: 0,
        topic_slno: 0,
        question_count: 0,
        checkPDF: '',
        current_tym: ''
    })

    const { checkPDF, em_id, topic_slno, question_count, current_tym } = dis;

    useEffect(() => {
        if (Object.keys(Userdata).length !== 0) {
            const { video_link, em_id, topic_slno, question_count, checkPDF, current_tym } = Userdata;
            const obj = {
                video_link: video_link,
                em_id: em_id,
                topic_slno: topic_slno,
                question_count: question_count,
                checkPDF: checkPDF,
                current_tym: current_tym
            }
            setDis(obj)
        }
    }, [Userdata])

    const StartPostTest = useCallback(() => {
        if (em_id !== 0 && topic_slno !== 0 && question_count !== 0) {
            history.push(`/OnlinePostTest/${id}/${em_id}/${topic_slno}/${question_count}`)
        }
    }, [em_id, history, topic_slno, id, question_count])


    useEffect(() => {
        const GetData = async () => {
            if (topic_slno !== 0) {
                const postData = {
                    topic_slno: topic_slno
                }
                const response = await axioslogin.post('/Training_topic_uploads/selectuploads', postData)
                const { success } = response.data
                if (success === 1) {
                    const data = response.data;
                    const fileNames = data.data
                    const fileUrls = fileNames?.map((filename) => {
                        const url = `${PUBLIC_NAS_FOLDER}/TrainingTopicUploads/${topic_slno}/${filename}`;
                        return setUploads(url);
                    });
                    return fileUrls
                }
            }
        }
        GetData();
    }, [topic_slno, setUploads])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog layout="fullscreen">
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
                    <Paper sx={{ flex: 1 }}>
                        <embed
                            id="pdf-embed"
                            src={uploads}
                            type="application/pdf"
                            height="100%"
                            width="100%" />
                    </Paper>
                    <Paper sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
                        {
                            checkPDF < current_tym ?
                                <Button
                                    variant="contained"
                                    onClick={StartPostTest}
                                    sx={{ p: 2 }}>
                                    Start Post-Test <ArrowForwardIosIcon />
                                </Button>
                                :
                                <Button
                                    disabled
                                    variant="contained"
                                    sx={{ p: 2 }}>
                                    Attend To PostTest <ArrowForwardIosIcon />
                                </Button>
                        }
                    </Paper>
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(PdfViewerQR)
