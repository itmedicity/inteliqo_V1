import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ToastContainer } from 'react-toastify'
import { errorNofity, infoNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch } from 'react-redux'
import { Actiontypes } from '../../../redux/constants/action.type'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {

  const { FETCH_LOGIN_CRED } = Actiontypes;
  const dispatch = useDispatch()
  const history = useHistory()
  const [emp_username, setUsername] = useState("");
  const [emp_password, setPassword] = useState("");

  const useLoginDetl = {
    emp_username: emp_username,
    emp_password: emp_password
  }

  const submitLoginDetl = async (e) => {
    e.preventDefault()
    if (emp_username === "") {
      infoNofity("Username Feild Is Blank")
    } else if (emp_password === "") {
      infoNofity("Password Feild Is Blank")
    } else {

      const result = await axioslogin.post("/employee/login", useLoginDetl)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });

      const data = result.data;

      if (data.success === 0) {
        errorNofity("User does not exsit");
      } else {

        const loggedDetl = {
          user: data.user,
          token: data.token,
          empno: data.emp_no,
          empid: data.emp_id
        }
        dispatch({ type: FETCH_LOGIN_CRED, payload: loggedDetl })
        const loggedCredential = sessionStorage.setItem('userDetl', JSON.stringify(loggedDetl));
        if (loggedCredential !== null) {
          history.push("/home")
        }
      }

    }
  }


  return (
    <div className=" min-vh-100 d-flex flex-row align-items-center" style={{ backgroundColor: "#e3f2fd" }}>
      <ToastContainer />
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md={8} sm={12} >
            <CCardGroup>
              <CCard className="p-4" style={{ borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} >
                <CCardBody >
                  <CForm onSubmit={submitLoginDetl} >
                    <h1 style={{ fontFamily: "cursive" }}>Login</h1>
                    <p className="text-medium-emphasis" style={{ fontFamily: "monospace" }}>Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <PersonOutlineOutlinedIcon style={{ color: "#673ab7" }} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        onChange={(e) => { setUsername(e.target.value) }}
                        style={{ fontFamily: "cursive" }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <LockOutlinedIcon style={{ color: "#673ab7" }} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                        style={{ fontFamily: "cursive" }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton className="px-4" type="submit" style={{ backgroundColor: "#673ab7", fontFamily: "cursive" }}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" style={{ color: "#673ab7", fontFamily: "cursive" }}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '100%', backgroundColor: "#673ab7", borderTopRightRadius: 15, borderBottomRightRadius: 15 }}  >
                <CCardBody className="text-center">
                  <div style={{ fontFamily: "monospace" }} >
                    <h2>InteliQo</h2>
                    <h6>Human Resource Management System</h6>
                    <h6>Hi, Welcome Back</h6>
                    <p>
                      Enter your credentials to continue
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
