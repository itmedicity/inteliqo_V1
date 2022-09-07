import { CircularProgress } from '@mui/material'
import React, { memo, Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
const ProfileMenus = React.lazy(() => import('./EmpMenus/Profile/ProfileMenus'));
const PersonalInformation = React.lazy(() => import('./EmpMenus/PersonalInformation/PersonalInfrom'));

const MenuRenderWind = () => {

    const state = useSelector((state) => {
        return state.getMenuRenderCompRights.slno;
    })

    const displayComp = (state) => {
        return state === 105 ? <PersonalInformation /> : <ProfileMenus />
    }

    return (
        <Suspense fallback={<CircularProgress />} >
            {
                // state === 105 ? <SecondMenu /> : <ProfileMenus />
                displayComp(state)
            }
        </Suspense>
    )
}

export default memo(MenuRenderWind)