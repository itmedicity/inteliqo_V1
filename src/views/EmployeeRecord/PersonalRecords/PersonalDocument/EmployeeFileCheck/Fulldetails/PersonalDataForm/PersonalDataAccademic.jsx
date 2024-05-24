import { Box, Table, Typography } from '@mui/joy'
import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { TableContainer } from '@mui/material';
import moment from 'moment';


const PersonalDataAccademic = ({ edudata, educaton, HighData }) => {
    return (
        <Box sx={{ mt: 1 }}>
            <CustmTypog title={"Academic Details"} />
            <TableContainer sx={{}}>
                {edudata?.length > 0 ?
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
                            {edudata?.map((item, index) => (
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
                    : null}
            </TableContainer>
            {educaton?.length > 0 ?
                <Table sx={{ mt: 1 }}>
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
            <Box sx={{ mt: 1 }}>
                <CustmTypog title={"Computer awareness"} />
                <Typography level="title-md" sx={{ ml: 1 }}> {HighData?.computer_awareness === "" ? "Not Updated" : HighData?.computer_awareness}</Typography>

            </Box>


        </Box>
    )
}

export default memo(PersonalDataAccademic) 