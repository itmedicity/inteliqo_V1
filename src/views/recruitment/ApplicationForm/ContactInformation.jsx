import { Box, IconButton, Tooltip, Typography } from '@mui/joy'
import React, { memo, lazy, useCallback, useMemo } from 'react'
import JoySalutation from 'src/views/MuiComponents/JoyComponent/JoySalutation'
import JoyReligion from 'src/views/MuiComponents/JoyComponent/JoyReligion';
import { useDispatch } from 'react-redux';
import { setRegionByPin } from 'src/redux/actions/Region.Action';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import RegionJoy from 'src/views/MuiComponents/JoyComponent/RegionJoy';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyGender from 'src/views/MuiComponents/JoyComponent/JoyGender'
import JoyBloodGroup from 'src/views/MuiComponents/JoyComponent/JoyBloodGroup'


const ApplicationQuestion = lazy(() => import('./ApplicationQuestion'))

const ContactInformation = ({ formdata, setformdata, Religion, Region, value, setRegion, setReligion, setValue, seteducation, Regionexp,
    setRegionexp, Regionedu, setRegionedu, handleOnClick, education, expdata, expdataset, experience, setexprience, education_details,
    seteducation_details, edudata, edudataset, eduname, addressPermnt1, setaddressPermnt1, addressPermnt2, setaddressPermnt2, gender, setGender,
    bloodgrp, setBloodgrp }) => {

    const { name, lname, mname, email, reemail, mobile, date, permnt_pin } = formdata;
    const dispatch = useDispatch();
    const contPin = useMemo(() => permnt_pin, [permnt_pin])

    const getRegion = useCallback(() => {
        if (contPin !== null) {
            dispatch(setRegionByPin(contPin));
        } else {
            dispatch(setRegionByPin(0));
        }
    }, [contPin, dispatch])

    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }, [formdata, setformdata]);

    return (
        <Box sx={{ display: "flex", justifyContent: 'center', width: "100%", overflow: 'auto' }}>
            <Box sx={{ width: "50%", }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    <Typography level="h4" sx={{}}>CONTACT INFORMATION</Typography>
                    <Typography sx={{}}>Please enter your contact information.</Typography>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Title </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <JoySalutation value={value} setValue={setValue} />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>First Name </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <InputComponent
                            type="text"
                            value={name}
                            name="name"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Last Name </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>

                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={lname}
                            name="lname"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Middle Name </Typography>

                    </Box>
                    <Box>
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={mname}
                            name="mname"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Email Address </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={email}
                            name="email"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Reenter Email Address </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={reemail}
                            name="reemail"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>


                    {email === '' ? <Typography sx={{}}></Typography> : email !== reemail ?
                        <Typography sx={{ color: "red" }}>Please check the email your entered</Typography> : <Typography sx={{ color: 'green' }}>Correct</Typography>}
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Mobile Number </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={mobile}
                            name="mobile"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                    <Typography level="h4" sx={{ mt: 3 }}>DIVERSITY INFORMATION</Typography>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Pincode </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={permnt_pin}
                            name='permnt_pin'
                            onchange={(e) => updateBoard(e)}
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
                        <RegionJoy regValue={Region} getRegion={setRegion} />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Religion </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <JoyReligion value={Religion} setValue={setReligion} />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Date of Birth </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <InputComponent
                            // variant="plain"
                            type="date"
                            value={date}
                            name="date"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Permanent Address </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <InputComponent
                        type="text"
                        size="sm"
                        placeholder="House Name"
                        name="addressPermnt1"
                        value={addressPermnt1}
                        onchange={(e) => setaddressPermnt1(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Permanent Address </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <InputComponent
                        type="text"
                        size="sm"
                        placeholder="Permanent Address"
                        name="addressPermnt1"
                        value={addressPermnt2}
                        onchange={(e) => setaddressPermnt2(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Gender </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <JoyGender
                        value={gender} setValue={setGender}
                    />
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Blood Group </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <JoyBloodGroup value={bloodgrp} setValue={setBloodgrp} />


                    <Typography level="h4" sx={{ mt: 3, color: 'black' }}>APPLICATION QUESTIONS </Typography>
                    <Typography sx={{}}>Please answer the following questions.</Typography>
                    <ApplicationQuestion setformdata={setformdata} formdata={formdata} seteducation={seteducation}
                        Regionexp={Regionexp} setRegionexp={setRegionexp} Regionedu={Regionedu} education={education}
                        setRegionedu={setRegionedu} handleOnClick={handleOnClick} expdata={expdata} expdataset={expdataset}
                        experience={experience} setexprience={setexprience} education_details={education_details}
                        seteducation_details={seteducation_details} edudata={edudata} edudataset={edudataset} eduname={eduname} />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(ContactInformation)