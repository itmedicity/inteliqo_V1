import { Box, Typography } from '@mui/joy'
import React, { memo, lazy, useCallback } from 'react'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const WorkAndEducation = lazy(() => import('./WorkAndEducation'))

const ApplicationQuestion = ({ setformdata, formdata, seteducation, Regionexp, setRegionexp, Regionedu, setRegionedu, eduname,
    handleOnClick, education, expdata, expdataset, experience, setexprience, education_details, seteducation_details, edudata, edudataset }) => {

    const { status_yes, status_no, relatives_status_no, vaccinated_statuspar, recruitment, vaccinated_statusyes,
        vaccinated_statusno, recruitment_status_no, recruitment_status_yes, criminal_statusyes, criminal_statusno,
        criminal, obligation_status_yes, obligation_status_no, obligation, relatives_status_yes, Health_statusyes,
        Health_statusno, Health, job, empemail, empname, empno } = formdata;


    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }, [formdata, setformdata]);

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
                        disabled={status_no === true ? true : false}
                        onchange={(e) => updateBoard(e)}
                    />


                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="status_no"
                        checked={status_no}
                        disabled={status_yes === true ? true : false}
                        onchange={(e) => updateBoard(e)}
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
                        disabled={vaccinated_statusno === true ? true : vaccinated_statuspar === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="vaccinated_statusno"
                        checked={vaccinated_statusno}
                        disabled={vaccinated_statusyes === true ? true : vaccinated_statuspar === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>
                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='Partially Vaccinated'
                        name="vaccinated_statuspar"
                        checked={vaccinated_statuspar}
                        disabled={vaccinated_statusyes === true ? true : vaccinated_statusno === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
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
                        disabled={Health_statusno === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="Health_statusno"
                        checked={Health_statusno}
                        disabled={Health_statusyes === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
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
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={Health}
                            name="Health"
                            onchange={(e) => updateBoard(e)}
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
                <InputComponent
                    // variant="plain"
                    type="text"
                    value={job}
                    name='job'
                    onchange={(e) => updateBoard(e)}
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
                        disabled={criminal_statusno === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="criminal_statusno"
                        checked={criminal_statusno}
                        disabled={criminal_statusyes === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
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
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={criminal}
                            name="criminal"
                            onchange={(e) => updateBoard(e)}
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
                        disabled={obligation_status_no === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="obligation_status_no"
                        checked={obligation_status_no}
                        disabled={obligation_status_yes === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
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
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={obligation}
                            name="obligation"
                            onchange={(e) => updateBoard(e)}
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
                        disabled={relatives_status_no === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="relatives_status_no"
                        checked={relatives_status_no}
                        disabled={relatives_status_yes === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>
            </Box>
            {relatives_status_yes === true ?
                <>

                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Employee Name
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={empname}
                            name="empname"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                    <Box sx={{}}>
                        <Typography sx={{ mt: 3, }}>Employee Number
                            <Typography sx={{ mt: 3, color: 'red' }}>* </Typography>
                        </Typography>
                    </Box>
                    <Box>
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={empno}
                            name='empno'
                            onchange={(e) => updateBoard(e)}
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
                        disabled={recruitment_status_no === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
                </Box>

                <Box sx={{ ml: 1 }}>
                    <JoyCheckbox
                        label='No'
                        name="recruitment_status_no"
                        checked={recruitment_status_no}
                        disabled={recruitment_status_yes === true ? true : false}
                        onchange={(e) => updateBoard(e)} />
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
                        <InputComponent
                            // variant="plain"
                            type="text"
                            value={recruitment}
                            name="recruitment"
                            onchange={(e) => updateBoard(e)}
                            size="md"
                        />
                    </Box>
                </>

                : <Box></Box>
            }

            <Typography level="h4" sx={{ mt: 3 }}>WORK AND EDUCATION HISTORY</Typography>
            <Typography sx={{}}>Please enter details about your work experience and education.</Typography>
            <WorkAndEducation setformdata={setformdata} formdata={formdata} seteducation={seteducation} Regionexp={Regionexp}
                setRegionexp={setRegionexp} Regionedu={Regionedu} setRegionedu={setRegionedu} handleOnClick={handleOnClick} eduname={eduname}
                education={education} expdata={expdata} expdataset={expdataset} experience={experience} setexprience={setexprience}
                education_details={education_details} seteducation_details={seteducation_details} edudata={edudata} edudataset={edudataset} />
        </>
    )
}

export default memo(ApplicationQuestion)