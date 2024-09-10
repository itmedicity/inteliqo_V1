import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, useState } from 'react'
import { Option, Select } from '@mui/joy';

const CredentialDoc = lazy(() => import('./CredentialDoc/CredentialDoc'))
const CredentialNursing = lazy(() => import('./CredentialNursing/CredentialNursing'))
const CredentialPara = lazy(() => import('./CredentialParamedical/CredentialPara'))
const CredentialOthers = lazy(() => import('./CredentialOthers/CredentialOthers'))



const CredentialSelect = ({ Empdata }) => {
    const [value, setValue] = useState(0)
    return (
        <Box>
            <Box>
                <Box sx={{ ml: 1 }}>
                    <Typography level="title-md" >Please Select The Form</Typography>
                </Box>
                <Select
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    size='sm'
                    variant='outlined'
                    sx={{ mt: 1 }}
                >
                    <Option value={0} disabled={true}>Select Form</Option>
                    <Option value={1}>Credential And Privileging Form (Doctors)</Option>
                    <Option value={2}>Credential And Privileging Form (Nursing)</Option>
                    <Option value={3}>Credential And Privileging Form (Paramedical Staff)</Option>
                    <Option value={4}>Credential And Privileging Form (Jr,Pg,Observed Trainers,Post Diploma Pg Doctors)</Option>
                </Select>
            </Box>
            {value === 1 ? <CredentialDoc Empdata={Empdata} /> :
                value === 2 ? <CredentialNursing Empdata={Empdata} /> :
                    value === 3 ? <CredentialPara Empdata={Empdata} /> :
                        value === 4 ? <CredentialOthers Empdata={Empdata} /> :
                            null

            }


        </Box>
    )
}

export default memo(CredentialSelect)