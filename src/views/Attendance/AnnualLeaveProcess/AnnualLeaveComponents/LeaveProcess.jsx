import { Box, Button } from '@mui/joy'
import React, { useCallback } from 'react'
import CustomTypoTwo from 'src/views/Component/MuiCustomComponent/CustomTypoTwo'

const LeaveProcess = ({ val }) => {
    console.log(val);
    const leaveCreditProcessFun = useCallback(async () => {
        console.log("Fghd");
    }, [])

    return (
        <Box sx={{ display: 'flex', p: 0.3, height: 30, flex: 1, }}>
            <Box sx={{ display: 'flex', width: '70%', pt: 0.5 }}>
                vcbc {/* <CustomTypoTwo title={val.name} /> */}
            </Box>
            <Box sx={{ display: 'flex', width: '30%', pt: 0.05 }}>
                <Button
                    variant="outlined"
                    size='sm'
                    sx={{ mx: 0.5, flex: 1, mt: 0.01 }}
                    // disabled={buttonDisableStatus}
                    onClick={() => leaveCreditProcessFun(val)}
                >
                    Process
                </Button>
            </Box>
        </Box>
    )
}

export default LeaveProcess