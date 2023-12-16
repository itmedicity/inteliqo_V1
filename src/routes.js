import React from 'react'

const HomePage = React.lazy(() => import('./views/Home/Home'))
const Profile = React.lazy(() => import('./views/Home/Profile'))
const ManpowerRequest = React.lazy(() => import('./views/recruitment/manpowerRequest/ManpowerRequest'));
const Vacancy = React.lazy(() => import('./views/recruitment/VacancyAnounce/Vacancy'));
const Settings = React.lazy(() => import('./Menus/Settings'));
const Reports = React.lazy(() => import('./Menus/Reports'));
const Departmentmaster = React.lazy(() => import('./views/Master/DepartmentMaster/DepartmentMasterPage'));
const DepartmentSectionMast = React.lazy(() => import('./views/Master/DepartmentSection/DepartmentSectionMast'));
//const DepartmentSectionEdit = React.lazy(() => import('./views/Master/DepartmentSection/DepartmentSecEdit'));
const EmployeeTypeMast = React.lazy(() => import('./views/Master/EmployeeType/EmployeeTypeMast'));
const DesignatoionType = React.lazy(() => import('./views/Master/DesignationType/DesignationTypeMast'));
const Designation = React.lazy(() => import('./views/Master/Designation/DesignationMast'));
const Qualification = React.lazy(() => import('./views/Master/Qualification/QualificationMast'));
const Empdesignationtype = React.lazy(() => import('./views/Master/EmpDesignationType/EmpDesignationtype'))
const BranchMast = React.lazy(() => import('./views/Master/BranchMaster/BranchMast'))
const BankMaster = React.lazy(() => import('./views/Master/BankMaster/BankMaster'));
const RegionMaster = React.lazy(() => import('./views/Master/Region/RegionMast'));
const DepartmentShift = React.lazy(() => import('./views/Master/DepartmentShift/DepartmentShiftMast'));
//const DepartmentShiftEdit = React.lazy(() => import('./views/Master/DepartmentShift/DepartmentShiftEdit'));
const EmployeeRecrd = React.lazy(() => import('./views/EmployeeRecord/EmployeeRegister/EmployeeRecord'));
const EmploymentType = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypeMast'));
const EmploymentTypeList = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypetable'));
const EmploymentTypetable = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypeEdit'));
const ModulegroupMaster = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMast'))
//const ModulegroupMasterEdit = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMastEdit'))
const ModuleUserRights = React.lazy(() => import('./views/Master/ModuleUserRights/MdleUserRightMast'))
//const ModuleUserRightsEdit = React.lazy(() => import('./views/Master/ModuleUserRights/ModuleUserRightEdit'))
const UserGroupMaster = React.lazy(() => import('./views/Master/GroupMaster/Groupmaster'))
const GroupRights = React.lazy(() => import('./views/Master/GroupRights/GrouprightsMast'))
const EmployeeProfile = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeProfile'))
const Grade = React.lazy(() => import('./views/Master/GradeMaster/GradeMaster'))
const EarnType = React.lazy(() => import('./views/Master/EarnTypeMaster/EarntypeMast'))
const EarnDeduction = React.lazy(() => import('./views/Master/EarningDeductionMaster/EarnDectmast'))
// const EarnDectEdit = React.lazy(() => import('./views/Master/EarningDeductionMaster/EarnDectEdit'))
const ReligionMaster = React.lazy(() => import('./views/Master/ReligionMaster/ReligionMast'))
const LeaveTypeMaster = React.lazy(() => import('./views/Master/LeaveTypeMaster/LeaveTypeMast'))
const YearlyLeaveCount = React.lazy(() => import('./views/Master/YearlyLeaveCount/YearlyLeaveCountMast'))
const YearlyLeaveCountMastEdit = React.lazy(() => import('./views/Master/YearlyLeaveCount/YearlyLeaveCountMastEdit'))
const YearlyLeaveCalendar = React.lazy(() => import('./views/Master/YearlyLeaveCalendar/YearlyLeaveCalendarMast'))
//const YearlyLeaveCalendarEdit = React.lazy(() => import('./views/Master/YearlyLeaveCalendar/YearlyLeaveCalendarEdit'))
const ApplicationForm = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/ApplicationForm'))
const PersonalInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/PersonalInformation'))
const DoctorType = React.lazy(() => import('./views/Master/DoctorType/DoctorMaster'))
// const DoctorMastEdit = React.lazy(() => import('./views/Master/DoctorType/DoctorMastEdit'))
const Nation = React.lazy(() => import('./views/CommonCode/NationSlnoSelection'))
const State = React.lazy(() => import('./views/Master/State/StateMaster'))
const StateSelection = React.lazy(() => import('./views/CommonCode/StateSelect'))
const District = React.lazy(() => import('./views/Master/District/DistrictMaster'))
const University = React.lazy(() => import('./views/Master/University/UniversityMast'))
const EducationMaster = React.lazy(() => import('./views/Master/EducationMaster/EducationMaster'))
const CourseMaster = React.lazy(() => import('./views/Master/CourseMaster/CourseMaster'))
const SpecializationMaster = React.lazy(() => import('./views/Master/Specialization/SpecializationMaster'))
//const SpecializationTableEdit = React.lazy(() => import('./views/Master/Specialization/SpecializationTableEdit'))
const RegistrationType = React.lazy(() => import('./views/Master/RegistrationType/RegistrationMaster'))
//const RegistrationTableEdit = React.lazy(() => import('./views/Master/RegistrationType/RegistrationTableEdit'))
// const EmployeeQualification = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeQualification'))
//const EmpQualificationEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/QualificationTableEdit'))
// const EmployeeExperience = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeExperience'))
// const EmployeeExperienceEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/EmployeeExperienceEdit'))
// const StatutoryInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/StatutoryInformation'))
// const ContractInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/ContractInformation'))
// const EmployeeCompany = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeCompany'))
const SalaryInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/SalaryInformation'))
const EmployeeAllowance = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeAllowance'))
const AnnualLeaveSettings = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/AnnualLeaveSettings'))
// const EmployeeTraining = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeTraining'))
const SalaryIncrement = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/SalaryIncrement'))
const EmployeeDocumentChecklist = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeDocumentChecklist'))
//const VaccinationInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/VaccinationInformation'))
const FineorDeduction = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/FineorDeduction'))
// const EmployeeEndofService = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeEndofService'))
//const QualificationMastTableEdit = React.lazy(() => import('./views/Master/Qualification/QualificationMastTableEdit'))
const RegionMastTableEdit = React.lazy(() => import('./views/Master/Region/RegionMastTableEdit'))
const BankMastTableEdit = React.lazy(() => import('./views/Master/BankMaster/BankMastTableEdit'))
const BranchMastTableEdit = React.lazy(() => import('./views/Master/BranchMaster/BranchMastTableEdit'))
const EmpIntitutionTypeTableEdit = React.lazy(() => import('./views/Master/EmpDesignationType/EmpIntitutionTypeTableEdit'))
const DesignationMastTableEdit = React.lazy(() => import('./views/Master/Designation/DesignationMastTableEdit'))
// const BankMastTableEdit = React.lazy(() => import('./views/Master/BankMaster/BankMastTableEdit'))
// const BranchMastTableEdit = React.lazy(() => import('./views/Master/BranchMaster/BranchMastTableEdit'))
//const EmpIntitutionTypeTableEdit = React.lazy(() => import('./views/Master/EmpDesignationType/EmpIntitutionTypeTableEdit'))

