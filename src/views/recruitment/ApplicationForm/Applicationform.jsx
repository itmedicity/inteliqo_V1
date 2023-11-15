import { Box } from '@mui/joy';
import React, { memo, lazy } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout';
const ContactInformation = lazy(() => import('./ContactInformation'))

const Applicationform = () => {
    const [value, setValue] = useState(0);
    const [name, setname] = useState('');
    const [lname, setlname] = useState('');
    const [mname, setmname] = useState('');
    const [email, setemail] = useState('');
    const [reemail, setreemail] = useState('');
    const [mobile, setmobile] = useState(0);
    const [Religion, setReligion] = useState(0);
    const [Region, setRegion] = useState(0);
    const [date, setdate] = useState(0);


    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home');
    }
    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', }} >
            <DasboardCustomLayout title={"Application Form"} displayClose={true} setClose={toRedirectToHome} >
                <Box sx={{ display: 'flex', flex: 1, py: 0.5, height: window.innerHeight - 120 }} >
                    <ContactInformation
                        value={value} setValue={setValue} setReligion={setReligion}
                        Religion={Religion} setname={setname} name={name}
                        setlname={setlname} lname={lname} mname={mname} setmname={setmname}
                        setemail={setemail} email={email} setreemail={setreemail} reemail={reemail} setmobile={setmobile}
                        mobile={mobile} setRegion={setRegion} Region={Region} setdate={setdate} date={date} />
                </Box>
            </DasboardCustomLayout>
        </Box>
    )
}

export default memo(Applicationform)