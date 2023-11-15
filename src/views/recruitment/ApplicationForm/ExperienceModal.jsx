import React, { useMemo, useEffect } from 'react'
import { memo } from 'react'
import { Box, Button, Typography, Modal } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setRegionList } from 'src/redux/actions/Region.Actions'
import _ from 'underscore';
import { Option, Select } from '@mui/joy';


const ExperienceModal = ({ setIsModalOpen, isModalOpen, setEmployer, Employer, setjob, job,
    expstartdate, setexpstartdate, expenddate, setexpenddate, Workingstatus, setWorkingstatus,
    Responsibilities, setResponsibilities, SupervisorName, setSupervisorName, Additionalinf,
    setAdditionalinf, Other, setOther, setRegionexp, Regionexp }) => {
    const dispatch = useDispatch();
    useEffect(() => dispatch(setRegionList()), [dispatch])
    const emRegion = useSelector((state) => state?.getRegionList?.RegionList, _.isEqual)
    // data save
    const postdata = useMemo(() => {
        return {
            Employer: Employer,
            job: job,
            expstartdate: moment(expstartdate).format('yyyy-MM-DD'),
            expenddate: moment(expenddate).format('yyyy-MM-DD'),
            Workingstatus: Workingstatus === true ? 1 : 0,
            Regionexp: Regionexp,
            Responsibilities: Responsibilities,
            SupervisorName: SupervisorName,
            Additionalinf: Additionalinf,
            Other: Other
        }
    }, [Employer, job, expstartdate, expenddate, Workingstatus, Regionexp, Responsibilities, SupervisorName, Additionalinf, Other])



    return (
        <Box>
            <Modal variant="plain" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                            boxShadow: '0 0px 0px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <CustmTypog title={'Add Your Experience'} />
                    <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Employer Name
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={Employer}
                                onchange={setEmployer}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Job Title
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={job}
                                onchange={setjob}
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
                                value={expstartdate}
                                onchange={setexpstartdate}
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
                                value={expenddate}
                                onchange={setexpenddate}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <JoyCheckbox
                                label='Currently Working'
                                name="Workingstatus"
                                checked={Workingstatus}
                                onchange={(e) => setWorkingstatus(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Region

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <Select
                                // disabled={false}
                                placeholder="education"
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
                                onChange={(e) => setRegionexp(e.target.innerText)}
                            >
                                {emRegion?.map((val, idx) => <Option sx={{ overflow: 'auto' }} key={idx} value={val?.reg_name} >{val.reg_name}</Option>)}
                            </Select>
                            {/* <JoyRegion regValue={Region} getRegion={setRegion} /> */}
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Responsibilities
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={Responsibilities}
                                onchange={setResponsibilities}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Supervisor Name

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={SupervisorName}
                                onchange={setSupervisorName}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Additional Information

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={Additionalinf}
                                onchange={setAdditionalinf}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Other Compensation

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <JoyInput
                                // variant="plain"
                                type="text"
                                value={Other}
                                onchange={setOther}
                                size="md"
                            />
                        </Box>


                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button sx={{ p: 0, width: "15%", }} size='sm' variant="outlined" color="success" >
                            Add more
                        </Button>
                    </Box>

                </Box>

            </Modal>


        </Box>
    )
}

export default memo(ExperienceModal)