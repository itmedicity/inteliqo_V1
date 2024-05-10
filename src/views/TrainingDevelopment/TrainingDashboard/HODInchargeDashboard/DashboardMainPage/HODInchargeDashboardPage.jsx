import { Box } from '@mui/joy';
import React, { Fragment, memo, useMemo, useState } from 'react'
import { screenInnerHeight } from 'src/views/Constant/Constant';
import HodInchargeHeaderPage from './HodInchargeHeaderPage';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import HODTrainingOverview from './HODTrainingOverview';
import HodDeptQRPage from './HodDeptQRPage';
import HodInchargeApprvls from './HodInchargeApprvls';
import HODTrainingList from './HODTrainingList';
import HODpersonalDetails from './HODpersonalDetails';
// import TrainingCarousel from '../../TnDViewComponents/TrainingCarousel';
import HodInchargeTrainingGraph from './HodInchargeTrainingGraph';

const HODInchargeDashboardPage = () => {

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department, em_id, em_dept_section } = employeeProfileDetl;

    const [DeptComplt, SetDeptComplt] = useState(0)
    const [DeptPndg, SetDeptPndg] = useState(0)
    const [DeptNext, SetDeptNext] = useState(0)
    const [DeptRetest, SetDeptRetest] = useState(0)
    const [DeptTotal, SetDeptTotal] = useState(0)

    const [Hodself, SetHodSelf] = useState(false)

    return (
        <Fragment>
            <Box sx={{ width: "100%", p: 0.5, overflowX: "auto", height: screenInnerHeight - 200, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Box sx={{ width: "99%" }}>
                    {Hodself === false ?
                        <HodInchargeHeaderPage em_department={em_department}
                            DeptComplt={DeptComplt} SetDeptComplt={SetDeptComplt} DeptPndg={DeptPndg} SetDeptPndg={SetDeptPndg} DeptNext={DeptNext} SetDeptNext={SetDeptNext} SetDeptRetest={SetDeptRetest} SetDeptTotal={SetDeptTotal}
                        /> : null}
                    <Box sx={{ mt: 2, width: "100%", display: "flex", gap: 3, flexWrap: "wrap" }}>
                        <HODpersonalDetails Hodself={Hodself} SetHodSelf={SetHodSelf} />
                    </Box>
                    {Hodself === false ?
                        <Box sx={{ mt: 2, width: "100%", display: "flex", gap: 3, flexDirection: "row", flexWrap: "wrap", }}>
                            {/* <TrainingCarousel /> */}
                            <HODTrainingOverview DeptComplt={DeptComplt} DeptPndg={DeptPndg} DeptNext={DeptNext} DeptRetest={DeptRetest} DeptTotal={DeptTotal} />
                            <HODTrainingList em_department={em_department} em_dept_section={em_dept_section} />
                            <HodInchargeApprvls em_id={em_id} />
                        </Box> : null}
                    {Hodself === false ?
                        <Box sx={{ mt: 2, display: "flex", gap: 3, flexWrap: "wrap" }}>
                            <HodInchargeTrainingGraph em_department={em_department} />
                        </Box> : null}
                    {Hodself === false ? <Box sx={{ mt: 2, width: "100%", }}>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", gap: 3, flexWrap: "wrap" }}>
                            <Box sx={{ flex: 1, marginBottom: 1 }}>
                                <HodDeptQRPage em_department={em_department} />
                            </Box>
                        </Box>
                    </Box> : null}
                </Box>
            </Box >

        </Fragment >
    )
}

export default memo(HODInchargeDashboardPage) 
