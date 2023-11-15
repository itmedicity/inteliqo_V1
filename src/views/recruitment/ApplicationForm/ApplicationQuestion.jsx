import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { lazy } from 'react';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
const WorkAndEducation = lazy(() => import('./WorkAndEducation'))

const ApplicationQuestion = () => {
    const [Health_statusyes, sethealthyes] = useState(false)
    const [Health_statusno, sethealthno] = useState(false)
    const [Health, sethealth] = useState('')
    const [job, setjob] = useState('')
    const [empemail, setempemail] = useState('')
    const [empname, setempname] = useState('')
    const [empno, setempno] = useState('')
    const [criminal_statusyes, setcriminal_statusyes] = useState(false)
    const [criminal_statusno, setcriminal_statusno] = useState(false)
    const [criminal, setcriminal] = useState('')
    const [obligation_status_yes, setobligation_status_yes] = useState(false)
    const [obligation_status_no, setobligation_status_no] = useState(false)
    const [obligation, setobligation] = useState('')
    const [relatives_status_yes, setrelatives_status_yes] = useState(false)
    const [relatives_status_no, setrelatives_status_no] = useState(false)
    const [recruitment_status_yes, setrecruitment_status_yes] = useState(false)
    const [recruitment_status_no, setrecruitment_status_no] = useState(false)
    const [recruitment, setrecruitment] = useState('')
    const [status_yes, setstatus_yes] = useState(false)
    const [status_no, setstatus_no] = useState(false)
    const [vaccinated_statusyes, setvaccinated_statusyes] = useState(false)
    const [vaccinated_statusno, setvaccinated_statusno] = useState(false)
    const [vaccinated_statuspar, setvaccinated_statuspar] = useState(false)

    const handleCheckBoxhealth = useCallback((name) => {
        if (name === 'Health_statusyes') {
            sethealthyes(true)
            sethealthno(false)
        } else if (name === 'Health_statusno') {
            sethealthyes(false)
            sethealthno(true)
        }
    }, [sethealthyes, sethealthno]);

    const handleCheckBoxcriminal = useCallback((name) => {
        if (name === 'criminal_statusyes') {
            setcriminal_statusyes(true)
            setcriminal_statusno(false)
        } else if (name === 'criminal_statusno') {
            setcriminal_statusyes(false)
            setcriminal_statusno(true)
        }
    }, [setcriminal_statusyes, setcriminal_statusno]);

    const handleCheckBox_obligation = useCallback((name) => {
        if (name === 'obligation_status_yes') {
            setobligation_status_yes(true)
            setobligation_status_no(false)
        } else if (name === 'obligation_status_no') {
            setobligation_status_yes(false)
            setobligation_status_no(true)
        }
    }, [setobligation_status_yes, setobligation_status_no]);

    const handleCheckBoxrelatives = useCallback((name) => {
        if (name === 'relatives_status_yes') {
            setrelatives_status_yes(true)
            setrelatives_status_no(false)
        } else if (name === 'relatives_status_no') {
            setrelatives_status_yes(false)
            setrelatives_status_no(true)
        }
    }, [setrelatives_status_yes, setrelatives_status_no]);

    const handleCheckBoxrecruitment = useCallback((name) => {
        if (name === 'recruitment_status_yes') {
            setrecruitment_status_yes(true)
            setrecruitment_status_no(false)
        } else if (name === 'recruitment_status_no') {
            setrecruitment_status_yes(false)
            setrecruitment_status_no(true)
        }
    }, [setrecruitment_status_yes, setrecruitment_status_no]);

    const handleCheckBox = useCallback((name) => {
        if (name === 'status_yes') {
            setstatus_yes(true)
            setstatus_no(false)
        } else if (name === 'status_no') {
            setstatus_yes(false)
            setstatus_no(true)
        }
    }, [setstatus_yes, setstatus_no]);

    const handleCheckBoxvaccinated = useCallback((name) => {
        if (name === 'vaccinated_statusyes') {
            setvaccinated_statusyes(true)
            setvaccinated_statusno(false)
            setvaccinated_statuspar(false)

        } else if (name === 'vaccinated_statusno') {
            setvaccinated_statusyes(false)
            setvaccinated_statusno(true)
            setvaccinated_statuspar(false)
        }
        else if (name === 'vaccinated_statuspar') {
            setvaccinated_statusyes(false)
            setvaccinated_statusno(false)
            setvaccinated_statuspar(true)
        }
    }, [setvaccinated_statusyes, setvaccinated_statusno, setvaccinated_statuspar]);
    return (
        <>
            <Box sx={{}}>
                <Typography sx={{ mt: 3, }}>Travancore Medicial college is committed to providing
                    reasonable support
                    to candidates who come forward with physical, mental,
                    and/or neurodiverse conditions that may need assistance
                    for any part of the recruitment process.
                    Please feel free to share such requirements
                    with us to help you through your selection process.
                    This information will also help us identify suitable roles at Medicity
                    for you as you discover the right opportunity with us :
                    <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1 }}>
                <Box>
                    <JoyCheckbox
                        label='Yes'
                        name="status_yes"
                        checked={status_yes}
                        onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                    />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="status_no"
                        checked={status_no}
                        onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                    />
                </Box>
            </Box>
            <Box sx={{}}>
                <Typography sx={{ mt: 3, }}>Are you vaccinated with COVID-19 Vaccine?
                    <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1 }}>
                <Box>
                    <JoyCheckbox
                        label='Yes'
                        name="vaccinated_statusyes"
                        checked={vaccinated_statusyes}
                        onchange={(e) => handleCheckBoxvaccinated(e.target.name, e.target.checked)}
                    />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="vaccinated_statusno"
                        checked={vaccinated_statusno}
                        onchange={(e) => handleCheckBoxvaccinated(e.target.name, e.target.checked)}
                    />
                </Box>
                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='Partially Vaccinated'
                        name="vaccinated_statuspar"
                        checked={vaccinated_statuspar}
                        onchange={(e) => handleCheckBoxvaccinated(e.target.name, e.target.checked)}
                    />
                </Box>
            </Box>
            <Box sx={{}}>
                <Typography sx={{ mt: 3, }}>Are you aware of any other health condition which
                    may interfere with your ability to safely perform the
                    inherent requirements and demands of the position? Or would
                    require us to support you in any away?
                    <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1 }}>
                <Box>
                    <JoyCheckbox
                        label='Yes'
                        name="Health_statusyes"
                        checked={Health_statusyes}
                        onchange={(e) => handleCheckBoxhealth(e.target.name, e.target.checked)}
                    />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="Health_statusno"
                        checked={Health_statusno}
                        onchange={(e) => handleCheckBoxhealth(e.target.name, e.target.checked)}
                    />
                </Box>
            </Box>
            {Health_statusyes === true ?
                <>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Please provide details
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={Health}
                            onchange={sethealth}
                            size="md"
                        />
                    </Box>
                </>

                : <Box></Box>
            }

            <Box sx={{}}>
                <Typography sx={{ mt: 3, }}>Where did you hear about this job?
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
                <Typography sx={{ mt: 3, }}>Have you at any time been convicted for any criminal offence by a court and sentenced
                    to imprisonment or any criminal proceedings are pending against you?
                    <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1 }}>
                <Box>
                    <JoyCheckbox
                        label='Yes'
                        name="criminal_statusyes"
                        checked={criminal_statusyes}
                        onchange={(e) => handleCheckBoxcriminal(e.target.name, e.target.checked)}
                    />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="criminal_statusno"
                        checked={criminal_statusno}
                        onchange={(e) => handleCheckBoxcriminal(e.target.name, e.target.checked)}
                    />
                </Box>
            </Box>
            {criminal_statusyes === true ?
                <>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Please provide details
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={criminal}
                            onchange={setcriminal}
                            size="md"
                        />
                    </Box>
                </>

                : <Box></Box>
            }
            <Box sx={{}}>
                <Typography sx={{ mt: 3, }}>Are you under any legal obligation, non-compete or confidentiality restriction with your current employer?
                    <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1 }}>
                <Box>
                    <JoyCheckbox
                        label='Yes'
                        name="obligation_status_yes"
                        checked={obligation_status_yes}
                        onchange={(e) => handleCheckBox_obligation(e.target.name, e.target.checked)}
                    />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="obligation_status_no"
                        checked={obligation_status_no}
                        onchange={(e) => handleCheckBox_obligation(e.target.name, e.target.checked)}
                    />
                </Box>
            </Box>
            {obligation_status_yes === true ?
                <>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Please provide details
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={obligation}
                            onchange={setobligation}
                            size="md"
                        />
                    </Box>
                </>

                : <Box></Box>
            }
            <Box sx={{}}>
                <Typography sx={{ mt: 3, }}>Do you have any relatives/friends working at Travancore Medicity & its entities currently?
                    <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1 }}>
                <Box>
                    <JoyCheckbox
                        label='Yes'
                        name="relatives_status_yes"
                        checked={relatives_status_yes}
                        onchange={(e) => handleCheckBoxrelatives(e.target.name, e.target.checked)}
                    />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="relatives_status_no"
                        checked={relatives_status_no}
                        onchange={(e) => handleCheckBoxrelatives(e.target.name, e.target.checked)}
                    />
                </Box>
            </Box>
            {relatives_status_yes === true ?
                <>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Employee E-mail Address
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={empemail}
                            onchange={setempemail}
                            size="md"
                        />
                    </Box>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Employee Name
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={empname}
                            onchange={setempname}
                            size="md"
                        />
                    </Box>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Employee Number
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={empno}
                            onchange={setempno}
                            size="md"
                        />
                    </Box>
                </>

                : <Box></Box>
            }

            <Box sx={{}}>
                <Typography sx={{ mt: 3, }}>Have you undergone recruitment process with Travancore Medicity & its entities earlier?
                    <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                </Typography>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1 }}>
                <Box>
                    <JoyCheckbox
                        label='Yes'
                        name="recruitment_status_yes"
                        checked={recruitment_status_yes}
                        onchange={(e) => handleCheckBoxrecruitment(e.target.name, e.target.checked)}
                    />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="recruitment_status_no"
                        checked={recruitment_status_no}
                        onchange={(e) => handleCheckBoxrecruitment(e.target.name, e.target.checked)}
                    />
                </Box>
            </Box>
            {recruitment_status_yes === true ?
                <>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Name the unit
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <JoyInput
                            // variant="plain"
                            type="text"
                            value={recruitment}
                            onchange={setrecruitment}
                            size="md"
                        />
                    </Box>
                </>

                : <Box></Box>
            }

            <Typography level="h5" sx={{ mt: 3 }}>WORK AND EDUCATION HISTORY</Typography>
            <Typography sx={{}}>Please enter details about your work experience and education.</Typography>
            <WorkAndEducation />
        </>
    )
}

export default memo(ApplicationQuestion)