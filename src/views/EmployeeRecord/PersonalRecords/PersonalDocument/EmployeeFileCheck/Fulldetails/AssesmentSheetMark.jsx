import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { Typography } from '@mui/joy';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'

const AssesmentSheetMark = ({ Empdata }) => {
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_sub_mark === '' ? "Not Updated" : Empdata?.Hr_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.subject_mark === '' ? "Not Updated" : Empdata?.subject_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_sub_mark === '' ? "Not Updated" : Empdata?.Hod_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {Empdata?.Ms_sub_mark === '' ? "Not Updated" : Empdata?.Ms_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_sub_mark === '' ? "Not Updated" : Empdata?.Dms_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_sub_mark === '' ? "Not Updated" : Empdata?.Op_sub_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_sub_mark === '' ? "Not Updated" : Empdata?.Ceo_sub_mark} </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_exp_mark === '' ? "Not Updated" : Empdata?.Hr_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.exp_mark === '' ? "Not Updated" : Empdata?.exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_exp_mark === '' ? "Not Updated" : Empdata?.Hod_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, }}> {Empdata?.Ms_exp_mark === '' ? "Not Updated" : Empdata?.Ms_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_exp_mark === '' ? "Not Updated" : Empdata?.Dms_exp_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_exp_mark === '' ? "Not Updated" : Empdata?.Op_exp_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_exp_mark === '' ? "Not Updated" : Empdata?.Ceo_exp_mark} </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_edu_mark === '' ? "Not Updated" : Empdata?.Hr_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.edu_mark === '' ? "Not Updated" : Empdata?.edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_edu_mark === '' ? "Not Updated" : Empdata?.Hod_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_edu_mark === '' ? "Not Updated" : Empdata?.Ms_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_edu_mark === '' ? "Not Updated" : Empdata?.Dms_edu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_edu_mark === '' ? "Not Updated" : Empdata?.Op_edu_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_edu_mark === '' ? "Not Updated" : Empdata?.Ceo_edu_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_tech_mark === '' ? "Not Updated" : Empdata?.Hr_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.technical_mark === '' ? "Not Updated" : Empdata?.technical_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_tech_mark === '' ? "Not Updated" : Empdata?.Hod_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_tech_mark === '' ? "Not Updated" : Empdata?.Ms_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_tech_mark === '' ? "Not Updated" : Empdata?.Dms_tech_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_tech_mark === '' ? "Not Updated" : Empdata?.Op_tech_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_tech_mark === '' ? "Not Updated" : Empdata?.Ceo_tech_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_pre_mark === '' ? "Not Updated" : Empdata?.Hr_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.presentation_mark === '' ? "Not Updated" : Empdata?.presentation_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_pre_mark === '' ? "Not Updated" : Empdata?.Hod_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_pre_mark === '' ? "Not Updated" : Empdata?.Ms_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_pre_mark === '' ? "Not Updated" : Empdata?.Dms_pre_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_pre_mark === '' ? "Not Updated" : Empdata?.Op_pre_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_pre_mark === '' ? "Not Updated" : Empdata?.Ceo_pre_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_analy_mark === '' ? "Not Updated" : Empdata?.Hr_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.analytical_mark === '' ? "Not Updated" : Empdata?.analytical_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_analy_mark === '' ? "Not Updated" : Empdata?.Hod_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_analy_mark === '' ? "Not Updated" : Empdata?.Ms_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_analy_mark === '' ? "Not Updated" : Empdata?.Dms_analy_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_analy_mark === '' ? "Not Updated" : Empdata?.Op_analy_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_analy_mark === '' ? "Not Updated" : Empdata?.Ceo_analy_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_commu_mark === '' ? "Not Updated" : Empdata?.Hr_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.communication_mark === '' ? "Not Updated" : Empdata?.communication_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_commu_mark === '' ? "Not Updated" : Empdata?.Hod_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_commu_mark === '' ? "Not Updated" : Empdata?.Ms_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_commu_mark === '' ? "Not Updated" : Empdata?.Dms_commu_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_commu_mark === '' ? "Not Updated" : Empdata?.Op_commu_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_commu_mark === '' ? "Not Updated" : Empdata?.Ceo_commu_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_atti_mark === '' ? "Not Updated" : Empdata?.Hr_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.attitude_mark === '' ? "Not Updated" : Empdata?.attitude_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_atti_mark === '' ? "Not Updated" : Empdata?.Hod_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_atti_mark === '' ? "Not Updated" : Empdata?.Ms_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_atti_mark === '' ? "Not Updated" : Empdata?.Dms_atti_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_atti_mark === '' ? "Not Updated" : Empdata?.Op_atti_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_atti_mark === '' ? "Not Updated" : Empdata?.Ceo_atti_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_confi_mark === '' ? "Not Updated" : Empdata?.Hr_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.confidence_mark === '' ? "Not Updated" : Empdata?.confidence_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_confi_mark === '' ? "Not Updated" : Empdata?.Hod_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_confi_mark === '' ? "Not Updated" : Empdata?.Ms_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_confi_mark === '' ? "Not Updated" : Empdata?.Dms_confi_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_confi_mark === '' ? "Not Updated" : Empdata?.Op_confi_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_confi_mark === '' ? "Not Updated" : Empdata?.Ceo_confi_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_bodylang_mark === '' ? "Not Updated" : Empdata?.Hr_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.bodylang_mark === '' ? "Not Updated" : Empdata?.bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_bodylang_mark === '' ? "Not Updated" : Empdata?.Hod_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_bodylang_mark === '' ? "Not Updated" : Empdata?.Ms_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_bodylang_mark === '' ? "Not Updated" : Empdata?.Dms_bodylang_mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Op_bodylang_mark === '' ? "Not Updated" : Empdata?.Op_bodylang_mark}  </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_bodylang_mark === '' ? "Not Updated" : Empdata?.Ceo_bodylang_mark}  </Typography>
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
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hr_Interview_Mark === '' ? "Not Updated" : Empdata?.Hr_Interview_Mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}> {Empdata?.total_Incharge_inter_mark === '' ? "Not Updated" : Empdata?.total_Incharge_inter_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Hod_interview_mark === '' ? "Not Updated" : Empdata?.Hod_interview_mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.Ms_Interview_Mark === '' ? "Not Updated" : Empdata?.Ms_Interview_Mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Dms_Interview_Mark === '' ? "Not Updated" : Empdata?.Dms_Interview_Mark}</Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Operation_Interview_Mark === '' ? "Not Updated" : Empdata?.Operation_Interview_Mark} </Typography>
                        </TableCell>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={2}>
                            <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.Ceo_Interview_Mark === '' ? "Not Updated" : Empdata?.Ceo_Interview_Mark} </Typography>
                        </TableCell>

                    </TableRow>

                </TableBody>
            </Table>
        </>
    )
}

export default memo(AssesmentSheetMark) 