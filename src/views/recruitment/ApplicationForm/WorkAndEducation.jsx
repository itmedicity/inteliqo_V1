import { Box, Typography, Button, Tooltip } from '@mui/joy'
import React, { lazy, useState, useCallback, memo } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import WorkIcon from '@mui/icons-material/Work';
import moment from 'moment';


const ExperienceModal = lazy(() => import('./ExperienceModal'))
const Educationmodal = lazy(() => import('./Educationmodal'))
const WorkAndEducation = ({ formdata, setformdata, seteducation, Regionexp, setRegionexp, Regionedu, setRegionedu, handleOnClick, experience, setexprience,
    education, expdata, expdataset, education_details, seteducation_details, edudata, edudataset, eduname }) => {

    const { agreestatus, agreestatus_marketing, } = formdata;
    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }, [formdata, setformdata]);


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalOpenedu, setIsModalOpenedu] = useState(false)

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
            <Box sx={{ display: 'flex', g: 1, mt: 2 }}>
                <Box sx={{ width: "50%", display: 'flex', flexDirection: 'column' }} >
                    {
                        expdata?.map((val, index) => {
                            return (
                                <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                                    <Box sx={{
                                        width: "100%", borderTop: "1px solid #DFDFDF",

                                    }}>

                                        <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                            <Box><WorkIcon /></Box>
                                            <Box sx={{ mt: .5, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                                                <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', }}> {val?.jobexp}</Typography></Box>
                                                <Box>   <Typography level="body-sm" sx={{ wordBreak: 'break-word', }}>(  {moment(new Date(val?.expstartdate)).format('DD-MM-YYYY')} -  {moment(new Date(val?.expenddate)).format('DD-MM-YYYY')})</Typography></Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 5 }}>
                                            <Box></Box>
                                            <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', }}> {val?.Employer}</Typography> </Box>
                                        </Box>
                                    </Box>

                                </Box>

                            )
                        })
                    }

                </Box>
                <Box sx={{ width: "50%", display: 'flex', flexDirection: 'column' }}>
                    {
                        edudata?.map((val, index) => {
                            const correspondingEduName = eduname[index];

                            return (

                                <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                                    <Box sx={{
                                        width: "100%", borderTop: "1px solid #DFDFDF",

                                    }}>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                            <Box><WorkIcon /></Box>
                                            <Box sx={{ mt: .5, display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                                                <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', }}> {correspondingEduName?.edu_desc}</Typography></Box>
                                                <Box>   <Typography level="body-sm" sx={{ wordBreak: 'break-word', }}>(  {moment(new Date(val?.edustartdate)).format('DD-MM-YYYY')} -  {moment(new Date(val?.eduenddate)).format('DD-MM-YYYY')})</Typography></Box>

                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 5 }}>
                                            <Box></Box>
                                            <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', }}> {val?.schoolname}</Typography> </Box>
                                        </Box>
                                    </Box>
                                </Box>

                            )
                        })
                    }
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <JoyCheckbox
                    label='I agree to receive updates about new job opportunities. '
                    name="agreestatus"
                    checked={agreestatus}
                    onchange={(e) => updateBoard(e)} />
            </Box>
            <Box sx={{ mt: 3 }}>
                <JoyCheckbox
                    label='
                        I agree to receive marketing communications'
                    name="agreestatus_marketing"
                    checked={agreestatus_marketing}
                    onchange={(e) => updateBoard(e)} />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title="View">
                    <Button
                        variant="outlined"
                        component="label"
                        size="md"
                        color="primary"
                        onClick={handleOnClick}
                    >
                        Submit Application

                    </Button>
                </Tooltip>
            </Box>
            <ExperienceModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                formdata={formdata}
                setformdata={setformdata}
                Regionexp={Regionexp}
                setRegionexp={setRegionexp}
                expdata={expdata}
                expdataset={expdataset}
                experience={experience}
                setexprience={setexprience}
            />
            <Educationmodal
                isModalOpenedu={isModalOpenedu}
                setIsModalOpenedu={setIsModalOpenedu}
                formdata={formdata}
                setformdata={setformdata}
                seteducation={seteducation}
                Regionedu={Regionedu}
                setRegionedu={setRegionedu}
                education_details={education_details}
                seteducation_details={seteducation_details}
                edudata={edudata}
                edudataset={edudataset}
                education={education}

            />
        </>
    )
}

export default memo(WorkAndEducation)