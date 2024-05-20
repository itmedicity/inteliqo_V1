import { Box, Tooltip } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { IconButton as OpenIcon } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { axioslogin } from 'src/views/Axios/Axios';
import EmpDetailsModal from './EmpDetailsModal';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import moment from 'moment';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { urlExist } from 'src/views/Constant/Constant';
import { PdfInductionTrannings } from './PdfInductionTranning';
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'

const InductionTableview = ({ Inductdata }) => {
    const [tabledata, SetTabledata] = useState([])
    const [selected, Setselected] = useState([]);
    const [open, Setopen] = useState(false);
    useEffect(() => {
        const Induct = Inductdata?.map((val) => {
            const object = {
                em_name: val.em_name,
                em_no: val.em_no,
                Induct_slno: val.Induct_slno,
                em_id: val.em_id,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                desg_slno: val.desg_slno,
                desg_name: val.desg_name,
                hod: val.hod

            }
            return object;
        })
        SetTabledata(Induct)
    }, [Inductdata, SetTabledata])

    const handleClick = useCallback((params) => {
        const data = params.api.getSelectedRows()
        Setselected(data)
        Setopen(true)
    }, [Setselected, Setopen])


    const [columnDef] = useState([
        { headerName: 'Sl no', field: 'Induct_slno', filter: true, width: 100 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 150 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 150 },
        {
            headerName: 'View', cellRenderer: params => {
                return <OpenIcon
                    onClick={() => handleClick(params)}
                    sx={{ paddingY: 0.5 }} >
                    <Tooltip title="View More">
                        <LaunchIcon
                            sx={{ size: "sm" }} />
                    </Tooltip>
                </OpenIcon>
            }
        },
        {
            headerName: 'Pdf ', cellRenderer: params => {
                return <OpenIcon
                    onClick={() => HandlePdf(params)}
                    sx={{}} >
                    <Tooltip title="Pdf View">
                        <PictureAsPdfIcon
                            sx={{ size: "sm" }} />
                    </Tooltip>
                </OpenIcon>
            }
        }
    ])


    //pdf
    const HandlePdf = useCallback((params) => {
        const getdata = params.api.getSelectedRows()
        const { em_id } = getdata[0];
        const getHODSign = async (hodID) => {
            const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER}/${hodID}/signature/signature.jpg`);
            return profilePic
        }
        const getHod = async (emid) => {
            const result = await axioslogin.get(`/TrainingDetails/GetHOD/${emid}`)
            return result.data
        }
        const getTrainneerName = async (emid) => {
            const results = await axioslogin.get(`/TrainingDetails/getInductTrainersdetail/${emid}`)
            return results.data
        }
        const getdeptdatas = (async () => {
            const emid = parseInt(em_id)
            const result = await axioslogin.get(`/TrainingDetails/getInductiontrainings/${emid}`)
            const { success, data } = result.data;
            if (success === 2) {
                getHod(emid).then((value) => {
                    const { dataas, success } = value
                    if (success === 2) {
                        const { emp_id } = dataas[0]
                        getHODSign(emp_id).then((sign) => {
                            urlExist(sign, (status) => {
                                if (status === true) {
                                    const HODSign = JSON.parse(sign)
                                    getTrainneerName(emid).then((values) => {
                                        const { datas } = values
                                        const ShowData = datas?.map((val) => {
                                            const mapdata = data.find((item) => item.indct_emp_no === val.indct_emp_no && item.schedule_topic === val.schedule_topic)
                                            return {
                                                trainer_name: val.trainer_name.toLowerCase(),
                                                Induct_slno: mapdata.Induct_slno,
                                                induct_pre_mark: mapdata.training_status === 1 && mapdata.pretest_status === 1 ? mapdata.induct_pre_mark : "NA",
                                                induct_post_mark: mapdata.training_status === 1 && mapdata.posttest_status === 1 ? mapdata.induct_post_mark : "NA",
                                                hours: mapdata.hours,
                                                date: moment(mapdata.induction_date).format("DD/MM/YY"),
                                                training_topic_name: mapdata.training_topic_name.toLowerCase(),
                                                Remark: mapdata.pretest_status === 1 && mapdata.posttest_status === 1 && mapdata.induct_post_mark >= 2 ? "Eligible" : "Not Eligible",
                                                training_induct_hod_aprvl_status: mapdata.training_induct_hod_aprvl_status,
                                                training_status: mapdata.training_status
                                            }
                                        })
                                        PdfInductionTrannings(getdata[0], ShowData, HODSign)
                                    })


                                } else {

                                    getTrainneerName(emid).then((values) => {
                                        const { datas } = values
                                        const ShowData = datas?.map((val) => {
                                            const mapdata = data.find((item) => item.indct_emp_no === val.indct_emp_no && item.schedule_topic === val.schedule_topic)
                                            return {
                                                trainer_name: val.trainer_name.toLowerCase(),
                                                Induct_slno: mapdata.Induct_slno,
                                                induct_pre_mark: mapdata.training_status === 1 && mapdata.pretest_status === 1 ? mapdata.induct_pre_mark : "NA",
                                                induct_post_mark: mapdata.training_status === 1 && mapdata.posttest_status === 1 ? mapdata.induct_post_mark : "NA",
                                                hours: mapdata.hours,
                                                date: moment(mapdata.induction_date).format("DD/MM/YY"),
                                                training_topic_name: mapdata.training_topic_name.toLowerCase(),
                                                Remark: mapdata.pretest_status === 1 && mapdata.posttest_status === 1 && mapdata.induct_post_mark >= 2 ? "Eligible" : "Not Eligible",
                                                training_induct_hod_aprvl_status: mapdata.training_induct_hod_aprvl_status,
                                                training_status: mapdata.training_status
                                            }
                                        })
                                        PdfInductionTrannings(getdata[0], ShowData, ProfilePicDefault)
                                    })
                                }
                            })

                        })
                    }
                })

            }
            else {

            }
        })
        getdeptdatas();
    }, [])

    return (
        <Fragment>
            {
                open === true ? <EmpDetailsModal open={open} Setopen={Setopen} selected={selected} />
                    :
                    <Box sx={{ width: "100%", overflow: 'auto' }}>
                        <Box sx={{ height: 800, display: 'flex', flexDirection: "column", mt: 2 }}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tabledata}

                                sx={{
                                    height: 700,
                                    width: "100%",
                                    mt: 1
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Box>
                    </Box>
            }
        </Fragment>
    )
}

export default memo(InductionTableview) 
