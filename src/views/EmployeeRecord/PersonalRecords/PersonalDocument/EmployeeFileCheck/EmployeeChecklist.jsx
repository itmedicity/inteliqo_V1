
import { Box, Tooltip, Typography, IconButton } from '@mui/joy'
import React, { Fragment, lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { axioslogin } from 'src/views/Axios/Axios';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Modal = lazy(() => import('./Checklistmodal'))
const ViewModalApplication = lazy(() => import('./ViewDataModal'))
const Biodata = lazy(() => import('./Biodata'))
const AssesmentSheet = lazy(() => import('./AssesmentSheet'))
const Offerletter = lazy(() => import('./Offerletter'))
const PdfFormat1 = lazy(() => import('../PdfFormat1'))
const PdfFormat2 = lazy(() => import('../PdfFormat2'))
const PdfFormat3 = lazy(() => import('../PdfFormat3'))
const PdfFormat4 = lazy(() => import('../PdfFormat4'))
const Joinpdfformat1 = lazy(() => import('../Joinpdfformat1'))
const Joinpdfformat2 = lazy(() => import('../JoinpdfFormat2'))
const Joinpdfformat3 = lazy(() => import('../JoinpdfFormat3'))
const Joinpdfformat4 = lazy(() => import('../JoinpdfFormat4'))
const AntecedentForm = lazy(() => import('../EmployeeFileCheck/AntecedentForm'))
const CredentialForm = lazy(() => import('../EmployeeFileCheck/CredentialForm'))
const DepartmentOrientation = lazy(() => import('../EmployeeFileCheck/DepartmentOrientation'))
const RightsandResponsibilities = lazy(() => import('../RightsAndResponsibilities'))
const Vaccination = lazy(() => import('../Vaccination'))
const HealthCheckupForm = lazy(() => import('../HealthCheckupForm'))
const PersonalDataForm = lazy(() => import('../PersonalDataForm'))
const PerformanceAppraisal = lazy(() => import('../PerformanceAppraisal'))
const AnnualHealthCheckUp = lazy(() => import('../AnnhualhealthCheckup/AnnualHealthCheckUp'))
const DuesClearance = lazy(() => import('../DuesClearance/DuesClearance'))
const ExitQuestion = lazy(() => import('../ExitQuestion/ExitQuestion'))
const CredentialFormAndPrevileg = lazy(() => import('../CredentialForm/CredentialForm'))
const InductionRecord = lazy(() => import('../InductionRecord/InductionRecord'))
const TrainingRecord = lazy(() => import('../TrainingRecord/TrainingRecord'))
const Record = lazy(() => import('../Record/Record'))


const EmployeeChecklist = ({ selectedRowData, setflag, Files, setFiles, setSrc, src, setShowGeneral }) => {

  const [checklistid, setid] = useState(0)
  const [checklistformid, setformid] = useState(0)
  const [count, setcount] = useState(0)
  const [data, setdata] = useState([])
  const [Empdata, setEmpdata] = useState([])
  const [itemname, Setitem] = useState("")
  const [pdfdata, Setpdfdata] = useState("")



  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [ModalOpen, setModalOpen] = useState(false)
  const [expandedItemID, setExpandedItemID] = useState(null);
  useEffect(() => {
    const postdata = {
      em_id: selectedRowData?.em_id,
    };
    const fetchData = async () => {
      const result = await axioslogin.post('/PersonalChecklist/get/all', postdata)
      const { success, data } = result.data
      if (success === 1) {
        setdata(data)
        setcount(0)
      } else {
        setdata([])
      }
    }
    fetchData()
  }, [selectedRowData, setcount, count])


  const handleFileid = useCallback((e, item) => {
    setid(item.id)
    Setitem(item.name)
    setIsModalOpen(true);
  }, [Setitem,])

  const handleToggleExpand = useCallback(async (e, item) => {

    if (selectedRowData?.em_id > 0) {
      try {
        // api for file opening
        const postData = {
          checklistid: item?.id,
          em_id: selectedRowData?.em_id
        }
        const response = await axioslogin.post('/upload/files', postData)
        const { success, } = response.data
        if (success === 1) {
          const data = response.data;
          const fileNames = data.data

          if (expandedItemID === item.id) {
            setExpandedItemID(null);
          } else {
            setExpandedItemID(item.id);
          }
          // Construct URLs for each file using the file names
          const fileUrls = fileNames.map((fileName) => {
            return `http://192.168.22.5/NAS/PersonalRecords/${selectedRowData?.em_id}/checklist/${item?.id}/${fileName}`;
          });
          // setFiles(fileNames)
          fileUrls.forEach((fileUrl) => {
            setFiles(fileUrls)
          });
        } else {
          warningNofity("no data uploded")
        }
      } catch (error) {
        // console.error('Error fetching file names:', error);
      }
    } else {
      warningNofity("no Employee Found")
    }
  }, [selectedRowData, expandedItemID, setFiles]);

  const preJoining = [
    { id: 1, name: 'Application For Employment' },
    { id: 2, name: 'Bio Data' },
    { id: 3, name: 'Interview Assessment Sheet' },
    { id: 4, name: 'Offer Letter' },
    { id: 5, name: 'Pre Employment Health Check Up Form' },

  ];
  const joiningFormalities = [
    { id: 6, name: 'Personnel Data Form' },
    { id: 7, name: 'Self Attested Copies Of Academic Certificates' },
    { id: 8, name: 'Self Attested Copy Of Registration Certificates' },
    { id: 9, name: 'Self Attested Copies Of Experience Certificates' },
    { id: 10, name: 'Self Attested Copy Of Photo ID Proof' },
    { id: 11, name: 'Antecedent Verification Form' },
    { id: 12, name: 'Credential Verification Form' },
    { id: 13, name: 'Credentialing And  Privileging Form' },
    { id: 14, name: 'Job Description And Job Specification' },
    { id: 15, name: 'Appoinment Letter' },
    { id: 16, name: 'Joining Letter' },
    { id: 17, name: 'Competency Assessment' },
    { id: 18, name: 'Statutory Records' },
    { id: 19, name: 'Induction Records' },
    { id: 20, name: 'Department Orientation Checklists' },
    { id: 21, name: 'Employee Rights and Responsibilities' },
    { id: 22, name: 'Vaccination Card' },
    { id: 23, name: 'Review of Probation Period' },
    { id: 24, name: 'Confirmation Letter' },

  ];
  const annualMandatory = [
    { id: 25, name: 'Training Record' },
    { id: 26, name: 'BLS/ACLS/PALS/NALS/Training' },
    { id: 27, name: 'Performance Appraisal Forms' },
    { id: 28, name: 'Annual Health Check-Up Form' },

  ];
  const otherDocuments = [
    { id: 29, name: 'Any Disciplinary Record', },
    { id: 30, name: 'Any Grievance Record', },
    { id: 31, name: 'Any Other Record' },

  ];
  const exitDocuments = [
    { id: 32, name: 'Dues Clearance Certificate' },
    { id: 33, name: 'Exit Questionnaire' },
  ];
  const sections = [
    { name: 'Pre-Joining', items: preJoining },
    { name: 'Joining Formalities', items: joiningFormalities },
    { name: 'Annual Mandatory', items: annualMandatory },
    { name: 'Other Documents', items: otherDocuments },
    { name: 'Exit', items: exitDocuments },
  ]

  const uploadStatusMap = {};
  data.forEach((item) => {
    if (item.upload_status === 1) {
      uploadStatusMap[item.personal_record_id] = true;
    }
  });

  // Update the sections array with upload_status
  const updatedSections = sections.map((section) => {
    const updatedItems = section.items.map((item) => {
      const uploadStatus = uploadStatusMap[item.id] ? 1 : 0;
      return { ...item, upload_status: uploadStatus };
    });

    return { ...section, items: updatedItems };
  });

  // uploaded image view
  const handleFileButtonClick = (e, fileName) => {
    setSrc(fileName)
    setflag(2)
  };
  const toRedirectToHome = useCallback(() => {
    setflag(0)
  }, [setflag])

  const toApplicationForm = useCallback(() => {
    setShowGeneral(3)
  }, [setShowGeneral])


  const postdata = useMemo(() => {
    return {
      em_no: selectedRowData?.em_no,
    }
  }, [selectedRowData])
  const handleModal = useCallback(async (e, item) => {
    // const postdata = {
    //   em_no: selectedRowData?.em_no,
    // };

    // setformid  will show each of the form 

    setformid(item.id)
    Setitem(item.name)
    // setModalOpen(true);
    if (item.id === 1 || item.id === 20 || item.id === 4 || item.id === 21) {
      const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
      const { success, data } = result.data
      if (success === 1) {
        setEmpdata(data[0])
      }
      else {
        setEmpdata([])
      }
    }
    else if (item.id === 2 || item.id === 11 || item.id === 12) {
      const result = await axioslogin.post('/PersonalChecklist/biodetails', postdata)
      const { success, data } = result.data

      if (success === 1) {
        setEmpdata(data)
      }
      else {
        setEmpdata([])
      }
    } else if (item.id === 3) {
      const result = await axioslogin.post('/PersonalChecklist/interviewmark', postdata)
      const { success, data } = result.data
      if (success === 1) {
        setEmpdata(data[0])
      }
      else {
        setEmpdata([])
      }
    }
    else if (item.id === 22) {
      const result = await axioslogin.post(`/PersonalChecklist/getAll`, postdata)
      const { success, data } = result.data
      if (success === 1) {
        setEmpdata(data[0])

      }
      else {
        setEmpdata([])
      }
    }
    else if (item.id === 15) {
      const result = await axioslogin.post('/PersonalChecklist/pdfformat', postdata)
      const { success, data: pdfdata } = result.data

      if (success === 1) {
        Setpdfdata(pdfdata[0])
        const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
        const { success, data } = result.data
        if (success === 1) {
          setEmpdata(data[0])
        }
        else {
          setEmpdata([])
        }
      }
      else {
        Setpdfdata([])
      }
    }
    else if (item.id === 16) {
      const result = await axioslogin.post('/PersonalChecklist/pdfformatjoin', postdata)
      const { success, data: pdfdata } = result.data

      if (success === 1) {
        Setpdfdata(pdfdata[0])
        const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
        const { success, data } = result.data
        if (success === 1) {
          setEmpdata(data[0])
        }
        else {
          setEmpdata([])
        }
      }
      else {
        Setpdfdata([])
      }
    }


  }, [postdata]);
  return (
    <Box sx={{
      overflowX: 'auto',
      height: window.innerHeight - 120,
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        width: 0,
      },
    }}>

      {checklistformid === 1 ?
        <ViewModalApplication itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
        checklistformid === 2 ?
          <Biodata itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
          checklistformid === 3 ?
            <AssesmentSheet itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
            checklistformid === 4 ?
              <Offerletter itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
              checklistformid === 5 ?
                <HealthCheckupForm itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                checklistformid === 6 ?
                  <PersonalDataForm itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                  checklistformid === 11 ?
                    <AntecedentForm itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                    checklistformid === 12 ?
                      <CredentialForm itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                      checklistformid === 13 ?
                        <CredentialFormAndPrevileg itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                        checklistformid === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 1" ?
                          <PdfFormat1 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                          checklistformid === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 2" ?
                            <PdfFormat2 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                            checklistformid === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 3" ?
                              <PdfFormat3 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                              checklistformid === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 4" ?
                                <PdfFormat4 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                checklistformid === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 1" ?
                                  <Joinpdfformat1 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                  checklistformid === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 2" ?
                                    <Joinpdfformat2 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                    checklistformid === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 3" ?
                                      <Joinpdfformat3 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                      checklistformid === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 4" ?
                                        <Joinpdfformat4 itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                        checklistformid === 19 ?
                                          <InductionRecord itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                          checklistformid === 20 ?
                                            <DepartmentOrientation itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                            checklistformid === 21 ?
                                              <RightsandResponsibilities itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                              checklistformid === 22 ?
                                                <Vaccination itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                                checklistformid === 25 ?
                                                  <TrainingRecord itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                                  checklistformid === 27 ?
                                                    <PerformanceAppraisal itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                                    checklistformid === 28 ?
                                                      <AnnualHealthCheckUp itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                                      checklistformid === 31 ?
                                                        <Record itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                                        checklistformid === 32 ?
                                                          <DuesClearance itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                                          checklistformid === 33 ?
                                                            <ExitQuestion itemname={itemname} Empdata={Empdata} setformid={setformid} /> :
                                                            <Box>
                                                              <Box mt={0}>
                                                                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                                                                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                                                                  <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                                                                    <Box>
                                                                      <Typography
                                                                        startDecorator={<ArrowRightIcon />}
                                                                        textColor="neutral.600" sx={{ display: 'flex', }} >
                                                                        CheckList For Documents
                                                                      </Typography>
                                                                    </Box>
                                                                    <Box >  <IconButton
                                                                      variant="outlined"
                                                                      size='xs'
                                                                      color="danger"
                                                                      onClick={toRedirectToHome}
                                                                      sx={{ color: '#ef5350', }}
                                                                    >
                                                                      <CloseIcon />
                                                                    </IconButton></Box>
                                                                  </Box>
                                                                </Paper>
                                                              </Box>
                                                              <Box sx={{
                                                                overflowX: 'auto',
                                                                height: window.innerHeight - 140,
                                                                scrollbarWidth: 'none',
                                                                '&::-webkit-scrollbar': {
                                                                  width: 0,
                                                                },
                                                              }}>

                                                                <Box mt={1}>
                                                                  <Box sx={{ borderBottom: .1, borderColor: "#DDDDDD", display: 'flex', justifyContent: 'space-between' }}>
                                                                    <Box><Typography level="body-md" sx={{ ml: 2, color: '#6B728E' }}>Application Form</Typography></Box>
                                                                    <Box sx={{ mr: 2 }}><WysiwygIcon onClick={toApplicationForm} /></Box>
                                                                  </Box>
                                                                  <TableContainer>
                                                                    <Table size="small">
                                                                      <TableHead></TableHead>
                                                                      <TableBody>
                                                                        {updatedSections.map((section) => (
                                                                          <Fragment key={section.name}>
                                                                            <TableRow sx={{ height: 7, }}>
                                                                              <TableCell sx={{ color: '#6B728E' }} colSpan={6}>
                                                                                {section.name}
                                                                              </TableCell>

                                                                            </TableRow>
                                                                            {section.items.map((item) => (
                                                                              <Fragment key={item.id}>
                                                                                <TableRow key={item.id} sx={{ height: 7, }}>
                                                                                  <TableCell></TableCell>
                                                                                  <TableCell sx={{ color: '#6B728E' }}>{item.id}</TableCell>
                                                                                  <TableCell sx={{ color: '#6B728E' }}>{item.name}</TableCell>
                                                                                  <TableCell width={20} sx={{ color: '#6B728E', cursor: 'pointer' }}>
                                                                                    {item.upload_status === 1 ? (
                                                                                      <Tooltip title="Show Files">
                                                                                        <ExpandMoreIcon
                                                                                          fontSize="small"
                                                                                          onClick={(e) => handleToggleExpand(e, item)}
                                                                                        />
                                                                                      </Tooltip>
                                                                                    ) : (
                                                                                      <Tooltip title="No data">
                                                                                        <ControlPointIcon
                                                                                          fontSize="small"
                                                                                          color="disabled"
                                                                                        />
                                                                                      </Tooltip>
                                                                                    )}
                                                                                  </TableCell>
                                                                                  <TableCell width={20}>
                                                                                    <Box
                                                                                      onClick={(e) => {
                                                                                        handleFileid(e, item);
                                                                                      }}
                                                                                      sx={{
                                                                                        cursor: 'pointer',
                                                                                        ':hover': {
                                                                                          color: '#ef5350',
                                                                                          boxShadow: 10,
                                                                                        },
                                                                                      }}
                                                                                    >
                                                                                      <Tooltip title="Upload File">
                                                                                        <UploadFileIcon fontSize="small" />
                                                                                      </Tooltip>
                                                                                    </Box>
                                                                                  </TableCell>
                                                                                  <TableCell width={20}>
                                                                                    <Box
                                                                                      sx={{
                                                                                        cursor: 'pointer',
                                                                                        ':hover': {
                                                                                          color: '#90caf9',
                                                                                          boxShadow: 10,
                                                                                        },
                                                                                      }}
                                                                                    >
                                                                                      <Tooltip title="View File">
                                                                                        <WysiwygIcon onClick={(e) => {
                                                                                          handleModal(e, item);
                                                                                        }} />
                                                                                      </Tooltip>
                                                                                    </Box>
                                                                                  </TableCell>
                                                                                </TableRow>
                                                                                {/* Conditionally render the expanded row based on expansion state */}
                                                                                {expandedItemID === item.id && (
                                                                                  <TableRow sx={{ backgroundColor: "#EEEFF0" }}>
                                                                                    <TableCell></TableCell>
                                                                                    <TableCell></TableCell>
                                                                                    <TableCell colSpan={6} sx={{ color: '#6B728E' }}>
                                                                                      {Files.map((fileName) => {

                                                                                        const parts = fileName.split('/');
                                                                                        const fileNamePart = parts[parts.length - 1];
                                                                                        const fileNameWithoutExtension = fileNamePart.split('.')[0];
                                                                                        // for getting date
                                                                                        const dateParts = fileNamePart.split('&');
                                                                                        // Extracted content between "&" symbols
                                                                                        const uploadedDate = dateParts[1];
                                                                                        return (
                                                                                          <Box key={fileName} sx={{ display: "flex", gap: 4 }}>
                                                                                            <Box sx={{ width: "50%" }}>
                                                                                              File Name: {fileNameWithoutExtension}
                                                                                            </Box>
                                                                                            <Box sx={{ width: "33%" }}>
                                                                                              Uploded date: {uploadedDate}
                                                                                            </Box>
                                                                                            <Box
                                                                                              onClick={(e) => handleFileButtonClick(e, fileName)}
                                                                                              sx={{
                                                                                                cursor: 'pointer',
                                                                                                ':hover': {
                                                                                                  color: '#90caf9',
                                                                                                  boxShadow: 10,
                                                                                                },
                                                                                              }}
                                                                                            >
                                                                                              <Tooltip title="View Uploded File">
                                                                                                <SlideshowIcon />
                                                                                              </Tooltip>
                                                                                            </Box>
                                                                                          </Box>
                                                                                        );
                                                                                      })}
                                                                                    </TableCell>
                                                                                  </TableRow>
                                                                                )}
                                                                              </Fragment>
                                                                            ))}
                                                                          </Fragment>
                                                                        ))}
                                                                      </TableBody>
                                                                    </Table>
                                                                  </TableContainer>
                                                                </Box>

                                                              </Box>
                                                            </Box>
      }

      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedRowData={selectedRowData}
        itemname={itemname}
        Setitem={Setitem}
        checklistid={checklistid}
        setflag={setflag}
        setcount={setcount}
        count={count}
      />
    </Box >
  );
};

export default memo(EmployeeChecklist) 