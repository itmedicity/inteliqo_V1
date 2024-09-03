import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import { Checkbox } from '@mui/joy';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import TopicPage from './Topic/TopicPage';
import QuestionMainPage from './QuestionPage/QuestionMainPage';

const QuestionTopicMainPage = () => {

    const [topic_Flag, SetTopicFlag] = useState(false);
    const [quest_flag, SetQuestflag] = useState(false);

    const HandleQuest = useCallback((e) => {
        if (e.target.checked === true) {
            SetQuestflag(e.target.checked)
            SetTopicFlag(false);
        }
        else {
            SetQuestflag(false)
            SetTopicFlag(false);
        }
    }, [SetQuestflag, SetTopicFlag])


    const HandleTopic = useCallback((e) => {
        if (e.target.checked === true) {
            SetTopicFlag(e.target.checked)
            SetQuestflag(false);
        }
        else {
            SetQuestflag(false)
            SetTopicFlag(false);
        }
    }, [SetQuestflag, SetTopicFlag])


    return (
        <Paper elevation={0}>
            <CustomLayout title="Topic & Question Master" displayClose={true} >
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 2, backgroundColor: "#C7C8CC" }}>
                        <Box sx={{ mt: 1 }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={topic_Flag}
                                className="ml-1"
                                onChange={(e) => HandleTopic(e)}
                                label="TOPICS"
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={quest_flag}
                                className="ml-1"
                                onChange={(e) => HandleQuest(e)}
                                label="QUESTIONS"
                            />
                        </Box>
                    </Box>
                    {topic_Flag === true ? <TopicPage /> : null}
                    {quest_flag === true ? <QuestionMainPage /> : null}
                </Box>
            </CustomLayout>
        </Paper>
    )
}
export default memo(QuestionTopicMainPage) 
