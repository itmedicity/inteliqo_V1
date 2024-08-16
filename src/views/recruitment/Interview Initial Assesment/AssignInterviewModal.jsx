import React, { memo, useCallback, useMemo, useState } from 'react'
import { Box, Button, IconButton, Modal, ModalDialog, Option, Select, Table, Tooltip, Typography } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import { Paper } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import moment from 'moment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const AssignInterviewModal = ({ ModalOpen, setModalOpen, personaldata }) => {

    const [inchargereq, setinchargereq] = useState(0);
    const [inchargelevel, setinchargelevel] = useState(0);
    const [Hodreq, setHodreq] = useState(0);
    const [Hodlevel, setHodlevel] = useState(0);
    const [Msreq, setMsreq] = useState(0);
    const [MSlevel, setMslevel] = useState(0);
    const [Dmsreq, setDmsreq] = useState(0);
    const [Dmslevel, setDmslevel] = useState(0);
    const [Operationreq, setOperationreq] = useState(0);
    const [Operationlevel, setOperationlevel] = useState(0);
    const [Ceoreq, setCeoreq] = useState(0);
    const [Ceolevel, setCeolevel] = useState(0);
    const [Hrreq, setHrreq] = useState(0);
    const [Hrlevel, setHrlevel] = useState(0);
    const [level, setlevel] = useState(0);
    const [type, settype] = useState(0);
    const [count, setcount] = useState(0);

    const [value, setValue] = useState([]);
    const handleAddMore = useCallback(() => {
        if (type === 1) {
            setinchargelevel(level || 0)
            setinchargereq(1)
        } else if (type === 2) {
            setHodreq(1)
            setHodlevel(level || 0)
        } else if (type === 3) {
            setMsreq(1)
            setMslevel(level || 0)
        } else if (type === 4) {
            setDmsreq(1)
            setDmslevel(level || 0)
        } else if (type === 5) {
            setOperationreq(1)
            setOperationlevel(level || 0)
        } else if (type === 6) {
            setCeoreq(1)
            setCeolevel(level || 0)
        }
        setlevel(0)
        settype(0)
        setcount(1)
        setValue([...value, {
            levelvalue: level,
            authority: type,

        }]);
    }, [type, level]);


    const onClose = useCallback((e) => {
        setModalOpen(false)
    }, [setModalOpen])

    const postdata = useMemo(() => {
        return {
            inchargereq: inchargereq,
            inchargelevel: inchargelevel,
            Hodreq: Hodreq,
            Hodlevel: Hodlevel,
            Msreq: Msreq,
            MSlevel: MSlevel,
            Dmsreq: Dmsreq,
            Dmslevel: Dmslevel,
            Operationreq: Operationreq,
            Operationlevel: Operationlevel,
            Ceoreq: Ceoreq,
            Ceolevel: Ceolevel,
            application_no: personaldata?.application_no,
            desg_id: personaldata?.desg_id,

        }
    }, [inchargereq, inchargelevel, Hodlevel, Hodreq, Msreq, MSlevel, Dmsreq, Dmslevel, Operationreq, Operationlevel, Ceoreq, Ceolevel, personaldata])
    const handleOnClick = useCallback(async () => {
        if (count === 0) {
            setModalOpen(false)
            warningNofity("Please Enter The Details")
        } else {
            const result = await axioslogin.post('/Applicationform/InterviewLevel', postdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setModalOpen(false)
                setcount(0)
                setValue([])
            }
            else {
                warningNofity(message)
            }
        }


    }, [postdata, count, setcount, setModalOpen]);


    return (
        <Box >

            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={ModalOpen}
                onClose={onClose}

            >
                <ModalDialog size='lg'>
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

                    <Box sx={{ overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                        <CustmTypog title={' Information'} />

                        <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%', mt: 1 }} size='sm' borderAxis="both">
                            <tbody>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Name </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{personaldata?.first_name === '' ? "Not Updated" : personaldata?.first_name} </Typography>
                                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{personaldata?.last_name} </Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>   Email Address</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{personaldata?.email === '' ? "Not Updated" : personaldata?.email}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> Mobile Number</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}> {personaldata?.mobile_num === 0 ? 'Not Updated' : personaldata?.mobile_num}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Region</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{personaldata?.reg_name === null ? "Not Updated" : personaldata?.reg_name}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Religion</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{personaldata?.relg_name === '' ? "Not Updated" : personaldata?.relg_name}</Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>Date of Birth</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography sx={{ ml: 1 }}>{personaldata?.dob === 0 ? "Not Updated" : moment(personaldata?.dob).format('DD-MM-YYYY')}</Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Box sx={{ mt: 1 }}>
                            <CustmTypog title={' Please Select The Level'} />
                        </Box>

                        <Box sx={{ display: 'flex', width: '100%', gap: .5 }}>
                            <Box sx={{ width: '50%' }}>
                                <Select
                                    value={level}
                                    onChange={(event, newValue) => {
                                        setlevel(newValue);
                                    }}
                                    size='sm'
                                    variant='outlined'
                                    sx={{ mt: 1 }}
                                >
                                    <Option value={0} disabled={true}>Select Level</Option>
                                    <Option value={1}>Level 1</Option>
                                    <Option value={2}>Level 2</Option>
                                    <Option value={3}>Level 3</Option>
                                    <Option value={4}>Level 4</Option>
                                    <Option value={5}>Level 5</Option>
                                    <Option value={6}>Level 6</Option>
                                </Select>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <Select
                                    value={type}
                                    onChange={(event, newValue) => {
                                        settype(newValue);
                                    }}
                                    size='sm'
                                    variant='outlined'
                                    sx={{ mt: 1 }}
                                >
                                    <Option value={0} disabled={true}>Select Interview Authority</Option>
                                    <Option value={1}>Incharge</Option>
                                    <Option value={2}>HOD</Option>
                                    <Option value={3}>MS</Option>
                                    <Option value={4}>DMS</Option>
                                    <Option value={5}>Operation</Option>
                                    <Option value={6}>CEO</Option>
                                </Select>
                            </Box>
                            <Box sx={{ mt: .5, }}>
                                <Tooltip title="Add data" followCursor placement='top' arrow>
                                    <IconButton sx={{ paddingY: 0.5, ml: 2, color: '#5BBCFF', }} onClick={handleAddMore}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>

                        </Box>

                        {value?.length > 0 ?
                            <Table size='sm' borderAxis="both" sx={{ mt: 1 }}>
                                <thead >
                                    <tr>
                                        <th style={{ textAlign: "center" }}>Level</th>
                                        <th style={{ textAlign: "center" }}>Interview Authority</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {value?.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: "center" }}>{item?.levelvalue === 1 ? "Level 1" :
                                                item?.levelvalue === 2 ? "Level 2" :
                                                    item?.levelvalue === 3 ? "Level 3" :
                                                        item?.levelvalue === 4 ? "Level 4" :
                                                            item?.levelvalue === 5 ? "Level 5" :
                                                                item?.levelvalue === 6 ? "Level 6" :
                                                                    item?.levelvalue === 0 ? "Not Updated" :
                                                                        "Not Updated"}
                                            </td>
                                            <td style={{ textAlign: "center" }}>{item?.authority === 1 ? "INCHARGE" :
                                                item?.authority === 2 ? "HOD" :
                                                    item?.authority === 3 ? "MS" :
                                                        item?.authority === 4 ? "DMS" :
                                                            item?.authority === 5 ? "OPERATION" :
                                                                item?.authority === 6 ? "CEO" :
                                                                    "Not Updated"
                                            }</td>

                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                            : null}
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        {level === 0 && type === 0 ?
                            <Tooltip title="Save">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="sm"
                                    color="primary"
                                    onClick={handleOnClick}
                                >
                                    Submit Application
                                </Button>
                            </Tooltip>
                            :
                            <Tooltip title="Save">
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="sm"
                                    disabled={true}
                                    color="primary"
                                    onClick={handleOnClick}
                                >
                                    Submit Application
                                </Button>
                            </Tooltip>
                        }



                    </Box>

                </ModalDialog>
            </Modal>

        </Box>
    )
}

export default memo(AssignInterviewModal)