const DesignationTypeedit = React.lazy(() => import('./views/Master/DesignationType/DesignationTypeTableedit'))
const EmpAllowanceTableEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/EmpAllowanceTableEdit'))
const ShiftMaster = React.lazy(() => import('./views/Master/ShiftMaster/ShiftMaster'))
const ShiftMasterEdit = React.lazy(() => import('./views/Master/ShiftMaster/ShiftMasterEdit'))
const FineDeductionTableEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/FineAndDeductionTableEdit'))
const AllowanceDeducation = React.lazy(() => import('./views/EmployeeRecord/AllowanceDeducation/BulkWageUpdation'))
// const Dutyplanning = React.lazy(() => import('./views/Attendance/DutyPlanning/DutyPlanning'))
const Dutyplan = React.lazy(() => import('./views/Attendance/DutyPlan/DutyPlanMainCard'))
// const LeaveRequest = React.lazy(() => import('./views/LeaveManagement/LeaveRequest/LeaveRequest'))
const ApprovalIncharge = React.lazy(() => import('./views/LeaveManagement/ApprovalIncharge/ApprovalIncharge'))
//const ApprovalHOD = React.lazy(() => import('./views/LeaveManagement/ApprovalHOD/ApprovalHod'))
const ApprovalHR = React.lazy(() => import('./views/LeaveManagement/ApprovalHR/ApprovalHR'))
const CancelEmployee = React.lazy(() => import('./views/LeaveManagement/LeaveCancelEmployee/LeaveCancelEmploye'))
const CancelHR = React.lazy(() => import('./views/LeaveManagement/LeaveCancelHR/HrLeaveCancel'))
//const OTRequest = React.lazy(() => import('./views/LeaveManagement/OverTimeRequest/OTRequest'))
//const OTApprovalIncharge = React.lazy(() => import('./views/LeaveManagement/OTApprovalIncharge/OTApprovalIncharge'))
//const OTApprovalHOD = React.lazy(() => import('./views/LeaveManagement/OTApprovalHOD/OTApprovalHOD'))
//const OTApprovalHR = React.lazy(() => import('./views/LeaveManagement/OTApprovalHR/OTApprovalHR'))
//const OTUpdation = React.lazy(() => import('./views/LeaveManagement/OTUpdation/OTUpdation'))
// const CancelHR = React.lazy(() => import('./views/LeaveManagement/LeaveCancelHR/LeaveCancelHr'))
// const OTRequest = React.lazy(() => import('./views/LeaveManagement/OverTimeRequest/OTRequest'))
const OTRequest = React.lazy(() => import('./views/LeaveManagement/OverTimeRequest/OtReqestMainPage'))
//const OTApprovalIncharge = React.lazy(() => import('./views/LeaveManagement/OTApprovalIncharge/OTApprovalIncharge'))
const OTApprovalIncharge = React.lazy(() => import('./views/LeaveManagement/OTApprovalIncharge/OtInchargeApproval'))
// const OTApprovalHOD = React.lazy(() => import('./views/LeaveManagement/OTApprovalHOD/OTApprovalHOD'))
const OTApprovalHOD = React.lazy(() => import('./views/LeaveManagement/OTApprovalHOD/OtHodApproval'))
//const OTApprovalHR = React.lazy(() => import('./views/LeaveManagement/OTApprovalHR/OTApprovalHR'))
const OTApprovalHR = React.lazy(() => import('./views/LeaveManagement/OTApprovalHR/OtHrApproval'))
// const OTUpdation = React.lazy(() => import('./views/LeaveManagement/OTUpdation/OTUpdation'))
const OTUpdation = React.lazy(() => import('./views/LeaveManagement/OTUpdation/OtUpdtnCalculation'))
const LeaveRequestType = React.lazy(() => import('./views/Master/LeaveRequestType/LeaveRequestTypeMast'))
const ShiftUpdation = React.lazy(() => import('./views/Attendance/ShiftUpdation/ShiftUpdation'))
const ResignationRequest = React.lazy(() => import('./views/Resignation/ResigantionRequest/ResignationMainPage'))
const ResignationApprovalIncharge = React.lazy(() => import('./views/Resignation/ResigantionRequest/Approvals/Inchargeapproval'))
const ResignationApprovalHod = React.lazy(() => import('./views/Resignation/ResigantionRequest/Approvals/Hodapproval'))
const ResignationApprovalHR = React.lazy(() => import('./views/Resignation/ResigantionRequest/Approvals/HrApproval'))
const ResignationApprovalCEO = React.lazy(() => import('./views/Resignation/ResigantionRequest/Approvals/CeoApproval'))
const ResignationCancel = React.lazy(() => import('./views/Resignation/ResigantionRequest/Cancel/ResignationCancel'))
const BoardEdu = React.lazy(() => import('./views/Master/BoardMaster/BoardMaster'))
const HodMarking = React.lazy(() => import('./views/Master/AuthorisationHod/HodMarking'))
const HodAuthorisation = React.lazy(() => import('./views/Master/AuthorisationHod/HodAuthorisation'))
const DueClearenceDepartment = React.lazy(() => import('./views/Master/DueClearenceDepartment/DueClearenceDepartment'))
//const DueClearenceDeptEdit = React.lazy(() => import('./views/Master/DueClearenceDepartment/DueClearenceDeptEdit'))
const DueClearence = React.lazy(() => import('./views/Resignation/DueClearence/DueClearence'))
// const OTApprovalCEO = React.lazy(() => import('./views/LeaveManagement/OTApprovalCEO/OTApprovalCEO'))
const OTApprovalCEO = React.lazy(() => import('./views/LeaveManagement/OTApprovalCEO/OtCeoApproval'))
//const OTWageMaster = React.lazy(() => import('./views/Master/OTWageMaster/OTWageMaster'))
const OTWageMaster = React.lazy(() => import('./views/Master/OTWageMaster/OtMaster'))
// const OTWageMasterEdit = React.lazy(() => import('./views/Master/OTWageMaster/OTWageTableEdit'))
const ApprovalCEO = React.lazy(() => import('./views/LeaveManagement/ApprovalCEO/ApprovalCEO'))
//const CommonSettings = React.lazy(() => import('./views/Master/CommonSettings/CommonSettings'))
const DueClearenceHR = React.lazy(() => import('./views/Resignation/DueClearenceHR/DueClearenceHR'))
const DueClearenceMaster = React.lazy(() => import('./views/Master/DueClearenceMaster/DueClearenceMaster'))
// const DueClearenceEdit = React.lazy(() => import('./views/Master/DueClearenceMaster/DueClearenceEdit'))
const EmployeeReport = React.lazy(() => import('./views/HrReports/EmployeeReport/EmployeeReport'))
const EmployeeReportInactive = React.lazy(() => import('./views/HrReports/EmployeeReport/EmployeeReportInactive'))
const CarryforwardLeaveSetting = React.lazy(() => import('./views/Master/CarryforwardMaster/CarryforwardMast'))
//const CarryforwardLeaveEdit = React.lazy(() => import('./views/Master/CarryforwardMaster/CarryforwardMastEdit'))
const AttendanceMarking = React.lazy(() => import('./views/Attendance/AttendanceMarking/AttendanceMarking'))
const LeaveCarryForwad = React.lazy(() => import('./views/Attendance/LeaveCarryForwad/LeaveCarryForwad'))
const Hrm_Alert = React.lazy(() => import('./views/EmployeeRecord/Hrm_Alert/Hrm_Alert'))
const Hrm_message = React.lazy(() => import('./views/EmployeeRecord/Hrm_message/Hrm_message'))
// const Probation_end_details = React.lazy(() => import('./views/EmployeeRecord/Probation_Contract_End_Details/Probation_end_details'))
//const Contract_end_details = React.lazy(() => import('./views/EmployeeRecord/Probation_Contract_End_Details/Contract_end_details'))
const NightOffRequest = React.lazy(() => import('./views/LeaveManagement/NightOff/NightOffRequest'))
const AnnualLeaveProcess = React.lazy(() => import('./views/Attendance/AnnualLeaveProcess/AnnualLeaveProcess'))
const OtUser = React.lazy(() => import('./views/LeaveManagement/OTUser/OTUser'))
const Hrm_Announcement = React.lazy(() => import('./views/EmployeeRecord/Hrm_Announcement/Hrm_Announcement'))
const LeaveUser = React.lazy(() => import('./views/LeaveManagement/LeaveUser/LeaveUser'))
const Autocompletetest = React.lazy(() => import('./views/CommonCode/Autocompletetest'))
const proTax = React.lazy(() => import('./views/Master/ProffessionalTax/ProTaxMast'))
// const proTaxEdit = React.lazy(() => import('./views/Master/ProffessionalTax/ProTaxMastEdit'))
const proffessionalTax = React.lazy(() => import('./views/Payroll/ProffessionalTax/ProffessionalTax'))
const DeptSecChange = React.lazy(() => import('./views/Attendance/DepartmentSecChange/DepartmentSecChange'))
const EmployeeInactiveHR = React.lazy(() => import('./views/Resignation/EmployeeInactiveHR/EmployeeInactiveHR'))
const RegRenew = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmpFileComponent/RegistrationRenew'))
const JobDescription = React.lazy(() => import('./views/EmployeeRecord/JobDescription/JobDescription'))
const JobDescriptionEmployee = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/JobDescriptionEmployee'))
const EmployeeRecordVerification = React.lazy(() => import('./views/EmployeeRecord/EmployeeRecordVerification/EmployeeRecordVerification'))
const BloodReports = React.lazy(() => import('./views/HrReports/BloodReports/BloodReports '))
const ReligionReport = React.lazy(() => import('./views/HrReports/ReligionReports/ReligionReport '))
const RegionReport = React.lazy(() => import('./views/HrReports/RegionReports/RegionReport '))
const ExperienceReport = React.lazy(() => import('./views/HrReports/ExperienceReports/ExperienceReport '))
const InstitutionTypeReport = React.lazy(() => import('./views/HrReports/InstitutionTypeReports/InstitutionTypeReport'))
const CategoryReports = React.lazy(() => import('./views/HrReports/CategoryReport/CategoryReports'))
const DesignationReport = React.lazy(() => import('./views/HrReports/DesignationReport/DesignationReport'))
const QualificationReport = React.lazy(() => import('./views/HrReports/QualificationReport/QualificationReport'))
const EmployeeRecordTable = React.lazy(() => import('./views/EmployeeRecord/EmployeeRegister/EmployeeRecordTable'))
const EmployeeRecordEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeRegister/EmployeeRecordEdit'))
const EmpfileFinalVerification = React.lazy(() => import('./views/EmployeeRecord/EmpfileFinalVerification/EmpfileFinalVerification'))
const KRA = React.lazy(() => import('./views/Master/KRA/KRA'))
const EmpProfile = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeProfile/Profile'))
const ContractRenewalProcess = React.lazy(() => import('./views/EmployeeRecord/ContractRenewalProcess/ContractRenewalProcess'))
const Direct_Contract_Close = React.lazy(() => import('./views/EmployeeRecord/ContractRenewalProcess/Direct_Contract_Close'))
// const ContractRenewApprovalList = React.lazy(() => import('./views/EmployeeRecord/Probation_Contract_End_Details/ContractRenewApprovalList'))
const ProbationEnd = React.lazy(() => (import('./views/PerformanceAppraisal/ProbationEnd')))
const AnnualAppraisalList = React.lazy(() => (import('./views/PerformanceAppraisal/AnnualAppraisalList')))
const ContractEnd = React.lazy(() => (import('./views/PerformanceAppraisal/ContractEnd')))
const TrainingEnd = React.lazy(() => import('./views/PerformanceAppraisal/TrainingEnd'))
const AppraisalApproveIncharge = React.lazy(() => import('./views/PerformanceAppraisal/ApprovalIncharge/AppraisalApproveIncharge'))
const AppraisalApprovalHOD = React.lazy(() => import('./views/PerformanceAppraisal/ApprovalHOD/ApprovalHOD'))
const AppraisalApprovalCEO = React.lazy(() => import('./views/PerformanceAppraisal/ApprovalCEO/ApprovalCEO'))
const SelfAppraisalApproval = React.lazy(() => import('./views/PerformanceAppraisal/SelfApproval/SelfApproval'))
const EmpFirstVerification = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpVerification/EmployeeFirstVerification'))
const EmpSecondVerification = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpVerification/EmployeeSecondVerification'))
const EmployeeRecordsAgGrid = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileAgGrid'))
const JobDescriptionViewTable = React.lazy(() => import('./views/EmployeeRecord/JobDescription/JobDescriptionViewTable'))
const Contract_end_details = React.lazy(() => import('./views/EmployeeRecord/ContractRenewalProcess/ContractRenewList'))
const RegistrationTypeReport = React.lazy(() => import('./views/HrReports/RegistrationTypeReports/RegistrationTypeReport'))
const ContractClosedReport = React.lazy(() => import('./views/HrReports/ContractReports/ContractClosedReport'))
const ContractRenewReport = React.lazy(() => import('./views/HrReports/ContractReports/ContractRenewReport'))
const ContractCurrentRunningReport = React.lazy(() => import('./views/HrReports/ContractReports/ContractCurrentRunningReport'))
const TraningProbaReport = React.lazy(() => import('./views/HrReports/TrainingProbaReport/TraningProbaReport'))
const DeptSubSectionReport = React.lazy(() => import('./views/HrReports/DeptSubSectionReport/DeptSubSectionReport'))
const DesignationExpReport = React.lazy(() => import('./views/HrReports/DesignatiopnExpeReport/DesignationExpReport'))
const ContractOneYear = React.lazy(() => import('./views/HrReports/ContractReports/OneYearCurrentRunning'))
const PermanentEmployeeReport = React.lazy(() => import('./views/HrReports/PermanentEmployeeReports/PermanentEmployeeReport'))
const ContractReport = React.lazy(() => import('./views/HrReports/ContractReports/ContractReport'))
const EmployeeRegistrationReport = React.lazy(() => import('./views/HrReports/RegistrationTypeReports/EmpRegisteration'))
const LeaveProcessNew = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpMenus/LeaveProcess/LeaveProcessMainCard'))
const LeaveRequesitionMainCard = React.lazy(() => import('./views/LeaveManagement/LeavereRequsition/LeaveRequestMainCard'))
const HRAppraisalList = React.lazy(() => import('./views/PerformanceAppraisal/HRList'))
const CompletedAppraisal = React.lazy(() => import('./views/PerformanceAppraisal/CompletedAppraisalList'))
const NoExperienceReport = React.lazy(() => import('./views/HrReports/ExperienceReports/NoExpReport'))
const PayrollAtendanceUpdation = React.lazy(() => import('./views/Payroll/AttendanceUpdation/AttendanceUpdation'))
const PaySlipCalculation = React.lazy(() => import('./views/Payroll/PayslipCalculation/PaySlipCalculation'))
const CommonSettings = React.lazy(() => import('./views/Master/CommonSettings/CommonSettingNew'))
const EmpEarnDeduction = React.lazy(() => import('./views/EmployeeRecord/EarnDeduction/EarningsDeduction'))
const ApprovalHOD = React.lazy(() => import('./views/LeaveManagement/ApprovalHOD/HodApproval'))
const OTUpdatedList = React.lazy(() => import('./views/LeaveManagement/OTUpdation/OTUpdatedList'))
const AttendanceAutomatic = React.lazy(() => import('./views/Payroll/AttendanceAutomatic/AttendanceGenerateAuto'))
const PunchTransfer = React.lazy(() => import('./views/Master/PunchTransfer/PunchTransfer'))
const PaySlipprint = React.lazy(() => import('./views/Payroll/PaySlipPrint/Payslipprint'))
const WageRegister = React.lazy(() => import('./views/Payroll/WageRegister/WageRegisterPage'))
const AttandanceRegister = React.lazy(() => import('./views/Payroll/AttendanceRegister/AttandaceRegisterPage'))
const SalaryStatement = React.lazy(() => import('./views/Payroll/SalaryStatement/SalaryStatementPage'))
const AttendanceView = React.lazy(() => import('./views/Attendance/AttendanceView/AttendanceView'))
const PunchMarkingHR = React.lazy(() => import('./views/Attendance/PunchMarkingHR/PunchMarkingHR'))
const CompanyInfo = React.lazy(() => import('./views/EmployeeRecord/CompanyInformationLeftMenu/CompanyInformation'))
const PunchDoneList = React.lazy(() => import('./views/Attendance/PunchMarkingHR/PunchMarkDoneList'))
const CommonReqst = React.lazy(() => import('./views/LeaveManagement/CommonRequest/CommonReqstMainPage'))
const CommonRequstMaster = React.lazy(() => import('./views/Master/CommonRequstMaster/CommonRequestMast'))
const CommonReqstInchargeApprvl = React.lazy(() => import('./views/LeaveManagement/CommonRequest/Approvals/InchargeApproval'))
const CommonReqstHodApprvl = React.lazy(() => import('./views/LeaveManagement/CommonRequest/Approvals/HodApproval'))
const CommonReqstCeoApprvl = React.lazy(() => import('./views/LeaveManagement/CommonRequest/Approvals/CeoApproval'))
const CommonReqstHrApprvl = React.lazy(() => import('./views/LeaveManagement/CommonRequest/Approvals/HrApproval'))
const CommonReqstHrView = React.lazy(() => import('./views/LeaveManagement/CommonRequest/CommonReqstHrView'))
const Vaccination = React.lazy(() => import('./views/EmployeeRecord/VacccinationInformation/Vaccination'))
const Vaccinationentry = React.lazy(() => import('./views/EmployeeRecord/VacccinationInformation/VaccinationEntry'))
const Hicverification = React.lazy(() => import('./views/EmployeeRecord/VacccinationInformation/HicVerification'))
const EndOfService = React.lazy(() => import('./views/Resignation/EndOfService/FullandFinalSettlement'))
const EODFinanceApproval = React.lazy(() => import('./views/Resignation/EODFinanceApproval/EODFinaneApproval'))
const Hicverificationlist = React.lazy(() => import('./views/EmployeeRecord/VacccinationInformation/Hicverificationlist'))
const ArearUpdation = React.lazy(() => import('./views/Payroll/ArearUpdation/ArearUpdation'))
const ExperienceSummary = React.lazy(() => import('./views/HrReports/ExperienceReports/ExperienceSummaryReport'))
const DeptPunchReport = React.lazy(() => import('./views/HrReports/PunchReport/DeptPunchReport'))
const PersonalRecord = React.lazy(() => import('./views/EmployeeRecord/PersonalRecords/PersonalRecords'))
const EmployeeActiveHR = React.lazy(() => import('./views/Resignation/EmployeeActiveHR/EmployeeActiveHR'))
const ManpowerPlanning = React.lazy(() => import('./views/Master/ManPower/Manpowermain'))
const Manpowerrequestapproval = React.lazy(() => import('./views/recruitment/manpowerRequest/RequestApproval/RequestApproval'))
const HodRequestapproval = React.lazy(() => import('./views/recruitment/manpowerRequest/RequestApproval/HodRequestapproval'))
const HrRequestApproval = React.lazy(() => import('./views/recruitment/manpowerRequest/RequestApproval/HrRequestApproval'))
const VacancyAnnoncment = React.lazy(() => import('./views/recruitment/manpowerRequest/Vacancy'))
const VacancyList = React.lazy(() => import('./views/recruitment/VacancyList/Vacancylist'))
const Applicationform = React.lazy(() => import('./views/recruitment/ApplicationForm/Applicationform'))
const SubmittedForm = React.lazy(() => import('./views/recruitment/ApplicationForm/SubmittedForm'))
const Shortlist = React.lazy(() => import('./views/recruitment/ApplicationForm/Shortlist/Shortlist'))
const Callletter = React.lazy(() => import('./views/recruitment/CallLetter/Callletter'))

