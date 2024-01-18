import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Paper } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const PdfViewer = ({ setOpen, open, reset, Userdata }) => {
    const [uploads, setUploads] = useState([]);

    const handleClose = useCallback(() => {
        setOpen(false);
        reset();
    }, [setOpen, reset]);

    const [dis, setDis] = useState({
        topic_slno: 0
    })

    const { topic_slno } = dis;

    useEffect(() => {
        if (Object.keys(Userdata).length !== 0) {
            const { topic_slno, checkPDF, current_tym } = Userdata;
            const obj = {
                topic_slno: topic_slno,
                checkPDF: checkPDF,
                current_tym: current_tym
            }
            setDis(obj)
        }
    }, [Userdata])

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
                </ModalDialog>
            </Modal>
        </Fragment>
    )
}

export default memo(PdfViewer)
