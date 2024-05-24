import { Box } from '@mui/joy';
import React, { Fragment, memo, useMemo, useState } from 'react'
import { screenInnerHeight } from 'src/views/Constant/Constant';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import EmployeeHeaderpage from './EmployeeHeaderpage';
import EmpDeptOverview from './EmpDeptOverview';
import EmpTrainerApprovals from './EmpTrainerApprovals';
import EmployeeLineChart from './EmployeeLineChart';
import EmpBargraph from './EmpBargraph';
import InductionRetestpage from './InductionRetestpage';
import DepartmentalRetest from './DepartmentalRetest';
// import TrainingCarousel from '../TnDViewComponents/TrainingCarousel';
import DepartmentalTrainingList from './DepartmentalTrainingList';
import EmpInductionOverview from './EmpInductionOverview';


const EmployeeViewMainPage = () => {
    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department, em_id, em_dept_section } = employeeProfileDetl;

    const [inductComplt, SetInductComplt] = useState(0)
    const [inductPndg, SetInductPndg] = useState(0)
    const [inductNext, SetInductNext] = useState(0)
    const [InductRetest, SetInductRetest] = useState(0)
    const [InductTotal, SetInductTotal] = useState(0)

    const [DeptComplt, SetDeptComplt] = useState(0)
    const [DeptPndg, SetDeptPndg] = useState(0)
    const [DeptNext, SetDeptNext] = useState(0)
    const [DeptRetest, SetDeptRetest] = useState(0)
    const [DeptTotal, SetDeptTotal] = useState(0)

    return (
        <Fragment>
            <Box sx={{ width: "100%", p: 0.5, overflowX: "auto", height: screenInnerHeight - 200, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Box sx={{ width: "99%" }}>
                    <EmployeeHeaderpage em_department={em_department} em_id={em_id}
                        inductComplt={inductComplt} SetInductComplt={SetInductComplt} inductPndg={inductPndg} SetInductPndg={SetInductPndg} inductNext={inductNext} SetInductNext={SetInductNext} DeptComplt={DeptComplt} SetDeptComplt={SetDeptComplt} DeptPndg={DeptPndg} SetDeptPndg={SetDeptPndg} DeptNext={DeptNext} SetDeptNext={SetDeptNext} SetInductRetest={SetInductRetest} SetDeptRetest={SetDeptRetest} SetDeptTotal={SetDeptTotal} SetInductTotal={SetInductTotal}
                    />
                    <Box sx={{ mt: 2, width: "100%", display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap", }}>
                        {/* <TrainingCarousel em_name={em_name} /> */}
                        <Box sx={{ flex: 1 }}>
                            <DepartmentalTrainingList em_department={em_department} em_id={em_id} em_dept_section={em_dept_section} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <EmpTrainerApprovals em_id={em_id} />
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2, width: "100%", gap: 3, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        <Box sx={{ flex: 1 }}>
                            <EmpDeptOverview DeptComplt={DeptComplt} DeptPndg={DeptPndg} DeptNext={DeptNext} DeptRetest={DeptRetest} DeptTotal={DeptTotal} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <EmpInductionOverview
                                inductComplt={inductComplt} inductPndg={inductPndg} inductNext={inductNext} InductRetest={InductRetest} InductTotal={InductTotal} />
                        </Box>

                    </Box>
                    <Box sx={{ mt: 2, width: "100%", gap: 3, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        <EmployeeLineChart em_id={em_id} />
                        <EmpBargraph em_id={em_id} />
                    </Box>
                    <Box sx={{ mt: 2, width: "100%", }}>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap" }}>
                            <Box sx={{ flex: 1, marginBottom: 1 }}>
                                <DepartmentalRetest em_id={em_id} />
                            </Box>
                            <Box sx={{ flex: 1, marginBottom: 1 }}>
                                <InductionRetestpage em_id={em_id} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}


export default memo(EmployeeViewMainPage) 
