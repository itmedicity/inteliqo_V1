import { Option, Select } from '@mui/joy'
import React, { memo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { axioslogin } from '../Axios/Axios'

const ShiftSelect = ({ value, setValue, setShiftName }) => {
  //initializing
  const [ShiftData, setShiftData] = useState([])

  useEffect(() => {
    const getshiftdata = async () => {
       const result = await axioslogin.get('/shift/all/showlist')
      const { success, data } = result.data
        if (success === 1) {
        setShiftData(data)
      } else {
        setShiftData([])
      }
    }
    getshiftdata()
  }, [])

  return (
    <Select
      value={value}
      onChange={(event, newValue) => {
        setShiftName(event.target.innerText)
        setValue(newValue)
      }}
      size="md"
      variant="outlined"
    >
      <Option disabled value={0}>
        Select Shift
      </Option>
      {ShiftData?.map((val, index) => {
        return (
          <Option key={index} value={val?.shft_slno}>
            {val?.shft_desc}
          </Option>
        )
      })}
    </Select>
  )
}

export default memo(ShiftSelect)
