import { Avatar, Card, CardContent, CardHeader, IconButton, List } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import PushPinIcon from '@mui/icons-material/PushPin';
import ArticleIcon from '@mui/icons-material/Article';
import { useSelector } from 'react-redux';
import JobDescriptionEmp from './JobDescriptionEmp';


const MyProfileJobDescription = () => {

    const [jobdescData, setjobdescData] = useState([])
    const [status, setstatus] = useState(false)
    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp.empJobDesc
    })

    useEffect(() => {
        const { jobdescdata, jobdescdataStatus } = state
        setstatus(jobdescdataStatus)
        if (jobdescdata === undefined) {
            setjobdescData([])
        }
        else if (Object.keys(jobdescdata).length !== 0) {
            setjobdescData(jobdescdata)
        }
        else {
            setjobdescData([])
        }


    }, [state])

    return (
        <Fragment>
            {status === false || jobdescData.length === 0 ? null :
                <Card sx={{ borderRadius: 2, boxShadow: 2 }} className="mt-1" >
                    <CardHeader
                        title="Job Description"
                        titleTypographyProps={{
                            variant: 'button',
                        }}
                        avatar={
                            <Avatar sx={{ bgcolor: '#49599a' }} aria-label="recipe">
                                <ArticleIcon />
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" >
                                <PushPinIcon color="warning" />
                            </IconButton>
                        }
                        className="pb-0"
                    />
                    <CardContent className='pt-0' >
                        <List className='p-0' >
                            {
                                jobdescData && jobdescData.map((val, index) =>
                                    <JobDescriptionEmp key={index} data={val} />
                                )
                            }
                        </List>
                    </CardContent>
                </Card>
            }
        </Fragment>
    )
}

export default memo(MyProfileJobDescription)