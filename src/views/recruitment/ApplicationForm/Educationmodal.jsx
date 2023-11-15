import React, { useEffect, useMemo, memo } from 'react'
import { Box, Button, Modal, Typography } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import moment from 'moment';
import { Option, Select } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { setEducation } from 'src/redux/actions/Education.Action';
import _ from 'underscore';
import { setRegionList } from 'src/redux/actions/Region.Actions'

const Educationmodal = ({ setIsModalOpenedu,
    isModalOpenedu,
    schoolname,
    setschoolname,
    education,
    seteducation,
    edustartdate,
    setedustartdate,
    eduenddate,
    seteduenddate,
    Graduated,
    setGraduated,
    AvgGrade,
    setAvgGrade,
    gpa,
    setgpa,
    DateAcquired,
    setDateAcquired,
    ProjectedDate,
    setProjectedDate,
    setRegionedu,
    Regionedu }) => {

    const dispatch = useDispatch();
    useEffect(() => dispatch(setEducation()), [dispatch]);
    const empEducation = useSelector((state) => state?.getEmployeeEducation?.EducationList, _.isEqual);
    useEffect(() => dispatch(setRegionList()), [dispatch])
    const emRegion = useSelector((state) => state?.getRegionList?.RegionList, _.isEqual)

    // data save
    const postdata = useMemo(() => {
        return {
            education: education,
            schoolname: schoolname,
            edustartdate: moment(edustartdate).format('yyyy-MM-DD'),
            eduenddate: moment(eduenddate).format('yyyy-MM-DD'),
            Graduated: Graduated === true ? 1 : 0,
            Regionedu: Regionedu,
            AvgGrade: AvgGrade,
            gpa: gpa,
            DateAcquired: moment(DateAcquired).format('yyyy-MM-DD'),
            ProjectedDate: moment(ProjectedDate).format('yyyy-MM-DD'),

        }
    }, [education, schoolname, edustartdate, eduenddate, Graduated, Regionedu, AvgGrade, gpa, DateAcquired, ProjectedDate])

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
                    <CustmTypog title={'ManPower Request Approval'} />
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Education
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <Select
                                // disabled={false}
                                placeholder="education"
                                size="md"
                                variant="outlined"
                                // value={inTime}
                                onChange={(e) => seteducation(e.target.innerText)}
                            >
                                {empEducation?.map((val, idx) => <Option key={idx} value={val?.edu_desc} >{val.edu_desc}</Option>)}
                            </Select>

                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>School Name
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={schoolname}
                                onchange={setschoolname}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Start Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <JoyInput
                                // variant="plain"
                                type="date"
                                value={edustartdate}
                                onchange={setedustartdate}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>End Date
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <JoyInput
                                // variant="plain"
                                type="date"
                                value={eduenddate}
                                onchange={seteduenddate}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <JoyCheckbox
                                label='Graduated'
                                name="Graduated"
                                checked={Graduated}
                                onchange={(e) =>
                                    setGraduated(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Region
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <Select
                                // disabled={false}
                                placeholder="Place"
                                size="md"
                                variant="outlined"
                                slotProps={{
                                    listbox: {
                                        component: 'div',
                                        sx: {
                                            maxHeight: 240,
                                            overflow: 'auto',
                                            '--List-padding': '0px',
                                            '--ListItem-radius': '0px',
                                        },
                                    },
                                }}
                                // value={inTime}
                                onChange={(e) => setRegionedu(e.target.innerText)}
                            >
                                {emRegion?.map((val, idx) => <Option sx={{ overflow: 'auto' }} key={idx} value={val?.reg_name} >{val.reg_name}</Option>)}
                            </Select>
                            {/* <JoyRegion regValue={Regionedu} getRegion={setRegionedu} /> */}
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Average Grade
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={AvgGrade}
                                onchange={setAvgGrade}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>GPA

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={gpa}
                                onchange={setgpa}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Date Acquired

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="date"
                                value={DateAcquired}
                                onchange={setDateAcquired}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Projected Completion Date

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="date"
                                value={ProjectedDate}
                                onchange={setProjectedDate}
                                size="md"
                            />
                        </Box>


                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button sx={{ p: 0, width: "15%", }} size='sm' variant="outlined" color="success" >
                            Add more
                        </Button>
                        {/* <Button sx={{ p: 0, width: "12%" }} size='sm' variant="outlined" color="primary">
                                Reject
                            </Button> */}
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(Educationmodal)