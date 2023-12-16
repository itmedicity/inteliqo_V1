import React, { useMemo, useState, useCallback, memo } from 'react'
import { Box, Button, Typography, Modal, Tooltip, IconButton } from '@mui/joy'
import ModalClose from '@mui/joy/ModalClose';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { useDispatch } from 'react-redux';
import RegionJoy from 'src/views/MuiComponents/JoyComponent/RegionJoy';
import { setRegionByPin } from 'src/redux/actions/Region.Action';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import moment from 'moment';

const ExperienceModal = ({ setIsModalOpen, isModalOpen, Regionexp, setRegionexp, formdata, setformdata, expdata, expdataset, experience, setexprience }) => {

    const { Employer, expstartdate, expenddate,
        Workingstatus, Responsibilities, jobexp, SupervisorName, Additionalinf, Other } = experience;


    const defaultState = useMemo(() => {
        return {
            Employer: '',
            expstartdate: moment(new Date()).format('YYYY-MM-DD'), expenddate: moment(new Date()).format('YYYY-MM-DD'),
            Workingstatus: false, Responsibilities: '', jobexp: "", SupervisorName: '', Additionalinf: '', Other: ""
        }
    }, [])


    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setexprience({ ...experience, [e.target.name]: value })
    }, [experience, setexprience]);

    const dispatch = useDispatch();
    const [permnt_pin, setPermnt_pin] = useState(0)
    const contPin = useMemo(() => permnt_pin, [permnt_pin])


    const getRegion = useCallback(() => {
        if (contPin !== null) {
            dispatch(setRegionByPin(contPin));
        } else {
            dispatch(setRegionByPin(0));
        }
    }, [contPin, dispatch])


    //adding  exp
    const addexpData = useCallback(() => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            Employer: Employer,
            expstartdate: expstartdate,
            expenddate: expenddate,
            Workingstatus: Workingstatus,
            Responsibilities: Responsibilities,
            jobexp: jobexp,
            SupervisorName: SupervisorName,
            Additionalinf: Additionalinf,
            Other: Other,
            Regionexp: Regionexp
        }
        const newdatas = [...expdata, newdata]
        expdataset(newdatas)
        setexprience(defaultState)
        setRegionexp(0)
        setPermnt_pin(0)
    }, [defaultState, Employer, expstartdate, expenddate, Workingstatus, Responsibilities, jobexp, SupervisorName, Additionalinf,
        Other, Regionexp, expdataset, setexprience, setRegionexp, setPermnt_pin, expdata])

    const Datasave = useCallback(() => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            Employer: Employer,
            expstartdate: expstartdate,
            expenddate: expenddate,
            Workingstatus: Workingstatus,
            Responsibilities: Responsibilities,
            jobexp: jobexp,
            SupervisorName: SupervisorName,
            Additionalinf: Additionalinf,
            Other: Other,
            Regionexp: Regionexp
        }
        const newdatas = [...expdata, newdata]
        expdataset(newdatas)
        setexprience(defaultState)
        setRegionexp(0)
        setPermnt_pin(0)
        setIsModalOpen(false)
    }, [defaultState, Employer, expstartdate, expenddate, Workingstatus, Responsibilities, jobexp, SupervisorName, Additionalinf,
        Other, Regionexp, expdataset, setexprience, setRegionexp, setPermnt_pin, setIsModalOpen, expdata])

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
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={Employer}
                                name="Employer"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Job Title
                                <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                            </Typography>
                        </Box>
                        <Box>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={jobexp}
                                name="jobexp"
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
                                value={expstartdate}
                                name="expstartdate"
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
                                value={expenddate}
                                name="expenddate"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <JoyCheckbox
                                label='Currently Working'
                                name="Workingstatus"
                                checked={Workingstatus}
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
                                    <ArrowCircleRightIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', }}>
                            <Typography sx={{ mt: 3, }}>Region </Typography>
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Box>
                        <Box>
                            <RegionJoy regValue={Regionexp} getRegion={setRegionexp} />
                        </Box>

                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Responsibilities
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={Responsibilities}
                                name="Responsibilities"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Supervisor Name

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={SupervisorName}
                                name="SupervisorName"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Additional Information

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={Additionalinf}
                                name="Additionalinf"
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>
                        <Box sx={{}}>
                            <Typography sx={{ mt: 3, }}>Other Compensation

                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <InputComponent
                                // variant="plain"
                                type="text"
                                value={Other}
                                name='Other'
                                onchange={(e) => updateBoard(e)}
                                size="md"
                            />
                        </Box>


                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button sx={{ p: 0, width: "15%", }} size='sm' variant="outlined" color="success" onClick={addexpData}
                        >
                            Add more
                        </Button>
                        <Button sx={{ p: 0, width: "15%" }} size='sm' variant="outlined" color="primary" onClick={Datasave}>
                            Save
                        </Button>
                    </Box>

                </Box>

            </Modal>


        </Box>
    )
}

export default memo(ExperienceModal)