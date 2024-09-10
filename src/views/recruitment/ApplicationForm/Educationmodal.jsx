import React, { useEffect, useMemo, memo, useState, useCallback } from 'react'
import { Box, Button, IconButton, Modal, Tooltip, Typography } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { Option, Select } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { setEducation } from 'src/redux/actions/Education.Action';
import _ from 'underscore';
import RegionJoy from 'src/views/MuiComponents/JoyComponent/RegionJoy';
import { setRegionByPin } from 'src/redux/actions/Region.Action';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import moment from 'moment';

const Educationmodal = ({ setIsModalOpenedu,
    isModalOpenedu,
    Regionedu, setRegionedu, formdata, setformdata, seteducation, education_details, seteducation_details, edudata, edudataset, education }) => {

    const {
        schoolname, edustartdate, eduenddate, Graduated, AvgGrade, gpa,
        DateAcquired, ProjectedDate } = education_details;

    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        seteducation_details({ ...education_details, [e.target.name]: value })
    }, [education_details, seteducation_details]);

    const defaultState = useMemo(() => {
        return {
            schoolname: '',
            edustartdate: moment(new Date()).format('YYYY-MM-DD'), eduenddate: moment(new Date()).format('YYYY-MM-DD'),
            Graduated: false, AvgGrade: '', gpa: "", DateAcquired: moment(new Date()).format('YYYY-MM-DD'), ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
        }
    }, [])
    // const [Region, setRegion] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => dispatch(setEducation()), [dispatch]);
    const empEducation = useSelector((state) => state?.getEmployeeEducation?.EducationList, _.isEqual);


    const [permnt_pin, setPermnt_pin] = useState(0)
    const contPin = useMemo(() => permnt_pin, [permnt_pin])

    const getRegion = useCallback(() => {
        if (contPin !== null) {
            dispatch(setRegionByPin(contPin));
        } else {
            dispatch(setRegionByPin(0));
        }
    }, [contPin, dispatch])

    //adding  edu
    const addeduData = useCallback(() => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            schoolname: schoolname,
            edustartdate: edustartdate,
            eduenddate: eduenddate,
            Graduated: Graduated,
            AvgGrade: AvgGrade,
            gpa: gpa,
            DateAcquired: DateAcquired,
            ProjectedDate: ProjectedDate,
            Regionedu: Regionedu,
            education: education
        }
        const newdatas = [...edudata, newdata]
        edudataset(newdatas)
        seteducation_details(defaultState)
        seteducation(0)
        setRegionedu(0)
        setPermnt_pin(0)
    }, [defaultState, AvgGrade, schoolname, edustartdate, eduenddate, Graduated, gpa, DateAcquired, ProjectedDate, Regionedu, education
        , edudataset, seteducation_details, seteducation, setRegionedu, setPermnt_pin, edudata])
    //for saving
    const Datasave = useCallback(() => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            schoolname: schoolname,
            edustartdate: edustartdate,
            eduenddate: eduenddate,
            Graduated: Graduated,
            AvgGrade: AvgGrade,
            gpa: gpa,
            DateAcquired: DateAcquired,
            ProjectedDate: ProjectedDate,
            Regionedu: Regionedu,
            education: education
        }
        const newdatas = [...edudata, newdata]
        edudataset(newdatas)
        seteducation_details(defaultState)
        seteducation(0)
        setRegionedu(0)
        setPermnt_pin(0)
        setIsModalOpenedu(false)
    }, [defaultState, AvgGrade, schoolname, edustartdate, eduenddate, Graduated, gpa, DateAcquired, ProjectedDate, Regionedu, education
        , edudataset, seteducation_details, seteducation, setRegionedu, setPermnt_pin, setIsModalOpenedu, edudata])
    return (
        <Box>
            <Modal open={isModalOpenedu} onClose={() => setIsModalOpenedu(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        border: 1
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
                    <CustmTypog title={'Add your Educational Information'} />
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Education
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Select
                                onChange={(event, newValue) => {
                                    seteducation(newValue)
                                }}
                                // disabled={false}
                                placeholder="education"
                                size="md"
                                variant="outlined"
                                value={education}
                            //onChange={(e) => seteducation(e.target.value)}                       
                            >
                                {empEducation?.map((val, idx) => <Option key={idx} value={val?.edu_slno} >{val.edu_desc}</Option>)}
                            </Select>

                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>School Name
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={schoolname}
                                name="schoolname"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Start Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={edustartdate}
                                name="edustartdate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>End Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={eduenddate}
                                name="eduenddate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <JoyCheckbox
                                label='Graduated'
                                name="Graduated"
                                checked={Graduated}
                                onchange={(e) => updateBoard(e)}
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Enter Pincode
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={permnt_pin}
                                onchange={setPermnt_pin}
                                size="md"
                            />
                            <Tooltip title="Click" followCursor placement='top' arrow >
                                <IconButton sx={{ paddingY: 0.5, ml: 2 }}
                                    onClick={(e) => getRegion(e)}
                                >
                                    <ArrowCircleRightIcon
                                        color="primary"
                                        sx={{
                                            animation: 'move 1s ease infinite',
                                            '@keyframes move': {
                                                '0%': {
                                                    transform: 'translateX(-10px)',
                                                },
                                                '50%': {
                                                    transform: 'translateX(10px)',
                                                },
                                                '100%': {
                                                    transform: 'translateX(-10px)',
                                                },
                                            },
                                        }}
                                    />

                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Region </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <RegionJoy regValue={Regionedu} getRegion={setRegionedu} />
                        </Box>

                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Average Grade
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={AvgGrade}
                                name="AvgGrade"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>GPA

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={gpa}
                                name="gpa"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Date Acquired

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={DateAcquired}
                                name="DateAcquired"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Projected Completion Date

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="date"
                                value={ProjectedDate}
                                name="ProjectedDate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>


                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button sx={{ p: 0, width: "15%", }} size='sm' variant="outlined" color="success" onClick={addeduData} >
                            Add more
                        </Button>
                        <Button sx={{ p: 0, width: "15%" }} size='sm' variant="outlined" color="primary" onClick={Datasave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal >
        </Box >
    )
}

export default memo(Educationmodal)