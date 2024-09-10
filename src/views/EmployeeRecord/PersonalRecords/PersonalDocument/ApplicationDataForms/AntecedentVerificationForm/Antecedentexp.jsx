import { Box, Table } from '@mui/joy'
import moment from 'moment';
import React, { memo } from 'react'

const Antecedentexp = ({ experience, FormData }) => {

    const { exp } = FormData;
    return (
        <Box>
            {experience?.length > 0 ?
                <Table>
                    <thead >
                        <tr>
                            <th>Name Of The Institution</th>
                            <th>Position Held</th>
                            <th>Date From</th>
                            <th>Date To</th>
                            <th>Gross Monthly Salary</th>

                        </tr>
                    </thead>
                    <tbody>
                        {experience?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.em_institution === null ? "not updated" : item?.em_institution}</td>
                                <td>{item?.em_position === null ? "not updated" : item?.em_position}</td>
                                <td>{item?.em_from === null ? "not updated" : item?.em_from}</td>
                                <td>{item?.em_to === null ? "not updated" : item?.em_to}</td>
                                <td>{item?.em_salary === null ? "not updated" : item?.em_salary}</td>

                            </tr>
                        ))}
                    </tbody>

                </Table>

                : null}
            {exp?.length > 0 ?
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', }}>
                    <thead >
                        <tr>
                            <th>Name Of The Institution</th>
                            <th>Position Held</th>
                            <th>Date From</th>
                            <th>Date To</th>
                            <th>Currently Working</th>
                            <th>Supervisor Name</th>
                            <th>Additional information</th>
                            <th>Other information</th>
                            <th>Responsibilities</th>

                        </tr>
                    </thead>
                    <tbody>
                        {exp?.map((val, index) => (
                            <tr key={val.id}>
                                <td>   {val?.Employer === "" ? "not updated" : val?.Employer}</td>
                                <td>{val?.jobexp === "" ? "not updated" : val?.jobexp}</td>
                                <td>{val?.expstartdate === 0 ? "not updated" : moment(val?.expstartdate).format('DD-MM-YYYY')}</td>
                                <td> {val?.expenddate === 0 ? "not updated" : moment(val?.expenddate).format('DD-MM-YYYY')}</td>
                                <td> {val?.Workingstatus === false ? "No" : val?.Workingstatus === true ? "Yes" : "not updated"}</td>
                                <td>{val?.SupervisorName === "" ? "not updated" : val?.SupervisorName}</td>
                                <td> {val?.Additionalinf === "" ? "not updated" : val?.Additionalinf}</td>
                                <td> {val?.Other === "" ? "not updated" : val?.Other}</td>
                                <td> {val?.Responsibilities === "" ? "not updated" : val?.Responsibilities}</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
                : null}


        </Box>

    )
}

export default memo(Antecedentexp)