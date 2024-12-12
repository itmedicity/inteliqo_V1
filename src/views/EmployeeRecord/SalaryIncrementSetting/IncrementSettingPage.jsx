import { Box, Button, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import SearchIcon from '@mui/icons-material/Search';

const IncrementSettingPage = () => {
    const [Empno, setEmpNo] = useState(0)

    const getData = useCallback(async () => {
        console.log("HV");
        console.log(Empno);
    }, [Empno])

    return (
        <CustomLayout title="Salary Increment Updation Setting" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', p: 1 }}>
                    <Tooltip title="Employee Number" followCursor placement='top' arrow>
                        <Box sx={{ mt: 0.5, px: 0.3, }}>
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Employee Number"
                                name="Empno"
                                value={Empno}
                                onchange={(e) => setEmpNo(e.target.value)}
                            />
                        </Box>
                    </Tooltip>
                    <Tooltip title="Click Here to Save Leave Request" followCursor placement='top' arrow variant='outlined' color='danger' >
                        <Button
                            aria-label="Like"
                            variant="outlined"
                            color="primary"
                            onClick={getData}
                            size='sm'
                            endDecorator={<Box>Search</Box>}
                        >
                            <SearchIcon fontSize='small' />
                        </Button>
                    </Tooltip>
                </Box>
            </Box>
        </CustomLayout>
    )
}

export default memo(IncrementSettingPage) 