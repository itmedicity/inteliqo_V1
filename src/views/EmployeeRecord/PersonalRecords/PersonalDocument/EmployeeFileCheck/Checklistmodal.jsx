
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import { Tooltip, IconButton } from '@mui/material'
import { Box, Typography, Button } from '@mui/joy'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import imageCompression from 'browser-image-compression'
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment'

const Checklistmodalview = lazy(() => import('./ChecklistmodalView'))

const Checklistmodal = ({ isModalOpen, setIsModalOpen, selectedRowData, itemname, Setitem, checklistid, Files, setcount, count }) => {

    const [empdata, setDetails] = useState({ emp_name: "", sect_name: "", em_no: "", desg_name: "" })
    const { emp_name, sect_name, em_no, } = empdata
    const [selectedFiles, setSelectedFiles] = useState([])
    const [selectedFileIndex, setSelectedFileIndex] = useState(-1)

    const handleFileChange = useCallback((e) => {
        const newFiles = [...selectedFiles]
        newFiles.push(e.target.files[0])
        setSelectedFiles(newFiles)

    }, [setSelectedFiles, selectedFiles])
    const handleRemoveFile = useCallback((index) => {
        const newFiles = [...selectedFiles]
        newFiles.splice(index, 1)
        setSelectedFiles(newFiles)

        // Reset the file input value to allow selecting the same file again
        const fileInput = document.getElementById('file-input')
        if (fileInput) {
            fileInput.value = null
        }
    }, [setSelectedFiles, selectedFiles])



    const openViewFileModal = useCallback((index) => {
        setSelectedFileIndex(index)
    }, [setSelectedFileIndex])

    // for saving the selected file
    // const handleOnClick = useCallback(
    //     async (event) => {
    //         event.preventDefault()
    //         if (!selectedFiles.length) {
    //             infoNofity('Please select files to upload.')
    //         } else {

    //             setFiles(selectedFiles)
    //             setIsModalOpen(false)
    //         }


    //     },
    //     [setFiles, selectedFiles],
    // )
    const handleImageUpload = useCallback(async (imageFile) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(imageFile, options)

        return compressedFile
    }, []);
    const handleOnClick = useCallback(
        async (event) => {
            event.preventDefault()

            try {
                if (!selectedFiles.length) {
                    infoNofity('Please select files to upload.')
                    return
                }

                const formData = new FormData()
                formData.append('em_id', selectedRowData?.em_id)
                formData.append('checklistid', checklistid)
                formData.append('itemname', itemname)
                formData.append('dept_name', selectedRowData?.dept_name)
                formData.append('em_name', selectedRowData?.em_name)
                formData.append('sect_name', selectedRowData?.dept_name)
                const currentDate = moment().format('YYYY-MM-DD'); // Get the current date in 'YYYY-MM-DD' format
                formData.append('upload_date', currentDate);
                for (const file of selectedFiles) {
                    if (file.type.startsWith('image')) {
                        const compressedFile = await handleImageUpload(file)
                        formData.append('files', compressedFile, compressedFile.name)
                    } else {
                        formData.append('files', file, file.name)
                    }
                }

                const result = await axioslogin.post('/upload/uploadchecklist', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })

                const { success, message } = result.data

                if (success === 1) {
                    setcount(count + 1)
                    succesNofity(message)
                    setIsModalOpen(false)
                    setSelectedFiles([])

                } else {
                    warningNofity(message)
                }

            } catch (error) {
                warningNofity('An error occurred during file upload.')
            }
        },
        [

            selectedRowData,
            handleImageUpload,
            selectedFiles, setcount,
            checklistid, count, itemname, setIsModalOpen,

        ],
    )
    useEffect(() => {
        if (Object.keys(selectedRowData).length !== 0) {
            const { emp_name, sect_name, em_no, desg_name } = selectedRowData
            const obj = {
                emp_name: emp_name === '' ? 'Not Updated' : emp_name.toLowerCase(),
                sect_name: sect_name === '' ? 'Not Updated' : sect_name.toLowerCase(),
                em_no: em_no,
                desg_name: desg_name === '' ? 'Not Updated' : desg_name.toLowerCase(),
            }
            setDetails(obj)
        }
        else {
            setDetails()
        }
    }, [selectedRowData])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        Setitem("")
        setSelectedFiles([])

    }, [setIsModalOpen, Setitem])
    // Render selected files with view buttons
    const renderSelectedFiles = () => {
        return selectedFiles.map((file, index) => (
            <Box
                key={index}
                sx={{
                    display: 'flex',
                    width: '100%',
                    padding: '1px 0',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: '5%', pr: 1, color: '#78C1F3' }}>{index + 1}.</Box>
                <Box sx={{ width: '75%' }}>{file.name}</Box>
                <Box sx={{ width: '20%' }}>
                    <Tooltip title="Close">
                        <IconButton color="primary" aria-label="Close" onClick={() => handleRemoveFile(index)}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View">
                        <IconButton color="primary" aria-label="View" onClick={() => openViewFileModal(index)}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        ))
    }
    return (
        <Box>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 1,
                        borderRadius: 10,


                    }}
                >
                    <Box sx={{ p: 2, border: 1, borderColor: "#6B728E" }}>

                        <Box sx={{}}>
                            {/* <WysiwygIcon color="success" sx={{ mr: 1 }} />
                            <Typography variant="h6">Checklist For Documents</Typography> */}
                            <CustmTypog title={'CheckList For Documents'} />

                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {/* <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Employee information
                            </Typography> */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {itemname || 'N/A'}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                <Box>
                                    <Typography variant="body1">Name: </Typography>
                                    <Typography variant="body1">Department Section:</Typography>
                                    <Typography variant="body1">Emp ID: </Typography>
                                    {/* <Typography variant="body1">Previous upload date: </Typography> */}

                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        Upload file:
                                    </Typography>

                                </Box>

                                <Box>
                                    <Typography sx={{ color: '#78C1F3', textTransform: "capitalize" }} variant="body1">
                                        {emp_name || 'N/A'}
                                    </Typography>

                                    <Typography sx={{ color: '#78C1F3', textTransform: "capitalize" }} variant="body1">
                                        {sect_name || 'N/A'}
                                    </Typography>
                                    <Typography sx={{ color: '#78C1F3' }} variant="body1">
                                        {em_no || 'N/A'}
                                    </Typography>

                                    <label htmlFor="file-input">
                                        <Tooltip title="Upload file">
                                            <Button variant="outlined" component="label" size="sm" color="danger" sx={{ mt: 1, p: 0 }}>
                                                <UploadFileIcon />
                                                <input
                                                    id="file-input"
                                                    type="file"
                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />
                                            </Button>
                                        </Tooltip>
                                    </label>

                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{}}>{renderSelectedFiles()}</Box>


                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button sx={{ p: 0, width: "10%", }} size='sm' variant="outlined" color="success" onClick={handleOnClick} >
                                Save
                            </Button>
                            <Button sx={{ p: 0, width: "10%" }} size='sm' variant="outlined" color="primary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Box>

            </Modal>
            <Checklistmodalview setSelectedFileIndex={setSelectedFileIndex} selectedFileIndex={selectedFileIndex} selectedFiles={selectedFiles} />
        </Box>
    )
}

export default memo(Checklistmodal)