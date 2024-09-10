
import { Box, IconButton, Typography, Modal, ModalClose } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Paper } from '@mui/material';
import JoySkill from 'src/views/MuiComponents/JoyComponent/JoySkill';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ModalSkill = ({ setIsModalOpenskill, isModalOpenskill, em_department, desg }) => {
    const [skilldata, setSkilldata] = useState(0)
    const [skillName, setSkillName] = useState('')
    const [tableData, settableData] = useState([])
    const [slno, setSlno] = useState(0)
    const [value, setvalue] = useState(0)
    const [Count, setCount] = useState(0)
    const [SkillCount, setskillCount] = useState(0)

    const TableValues = useMemo(() => tableData, [tableData])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', width: 20, },
        { headerName: 'Skill', field: 'skill_name', autoHeight: true, wrapText: true, },
        {
            headerName: 'Edit', width: 20, cellRenderer: params =>
                <IconButton sx={{ mb: 1 }} size='sm' color='primary'
                    onClick={() => EditData(params)}
                >
                    <EditIcon />
                </IconButton>
        },
        {
            headerName: 'Delete', width: 20, cellRenderer: params =>
                <IconButton sx={{ mb: 1 }} size='sm' color='primary'
                    onClick={() => DeleteItem(params)}
                >
                    <DeleteIcon />
                </IconButton>
        },
    ])
    //edit data select
    const EditData = useCallback((params) => {
        setvalue(1)
        const data = params.api.getSelectedRows()
        const { Skills_slNo, skill } = data[0]
        setSkilldata(skill)
        setSlno(Skills_slNo)
    }, [])
    //for getting the job desc from database
    const checkData = useMemo(() => {
        return {
            designation: desg,
            Dept_id: em_department,

        }
    }, [desg, em_department])
    useEffect(() => {
        if (desg !== 0) {
            const getdutiesandResp = async () => {
                const result = await axioslogin.post('/JobAndSkillDesc/getSkill', checkData)
                const { success, data } = result.data
                if (success === 1) {
                    settableData(data)
                    setCount(0)
                } else {
                    settableData([])
                    warningNofity("No Skill added")

                }
            }
            getdutiesandResp()
        } else {
            settableData([])
        }
        return () => {
            settableData([])
        }
    }, [checkData, Count])
    //for save and edit
    const PersonalData = useMemo(() => {
        return {
            designation: desg,
            Dept_id: em_department,
            skillName: skillName,
            skillid: skilldata,
            slno: slno,
        }
    }, [desg, em_department, skillName, skilldata])

    const SubmitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (desg === 0) {
            warningNofity('Select the Designation')
        } else {
            if (value === 0) {
                const result = await axioslogin.post('/JobAndSkillDesc/InsertSkill', PersonalData)
                const { message, success } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setCount(1)
                    setSkilldata(0)
                    setSkillName('')
                    setskillCount(1)
                }
                else {
                    warningNofity(message)
                }
            } else {
                const result = await axioslogin.post('/JobAndSkillDesc/UpdateSkill', PersonalData)
                const { message, success } = result.data
                if (success === 1) {
                    succesNofity(message)
                    setCount(1)
                    setSkilldata(0)
                    setSkillName('')
                    setskillCount(1)
                }
                else {
                    warningNofity(message)
                }
            }
        }
    }, [PersonalData, desg, em_department, setCount])

    //for delete
    const DeleteItem = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const value = data && data.map((val) => {
            return val.Skills_slNo
        })
        const deltevalue = async (value) => {
            const result = await axioslogin.delete(`/JobAndSkillDesc/deleteskilldata/select/${value}`)
            const { success, message } = result.data
            if (success === 5) {
                succesNofity(message)
                setCount(1)
            }
            else {
                warningNofity(message)
            }
        }
        deltevalue(value)
    }, [setCount])
    return (
        <Box>
            <Modal open={isModalOpenskill} onClose={() => setIsModalOpenskill(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 1,
                        borderRadius: 10,
                    }}
                ><ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{}}>
                        <ToastContainer />
                        <Box sx={{ flex: 1, mt: 1 }} >
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Skills
                            </Typography>
                        </Box>

                        <Paper square variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                            <Box sx={{ display: "flex", alignItems: "center", pb: 0.5 }} >
                                <Box sx={{ flex: 1, pr: 1 }}>
                                    <JoySkill skillValue={skilldata} getSkill={setSkilldata} setSkillName={setSkillName} count={SkillCount} setskillCount={setskillCount} />
                                </Box>
                                <Box sx={{ flex: 0, px: 0.5 }} >
                                    <IconButton variant="outlined" size='sm'
                                        onClick={SubmitFormData}
                                        sx={{ color: 'green' }}>
                                        <LibraryAddCheckOutlinedIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={TableValues}
                                sx={{
                                    height: 300,
                                    width: "100%"
                                }} rowHeight={30} headerHeight={30} />
                        </Paper>
                    </Box>
                </Box>

            </Modal>


        </Box>
    )
}

export default memo(ModalSkill) 