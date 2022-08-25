import { CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
const ProfileMenus = React.lazy(() => import('./EmpMenus/ProfileMenus'));
const SecondMenu = React.lazy(() => import('./EmpMenus/SecondMenu'));

const MenuRenderWind = () => {

    const state = useSelector((state) => {
        return state.getMenuRenderCompRights.slno;
    })

    return (
        <Suspense fallback={<CircularProgress />} >
            {
                state === 105 ? <SecondMenu /> : <ProfileMenus />
            }
        </Suspense>
    )
}

export default MenuRenderWind