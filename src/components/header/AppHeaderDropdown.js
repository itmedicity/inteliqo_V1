import React, { memo, useCallback, useEffect } from 'react'
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { IoPower } from 'react-icons/io5'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { useHistory } from 'react-router-dom'
import ProfilePicDefault from './../../assets/images/default.png'
import { axioslogin } from 'src/views/Axios/Axios'
import { employeeNumber, urlExist } from 'src/views/Constant/Constant'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import PasswordModal from './PasswordModal'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const AppHeaderDropdown = () => {

  const history = useHistory();

  const avatarLogout = () => {
    sessionStorage.clear();
    infoNofity('You Are Logged Out Successfully');
    history.push('/')
  }
  const [src, setSrc] = useState(ProfilePicDefault)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const getEmpIdforProfilePic = async () => {
      const result = await axioslogin.get(`/common/getempid/${employeeNumber()}`)
      const { success, data } = result.data
      if (success === 1) {
        const { emp_id } = data[0]
        const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER}/${emp_id}/profilePic.jpeg`);
        urlExist(profilePic, (status) => {
          if (status === true) {
            const picUrl = JSON.parse(profilePic)
            setSrc(picUrl)
          } else {
            setSrc(ProfilePicDefault)
          }
        })
      }
    }
    getEmpIdforProfilePic()
  }, [])

  const emplogin = useSelector((state) => state?.getProfileData.ProfileData[0], _.isEqual)

  const changePass = useCallback(() => {
    setOpen(true)
  }, [])


  return (
    <>
      <PasswordModal open={open} setOpen={setOpen} details={emplogin} />
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          {/* <CAvatar src={src} size="md" height={24} width={24} /> */}
          <Avatar
            alt="Remy Sharp"
            src={src}
            sx={{ width: 32, height: 32 }}
          />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
          <CDropdownItem href="#">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
          <CDropdownItem style={{ cursor: "pointer" }} onClick={changePass}>
            <CIcon icon={cilSettings} className="me-2" />
            Change Password
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem style={{ cursor: "pointer" }} onClick={avatarLogout}  >
            <IoPower className="text-danger me-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default memo(AppHeaderDropdown) 
