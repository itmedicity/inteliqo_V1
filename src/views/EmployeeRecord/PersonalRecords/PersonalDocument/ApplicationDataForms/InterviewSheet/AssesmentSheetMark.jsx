import React, { lazy, memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'

const InterviewComment = lazy(() => import('./InterviewComment'))

const AssesmentSheetMark = ({ markdata }) => {
    return (
        <>

            <CustmTypog title={'Assesment Mark'} />
            <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>

                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>Sl No </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>COMPETENCY </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>HR </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>INCHARGE </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>HOD </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>MS </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>DMS </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>OPERATION </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>CEO</Typography>
                        </TableCell>

                    </TableRow>

                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>1</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Subject Knowledge </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_sub_mark === '' ? "Not Updated" : markdata?.Hr_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.subject_mark === '' ? "Not Updated" : markdata?.subject_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_sub_mark === '' ? "Not Updated" : markdata?.Hod_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_sub_mark === '' ? "Not Updated" : markdata?.Ms_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_sub_mark === '' ? "Not Updated" : markdata?.Dms_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_sub_mark === '' ? "Not Updated" : markdata?.Op_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_sub_mark === '' ? "Not Updated" : markdata?.Ceo_sub_mark} </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>2</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Experience </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_exp_mark === '' ? "Not Updated" : markdata?.Hr_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.exp_mark === '' ? "Not Updated" : markdata?.exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_exp_mark === '' ? "Not Updated" : markdata?.Hod_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_exp_mark === '' ? "Not Updated" : markdata?.Ms_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_exp_mark === '' ? "Not Updated" : markdata?.Dms_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_exp_mark === '' ? "Not Updated" : markdata?.Op_exp_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_exp_mark === '' ? "Not Updated" : markdata?.Ceo_exp_mark} </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>3</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Education (Relevant to the position) </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_edu_mark === '' ? "Not Updated" : markdata?.Hr_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.edu_mark === '' ? "Not Updated" : markdata?.edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_edu_mark === '' ? "Not Updated" : markdata?.Hod_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {markdata?.Ms_edu_mark === '' ? "Not Updated" : markdata?.Ms_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_edu_mark === '' ? "Not Updated" : markdata?.Dms_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_edu_mark === '' ? "Not Updated" : markdata?.Op_edu_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_edu_mark === '' ? "Not Updated" : markdata?.Ceo_edu_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>4</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Technical skills </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_tech_mark === '' ? "Not Updated" : markdata?.Hr_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.technical_mark === '' ? "Not Updated" : markdata?.technical_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_tech_mark === '' ? "Not Updated" : markdata?.Hod_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.Ms_tech_mark === '' ? "Not Updated" : markdata?.Ms_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_tech_mark === '' ? "Not Updated" : markdata?.Dms_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_tech_mark === '' ? "Not Updated" : markdata?.Op_tech_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_tech_mark === '' ? "Not Updated" : markdata?.Ceo_tech_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>5</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Presentation skills</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_pre_mark === '' ? "Not Updated" : markdata?.Hr_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.presentation_mark === '' ? "Not Updated" : markdata?.presentation_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_pre_mark === '' ? "Not Updated" : markdata?.Hod_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_pre_mark === '' ? "Not Updated" : markdata?.Ms_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_pre_mark === '' ? "Not Updated" : markdata?.Dms_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_pre_mark === '' ? "Not Updated" : markdata?.Op_pre_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_pre_mark === '' ? "Not Updated" : markdata?.Ceo_pre_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>6</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Analytical skills </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_analy_mark === '' ? "Not Updated" : markdata?.Hr_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.analytical_mark === '' ? "Not Updated" : markdata?.analytical_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_analy_mark === '' ? "Not Updated" : markdata?.Hod_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_analy_mark === '' ? "Not Updated" : markdata?.Ms_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_analy_mark === '' ? "Not Updated" : markdata?.Dms_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_analy_mark === '' ? "Not Updated" : markdata?.Op_analy_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_analy_mark === '' ? "Not Updated" : markdata?.Ceo_analy_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>7</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Communication skills </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_commu_mark === '' ? "Not Updated" : markdata?.Hr_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.communication_mark === '' ? "Not Updated" : markdata?.communication_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_commu_mark === '' ? "Not Updated" : markdata?.Hod_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_commu_mark === '' ? "Not Updated" : markdata?.Ms_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_commu_mark === '' ? "Not Updated" : markdata?.Dms_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_commu_mark === '' ? "Not Updated" : markdata?.Op_commu_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_commu_mark === '' ? "Not Updated" : markdata?.Ceo_commu_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>8</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Attitude </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_atti_mark === '' ? "Not Updated" : markdata?.Hr_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.attitude_mark === '' ? "Not Updated" : markdata?.attitude_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_atti_mark === '' ? "Not Updated" : markdata?.Hod_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_atti_mark === '' ? "Not Updated" : markdata?.Ms_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_atti_mark === '' ? "Not Updated" : markdata?.Dms_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_atti_mark === '' ? "Not Updated" : markdata?.Op_atti_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_atti_mark === '' ? "Not Updated" : markdata?.Ceo_atti_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>9</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Confidence </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_confi_mark === '' ? "Not Updated" : markdata?.Hr_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.confidence_mark === '' ? "Not Updated" : markdata?.confidence_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_confi_mark === '' ? "Not Updated" : markdata?.Hod_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_confi_mark === '' ? "Not Updated" : markdata?.Ms_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_confi_mark === '' ? "Not Updated" : markdata?.Dms_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_confi_mark === '' ? "Not Updated" : markdata?.Op_confi_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_confi_mark === '' ? "Not Updated" : markdata?.Ceo_confi_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>10</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Body langauge </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_bodylang_mark === '' ? "Not Updated" : markdata?.Hr_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.bodylang_mark === '' ? "Not Updated" : markdata?.bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_bodylang_mark === '' ? "Not Updated" : markdata?.Hod_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_bodylang_mark === '' ? "Not Updated" : markdata?.Ms_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_bodylang_mark === '' ? "Not Updated" : markdata?.Dms_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Op_bodylang_mark === '' ? "Not Updated" : markdata?.Op_bodylang_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_bodylang_mark === '' ? "Not Updated" : markdata?.Ceo_bodylang_mark}  </Typography>
                        </TableCell>

                    </TableRow>
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}></Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Total </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hr_Interview_Mark === '' ? "Not Updated" : markdata?.Hr_Interview_Mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {markdata?.total_Incharge_inter_mark === '' ? "Not Updated" : markdata?.total_Incharge_inter_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Hod_interview_mark === '' ? "Not Updated" : markdata?.Hod_interview_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {markdata?.Ms_Interview_Mark === '' ? "Not Updated" : markdata?.Ms_Interview_Mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Dms_Interview_Mark === '' ? "Not Updated" : markdata?.Dms_Interview_Mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Operation_Interview_Mark === '' ? "Not Updated" : markdata?.Operation_Interview_Mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{markdata?.Ceo_Interview_Mark === '' ? "Not Updated" : markdata?.Ceo_Interview_Mark} </Typography>
                        </TableCell>

                    </TableRow>

                </TableBody>
            </Table>

            <InterviewComment markdata={markdata} />
        </>
    )
}

export default memo(AssesmentSheetMark)