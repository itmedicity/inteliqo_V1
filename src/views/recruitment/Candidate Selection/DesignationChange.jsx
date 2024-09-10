import { Box, Option, Select, Textarea } from '@mui/joy';
import React, { memo, useCallback } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const DesignationChange = ({ desgdata, setdesgid, desgid, desg_status, setdesg_status, remark, setremark }) => {

    const handlechange = useCallback((e, newValue) => {
        setdesgid(newValue);
    }, [setdesgid])
    return (
        <>
            <CustmTypog title={'Designation Change (if Required)'} />
            <Box sx={{ mt: 1 }}>
                <Box sx={{ pt: 1, ml: 2 }}>
                    <JoyCheckbox
                        label='For designation Change'
                        name="For designation Change"
                        checked={desg_status}
                        onchange={(e) => setdesg_status(e.target.checked)}
                    />

                </Box>
                {
                    desg_status === true ?

                        <Box sx={{ mt: 1, ml: 1 }}>
                            <Select
                                defaultValue={[]}
                                value={desgid}
                                onChange={(e, newValue) => handlechange(e, newValue)}
                                sx={{
                                    minWidth: '13rem',
                                }}

                                variant='outlined'
                            >
                                <Option disabled value={0}>Select Designation</Option>
                                {
                                    desgdata?.map((val, index) => {
                                        return <Option key={index} value={val.desg_id}>{val.desg_name}</Option>
                                    })
                                }
                            </Select>

                            <Box sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', width: "100%", }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="Remark"
                                        variant="outlined"
                                        // value={remark}
                                        sx={{ width: '100%' }}
                                        minRows={4}
                                        onChange={(e) => setremark(e.target.value)}
                                    />

                                </Box>
                            </Box>
                        </Box> : <></>
                }
            </Box>

        </>
    )
}

export default memo(DesignationChange)