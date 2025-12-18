import { Option, Select } from '@mui/joy'
import React, { memo } from 'react'
import { useQuery } from 'react-query'
import { getSectionDoctor } from 'src/redux/reduxFun/useQueryFunctions'

const SectionBasedDoctors = ({ value, setValue, sect }) => {

    const { data: sectionDoctorList } = useQuery({
        queryKey: ['getSectionDoctorList', sect],
        queryFn: () => getSectionDoctor(sect),
        enabled: !!getSectionDoctor,
        staleTime: Infinity
    })
    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            sx={{ width: '100%' }}
            color='primary'
        >
            <Option disabled value={0}> Select Doctor</Option>
            {
                sectionDoctorList?.map((val, index) => {
                    return <Option key={index} value={val.em_id}>{val.em_name} ({val.em_no})</Option>
                })
            }
        </Select>
    )
}

export default memo(SectionBasedDoctors) 