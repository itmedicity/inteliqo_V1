import React, { Fragment, useEffect, useState } from 'react'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { axioslogin } from 'src/views/Axios/Axios';

const WorkingHours = ({ value, setValue, style, label }) => {
  const [Shiftdata, setShiftData] = useState([])
  useEffect(() => {
    const getshiftdata = async () => {
      const result = await axioslogin.get('/shift')
      const { success, data } = result.data
      if (success === 1) {
        setShiftData(data)
      }
    }
    getshiftdata()
  }, [])
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Fragment>
      <FormControl fullWidth sx={{
        "&.MuiFormControl-root": {
          marginTop: '4px',
        },
      }} >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          fullWidth
          displayEmpty
          variant='outlined'
          sx={{
            height: 26,
            lineHeight: 1,
            ...style,
            "&.MuiOutlinedInput-root": {
              // height: '1px',
            },
          }}
        >
          <MenuItem value='0' disabled>
            {label}
          </MenuItem>
          {
            Shiftdata && Shiftdata.map((val, index) => {
              return <MenuItem key={index} value={val.shft_slno}>{val.shft_desc}</MenuItem>
            })
          }
        </Select>
      </FormControl >
    </Fragment >
  )
}

export default WorkingHours