import { Grid, Paper, } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import TestCmp from './TestCmp';
import _ from 'underscore';
import {
    getResignCount,
    getcontractCloseCount,
    getovertimeCount,
    getovertimeCountIncharge,
    getovertimeCountHOD,
    getovertimeCountCEO,
    getovertimeCountUser,
    getleavereqCountIncharge,
    getleavereqCountHOD,
    getleavereqCountCEO,
    getleavereqCountHR,
    getLeaveRequestCountUser,
    getresignreqCountIncharge,
    getresignreqCountHOD,
    getresignreqCountCEO,
    getContractRenewalCount,
    getTrainingCount,
    getRegistRenew,
    getProbation,
    getAnnual,
    getAppraisalHod,
    getAppraisalIncharge,
    getAppraisalCeo,
    getAllAppraisal
} from 'src/redux/actions/Dashboard.actions';

const DashAlertCmp = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    //getting employee id
    const em_id = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_id
    }, _.isEqual)

    //get module rights
    const modulerights = useSelector((state) => {
        return state?.getModuleRightList?.modulerightsList.map(ele => ele.menu_slno) || []
    }, shallowEqual)

    // New States
    const notificationNewState = useSelector((state) => {
        return state?.getDashboardNotification
    }, shallowEqual)

    useEffect(() => {
        dispatch(getResignCount())
        dispatch(getcontractCloseCount())
        dispatch(getovertimeCount())
        dispatch(getovertimeCountIncharge())
        dispatch(getovertimeCountHOD())
        dispatch(getovertimeCountCEO())
        dispatch(getovertimeCountUser(em_id))
        dispatch(getleavereqCountIncharge())
        dispatch(getleavereqCountHOD())
        dispatch(getleavereqCountCEO())
        dispatch(getleavereqCountHR())
        dispatch(getLeaveRequestCountUser(em_id))
        dispatch(getresignreqCountIncharge())
        dispatch(getresignreqCountHOD())
        dispatch(getresignreqCountCEO())
        dispatch(getContractRenewalCount())
        dispatch(getTrainingCount())
        dispatch(getRegistRenew())
        dispatch(getProbation())
        dispatch(getAnnual())
        dispatch(getAppraisalHod(em_id))
        dispatch(getAppraisalIncharge(em_id))
        dispatch(getAppraisalCeo())
        dispatch(getAllAppraisal())
    }, [em_id])

    const data = Object.values(notificationNewState);
    const entries = useMemo(() => data, [data]);
    const newDashMenu = entries.filter(val => modulerights.includes(val.slno) === true ? val.slno : null);
    const notification = useMemo(() => newDashMenu, [newDashMenu]);

    return (
        <Fragment>
            <Paper square sx={{ p: 1, width: '100%', display: "flex" }} elevation={3}>
                <Grid
                    container
                    spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                    columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                    sx={{ width: '100%' }} >

                    {notification.map((val, index) => (
                        <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                            <TestCmp widgetName={val.name} count={val.count} status={val.status} slno={val.slno} indx={index} />
                        </Grid>
                    ))}

                </Grid>
            </Paper>
        </Fragment >
    )
}

export default memo(DashAlertCmp)