import { CssVarsProvider, Typography } from '@mui/joy'
import { Grid, Paper, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useEffect, useState } from 'react'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useSelector } from 'react-redux';
import AcademicDropListCmp from './AcademicDropListCmp';

const ProfileAcademicBox = () => {
    const [accedData, setaccedemicData] = useState([])
    const [accedStatus, setaccedemicstatus] = useState(false)
    const [dataStat, setdataStat] = useState(false);

    const state = useSelector((state) => {
        return state.getPrifileDateEachEmp?.empAcademicData;
    })

    useEffect(() => {
        const { academicData, academicDataStatus } = state;
        if (academicDataStatus === true) {
            setaccedemicData(academicData);
            setaccedemicstatus(true)
            Object.keys(academicData).length > 0 && setdataStat(true)
        }
    }, [state])

    const skelton = <Skeleton variant="rounded" height={60} />;
    const noData = <Box sx={{
        display: 'flex',
        flex: 1,
        justifyContent: 'stretch',
        alignItems: 'center',
        height: '100%',
        px: '40%',
    }} >
        Data Not Updated
    </Box>

    return (
        <Box sx={{ width: '50%', mr: 0.2 }} >
            <CssVarsProvider>
                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                    Academic Qualification
                </Typography>
            </CssVarsProvider>
            <Paper variant="outlined" sx={{
                px: 1, mt: 0.3,
            }}>
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} direction="row" >
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                        <Box sx={{ width: '100%', height: 320, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                            {accedStatus === false ? skelton : dataStat === false ? noData : accedData && accedData.map((value, index) => <AcademicDropListCmp key={index} value={value} />)}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default memo(ProfileAcademicBox)