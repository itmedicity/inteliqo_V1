import { Box, Typography, Button, Tooltip } from '@mui/joy'
import React, { lazy, useState, useCallback, memo } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';


const ExperienceModal = lazy(() => import('./ExperienceModal'))
const Educationmodal = lazy(() => import('./Educationmodal'))
const WorkAndEducation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenedu, setIsModalOpenedu] = useState(false)
    const [Employer, setEmployer] = useState('')
    const [expstartdate, setexpstartdate] = useState(0);
    const [expenddate, setexpenddate] = useState(0);
    const [Workingstatus, setWorkingstatus] = useState(false)
    const [Responsibilities, setResponsibilities] = useState('')
    const [job, setjob] = useState('')
    const [SupervisorName, setSupervisorName] = useState('')
    const [Additionalinf, setAdditionalinf] = useState('')
    const [Other, setOther] = useState('')
    const [schoolname, setschoolname] = useState('')
    const [education, seteducation] = useState(0)
    const [edustartdate, setedustartdate] = useState(0);
    const [eduenddate, seteduenddate] = useState(0);
    const [Graduated, setGraduated] = useState(false)
    const [AvgGrade, setAvgGrade] = useState('')
    const [gpa, setgpa] = useState('')
    const [DateAcquired, setDateAcquired] = useState(0);
    const [ProjectedDate, setProjectedDate] = useState(0);
    const [agreestatus, setagreestatus] = useState(false)
    const [agreestatus_marketing, setagreestatus_marketing] = useState(false)
    const [Regionedu, setRegionedu] = useState(0);
    const [Regionexp, setRegionexp] = useState(0);

    const handleOnClickexp = useCallback(() => {
        setIsModalOpen(true)
    }, [])
    const handleOnClickedu = useCallback(() => {
        setIsModalOpenedu(true)
    }, [])
    return (
        <>
            <Box sx={{ display: 'flex', g: 1, mt: 2 }}>
                <Box sx={{ width: "50%", border: 1, ":hover": { borderColor: 'red' } }}>
                    <Tooltip title="Add Your Experience">
                        <Box sx={{ p: 1, cursor: 'pointer' }}
                            onClick={handleOnClickexp}>
                            <Typography sx={{ mt: 3, textAlign: 'center', p: 0, m: 0 }}>ADD EXPERIENCE </Typography>
                        </Box>
                    </Tooltip>

                </Box>
                <Box sx={{ ml: 1, width: "50%", border: 1, ":hover": { borderColor: 'red' } }}>
                    <Tooltip title="Add Your Education">
                        <Box sx={{ p: 1, cursor: 'pointer', }} onClick={handleOnClickedu}>
                            <Typography sx={{ mt: 3, textAlign: 'center', p: 0, m: 0 }}>ADD EDUCATION </Typography>
                        </Box>
                    </Tooltip>

                </Box>
            </Box>
            <Box sx={{ mt: 1, display: 'flex', g: 1, mt: 2 }}>
                <Box sx={{ width: "50%", }}>


                </Box>
                <Box sx={{ ml: 2, width: "50%", }}>


                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <JoyCheckbox
                    label='I agree to receive updates about new job opportunities. '
                    name="Replacement_status"
                    checked={agreestatus}
                    onchange={(e) => setagreestatus(e.target.checked)}
                />
            </Box>
            <Box sx={{ mt: 3 }}>
                <JoyCheckbox
                    label='
                        I agree to receive marketing communications'
                    name="Replacement_status"
                    checked={agreestatus_marketing}
                    onchange={(e) => setagreestatus_marketing(e.target.checked)}
                />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title="Save">
                    <Button
                        variant="outlined"
                        component="label"
                        size="md"
                        color="primary"
                    // onClick={submitmanpower}
                    >
                        Submit Application
                        {/* <SaveIcon /> */}
                    </Button>
                </Tooltip>
            </Box>
            <ExperienceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setEmployer={setEmployer}
                Employer={Employer}
                setjob={setjob}
                job={job}
                expstartdate={expstartdate}
                setexpstartdate={setexpstartdate}
                expenddate={expenddate}
                setexpenddate={setexpenddate}
                Workingstatus={Workingstatus}
                setWorkingstatus={setWorkingstatus}
                Responsibilities={Responsibilities}
                setResponsibilities={setResponsibilities}
                SupervisorName={SupervisorName}
                setSupervisorName={setSupervisorName}
                Additionalinf={Additionalinf}
                setAdditionalinf={setAdditionalinf}
                Other={Other}
                setOther={setOther}
                Regionexp={Regionexp}
                setRegionexp={setRegionexp}

            />
            <Educationmodal
                isModalOpenedu={isModalOpenedu}
                setIsModalOpenedu={setIsModalOpenedu}
                schoolname={schoolname}
                setschoolname={setschoolname}
                education={education}
                seteducation={seteducation}
                edustartdate={edustartdate}
                setedustartdate={setedustartdate}
                eduenddate={eduenddate}
                seteduenddate={seteduenddate}
                Graduated={Graduated}
                setGraduated={setGraduated}
                AvgGrade={AvgGrade}
                setAvgGrade={setAvgGrade}
                gpa={gpa}
                setgpa={setgpa}
                DateAcquired={DateAcquired}
                setDateAcquired={setDateAcquired}
                ProjectedDate={ProjectedDate}
                setProjectedDate={setProjectedDate}
                setRegionedu={setRegionedu}
                Regionedu={Regionedu}
            />
        </>
    )
}

export default memo(WorkAndEducation)