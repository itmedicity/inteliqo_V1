// import { PhotoCamera } from '@material-ui/icons'
import { Card, CardActionArea, CardMedia, Stack, Avatar, Typography, CardContent } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { urlExist } from 'src/views/Constant/Constant'
import ProfilePicDefault from '../../../../assets/images/default.png'
import { CircularProgress } from '@mui/material';
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPersonalData } from 'src/redux/actions/Profile.action'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CallIcon from '@mui/icons-material/Call';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import GridGoldenratioIcon from '@mui/icons-material/GridGoldenratio';
import { indigo } from '@mui/material/colors';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';


const EmployeeProfileCard = () => {
    const { no } = useParams()
    const [src, setSrc] = useState(ProfilePicDefault)
    // const profilePic = `${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`;
    const profilePic = `${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`;


    // const empidd = {
    //     em_id: no
    // }

    const empiddata = useMemo(() => {
        return { em_id: no }
    }, [no])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPersonalData(no))
    }, [no, dispatch])

    const state = useSelector((state) => {
        // console.log(state.getPrifileDateEachEmp.empPersonalData.personalData)
        return state.getPrifileDateEachEmp.empPersonalData.personalData
    })

    useEffect(() => {
        const getEmpIdforProfilePic = async () => {
            if (no > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`);

                urlExist(profilePic, (status) => {

                    if (status === true) {
                        console.log(status)
                        const picUrl = JSON.parse(profilePic)
                        setSrc(picUrl)
                    }
                })
            }
        }
        getEmpIdforProfilePic()
    }, [no])


    return (
        <Fragment>
            <Card sx={{ maxWidth: 350, borderRadius: 8, boxShadow: 10 }}>
                <CardActionArea>
                    <CardMedia>
                        <Suspense fallback={<CircularProgress />} >
                            <Stack
                                direction="row"
                                spacing={3}
                                justifyContent="center"
                                alignItems="center"
                                sx={{ paddingTop: 4, paddingBottom: 4 }} >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={src}
                                    sx={{ width: 150, height: 150, opacity: 10, border: 2, borderColor: "white" }}
                                />
                            </Stack>
                        </Suspense>
                    </CardMedia>
                    <CardContent className="d-flex flex-column justify-content-center  align-items-center" >
                        <Typography gutterBottom variant="h6" component="div" fontFamily='cursive' fontWeight='400'>
                            {state.em_name}
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            {state.desg_name}
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            {state.dept_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <GridGoldenratioIcon sx={{ color: indigo[700], fontSize: 18 }} /> {state.em_no}
                            <AddLocationIcon sx={{ color: indigo[700], fontSize: 18, marginLeft: 2 }} />{state.per_region}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <CallIcon sx={{ color: indigo[700], fontSize: 18 }} />{state.em_mobile}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <MailRoundedIcon sx={{ color: indigo[700], fontSize: 18, marginRight: 1 }} />
                            {state.em_email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className='pt-1'>
                            {state.branch_name === 'TMCH' ? 'Travancore Medical College Hospital' :
                                state.branch_name === '	TNC' ? 'Travancore Nursing College ' :
                                    state.branch_name === '	TNC' ? 'Travancore Medical College ' :
                                        state.branch_name === 'TSSH' ? 'Travancore Super Speciality Hospital' : null}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Fragment>
    )
}

export default memo(EmployeeProfileCard)
