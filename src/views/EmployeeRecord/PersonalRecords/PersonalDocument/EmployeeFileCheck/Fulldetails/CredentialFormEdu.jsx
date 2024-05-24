import React, { lazy, memo } from 'react'
import { Box, Table, Typography } from '@mui/joy';
import moment from 'moment'

const Credentialdeclaration = lazy(() => import('./Credentialdeclaration'))

const CredentialFormEdu = ({ details, educaton, registration, Training, Employee, Verificationdata }) => {
    const { edu } = details
    return (
        <Box>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Academic Details</Typography>

            {educaton?.length > 0 ?
                <Table>
                    <thead >
                        <tr>
                            <th>Qualification</th>
                            <th>Institution</th>
                            <th>Course</th>
                            <th>Specialization</th>
                            <th>Board</th>
                            <th>University</th>
                            <th>Year Of passing</th>
                            <th>Rank</th>

                        </tr>
                    </thead>
                    <tbody>
                        {educaton?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.edu_desc === null ? "not updated" : item?.edu_desc}</td>
                                <td>{item?.institution_name === null ? "not updated" : item?.institution_name}</td>
                                <td>{item?.cour_desc === null ? "not updated" : item?.cour_desc}</td>
                                <td>{item?.spec_desc === null ? "not updated" : item?.spec_desc}</td>
                                <td>{item?.board_name === null ? "not updated" : item?.board_name}</td>
                                <td>{item?.unver_name === null ? "not updated" : item?.unver_name}</td>
                                <td>{item?.em_year === null ? "not updated" : item?.em_year}</td>
                                <td>{item?.em_mark_grade === null ? "not updated" : item?.em_mark_grade}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                : null}


            <Table>
                <thead >
                    <tr>
                        <th>Education</th>
                        <th>School Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Graduated</th>
                        <th>Grade</th>
                        <th>Gpa</th>

                    </tr>
                </thead>
                <tbody>
                    {edu?.map((item, index) => (
                        <tr key={index}>
                            <td> {item?.education === "" ? "not updated" :
                                item?.education === 1 ? "DOCTORATE/PHD" :
                                    item?.education === 2 ? "MASTERS/POST-GRADUATION" :
                                        item?.education === 3 ? "GRADUATION/DIPLOMA" :
                                            item?.education === 4 ? "12TH" :
                                                item?.education === 5 ? "10TH" :
                                                    item?.education === 6 ? "TRAINING COURSES" :
                                                        item?.education === 7 ? "CERTIFICATION" :
                                                            item?.education === 8 ? "INTERNATIONAL TRAINING" :
                                                                item?.education === 9 ? "INTERNATIONAL CERTIFICATION" :
                                                                    item?.education
                            }</td>
                            <td> {item?.schoolname === "" ? "not updated" : item?.schoolname}</td>
                            <td> {item?.edustartdate === 0 ? "not updated" : moment(item?.edustartdate).format('DD-MM-YYYY')}</td>
                            <td>  {item?.eduenddate === 0 ? "not updated" : moment(item?.eduenddate).format('DD-MM-YYYY')}</td>
                            <td>  {item?.Graduated === false ? "No" : item?.Graduated === true ? "Yes" : "not updated"}</td>
                            <td>{item?.AvgGrade === "" ? "not updated" : item?.AvgGrade}</td>
                            <td> {item?.gpa === "" ? "not updated" : item?.gpa}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Training Details</Typography>

            <Table>
                <thead>
                    <tr>
                        <th>Name Of The Registration </th>
                        <th >Registration Issuing Authority </th>
                        <th>Registration Number </th>
                        <th>Registration Date </th>
                        <th>Validity </th>
                    </tr>
                </thead>
                <tbody>
                    {registration?.map((val, index) => (
                        <tr key={val.registration_sl_no}>
                            <td>   {val?.NameOfReg === "" ? "not updated" : val?.NameOfReg}</td>
                            <td>{val?.RegAuthority === "" ? "not updated" : val?.RegAuthority}</td>
                            <td>{val?.RegNo === 0 ? "not updated" : val?.RegNo}</td>
                            <td> {val?.RegDate === 0 ? "not updated" : moment(val?.RegDate).format('DD-MM-YYYY')}</td>
                            <td> {val?.Validity === 0 ? "not updated" : moment(val?.Validity).format('DD-MM-YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Registraction Details</Typography>

            <Table>
                <thead>
                    <tr>
                        <th >Name of the training/workshop program</th>
                        {/* <th style={{ textAlign: 'center' }}> Period </th> */}
                        <th >Conducted By </th>
                        <th>From </th>
                        <th style={{ borderRightWidth: 0 }}> To </th>
                    </tr>

                </thead>
                <tbody>
                    {Training?.map((val, index) => (
                        <tr key={val.Training_sl_no}>
                            <td>   {val?.NameOfpgrm === "" ? "not updated" : val?.NameOfpgrm}</td>
                            {/* <td>{val?.RegAuthority === "" ? "not updated" : val?.RegAuthority}</td> */}
                            <td>{val?.conducted === 0 ? "not updated" : val?.conducted}</td>
                            <td> {val?.from_date === 0 ? "not updated" : moment(val?.from_date).format('DD-MM-YYYY')}</td>
                            <td> {val?.to_date === 0 ? "not updated" : moment(val?.to_date).format('DD-MM-YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* declaration page */}
            <Credentialdeclaration Employee={Employee} Verificationdata={Verificationdata} />

        </Box>
    )
}

export default memo(CredentialFormEdu) 