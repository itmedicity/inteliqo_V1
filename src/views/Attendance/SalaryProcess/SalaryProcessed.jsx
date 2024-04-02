import { Box, Button, CssVarsProvider, Input } from '@mui/joy'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { addMonths, endOfMonth, format, startOfMonth, subDays } from 'date-fns'
import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { setDepartment } from 'src/redux/actions/Department.action';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Table from '@mui/joy/Table';
import { useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const SalaryProcessed = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(new Date());
    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])


    const onClickProcess = useCallback(async () => {
        const monthStartDate = format(subDays(startOfMonth(new Date(value)), 6), 'yyyy-MM-dd');
        const endOfMonthDate = format(endOfMonth(new Date(value)), 'yyyy-MM-dd');
        const postDate = {
            fromDate: monthStartDate,
            toDate: endOfMonthDate
        }

        // console.log(postDate)

        const getPunchMasterDta = await axioslogin.post("/payrollprocess/getPunchMasterSalaryAllEmployee", postDate);
        const { success, data } = getPunchMasterDta.data

        // console.log(data, success)
        const filterdPunchMaster = data;

        const filterEmNoFromPunMast = [...new Set(filterdPunchMaster?.map((e) => e.em_no))];

        const datass = filterEmNoFromPunMast?.map((emno) => {
            return {
                em_no: emno,
                data: filterdPunchMaster?.filter((l) => l.em_no === emno)?.map((el) => {
                    return {
                        duty_day: el.duty_day,
                        em_no: el.em_no,
                        duty_desc: el.duty_desc
                    }
                })?.sort((a, b) => b.duty_day - a.duty_day)
            }
        })?.filter((g) => g.em_no === 13802)

        // 


        datass[0].data?.map(async (b) => {
            // await setTimeout(async () => {
            //     await setInterval(() => {
            //         console.log(b)
            //     }, 2000)
            // }, 4000);
        }) // Resolving with some processed value


        console.log(datass)

    }, [value])


    return (
        <CustomLayout title="Salary Process Reports" displayClose={true} >
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
                <Box sx={{ display: 'flex', flex: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    // minDate={subMonths(new Date(), 1)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 3, flexDirection: 'row', mx: 2 }} >
                        <DepartmentDropRedx getDept={setDept} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 3, flexDirection: 'row', }} >
                        <DepartmentSectionRedx getSection={setDeptSection} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 5, px: 2 }} >
                        <CssVarsProvider>
                            <Button aria-label="Like" variant="outlined" color='success'
                                sx={{
                                    // color: '#90caf9'
                                }}
                                startDecorator={<RotateRightIcon />}
                                endDecorator={'Process'}
                                onClick={onClickProcess}
                            >

                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Box>
                {/* TABLE SECTION START HERE */}
                <Box>
                    <Table aria-label="basic table">
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>Dessert (100g serving)</th>
                                <th>Calories</th>
                                <th>Fat&nbsp;(g)</th>
                                <th>Carbs&nbsp;(g)</th>
                                <th>Protein&nbsp;(g)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Frozen yoghurt</td>
                                <td>159</td>
                                <td>6</td>
                                <td>24</td>
                                <td>4</td>
                            </tr>
                            <tr>
                                <td>Ice cream sandwich</td>
                                <td>237</td>
                                <td>9</td>
                                <td>37</td>
                                <td>4.3</td>
                            </tr>
                            <tr>
                                <td>Eclair</td>
                                <td>262</td>
                                <td>16</td>
                                <td>24</td>
                                <td>6</td>
                            </tr>
                            <tr>
                                <td>Cupcake</td>
                                <td>305</td>
                                <td>3.7</td>
                                <td>67</td>
                                <td>4.3</td>
                            </tr>
                            <tr>
                                <td>Gingerbread</td>
                                <td>356</td>
                                <td>16</td>
                                <td>49</td>
                                <td>3.9</td>
                            </tr>
                        </tbody>
                    </Table>
                </Box>
            </Box>
        </CustomLayout >
    )
}

export default memo(SalaryProcessed) 