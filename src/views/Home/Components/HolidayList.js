import { Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useState } from 'react'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import { axioslogin } from 'src/views/Axios/Axios';
const ListItemsHoliday = React.lazy(() => import('./ListItemHoliday'));


const HolidayList = () => {
    const [array, setArray] = useState([])
    useEffect(() => {
        const getholidaylist = async () => {
            const result = await axioslogin.get('/holidaylist/getholidaylist/getlist')
            const { success, data } = result.data
            if (success === 1) {
                setArray(data)
            }
            else {
                setArray([])
            }
        }
        getholidaylist()
    }, [])
    return (
        <Fragment>
            <Grid item md={6} sm={4}
                sx={{
                    marginTop: 1
                }}
            >
                <Card>
                    <CardHeader
                        title="Holiday List"
                        titleTypographyProps={{ variant: "caption", display: "block", fontWeight: 790, paddingLeft: 1.5 }}
                        sx={{
                            bgcolor: "#90A4AE",
                            padding: 0.5,
                        }}
                        action={
                            <Typography variant='subtitle2' sx={{ display: "block", paddingY: 0.5, paddingRight: 4, fontSize: 12.5, fontWeight: 600 }}  >
                                Year - 2022
                            </Typography>
                        }
                    />
                    <CardContent sx={{ padding: 0 }} >
                        <Suspense >
                            <ListItem dense disableGutters disablePadding sx={{ padding: 0, bgcolor: "#B0BEC5" }} >
                                <ListItemButton dense sx={{ paddingY: 0, width: '100%' }}>
                                    <ListItemIcon sx={{ paddingY: 0 }}>
                                        <IconButton edge="start" aria-label='comment' disabled sx={{ paddingY: 0 }} >
                                            <DataSaverOffIcon sx={{ fontSize: 15, paddingY: 0, color: "#5c6bc0" }} />
                                        </IconButton>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Holiday Date`}
                                        primaryTypographyProps={{ fontWeight: 800, variant: 'caption', fontSize: 11 }}
                                        sx={{ width: '40%', paddingY: 0 }} />
                                    <ListItemText
                                        primary={`Holiday Description`}
                                        primaryTypographyProps={{ fontWeight: 800, variant: 'caption', fontSize: 11 }}
                                        sx={{ width: '40%', paddingY: 0 }} />
                                </ListItemButton>
                            </ListItem>
                            <List dense disablePadding sx={{ paddingY: 0, height: 190, overflowY: "auto" }} className="ListItemScrol" >
                                {
                                    array.map((val, index) => {
                                        return <ListItemsHoliday key={index} holidayName={val.hld_year} holidayDesc={val.hld_desc} />
                                    })
                                }
                            </List>
                        </Suspense>
                    </CardContent>
                </Card>
            </Grid>
        </Fragment>
    )
}

export default HolidayList