import { Box, Card, Grid, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextInput from 'src/views/Component/TextInput'
import TextFieldCustom from 'src/views/Component/TextFieldCustom'

const JobDescription = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }


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
                            <Typography variant='inherit' sx={{ paddingLeft: 1 }}>Job Summary:</Typography>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={12} xl={12} md={12}>
                                <Card sx={{ fontFamily: 'monospace', borderStyle: 'inherit', backgroundColor: 'InfoBackground' }}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" style={{ padding: 2, width: '5rem', height: '2rem' }}>
                                                        Objective
                                                    </TableCell>
                                                    <TableCell align="right" style={{ padding: 2, width: '20rem', height: '2rem' }}>
                                                        <TextFieldCustom
                                                            size={'md'}
                                                        // placeholder={placeholder}
                                                        // type={type}
                                                        // startDecorator={startDecorator}
                                                        // endDecorator={endDecorator}
                                                        // sx={{ ...textStyle, ...style }}
                                                        // onChange={(e) => onChange(e)}
                                                        // value={value}
                                                        // defaultValue={defaultValue}
                                                        // name={name}
                                                        // autoComplete="off"
                                                        // disabled={disabled ?? false}
                                                        />

                                                    </TableCell>

                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" style={{ padding: 2, width: '5rem', height: '2rem' }}>
                                                        Scope
                                                    </TableCell>
                                                    <TableCell align="right" style={{ padding: 2, width: '20rem', height: '2rem' }}>
                                                        <TextFieldCustom
                                                            size={'md'}
                                                        // placeholder={placeholder}
                                                        // type={type}
                                                        // startDecorator={startDecorator}
                                                        // endDecorator={endDecorator}
                                                        // sx={{ ...textStyle, ...style }}
                                                        // onChange={(e) => onChange(e)}
                                                        // value={value}
                                                        // defaultValue={defaultValue}
                                                        // name={name}
                                                        // autoComplete="off"
                                                        // disabled={disabled ?? false}
                                                        />

                                                    </TableCell>

                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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