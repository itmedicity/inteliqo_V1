import { Box, Button } from '@mui/joy'
import React, { lazy, memo, useCallback, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'

const ModalJobDescription = lazy(() => import('./ModalJobDescription'))
const ModalJobskill = lazy(() => import('./ModalSkill'))


const JobAndSkillDescription = ({ em_department, desg }) => {
    const [isModalOpendesc, setIsModalOpendesc] = useState(false)
    const [isModalOpenskill, setIsModalOpenskill] = useState(false)


    const Jobdescription = useCallback(async (event) => {
        event.preventDefault();
        setIsModalOpendesc(true);
    }, []);
    const skill = useCallback(async (event) => {
        event.preventDefault();
        setIsModalOpenskill(true);
    }, []);
    return (
        <Box sx={{ mt: 1 }}>
            <CustmTypog title={'JOB AND SKILL DESCRIPTION'} />
            <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ width: '50%' }}>
                    <Button
                        variant="outlined"
                        component="label"
                        size="sm"
                        color="primary"
                        sx={{ width: '100%' }}
                        onClick={Jobdescription}
                    >
                        Job description
                    </Button>
                </Box>
                <Box sx={{ width: '50%' }}>
                    <Button
                        variant="outlined"
                        component="label"
                        size="sm"
                        color="primary"
                        sx={{ width: '100%' }}
                        onClick={skill}
                    >
                        Skills
                    </Button>
                </Box>
            </Box>
            <ModalJobDescription setIsModalOpendesc={setIsModalOpendesc} isModalOpendesc={isModalOpendesc} em_department={em_department} desg={desg} />
            <ModalJobskill setIsModalOpenskill={setIsModalOpenskill} isModalOpenskill={isModalOpenskill} em_department={em_department} desg={desg} />

        </Box>
    )
}

export default memo(JobAndSkillDescription)