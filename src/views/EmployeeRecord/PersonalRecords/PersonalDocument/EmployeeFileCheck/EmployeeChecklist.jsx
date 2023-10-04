
import { Box, Tooltip } from '@mui/joy'
import React, { Fragment, lazy, memo, useCallback, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Modal = lazy(() => import('./Checklistmodal'))

const EmployeeChecklist = ({ selectedRowData, }) => {


  const [Files, setFiles] = useState([])
  const [checklistid, setid] = useState(0)
  const [itemname, Setitem] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState(null);
  const [selectedUploadItemId, setSelectedUploadItemId] = useState(null); // New state to track the selected upload icon ID
  console.log(itemname);

  // const handleFileChange = useCallback((e,) => {
  //   const newFiles = [...selectedFiles]
  //   newFiles.push(e.target.files[0])
  //   setSelectedFiles(newFiles)
  // }, [setSelectedFiles, selectedFiles])
  const handleFileid = useCallback((e, item) => {
    setid(item.id)
    Setitem(item.name)
    setIsModalOpen(true);
    setExpandedItems(item.id);
    setSelectedUploadItemId(item.id); // Set the selected upload icon's ID
    setFiles([]);

  }, [Setitem, setExpandedItems, setSelectedUploadItemId])
  const handleToggleExpand = (itemId) => {
    if (expandedItems === itemId) {
      // If the same item is clicked again, close it
      setExpandedItems(null);
    } else {
      // Otherwise, open the clicked item
      setExpandedItems(itemId);
    }
  };
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
  ];

  return (
    <Box sx={{}}>
      <Box mt={0}>
        <CustmTypog title={'CheckList For Documents'} />
      </Box>
      <Box sx={{ overflowX: 'auto', height: window.innerHeight - 140 }}>
        <Box mt={1}>
          <TableContainer>
            <Table size="small">
              <TableHead></TableHead>
              <TableBody>
                {sections.map((section) => (
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
                            <Tooltip title="Show Files">
                              <ExpandMoreIcon
                                fontSize="small"
                                onClick={() => handleToggleExpand(item.id)}
                              />
                            </Tooltip>
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
                                <WysiwygIcon />
                              </Tooltip>

                            </Box>
                          </TableCell>
                          {/* <TableCell width={20}>
                            <Box
                              sx={{
                                cursor: 'pointer',
                                ':hover': {
                                  color: '#81c784',
                                  boxShadow: 10,
                                },
                              }}

                              onClick={(e) => {
                                handleUpload(e, item);
                              }}
                            >
                              <Tooltip title="Save File">
                                <SaveIcon />
                              </Tooltip>

                            </Box>
                          </TableCell> */}
                        </TableRow>
                        {expandedItems === item.id && item.id === selectedUploadItemId && (
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell colSpan={6}>


                              {/* Display the files here */}
                              {Files.map((file, index) => (
                                <Box sx={{ display: "flex" }} key={`file-${index}`}>
                                  <Box sx={{ width: "2%" }}>{index + 1}.</Box>

                                  <Box sx={{ width: "65%" }} >{file.name}  </Box>
                                  {/* <Box sx={{ width: "5%" }}>
                                    <Tooltip title="View">
                                      <VisibilityIcon />
                                    </Tooltip>

                                  </Box> */}
                                  {/* <Box sx={{ width: "5%" }} onClick={() => handleRemoveFile(index)}>
                                    <Tooltip title="Close">
                                      <CloseIcon />
                                    </Tooltip>
                                  </Box> */}

                                </Box>
                              ))}
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
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedRowData={selectedRowData}
        itemname={itemname}
        setFiles={setFiles}
        Setitem={Setitem}
        checklistid={checklistid}
      />
    </Box>
  );
};

export default memo(EmployeeChecklist) 