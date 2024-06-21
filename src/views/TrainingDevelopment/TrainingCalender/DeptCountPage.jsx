import { Box } from '@mui/joy';
import { format } from 'date-fns';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const DeptCountPage = ({ topic, SelectedDate }) => {
    const [deptdata, SetDeptdata] = useState([])

    const [deptCounts, setDeptCounts] = useState([]);

    useEffect(() => {
        const postdata = {
            topic: topic,
            current_date: format(new Date(SelectedDate), "yyyy-MM-dd")
        }
        const GetDeptData = (async (postdata) => {
            const result = await axioslogin.post(`/InductionTraining/getInductDeptData`, postdata)
            const { success, data } = result.data;
            if (success === 2) {
                SetDeptdata(data)
            }
            else {
                SetDeptdata([])
            }
        })
        GetDeptData(postdata)
    }, [topic, SelectedDate])


    useEffect(() => {
        const calculateDeptCounts = () => {
            const counts = {};
            deptdata?.map((val) => {
                if (counts[val.dept_name]) {
                    counts[val.dept_name]++;
                } else {
                    counts[val.dept_name] = 1;
                }
            });

            return Object.entries(counts).map(([dept_name, count]) => ({ dept_name, count }));
        };
        const deptCountsArray = calculateDeptCounts();
        setDeptCounts(deptCountsArray);
    }, [deptdata]);

    return (
        <Box>
            {deptCounts?.map((row, ndx) => (
                <Box key={ndx}>{row.dept_name} ({row.count}) </Box>
            ))}
        </Box>
    )
}

export default memo(DeptCountPage) 
