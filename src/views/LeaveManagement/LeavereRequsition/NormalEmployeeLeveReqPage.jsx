import { Box, Input } from '@mui/joy';
import React, { memo } from 'react'
import { useSelector } from 'react-redux';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';

const NormalEmployeeLeveReqPage = () => {
    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const { em_no, sect_name, em_name } = empInformation;
    return (
        <Box sx={{ display: 'flex', flex: 1, p: 0.5 }}>
            <Box sx={{ flex: 1, px: 0.3, }}>
                <Input
                    size="sm"
                    fullWidth
                    placeholder='Department Section'
                    value={sect_name}
                    disabled
                />
            </Box>
            <Box sx={{ flex: 1, px: 0.3, }}>
                <Input
                    size="sm"
                    fullWidth
                    placeholder='Employee Name'
                    value={em_name}
                    disabled
                />
            </Box>
            <Box sx={{ flex: 1, px: 0.3, }}>
                <Input
                    size="sm"
                    fullWidth
                    placeholder='Employee Number'
                    value={em_no}
                    disabled
                />
            </Box>
        </Box>
    )
}

export default memo(NormalEmployeeLeveReqPage) 