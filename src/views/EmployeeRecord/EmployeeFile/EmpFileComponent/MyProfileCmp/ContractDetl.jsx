import { Avatar, Card, CardContent, CardHeader, IconButton, List } from '@mui/material'
import React, { Fragment, memo, useState, useEffect } from 'react'
import PushPinIcon from '@mui/icons-material/PushPin';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ContractDetails from './ContractDetails';
import { useSelector } from 'react-redux';

const ContractDetl = () => {
    const ContractDetail = useSelector((state) => {
        return state.getPrifileDateEachEmp.empContractDetl.empContract

    })
    return (
        <Fragment>
            {ContractDetail.length === 0 ? null : <Card sx={{ borderRadius: 2, boxShadow: 2 }} className="mt-1" >
                <CardHeader
                    title="Contract Information"
                    titleTypographyProps={{
                        variant: 'button',
                    }}
                    avatar={
                        <Avatar sx={{ bgcolor: '#49599a' }} aria-label="recipe">
                            <AssessmentIcon />
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <PushPinIcon color="warning" />
                        </IconButton>
                    }
                    className="pb-0"
                />
                <CardContent className='pt-0' >
                    <List className='p-0' >
                        {
                            <ContractDetails ContractDetail={ContractDetail} />
                        }
                    </List>
                </CardContent>
            </Card>
            }

        </Fragment>
    )
}

export default memo(ContractDetl)