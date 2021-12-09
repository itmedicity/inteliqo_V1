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

const Login = () => {

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
          empno: data.emp_no
        }
        console.log(loggedDetl)
        const loggedCredential = sessionStorage.setItem('userDetl', JSON.stringify(loggedDetl));
        if (loggedCredential !== null) {
          history.push("/home")
        }
      }

    }
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8} sm={12} >
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={submitLoginDetl} >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        onChange={(e) => { setUsername(e.target.value) }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit" >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '100%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="#">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register
                      </CButton>
                    </Link>
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
