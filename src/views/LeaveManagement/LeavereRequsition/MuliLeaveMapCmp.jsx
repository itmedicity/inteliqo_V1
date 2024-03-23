import React, { memo, lazy } from 'react'
import { Grid, Box } from '@mui/material'
import { Suspense } from 'react';
import TextInputBootStrap from 'src/views/Attendance/Component/TextInputBootStrap';
// import CasualLeaveSelected from './Func/CasualLeaveSelected';
import moment from 'moment';
import LinearProgreeBar from 'src/views/Component/MuiCustomComponent/LinearProgreeBar';

const MultiLeaveTypeSelectCmp = lazy(() => import('./Func/MultiLeaveTypeSelectCmp'));
const CasualLeaveSelected = lazy(() => import('./Func/CasualLeaveSelected'));
const CompansatorLeaveSelected = lazy(() => import('./Func/CompansatorLeaveSelected'));
const EarnLeaveSelected = lazy(() => import('./Func/EarnLeaveSelected'));
const HolidayLeaveSelected = lazy(() => import('./Func/HolidayLeaveSelected'));
const FestivalHolidaySelected = lazy(() => import('./Func/FestivalHolidaySelected'));

const MuliLeaveMapCmp = ({ index, data, handleChange, select, setSelect, casualLeve, setCasualLeave,
    earnLeave, setEarnLeave, coff, setCoff }) => {

    // const [select, setSelect] = useState(0)

    return (
        <Box
            component={Grid}
            xl={12}
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                py: 0.2
            }}
        >
            <Box component={Grid} item sx={{ display: 'flex', flex: 1, mx: 0.3, justifyContent: 'flex-start' }}  >
                <TextInputBootStrap
                    placeholder={`${moment(data.date).format('DD-MM-YYYY')} - ${moment(data.date).format('dddd')}`}
                    type="text"
                    disabled={true}
                />
            </Box>
            <Box item component={Grid} sx={{ display: 'flex', flex: 1, mx: 0.3 }} >
                <Suspense fallback={<LinearProgreeBar />} >
                    <MultiLeaveTypeSelectCmp
                        onChange={setSelect}
                        leaveTypeChange={handleChange}
                        index={index}
                    />
                </Suspense>
            </Box>
            <Box item component={Grid} sx={{ flex: 1 }} >
                <Suspense fallback={<LinearProgreeBar />} >
                    {/* 
                    casual leave -1 ,
                    holidays - > festival leave - nation holiday - 3, 4
                    earn leave - 8
                    conpansatory off = 11

                    lop / lwf - 5
                    esi leave - 6   
                    sick leave - 7  
                     */}
                    {
                        select === '1' ?
                            <CasualLeaveSelected handleChange={handleChange} index={index} date={data.date}
                                casualLeve={casualLeve} setCasualLeave={setCasualLeave} /> :
                            select === '4' ?    //  festival holiday
                                <FestivalHolidaySelected handleChange={handleChange} index={index} date={data.date} /> :
                                select === '3' ?    //  national holiday
                                    <HolidayLeaveSelected handleChange={handleChange} index={index} date={data.date} /> :
                                    select === '11' ?
                                        <CompansatorLeaveSelected handleChange={handleChange} index={index} date={data.date}
                                            coff={coff} setCoff={setCoff} /> :
                                        select === '8' ?
                                            <EarnLeaveSelected handleChange={handleChange} index={index} date={data.date} earnLeave={earnLeave}
                                                setEarnLeave={setEarnLeave} /> : null
                    }
                </Suspense>
            </Box>
        </Box>
    )
}

export default memo(MuliLeaveMapCmp)