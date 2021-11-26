import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { axioslogin } from 'src/views/Axios/Axios'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [menu, setMenu] = useState([])

  useEffect(() => {
    const module_rights = []

    const getModuleUserRight = async () => {

      const userinfo = sessionStorage.getItem('userDetl');
      const emp_no = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
      const postdata = {
        emp_slno: emp_no
      }

      try {

        const result = await axioslogin.post('/common/getModlRight', postdata)
        const { success, data } = await result.data

        if (success === 1) {

          const moduleDetl = await JSON.parse(data[0].module_slno)
          const moduleSlno = Object.values(moduleDetl)
          moduleSlno.map((val) => {
            module_rights.push(val)
          })

          const menus = navigation.filter((element, index, array) => {
            return module_rights.includes(element.slno)
          })
          // console.log(menus);

          setMenu(menus)
        }

      } catch (err) {
        console.log(err)
      }

    }
    getModuleUserRight()

  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* Company Logo Big Size */}
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* Company Logo Small size */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={menu} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
