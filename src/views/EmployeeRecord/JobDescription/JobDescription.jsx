import { Box, Card, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'

const JobDescription = () => {
    return (
        <Fragment>
            <PageLayoutSave
                heading="Job Description"
            >
                <Box>
                    <Grid container spacing={1}>
                        <Grid item xs={6} lg={6} xl={6} md={6}>
                            <DepartmentSelect style={SELECT_CMP_STYLE} />
                        </Grid>
                        <Grid item xs={6} lg={6} xl={6} md={6}>
                            <DesignationMast style={SELECT_CMP_STYLE} />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{ padding: 2 }}
                    >
                        <Grid container spacing={1}>
                            <Typography variant='inherit' p-1>Job Summary:</Typography>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={12} xl={12} md={12}>
                                <Card sx={{ fontFamily: 'monospace', borderStyle: 'inherit' }}>
                                    dfgf
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </PageLayoutSave>
        </Fragment >
    )
}

export default JobDescription