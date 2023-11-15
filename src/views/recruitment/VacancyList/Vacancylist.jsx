import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, IconButton, Typography } from '@mui/joy'
import { Grid, Paper } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { axioslogin } from 'src/views/Axios/Axios';
const Vacancylistshow = lazy(() => import('./Vacancylistshow'))


const Vacancylist = () => {
    const [showGeneral, setShowGeneral] = useState(0)
    const [data, setdata] = useState([])
    const [length, setlength] = useState(0)
    const main = [
        {
            id: 1,
            name: 'Vacancy List',
            count: length,
            icon: <GroupsIcon sx={{ color: '#81c784' }} />,
        },
    ]
    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.get('/Manpower/approvalget/all')
            const { success, data } = result.data
            if (success === 1) {
                const count =
                    data?.filter((val) => val.announcement_status === 1)
                setlength(count.length)
                setdata(count)
            } else {
                setdata([])
            }
        }
        fetchData()
    }, [setdata])
    const handleClick = useCallback((e, item) => {
        setShowGeneral(item.id)
    }, [setShowGeneral])
    return (
        <>
            {showGeneral === 1 ? <Vacancylistshow showGeneral={showGeneral} setShowGeneral={setShowGeneral} data={data} /> :
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Grid sx={{ p: 1 }} container spacing={2}>
                        {main.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper
                                    key={index}
                                    variant="outlined"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 1,
                                        width: '100%',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                backgroundColor: '#E2F6CA',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                opacity: 0.7,
                                            }}
                                        >
                                            {item?.icon}
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                flex: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    padding: '4px',
                                                    borderRadius: '8px',
                                                    marginRight: 'auto',
                                                }}
                                            >
                                                <Typography sx={{ fontSize: 18 }}>
                                                    {item?.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                border: '2px solid #E2F6CA',
                                                padding: '4px',
                                                borderRadius: '8px',
                                                width: '15%',
                                            }}
                                        >
                                            <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: '#81c784' }}>
                                                {item?.count}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            borderTop: 2,
                                            borderColor: '#D6E6F2',
                                            marginTop: 3,
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={(e) => {
                                            handleClick(e, item)
                                        }}
                                    >
                                        <Box sx={{ p: 1, mt: 1 }}>
                                            <Typography>Vacancy</Typography>
                                        </Box>
                                        <Box sx={{ ml: 1, mt: 2 }}>
                                            <IconButton size="small" color="success">
                                                <ArrowRightAltIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            }
        </>
    )
}

export default memo(Vacancylist)