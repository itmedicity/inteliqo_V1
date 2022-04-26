import { Avatar, Card, CardContent, CardHeader, IconButton, List } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PushPinIcon from '@mui/icons-material/PushPin';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonalDataInform from './PersonalDataInform';
import { useSelector } from 'react-redux';
import RequestList from './RequestList';

const MyProfileSalary = () => {
    const [getnotify, setnotify] = useState({
        fineamunt: 0,
        dutyplan: 0
    })
    const [status, setstatus] = useState(false)
    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp.empnotify;
    })
    useEffect(() => {

        const { empnotifyStatus, empnotifydata } = state

        setnotify(empnotifydata)
        setstatus(empnotifyStatus)
    }, [state])
    const { fineamunt, dutyplan } = getnotify

    return (
        <Fragment>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }} className="mt-1" >
                <CardHeader
                    title="Profile Information"
                    titleTypographyProps={{
                        variant: 'button',
                    }}
                    avatar={
                        <Avatar sx={{ bgcolor: '#49599a' }} aria-label="recipe">
                            <MonetizationOnIcon />
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
                        {/* 
                        <PersonalDataInform name={'Fine Information'}
                            sub_name={'Pending Fine'}
                            data={"— " + fineamunt}
                        />
                        <PersonalDataInform name={'Duty Plan'}
                            sub_name={'Status'}
                            data={dutyplan > 0 ? "— " + 'Not Processed' : "— " + 'Processed'}
                        /> */}
                        {/* <RequestList /> */}
                    </List>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default memo(MyProfileSalary)