const routes = [

  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: HomePage },
  { path: '/Profile', exact: true, name: 'Home', component: Profile },
  { path: '/Home/ManpowerRequest', exact: true, name: 'Manpower Request', component: ManpowerRequest },
  { path: '/Home/Vacancy', exact: true, name: 'Vacancy', component: Vacancy },
  { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings },
  { path: '/Home/Reports', exact: true, name: 'Reports', component: Reports },
  { path: '/Home/DepartmentMaster', exact: true, name: 'DeptMasrter', component: Departmentmaster },
  { path: '/Home/DeptSection', exact: true, name: 'Department Section', component: DepartmentSectionMast },
  //  { path: '/Home/SectionEdit/:id', exact: true, name: 'Department Section Edit', component: DepartmentSectionEdit },
  { path: '/Home/EmployeeType', exact: true, name: 'Employee Type', component: EmployeeTypeMast },
  { path: '/Home/DesignationType', exact: true, name: 'Designation Type', component: DesignatoionType },
  { path: '/Home/Designation', exact: true, name: 'Designation', component: Designation },
  { path: '/Home/Qualification', exact: true, name: 'Qualification', component: Qualification },
  { path: '/Home/University', exact: true, name: 'University', component: University },
  { path: '/Home/EmpDesignationType', exact: true, name: 'Empdesignationtype', component: Empdesignationtype },
  { path: '/Home/Branch', exact: true, name: 'Branch Master', component: BranchMast },
  { path: '/Home/Bank', exact: true, name: 'Bank Master', component: BankMaster },
  { path: '/Home/Region', exact: true, name: 'Region Master', component: RegionMaster },
  { path: '/Home/DepartmentShift', exact: true, name: 'Department Shift Master', component: DepartmentShift },
  //{ path: '/Home/DepartmentShiftEdit/:id', exact: true, name: 'Department Shift Master Edit', component: DepartmentShiftEdit },
  { path: '/Home/EmployeeRecord', exact: true, name: 'Employee Records', component: EmployeeRecrd },
  { path: '/Home/EmploymentType', exact: true, name: 'Employment Type', component: EmploymentType },
  { path: '/Home/EmploymentTypeList', exact: true, name: 'Employment Type List', component: EmploymentTypeList },
  { path: '/Home/EmploymentTypeEdit/:id', exact: true, name: 'Employment Type Edit', component: EmploymentTypetable },
  { path: '/Home/ModuleGroupMaster', exact: true, name: 'Module Group Master', component: ModulegroupMaster },
  //{ path: '/Home/MdulGrpMastEdit/:id', exact: true, name: 'Module Group Master Edit', component: ModulegroupMasterEdit },
  { path: '/Home/ModuleUserRights', exact: true, name: 'Module User Rights', component: ModuleUserRights },
  //{ path: '/Home/ModuleUserRightEdit/:id', exact: true, name: 'Module User Rights Master Edit', component: ModuleUserRightsEdit },
  { path: '/Home/UserGroup', exact: true, name: 'User Group Master', component: UserGroupMaster },
  { path: '/Home/GroupRights', exact: true, name: 'Group Rights', component: GroupRights },
  { path: '/Home/DoctorType', exact: true, name: 'Doctor Type', component: DoctorType },
  //{ path: '/Home/DoctorMastEdit/:id', exact: true, name: 'Doctor Type Master Edit', component: DoctorMastEdit },
  { path: '/Home/CommonCode', exact: true, name: 'Nation', component: Nation },
  { path: '/Home/State', exact: true, name: 'State', component: State },
  { path: '/Home/StateSelection', exact: true, name: 'State select', component: StateSelection },
  { path: '/Home/District', exact: true, name: 'District', component: District },
  { path: '/Home/Profile/:id/:no', exact: true, name: 'Employee Profile ', component: EmployeeProfile },
  { path: '/Home/Grade', exact: true, name: 'Grade', component: Grade },
  { path: '/Home/EarnType', exact: true, name: 'EarnType', component: EarnType },
  { path: '/Home/EarnDeduct', exact: true, name: 'EarnDeduction', component: EarnDeduction },
  { path: '/Home/ReligionMaster', exact: true, name: 'Religion Master', component: ReligionMaster },
  { path: '/Home/LeaveTypeMaster', exact: true, name: 'Leave Type', component: LeaveTypeMaster },
  { path: '/Home/YearlyLeaveCount', exact: true, name: 'Yearly Leave Count', component: YearlyLeaveCount },
  { path: '/Home/YearlyLeaveCountMastEdit/:id', exact: true, name: 'Leave Count Edit', component: YearlyLeaveCountMastEdit },
  { path: '/Home/YearlyLeaveCalendar', exact: true, name: 'Yearly Leave Calendar', component: YearlyLeaveCalendar },
  //{ path: '/Home/YearlyLeaveCalendarEdit/:id', exact: true, name: 'Yearly Leave Calendar Edit', component: YearlyLeaveCalendarEdit },
  { path: '/Home/ApplicationForm/:id/:no/:slno', exact: true, name: 'Application Form', component: ApplicationForm },
  { path: '/Home/PersonalInformation/:id/:no', exact: true, name: 'Personal Information', component: PersonalInformation },
  //{ path: '/Home/EmployeeExperience/:id/:no', exact: true, name: 'Experience', component: EmployeeExperience },
  // { path: '/Home/EmployeeExperienceEdit/:slno/:id/:no', exact: true, name: 'Experience Edit', component: EmployeeExperienceEdit },
  { path: '/Home/EducationMaster', exact: true, name: 'Education', component: EducationMaster },
  // { path: '/Home/EducationTableEdit/:id', exact: true, name: 'Education Table Edit', component: EducationTableEdit },
  { path: '/Home/CourseMaster', exact: true, name: 'Education', component: CourseMaster },
  { path: '/Home/Specialization', exact: true, name: "Specialization Master", component: SpecializationMaster },
  //{ path: '/Home/SpecializationTableEdit/:id', exact: true, name: "Specialization Table Edit", component: SpecializationTableEdit },
  { path: '/Home/RegistrationType', exact: true, name: "Registration Type", component: RegistrationType },
  // { path: '/Home/QualificationTableEdit/:slno/:id/:no', exact: true, name: "Emp Qualification Table Edit", component: EmpQualificationEdit },
  //{ path: '/Home/RegistrationTableEdit/:id', exact: true, name: "Registration table Edit", component: RegistrationTableEdit },
  //{ path: '/Home/EmployeeQualification/:id/:no', exact: true, name: 'Qualification', component: EmployeeQualification },
  // { path: '/Home/EmployeeExperience/:id', exact: true, name: 'Experience', component: EmployeeExperience },
  //{ path: '/Home/StatutoryInformation/:id/:no', exact: true, name: 'Statutory information', component: StatutoryInformation },
  //{ path: '/Home/ContractInformation/:id/:no', exact: true, name: 'Contract Information', component: ContractInformation },
  //  { path: '/Home/EmployeeCompany/:id/:no', exact: true, name: 'Employee Company', component: EmployeeCompany },
  { path: '/Home/SalaryInformation/:id/:no', exact: true, name: 'Salary Information', component: SalaryInformation },
  { path: '/Home/EmployeeAllowance/:id/:no', exact: true, name: 'Employee Allowance', component: EmployeeAllowance },
  { path: '/Home/AnnualLeaveSettings/:id/:no', exact: true, name: 'Annual Leave Settings', component: AnnualLeaveSettings },
  // { path: '/Home/EmployeeTraining/:id', exact: true, name: 'Employee Training', component: EmployeeTraining },
  { path: '/Home/SalaryIncrement/:id/:no', exact: true, name: 'Salary Increment', component: SalaryIncrement },
  { path: '/Home/EmployeeDocumentChecklist/:id/:no', exact: true, name: 'Employee Document Checklist', component: EmployeeDocumentChecklist },
  //{ path: '/Home/VaccinationInformation/:id', exact: true, name: 'Vaccination Information', component: VaccinationInformation },
  { path: '/Home/FineorDeduction/:id/:no', exact: true, name: 'Fine or Other Deduction', component: FineorDeduction },
  // { path: '/Home/EmployeeEndofService/:id', exact: true, name: 'End of service', component: EmployeeEndofService },
  //{ path: '/Home/QualificationMastTableEdit/:id', exact: true, name: 'Qualification  Table Edit', component: QualificationMastTableEdit },

  { path: '/Home/RegionMastTableEdit/:id', exact: true, name: 'Region Master Table Edit', component: RegionMastTableEdit },
  { path: '/Home/BankMastTableEdit/:id', exact: true, name: 'Bank master Table Edit', component: BankMastTableEdit },
  { path: '/Home/BranchMastTableEdit/:id', exact: true, name: 'Branch Master Table Edit', component: BranchMastTableEdit },
  { path: '/Home/EmpInstitutionTypeTableEdit/:id', exact: true, name: 'Emp institution Type Table Edit', component: EmpIntitutionTypeTableEdit },
  //{ path: '/Home/RegionMastTableEdit/:id', exact: true, name: 'Region Master Table Edit', component: RegionMastTableEdit },
  { path: '/Home/DesignationMastTableEdit/:id', exact: true, name: 'Designation master Table Edit', component: DesignationMastTableEdit },
  // { path: '/Home/BankMastTableEdit/:id', exact: true, name: 'Bank master Table Edit', component: BankMastTableEdit },
  //{ path: '/Home/BranchMastTableEdit/:id', exact: true, name: 'Branch Master Table Edit', component: BranchMastTableEdit },
  // { path: '/Home/EmpInstitutionTypeTableEdit/:id', exact: true, name: 'Emp institution Type Table Edit', component: EmpIntitutionTypeTableEdit },
  { path: '/Home/DesignationTypeedit/:id', exact: true, name: 'Branch Master Table Edit', component: DesignationTypeedit },
  { path: '/Home/EmpAllowanceTableEdit/:slno/:id/:no', exact: true, name: 'Employee Allowance Table Edit ', component: EmpAllowanceTableEdit },
  { path: '/Home/ShiftMaster', exact: true, name: 'ShiftMaster', component: ShiftMaster },
  { path: '/Home/ShiftMasterEdit/:id', exact: true, name: 'Shift Master Edit', component: ShiftMasterEdit },
  { path: '/Home/FineAndDeductionTableEdit/:slno/:id/:no', exact: true, name: 'Fine Deduction Table Edit', component: FineDeductionTableEdit },
  { path: '/Home/AllowanceDeduction', exact: true, name: 'Allowance Deducation', component: AllowanceDeducation },
  // { path: '/Home/Dutyplanning', exact: true, name: 'Duty Planning', component: Dutyplanning },
  { path: '/Home/Dutyplan', exact: true, name: 'Duty Planning', component: Dutyplan },
  // { path: '/Home/LeaveRequest', exact: true, name: 'Leave Request', component: LeaveRequest },
  { path: '/Home/ApprovalIncharge', exact: true, name: ' Leave Approval Incharge', component: ApprovalIncharge },
  { path: '/Home/ApprovalHOD', exact: true, name: 'Leave Approval HOD', component: ApprovalHOD },
  { path: '/Home/ApprovalHR', exact: true, name: 'Leave Approval HR', component: ApprovalHR },
  { path: '/Home/LeaveCancelEmployee', exact: true, name: 'Leave cancel employee', component: CancelEmployee },
  { path: '/Home/LeaveCancelHR', exact: true, name: 'Leave cancel HR', component: CancelHR },
  { path: '/Home/OTRequest', exact: true, name: 'Over Time Request', component: OTRequest },
  { path: '/Home/OTApprovalIncharge', exact: true, name: 'OT Approval Incharge', component: OTApprovalIncharge },
  { path: '/Home/OTApprovalHOD', exact: true, name: 'OT Approval HOD', component: OTApprovalHOD },
  { path: '/Home/OTApprovalHR', exact: true, name: 'OT Approval HR', component: OTApprovalHR },
  { path: '/Home/OTUpdation', exact: true, name: 'OT Updation', component: OTUpdation },
  { path: '/Home/LeaveRequestType', exact: true, name: 'Leave Request Type', component: LeaveRequestType },
  { path: '/Home/ShiftUpdation', exact: true, name: 'Shift Details Updation', component: ShiftUpdation },
  { path: '/Home/ResignationRequest', exact: true, name: 'Resignation Request', component: ResignationRequest },
  { path: '/Home/ResignationApprovalIncharge', exact: true, name: 'Resignation Request Incharge Approval', component: ResignationApprovalIncharge },
  { path: '/Home/ResignationApprovalHod', exact: true, name: 'Resignation Request HOD Approval', component: ResignationApprovalHod },
  { path: '/Home/ResignationApprovalHR', exact: true, name: 'Resignation Request HR Approval', component: ResignationApprovalHR },
  { path: '/Home/ResignationApprovalCEO', exact: true, name: 'Resignation Request CEO Approval', component: ResignationApprovalCEO },
  { path: '/Home/ResignationCancel', exact: true, name: 'Resignation Request Cancel', component: ResignationCancel },
  { path: '/Home/BoardEdu', exact: true, name: 'Educations board master', component: BoardEdu },
  { path: '/Home/Authorisation', exact: true, name: 'hod and Incharge Marking', component: HodMarking },
  { path: '/Home/HodMark', exact: true, name: 'Hod Authorisation', component: HodAuthorisation },
  { path: '/Home/DueClearenceDepartment', exact: true, name: 'Due Clearence Department', component: DueClearenceDepartment },
  //  { path: '/Home/DueClearenceDeptEdit/:id', exact: true, name: 'Due Clearence Department Edit', component: DueClearenceDeptEdit },
  { path: '/Home/DueClearence', exact: true, name: 'Due Clearence', component: DueClearence },
  { path: '/Home/OTApprovalCEO', exact: true, name: 'OT Approval CEO', component: OTApprovalCEO },
  { path: '/Home/OTWageMaster', exact: true, name: 'OT Wage Master', component: OTWageMaster },
  // { path: '/Home/OTWageMasterEdit/:id', exact: true, name: 'OT Wage Table Edit', component: OTWageMasterEdit },
  { path: '/Home/ApprovalCEO', exact: true, name: 'Approval CEO', component: ApprovalCEO },
  { path: '/Home/CommonSettings', exact: true, name: 'Common Settings', component: CommonSettings },
  { path: '/Home/DueClearenceHR', exact: true, name: 'DueClearence HR', component: DueClearenceHR },
  { path: '/Home/DueClearenceMaster', exact: true, name: 'Due Clearence Master', component: DueClearenceMaster },
  { path: '/Home/EmployeeReport', exact: true, name: 'Active Employees', component: EmployeeReport },
  { path: '/Home/EmployeeReportInactive', exact: true, name: 'Employee Report Inactive', component: EmployeeReportInactive },
  { path: '/Home/CarryForwardSetting', exact: true, name: 'Carry Forward Leave Setting', component: CarryforwardLeaveSetting },//Leave carryforward
  //  { path: '/Home/CarryforwardEdit/:id', exact: true, name: 'Due Clearence Edit', component: CarryforwardLeaveEdit },
  { path: '/Home/AttendanceMarking', exact: true, name: 'Attendance Marking', component: AttendanceMarking },
  { path: '/Home/LeaveCarryForwad', exact: true, name: 'Leave Carry Forwad', component: LeaveCarryForwad },
  { path: '/Home/Hrm_Alert', exact: true, name: 'Hrm Alert', component: Hrm_Alert },
  { path: '/Home/Hrm_message', exact: true, name: 'Hrm message', component: Hrm_message },
  // { path: '/Home/Probation_end_details', exact: true, name: 'Probation End Details', component: Probation_end_details },
  { path: '/Home/Contract_end_details', exact: true, name: 'Contract End Details', component: Contract_end_details },
  { path: '/Home/NightOffRequest', exact: true, name: 'Night Off Request', component: NightOffRequest },
  { path: '/Home/AnnualLeaveProcess', exact: true, name: 'Annual Leave Process', component: AnnualLeaveProcess },
  { path: '/Home/OtUser', exact: true, name: 'OT User View', component: OtUser },
  { path: '/Home/Hrm_Announcement', exact: true, name: 'Hrm Announcement', component: Hrm_Announcement },
  { path: '/Home/LeaveUser', exact: true, name: 'Leave User View', component: LeaveUser },
  { path: '/Home/Autocompletetest', exact: true, name: 'Autocomplete test', component: Autocompletetest },
  { path: '/Home/ProTax', exact: true, name: 'Proffessional Tax master', component: proTax },
  //{ path: '/Home/ProTaxEdit/:id', exact: true, name: 'Proffessional Tax master Edit', component: proTaxEdit },
  { path: '/Home/ProffessionalTax', exact: true, name: 'Proffessional Tax', component: proffessionalTax },
  { path: '/Home/DeptSecChange', exact: true, name: 'Department Section Change', component: DeptSecChange },
  { path: '/Home/EmployeeInactiveHR', exact: true, name: 'Employee Inactive HR', component: EmployeeInactiveHR },
  { path: '/Home/RegistrationRenew', exact: true, name: 'Registration renew table', component: RegRenew },
  { path: '/Home/JobDescription', exact: true, name: 'Job Description', component: JobDescription },
  { path: '/Home/JobDescriptionEmployee/:id/:no', exact: true, name: 'Job Description Employee', component: JobDescriptionEmployee },
  { path: '/Home/EmployeeRecordVerification', exact: true, name: 'Employee Record Verification', component: EmployeeRecordVerification },
  { path: '/Home/BloodReports', exact: true, name: 'Employee BloodGroup Report', component: BloodReports },
  { path: '/Home/ReligionReport', exact: true, name: 'Employee Religion Report', component: ReligionReport },
  { path: '/Home/RegionReport', exact: true, name: 'Employee district Report', component: RegionReport },
  { path: '/Home/ExperienceReport', exact: true, name: 'Employee Department Report', component: ExperienceReport },
  { path: '/Home/InstitutionTypeReport', exact: true, name: 'Employee InstitutionType Report', component: InstitutionTypeReport },
  { path: '/Home/CategoryReport', exact: true, name: 'Employee Category Report', component: CategoryReports },
  { path: '/Home/DesignationReport', exact: true, name: 'Employee Designation Report', component: DesignationReport },
  { path: '/Home/QualificationReport', exact: true, name: 'Employee Qualification Report', component: QualificationReport },
  { path: '/Home/EmployeeRecordTable', exact: true, name: 'Employee Record Table', component: EmployeeRecordTable },
  { path: '/Home/EmployeeRecordEdit/:id/:no', exact: true, name: 'Employee Record Table', component: EmployeeRecordEdit },
  { path: '/Home/EmpfileFinalVerification', exact: true, name: 'Empfile Final Verification', component: EmpfileFinalVerification },
  { path: '/Home/KRA', exact: true, name: 'Key Result Areas', component: KRA },
  { path: '/Home/Prfle/:id/:no', exact: true, name: 'Employee Profile', component: EmpProfile },
  { path: '/Home/ContractRenewalProcess/:id/:no', exact: true, name: 'Contract Renewal Process', component: ContractRenewalProcess },
  { path: '/Home/Direct_Contract_Close/:id/:no', exact: true, name: 'Direct Contract Close', component: Direct_Contract_Close },
  // { path: '/Home/ContractRenewApprovalList', exact: true, name: 'Contract Renew Approval List', component: ContractRenewApprovalList },
  { path: '/Home/ProbationEnd', exact: true, name: 'Probation End List', component: ProbationEnd },
  { path: '/Home/AnnualAppraisalList', exact: true, name: 'Annual Appraisal List', component: AnnualAppraisalList },
  { path: '/Home/ContractEnd', exact: true, name: 'Contract End List', component: ContractEnd },
  { path: '/Home/TrainingEnd', exact: true, name: 'Training End List', component: TrainingEnd },
  { path: '/Home/AppraisalApproveIncharge', exact: true, name: 'Appraisal Approve Incharge', component: AppraisalApproveIncharge },
  { path: '/Home/AppraisalApprovalHOD', exact: true, name: 'Appraisal Approve HOD', component: AppraisalApprovalHOD },
  { path: '/Home/AppraisalApprovalCEO', exact: true, name: 'Appraisal Approve CEO', component: AppraisalApprovalCEO },
  { path: '/Home/SelfAppraisalApproval', exact: true, name: 'Appraisal Approve Self', component: SelfAppraisalApproval },
  { path: '/Home/EmpFirstVerification', exact: true, name: 'Employee Verification', component: EmpFirstVerification },
  { path: '/Home/EmpSecondVerification', exact: true, name: 'Employee second Verification', component: EmpSecondVerification },
  { path: '/Home/EmployeeRecordsAgGrid', exact: true, name: 'Employee Record File', component: EmployeeRecordsAgGrid },
  { path: '/Home/Prfle/:id/:no/:slno', exact: true, name: 'Employee Profile', component: EmpProfile },
  { path: '/Home/JobDescriptionViewTable', exact: true, name: 'Job Description View Table', component: JobDescriptionViewTable },
  { path: '/Home/RegistrationTypeReport', exact: true, name: 'Department Wise Registration Type Report', component: RegistrationTypeReport },
  { path: '/Home/ContractClosedReport', exact: true, name: 'Employee Contract Closed report', component: ContractClosedReport },
  { path: '/Home/ContractRenewReport', exact: true, name: "Employee Contract Renew Report", component: ContractRenewReport },
  { path: '/Home/ContractCurrentRunningReport', exact: true, name: 'Employee Contract Current Running', component: ContractCurrentRunningReport },
  { path: '/Home/TraningProbaReport', exact: true, name: 'Traning Probation Report', component: TraningProbaReport },
  { path: '/Home/DeptSubSectionReport', exact: true, name: 'DeptSubSectionReport', component: DeptSubSectionReport },
  { path: '/Home/DesignationExpReport', exact: true, name: 'DesignationExpReport', component: DesignationExpReport },
  { path: '/Home/ContractOneYear+CurrentReport', exact: true, name: 'Contract One Year + Current Report', component: ContractOneYear },
  { path: '/Home/PermanentEmployeeReport', exact: true, name: 'Permanent Employee Report', component: PermanentEmployeeReport },
  { path: '/Home/ContractReport', eaxct: true, name: 'ContractReport', component: ContractReport },
  { path: '/Home/EmployeeRegistrationReport', exact: true, name: 'Employee Registration Report', component: EmployeeRegistrationReport },
  { path: '/Home/LeaveProcess/:id/:no', exact: true, name: 'Employee Leave Process', component: LeaveProcessNew },
  { path: '/Home/LeaveRequsition', exact: true, name: 'Employee Leave Requsition', component: LeaveRequesitionMainCard },
  { path: '/Home/EmployeeRegistrationReport', exact: true, name: 'Employee Registration Report', component: EmployeeRegistrationReport },
  { path: '/Home/HRAppraisalList', exact: true, name: 'Employee Appraisal List', component: HRAppraisalList },
  { path: '/Home/ApprovedAppraisal', exact: true, name: 'Employee Appraisal List', component: CompletedAppraisal },
  { path: '/Home/NoExperienceReport', exact: true, name: 'No ExperienceReport', component: NoExperienceReport },
  { path: '/Home/PayrollAttendance', exact: true, name: 'Attendance Updation', component: PayrollAtendanceUpdation },
  { path: '/Home/PaySlipCalculation', exact: true, name: 'PaySlip Calculation', component: PaySlipCalculation },
  { path: '/Home/EmpEarnDeduction', exact: true, name: 'Employee Earn Deduction', component: EmpEarnDeduction },
  { path: '/Home/OTUpdatedList', exact: true, name: 'Over Time Updated List', component: OTUpdatedList },
  { path: '/Home/AttendanceAutomatic', exact: true, name: 'Attendance Marking Automatic', component: AttendanceAutomatic },
  { path: '/Home/PunchTransfer', exact: true, name: 'Punch Transfer Manual', component: PunchTransfer },
  { path: '/Home/PaySlipprint', exact: true, name: 'Pay Slip Print', component: PaySlipprint },
  { path: '/Home/WageRegister', exact: true, name: 'Wage Register', component: WageRegister },
  { path: '/Home/AttandanceRegister', exact: true, name: 'Attandance Register', component: AttandanceRegister },
  { path: '/Home/SalaryStatement', exact: true, name: 'Attandance Register', component: SalaryStatement },
  { path: '/Home/AttendanceView', exact: true, name: 'Attandance View', component: AttendanceView },
  { path: '/Home/PunchMarkingHR', exact: true, name: 'Punch Marking HR ', component: PunchMarkingHR },
  { path: '/Home/CompanyInfo', exact: true, name: 'Punch Marking HR ', component: CompanyInfo },
  { path: '/Home/PunchDoneList', exact: true, name: 'Punch Marking Done List ', component: PunchDoneList },
  { path: '/Home/CommonReqst', exact: true, name: 'Common Request', component: CommonReqst },
  { path: '/Home/CommonRequstMaster', exact: true, name: 'Common Request Master', component: CommonRequstMaster },
  { path: '/Home/CommonReqstInchargeApprvl', exact: true, name: 'Common Request Incharge Approval', component: CommonReqstInchargeApprvl },
  { path: '/Home/CommonReqstHodApprvl', exact: true, name: 'Common Request Hod Approval', component: CommonReqstHodApprvl },
  { path: '/Home/CommonReqstCeoApprvl', exact: true, name: 'Common Request Ceo Approval', component: CommonReqstCeoApprvl },
  { path: '/Home/CommonReqstHrApprvl', exact: true, name: 'Common Request Hr Approval', component: CommonReqstHrApprvl },
  { path: '/Home/CommonReqstHrView', exact: true, name: 'Common Request Hr View', component: CommonReqstHrView },
  { path: '/Home/VaccinationInfo', exact: true, name: 'Vaccination Information', component: Vaccination },
  { path: '/Home/VaccinationEntry', exact: true, name: 'Vaccination Entry', component: Vaccinationentry },
  { path: '/Home/Hicverification', exact: true, name: 'Hicverification ', component: Hicverification },
  { path: '/Home/EndOfService', exact: true, name: 'Full and Final Settlement', component: EndOfService },
  { path: '/Home/EODFinanceApproval', exact: true, name: 'EOD Finanace Approval', component: EODFinanceApproval },
  { path: '/Home/Hicverificationlist', exact: true, name: 'Hic Verification List ', component: Hicverificationlist },
  { path: '/Home/ArearUpdation', exact: true, name: 'Arear Updation', component: ArearUpdation },
  { path: '/Home/ExperienceSummary', exact: true, name: 'Employee Experience Summary Report', component: ExperienceSummary },
  { path: '/Home/DeptPunchReport', exact: true, name: 'Department Punch Report', component: DeptPunchReport },
  { path: '/Home/PersonalRecord', exact: true, name: 'Personal Records', component: PersonalRecord },
  { path: '/Home/ManpowerPlanning', exact: true, name: 'ManPower', component: ManpowerPlanning },
  { path: '/Home/RequestApproval', exact: true, name: 'RequestApproval', component: Manpowerrequestapproval },
  { path: '/Home/HodRequestapproval', exact: true, name: 'HOD Request Approval', component: HodRequestapproval },
  { path: '/Home/HrRequestApproval', exact: true, name: 'HR Request Approval', component: HrRequestApproval },
  { path: '/Home/VacancyAnnouncement', exact: true, name: 'Vacancy Announcement', component: VacancyAnnoncment },
  { path: '/Home/VacancyList', exact: true, name: 'Vacancy List', component: VacancyList },
  { path: '/Home/Applicationform', exact: true, name: 'Application Form', component: Applicationform },
  { path: '/Home/SubmittedForm', exact: true, name: 'Submitted Applications', component: SubmittedForm },
  { path: '/Home/Shortlist', exact: true, name: 'Short List', component: Shortlist },
  { path: '/Home/Callletter', exact: true, name: 'Call letter Preperation', component: Callletter },
  { path: '/Home/EmployeeActiveHR', exact: true, name: 'Employee Active HR', component: EmployeeActiveHR },

]

export default routes
