import { Box, Checkbox, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';


const CredentialOperating = lazy(() => import('./CredentialOperating'))


const CredentialPrivileging = ({ ApprovalData, Operating, setOperating, Employee, List, setList }) => {


    const handleCheckboxChange = (slno, field) => {
        setList(prevList => {
            return prevList.map(item => {
                if (item.slno === slno) {
                    return { ...item, [field]: item[field] === 1 ? 0 : 1 };
                }
                return item;
            });
        });
    };
    const handleInputChange = (slno, value) => {
        setList(prevList => {
            return prevList.map(item => {
                if (item.slno === slno) {
                    return { ...item, remark: value };
                }
                return item;
            });
        });
    };

    return (
        <Box>

            <Typography level="title-md" sx={{ ml: 1 }}>Privileging</Typography>
            <Box sx={{ ml: 1 }}>
                <Typography>
                    Privilege request can be listed in a separate sheet to level of supervision required. Please put tick in the appropriate column against each procedure
                </Typography>

                <Typography sx={{ mt: 1 }}>
                    U - Can do the procedure unsupervised
                </Typography>
                <Typography>
                    S - Need Supervision to do the procedure(peer present /involved in procedure)
                </Typography>
                <Typography>
                    I - Interested to get trained in the procedure
                </Typography>
            </Box>

            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <thead>
                    <tr sx={{ p: 0 }}>
                        <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                Sl No
                            </Typography>
                        </th>
                        <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Name of the procedure</Typography>
                        </th>
                        <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                U
                            </Typography>
                        </th>
                        <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                S
                            </Typography>
                        </th>
                        <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                I
                            </Typography>
                        </th>

                        <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                Remark
                            </Typography>
                        </th>

                    </tr>
                </thead>
                <tbody >
                    {List?.map((item, slno) => (
                        <tr key={slno}>
                            <td style={{ textAlign: "center" }}>{item?.slno === null ? "not updated" : item?.slno}</td>
                            <td >{item?.name === null ? "not updated" : item?.name}</td>
                            <td style={{ textAlign: "center" }}>
                                <Checkbox
                                    checked={item.u === 1}
                                    onChange={() => handleCheckboxChange(item.slno, 'u')}
                                />
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <Checkbox
                                    checked={item.s === 1}
                                    onChange={() => handleCheckboxChange(item.slno, 's')}
                                />
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <Checkbox
                                    checked={item.i === 1}
                                    onChange={() => handleCheckboxChange(item.slno, 'i')}
                                />
                            </td>
                            <td >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    value={item.remark}
                                    onchange={(e) => handleInputChange(item.slno, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <CredentialOperating Operating={Operating} setOperating={setOperating} Employee={Employee} ApprovalData={ApprovalData} />

        </Box>
    )
}

export default memo(CredentialPrivileging)