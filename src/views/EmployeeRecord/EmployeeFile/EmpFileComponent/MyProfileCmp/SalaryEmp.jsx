import { Avatar, Card, CardContent, CardHeader, IconButton, List } from '@mui/material'
import React, { Fragment, useEffect, useState,memo } from 'react'
import PushPinIcon from '@mui/icons-material/PushPin';
import { useSelector } from 'react-redux';
import SalaryDetlEmp from './SalaryDetlEmp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const SalaryEmp = () => {
    const [SalaryData, setSalaryData] = useState([])
    const [status, setstatus] = useState(false)

    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp.empSalaryInformation
    })
    useEffect(() => {
        const { empSalary, empSalaryStatus } = state;
        setSalaryData(empSalary)
        setstatus(empSalaryStatus)
    }, [state])

    return (
        <Fragment>{
            SalaryData.length === 0 || status === false ? null :
                <Card sx={{ borderRadius: 2, boxShadow: 2 }} className="mt-1" >
                    <CardHeader
                        title="Salary Information"
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
                            {
                                SalaryData && SalaryData.map((val, index) => <SalaryDetlEmp key={index} data={val} />)
                            }
                        </List>
                    </CardContent>
                </Card>
        }

        </Fragment>
    )
}

export default memo(SalaryEmp)
