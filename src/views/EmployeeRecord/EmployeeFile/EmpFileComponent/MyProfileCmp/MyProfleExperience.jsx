import { Avatar, Card, CardContent, CardHeader, IconButton, List } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useSelector } from 'react-redux';
import ProfessionalExp from './ProfessionalExp';


const MyProfleExperience = () => {
    const [expData, setexpData] = useState([])
    const [status, setstatus] = useState(false)

    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp.empExperData;
    })

    useEffect(() => {
        const { experienData, experienDataStatus } = state;
        setexpData(experienData)
        setstatus(experienDataStatus)
    }, [state])

    return (
        <Fragment>
            {status === false || expData.length === 0 ? null :
                <Card sx={{ borderRadius: 2, boxShadow: 2 }} className="mt-1" >
                    <CardHeader
                        title="Professional Experience"
                        titleTypographyProps={{
                            variant: 'button',
                        }}
                        avatar={
                            <Avatar sx={{ bgcolor: '#49599a' }} aria-label="recipe">
                                <PersonPinIcon />
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
                                expData && expData.map((val, index) => <ProfessionalExp key={index} data={val} />)
                            }
                        </List>
                    </CardContent>
                </Card>
            }



        </Fragment>
    )
}

export default memo(MyProfleExperience)