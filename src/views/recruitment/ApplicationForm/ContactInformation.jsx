import { Box, Typography } from '@mui/joy'
import React, { memo, lazy } from 'react'
import JoySalutation from 'src/views/MuiComponents/JoyComponent/JoySalutation'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyReligion from 'src/views/MuiComponents/JoyComponent/JoyReligion';
import JoyRegion from 'src/views/MuiComponents/JoyComponent/JoyRegion';

const ApplicationQuestion = lazy(() => import('./ApplicationQuestion'))

const ContactInformation = ({ setValue, value, Religion, date, setdate, setReligion, Region, setRegion, name, setname, lname, setlname, mname, mobile, setmobile, setmname, email, setemail, setreemail, reemail }) => {

    return (
        <Box sx={{ display: "flex", justifyContent: 'center', width: "100%", overflow: 'auto' }}>
            <Box sx={{ width: "50%", }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                    <Typography level="h5" sx={{}}>CONTACT INFORMATION</Typography>
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
                        <JoyInput

                            type="text"
                            value={name}
                            onchange={setname}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Last Name </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={lname}
                            onchange={setlname}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Middle Name </Typography>

                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={mname}
                            onchange={setmname}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Email Address </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={email}
                            onchange={setemail}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Reenter Email Address </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={reemail}
                            onchange={setreemail}
                            size="md"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Mobile Number </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={mobile}
                            onchange={setmobile}
                            size="md"
                        />
                    </Box>
                    <Typography level="h5" sx={{ mt: 3 }}>DIVERSITY INFORMATION</Typography>
                    <Box sx={{ display: 'flex', }}>
                        <Typography sx={{ mt: 3, }}>Region </Typography>
                        <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                    </Box>
                    <Box>
                        <JoyRegion regValue={Region} getRegion={setRegion} />
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
                        <JoyInput
                            // variant="plain"
                            type="date"
                            value={date}
                            onchange={setdate}
                            size="md"
                        />
                    </Box>

                    <Typography level="h5" sx={{ mt: 3 }}>APPLICATION QUESTIONS </Typography>
                    <Typography sx={{}}>Please answer the following questions.</Typography>
                    <ApplicationQuestion />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(ContactInformation)