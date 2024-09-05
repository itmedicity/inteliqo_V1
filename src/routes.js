import React from 'react'

const HomePage = React.lazy(() => import('./views/Home/Home'))
const Profile = React.lazy(() => import('./views/Home/Profile'))
const ManpowerRequest = React.lazy(() => import('./views/recruitment/manpowerRequest/ManpowerRequest'));
const Vacancy = React.lazy(() => import('./views/recruitment/VacancyAnounce/Vacancy'));
const Settings = React.lazy(() => import('./Menus/Settings'));
const Reports = React.lazy(() => import('./Menus/Reports'));
const Departmentmaster = React.lazy(() => import('./views/Master/DepartmentMaster/DepartmentMasterPage'));
const DepartmentSectionMast = React.lazy(() => import('./views/Master/DepartmentSection/DepartmentSectionMast'));
const EmployeeTypeMast = React.lazy(() => import('./views/Master/EmployeeType/EmployeeTypeMast'));
const DesignatoionType = React.lazy(() => import('./views/Master/DesignationType/DesignationTypeMast'));
const Designation = React.lazy(() => import('./views/Master/Designation/DesignationMast'));
const Qualification = React.lazy(() => import('./views/Master/Qualification/QualificationMast'));
const Empdesignationtype = React.lazy(() => import('./views/Master/EmpDesignationType/EmpDesignationtype'))
const BranchMast = React.lazy(() => import('./views/Master/BranchMaster/BranchMast'))
const BankMaster = React.lazy(() => import('./views/Master/BankMaster/BankMaster'));
const RegionMaster = React.lazy(() => import('./views/Master/Region/RegionMast'));
const DepartmentShift = React.lazy(() => import('./views/Master/DepartmentShift/DepartmentShiftMast'));
const EmployeeRecrd = React.lazy(() => import('./views/EmployeeRecord/EmployeeRegister/EmployeeRecord'));
const EmploymentType = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypeMast'));
const EmploymentTypeList = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypetable'));
const EmploymentTypetable = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypeEdit'));
const ModulegroupMaster = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMast'))
const ModuleUserRights = React.lazy(() => import('./views/Master/ModuleUserRights/MdleUserRightMast'))
const UserGroupMaster = React.lazy(() => import('./views/Master/GroupMaster/Groupmaster'))
const GroupRights = React.lazy(() => import('./views/Master/GroupRights/GrouprightsMast'))
const EmployeeProfile = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeProfile'))
const Grade = React.lazy(() => import('./views/Master/GradeMaster/GradeMaster'))
const EarnType = React.lazy(() => import('./views/Master/EarnTypeMaster/EarntypeMast'))
const EarnDeduction = React.lazy(() => import('./views/Master/EarningDeductionMaster/EarnDectmast'))
const ReligionMaster = React.lazy(() => import('./views/Master/ReligionMaster/ReligionMast'))
const LeaveTypeMaster = React.lazy(() => import('./views/Master/LeaveTypeMaster/LeaveTypeMast'))
const YearlyLeaveCount = React.lazy(() => import('./views/Master/YearlyLeaveCount/YearlyLeaveCountMast'))
const YearlyLeaveCountMastEdit = React.lazy(() => import('./views/Master/YearlyLeaveCount/YearlyLeaveCountMastEdit'))
const YearlyLeaveCalendar = React.lazy(() => import('./views/Master/YearlyLeaveCalendar/YearlyLeaveCalendarMast'))
const ApplicationForm = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/ApplicationForm'))
const PersonalInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/PersonalInformation'))
const DoctorType = React.lazy(() => import('./views/Master/DoctorType/DoctorMaster'))
const Nation = React.lazy(() => import('./views/CommonCode/NationSlnoSelection'))
const State = React.lazy(() => import('./views/Master/State/StateMaster'))
const StateSelection = React.lazy(() => import('./views/CommonCode/StateSelect'))
const District = React.lazy(() => import('./views/Master/District/DistrictMaster'))
const University = React.lazy(() => import('./views/Master/University/UniversityMast'))
const EducationMaster = React.lazy(() => import('./views/Master/EducationMaster/EducationMaster'))
const CourseMaster = React.lazy(() => import('./views/Master/CourseMaster/CourseMaster'))
const SpecializationMaster = React.lazy(() => import('./views/Master/Specialization/SpecializationMaster'))
const RegistrationType = React.lazy(() => import('./views/Master/RegistrationType/RegistrationMaster'))
// const EmployeeQualification = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeQualification'))
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
const DesignationMastTableEdit = React.lazy(() => import('./views/Master/Designation/DesignationMastTableEdit'))
const DesignationTypeedit = React.lazy(() => import('./views/Master/DesignationType/DesignationTypeTableedit'))
const EmpAllowanceTableEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/EmpAllowanceTableEdit'))
const ShiftMaster = React.lazy(() => import('./views/Master/ShiftMaster/ShiftMaster'))
const ShiftMasterEdit = React.lazy(() => import('./views/Master/ShiftMaster/ShiftMasterEdit'))
const FineDeductionTableEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/FineAndDeductionTableEdit'))
const AllowanceDeducation = React.lazy(() => import('./views/EmployeeRecord/AllowanceDeducation/BulkWageUpdation'))
// const Dutyplanning = React.lazy(() => import('./views/Attendance/DutyPlanning/DutyPlanning'))
const Dutyplan = React.lazy(() => import('./views/Attendance/DutyPlan/DutyPlanMainCard'))
const ApprovalIncharge = React.lazy(() => import('./views/LeaveManagement/ApprovalIncharge/ApprovalIncharge'))
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
const DueClearence = React.lazy(() => import('./views/Resignation/DueClearence/DueClearence'))
const OTApprovalCEO = React.lazy(() => import('./views/LeaveManagement/OTApprovalCEO/OtCeoApproval'))
const OTWageMaster = React.lazy(() => import('./views/Master/OTWageMaster/OtMaster'))
const ApprovalCEO = React.lazy(() => import('./views/LeaveManagement/ApprovalCEO/ApprovalCEO'))
//const CommonSettings = React.lazy(() => import('./views/Master/CommonSettings/CommonSettings'))
const DueClearenceHR = React.lazy(() => import('./views/Resignation/DueClearenceHR/DueClearenceHR'))
const DueClearenceMaster = React.lazy(() => import('./views/Master/DueClearenceMaster/DueClearenceMaster'))
const EmployeeReport = React.lazy(() => import('./views/HrReports/EmployeeReport/EmployeeReport'))
const EmployeeReportInactive = React.lazy(() => import('./views/HrReports/EmployeeReport/EmployeeReportInactive'))
const CarryforwardLeaveSetting = React.lazy(() => import('./views/Master/CarryforwardMaster/CarryforwardMast'))
const AttendanceMarking = React.lazy(() => import('./views/Attendance/AttendanceMarking/AttendanceMarking'))
const LeaveCarryForwad = React.lazy(() => import('./views/Attendance/LeaveCarryForwad/LeaveCarryForwad'))
const Hrm_Alert = React.lazy(() => import('./views/EmployeeRecord/Hrm_Alert/Hrm_Alert'))
const Hrm_message = React.lazy(() => import('./views/EmployeeRecord/Hrm_message/Hrm_message'))
const NightOffRequest = React.lazy(() => import('./views/LeaveManagement/NightOff/NightOffRequest'))
const AnnualLeaveProcess = React.lazy(() => import('./views/Attendance/AnnualLeaveProcess/AnnualLeaveProcess'))
const OtUser = React.lazy(() => import('./views/LeaveManagement/OTUser/OTUser'))
const Hrm_Announcement = React.lazy(() => import('./views/EmployeeRecord/Hrm_Announcement/Hrm_Announcement'))
const LeaveUser = React.lazy(() => import('./views/LeaveManagement/LeaveUser/LeaveUser'))
const Autocompletetest = React.lazy(() => import('./views/CommonCode/Autocompletetest'))
const proTax = React.lazy(() => import('./views/Master/ProffessionalTax/ProTaxMast'))
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
const TrainingType = React.lazy(() => import('./views/Master/TrainingTypeMaster/TrainingType'))
const TrainingCategory = React.lazy(() => import('./views/Master/TrainingCategoryMaster/TrainingCategory'))
const TrainingName = React.lazy(() => import('./views/Master/TrainingNameMaster/TrainingName'))
const TrainerName = React.lazy(() => import('./views/Master/TrainerNameMaster/TrainerDetails'))
const TrainingTopic = React.lazy(() => import('./views/Master/TrainingTopicMaster/TrainingTopic'))
const TrainingQuestions = React.lazy(() => import('./views/Master/TrainingQuestionsMaster/TrainingQuestions'))
const SchedulingTime = React.lazy(() => import('./views/Master/SchedulingTimeMaster/SchedulingTime'))
const TrainingSchedule = React.lazy(() => import('./views/Master/TrainingScheduleMaster/TrainingSchedule'))
// const DepartmentalTrainingSchedule = React.lazy(() => import('./views/TrainingDevelopment/DepartmentalTraining/DepartmentalTrainingSchedule'))
// const TrainingProcess = React.lazy(() => import('./views/TrainingDevelopment/TrainingProcess/TrainingProcess'))
const TrainingProcess = React.lazy(() => import('./views/TrainingDevelopment/TrainingProcess/RightBasedLogin'))
const TrainingEmployeeSchedule = React.lazy(() => import('./views/TrainingDevelopment/TrainingEmployeeSchedule/TrainingEmployeeSchedule'))
const AfterJoiningTraining = React.lazy(() => import('./views/TrainingDevelopment/TrainingSchedule/TrainingAfterJoining'))
const DepartmentalTrainingSchedule = React.lazy(() => import('./views/TrainingDevelopment/DepartmentalTraining/DepartmentalCalenders'))
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
const EmployeeActiveHR = React.lazy(() => import('./views/Resignation/EmployeeActiveHR/EmployeeActiveHR'))
const DepartmentalCalenders = React.lazy(() => import('./views/TrainingDevelopment/DepartmentalTraining/DepartmentalCalenders'))
//QR CODE
//const PreTest = React.lazy(() => import('./views/TrainingDevelopment/PreTest/PretestEmpList'))
const OnlinePreTest = React.lazy(() => import('./views/TrainingDevelopment/PreTest/OnlinePreWithQRcode'))
const OnlinePostTest = React.lazy(() => import('./views/TrainingDevelopment/PostTest/OnlinePostWithQR'))
//const PostTest = React.lazy(() => import('./views/TrainingDevelopment/PostTest/PostTestEmpListWithQR'))
const OnlineTraining = React.lazy(() => import('./views/TrainingDevelopment/OnlineTraining/OnlineTraining'))
const QROnlineTraining = React.lazy(() => import('./views/TrainingDevelopment/OnlineTraining/OnlineTrainingQR'))
//Retest
const EmployeeDashboard = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/EmpDashboardPage'))
const OnlineRetest = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/RetestQuestionPage'))
//Departmental Training Report
const DepartmentalTrainingReport = React.lazy(() => import('./views/HrReports/TrainingReports/DepartmentalTrainingCalender'))
const DepartmentalCalender = React.lazy(() => import('./views/HrReports/TrainingReports/DepartmentalCalender'))
const DepartmentalTrainingReportDetails = React.lazy(() => import('./views/HrReports/TrainingReports/DepartmentalTrainingCalender'))
const LeaveReports = React.lazy(() => import('./views/HrReports/LeaveReports/LeaveReports'))
const TrainingAllotedEmpReport = React.lazy(() => import('./views/HrReports/TrainingReports/TrainingAllotedEmpReport'))
const TrainingCompletionEmpReport = React.lazy(() => import('./views/HrReports/TrainingReports/TrainingCompletionEmpReports'))
const TrainingPendingReport = React.lazy(() => import('./views/HrReports/TrainingReports/TrainingPendingEmpList'))
const TrainingRetestEmpReport = React.lazy(() => import('./views/HrReports/TrainingReports/TrainingRetestEmpReport'))
const CommonPreTestPage = React.lazy(() => import('./views/TrainingDevelopment/CommonPreTest/TopicAndQRScanList'))
const PreLogInpage = React.lazy(() => import('./views/TrainingDevelopment/CommonPreTest/PreLogInpage'))
const CommonPostTestPage = React.lazy(() => import('./views/TrainingDevelopment/CommonPostTest/TopicScanList'))
const RetestEmpDetails = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/RetestEmpDetails'))
const InductionTraining = React.lazy(() => import('./views/TrainingDevelopment/InductionTraining/InductionTrainingMainPage'))
const SalaryReport = React.lazy(() => import('./views/HrReports/Salaryreports/SalaryReport'))
//Induction Trainings
const InductionCalender = React.lazy(() => import('./views/TrainingDevelopment/InductionTrainingCalender/InductionCalender'))
const InductionTest = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/InductionTestMain'))
const InductionProcess = React.lazy(() => import('./views/TrainingDevelopment/InductionProcess/InductionProcessMain'))
//InductionTest
const InductLogInpage = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/Induction_test_login'))
const InductionPreTest = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/PreTest/QuestFirstPage'))
const InductionPostTest = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/PostTest/HeadingPage'))
const OnlineInductReTest = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/InductionRetest/SystemInductionRetest/TestMainPage'))
const InductQREmpDetails = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/InductionRetest/QRInductionRetest/InductQREmpDetails'))
const OnlineTrainings = React.lazy(() => import('./views/TrainingDevelopment/OnlineTrainings/OnlineTrainingMainPage'))
const ORInductionTraining = React.lazy(() => import('./views/TrainingDevelopment/OnlineTrainings/ORInductionTraining'))
const InductionCalenderReport = React.lazy(() => import('./views/HrReports/InductionTrainingReport/InductionCalenderReport'))
//TrainingDetails
const TrainingDetails = React.lazy(() => import('./views/TrainingDevelopment/TrainingDetails/TrainingDetailsHomepage/DetailsHomepage'))
const TrainerApprovals = React.lazy(() => import('./views/TrainingDevelopment/TrainingDetails/TrainerApprovalMain'))
const HODApprovals = React.lazy(() => import('./views/TrainingDevelopment/TrainingDetails/HODApprovalsMain'))
const EmpPunchReport = React.lazy(() => import('./views/HrReports/Employee Punch Report/EmpPunchReport'))
const EmpPreviouspunchreport = React.lazy(() => import('./views/Attendance/PreviousMonthReport/EmployeePunchReport'))
const EmpSaleryReport = React.lazy(() => import('./views/HrReports/EmpSaleryReport/EmpSaleryReport'))
const EmpRightBasedLogin = React.lazy(() => import('./views/TrainingDevelopment/EmployeeRights/EmployeeRights'))
const TNDdashboardViewPage = React.lazy(() => import('./views/TrainingDevelopment/TrainingDashboard/TnDViewComponents/TndDashboardView'))
const SalaryProcessReports = React.lazy(() => import('./views/Attendance/SalaryProcess/SalaryProcessed'))
const CompensatoryRequest = React.lazy(() => import('./views/LeaveManagement/CompOffRequest/CompensatoryRequest'))
const AttendenceReports = React.lazy(() => import('./views/HrReports/AttendenceReport/AttendenceReport'))
const DayWiseAttendenceReports = React.lazy(() => import('./views/HrReports/DayWiseAttendence/DayWiseAttendence'))
// const TDVerification = React.lazy(() => import('./views/TrainingDevelopment/TDVerification/TDVerificationMainPage'))
const TDVerification = React.lazy(() => import('./views/TrainingDevelopment/TDVerification/TnDVerification'))
const TopicQuestionMaster = React.lazy(() => import('./views/TrainingDevelopment/TrainingTopicQuestion/QuestionTopicMainPage'))
const TrainingInductionCalender = React.lazy(() => import('./views/TrainingDevelopment/TrainingCalender/InductionCalenderFormat'))
const OnObservationRequest = React.lazy(() => import('./views/LeaveManagement/OnObservation/OnobservationRequest'))
const DutyplanforIncharge = React.lazy(() => import('./views/Attendance/DutyPlan/InchargeDutyplan'))
const DutyplanReport = React.lazy(() => import('./views/HrReports/DutyplanReport/DutyPlanReport'))
const DeptTrainingCalendar = React.lazy(() => import('./views/TrainingDevelopment/TrainingCalender/DeptTrainingCalendar/DeptTrainingCalendarMain'))
const FeedbackPage = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/FeedbackPage'))
const FeedbackPageWithoutTest = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/FeedbackWithoutTest'))
const OndutyReport = React.lazy(() => import('./views/HrReports/OnDutyReport/OndutyReport'))
const ManualRequest = React.lazy(() => import('./views/LeaveManagement/ManualRquest/ManualRequestMain'))
const CreditedLeaveCount = React.lazy(() => import('./views/HrReports/LeaveCountReport/CreditedLeaveCountReport'))
const ApprovedLeaveCancel = React.lazy(() => import('./views/LeaveManagement/ApprovedleaveCancel/LeaveCancelByHR'))
const OffRequest = React.lazy(() => import('./views/LeaveManagement/OffRequest/OffrequestCombinePage'))
const FullandFinal = React.lazy(() => import('./views/Resignation/EndOfService/EndofProcess'))


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
  { path: '/Home/EmployeeRecord', exact: true, name: 'Employee Records', component: EmployeeRecrd },
  { path: '/Home/EmploymentType', exact: true, name: 'Employment Type', component: EmploymentType },
  { path: '/Home/EmploymentTypeList', exact: true, name: 'Employment Type List', component: EmploymentTypeList },
  { path: '/Home/EmploymentTypeEdit/:id', exact: true, name: 'Employment Type Edit', component: EmploymentTypetable },
  { path: '/Home/ModuleGroupMaster', exact: true, name: 'Module Group Master', component: ModulegroupMaster },
  { path: '/Home/ModuleUserRights', exact: true, name: 'Module User Rights', component: ModuleUserRights },
  { path: '/Home/UserGroup', exact: true, name: 'User Group Master', component: UserGroupMaster },
  { path: '/Home/GroupRights', exact: true, name: 'Group Rights', component: GroupRights },
  { path: '/Home/DoctorType', exact: true, name: 'Doctor Type', component: DoctorType },
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
  { path: '/Home/ApplicationForm/:id/:no/:slno', exact: true, name: 'Application Form', component: ApplicationForm },
  { path: '/Home/PersonalInformation/:id/:no', exact: true, name: 'Personal Information', component: PersonalInformation },
  { path: '/Home/EducationMaster', exact: true, name: 'Education', component: EducationMaster },
  { path: '/Home/CourseMaster', exact: true, name: 'Education', component: CourseMaster },
  { path: '/Home/Specialization', exact: true, name: "Specialization Master", component: SpecializationMaster },
  { path: '/Home/RegistrationType', exact: true, name: "Registration Type", component: RegistrationType },
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
  { path: '/Home/DesignationMastTableEdit/:id', exact: true, name: 'Designation master Table Edit', component: DesignationMastTableEdit },
  { path: '/Home/DesignationTypeedit/:id', exact: true, name: 'Branch Master Table Edit', component: DesignationTypeedit },
  { path: '/Home/EmpAllowanceTableEdit/:slno/:id/:no', exact: true, name: 'Employee Allowance Table Edit ', component: EmpAllowanceTableEdit },
  { path: '/Home/ShiftMaster', exact: true, name: 'ShiftMaster', component: ShiftMaster },
  { path: '/Home/ShiftMasterEdit/:id', exact: true, name: 'Shift Master Edit', component: ShiftMasterEdit },
  { path: '/Home/FineAndDeductionTableEdit/:slno/:id/:no', exact: true, name: 'Fine Deduction Table Edit', component: FineDeductionTableEdit },
  { path: '/Home/AllowanceDeduction', exact: true, name: 'Allowance Deducation', component: AllowanceDeducation },
  { path: '/Home/Dutyplan', exact: true, name: 'Duty Planning', component: Dutyplan },
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
  { path: '/Home/DueClearence', exact: true, name: 'Due Clearence', component: DueClearence },
  { path: '/Home/OTApprovalCEO', exact: true, name: 'OT Approval CEO', component: OTApprovalCEO },
  { path: '/Home/OTWageMaster', exact: true, name: 'OT Wage Master', component: OTWageMaster },
  { path: '/Home/ApprovalCEO', exact: true, name: 'Approval CEO', component: ApprovalCEO },
  { path: '/Home/CommonSettings', exact: true, name: 'Common Settings', component: CommonSettings },
  { path: '/Home/DueClearenceHR', exact: true, name: 'DueClearence HR', component: DueClearenceHR },
  { path: '/Home/DueClearenceMaster', exact: true, name: 'Due Clearence Master', component: DueClearenceMaster },
  { path: '/Home/EmployeeReport', exact: true, name: 'Active Employees', component: EmployeeReport },
  { path: '/Home/EmployeeReportInactive', exact: true, name: 'Employee Report Inactive', component: EmployeeReportInactive },
  { path: '/Home/CarryForwardSetting', exact: true, name: 'Carry Forward Leave Setting', component: CarryforwardLeaveSetting },//Leave carryforward
  { path: '/Home/AttendanceMarking', exact: true, name: 'Attendance Marking', component: AttendanceMarking },
  { path: '/Home/LeaveCarryForwad', exact: true, name: 'Leave Carry Forwad', component: LeaveCarryForwad },
  { path: '/Home/Hrm_Alert', exact: true, name: 'Hrm Alert', component: Hrm_Alert },
  { path: '/Home/Hrm_message', exact: true, name: 'Hrm message', component: Hrm_message },
  { path: '/Home/Contract_end_details', exact: true, name: 'Contract End Details', component: Contract_end_details },
  { path: '/Home/NightOffRequest', exact: true, name: 'Night Off Request', component: NightOffRequest },
  { path: '/Home/AnnualLeaveProcess', exact: true, name: 'Annual Leave Process', component: AnnualLeaveProcess },
  { path: '/Home/OtUser', exact: true, name: 'OT User View', component: OtUser },
  { path: '/Home/Hrm_Announcement', exact: true, name: 'Hrm Announcement', component: Hrm_Announcement },
  { path: '/Home/LeaveUser', exact: true, name: 'Leave User View', component: LeaveUser },
  { path: '/Home/Autocompletetest', exact: true, name: 'Autocomplete test', component: Autocompletetest },
  { path: '/Home/ProTax', exact: true, name: 'Proffessional Tax master', component: proTax },
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
  //training
  { path: '/Home/TrainingType', exact: true, name: 'Training Type Master', component: TrainingType },
  { path: '/Home/TrainingCategory', exact: true, name: 'Training Category Master', component: TrainingCategory },
  { path: '/Home/TrainingName', exact: true, name: 'Training Name Master', component: TrainingName },
  { path: '/Home/TrainerName', exact: true, name: 'Trainer Name Master', component: TrainerName },
  { path: '/Home/TrainingTopic', exact: true, name: 'Training Topic Master', component: TrainingTopic },
  { path: '/Home/TrainingQuestions', exact: true, name: 'Training Questions Master', component: TrainingQuestions },
  { path: '/Home/SchedulingTime', exact: true, name: 'Scheduling Time Master', component: SchedulingTime },
  { path: '/Home/TrainingSchedule', exact: true, name: 'Training Schedule Master', component: TrainingSchedule },
  { path: '/Home/DepartmentalTrainingSchedule', exact: true, name: 'Departmental Training Schedule', component: DepartmentalTrainingSchedule },
  { path: '/Home/TrainingProcess', exact: true, name: 'Training Process', component: TrainingProcess },
  { path: '/Home/TrainingEmployeeSchedule', exact: true, name: 'Training Employee Schedule', component: TrainingEmployeeSchedule },
  { path: '/Home/AfterJoiningTraining', exact: true, name: 'After Joining Training', component: AfterJoiningTraining },
  { path: '/Home/DepartmentalCalenders', exact: true, name: 'Departmental Calender', component: DepartmentalCalenders },
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
  { path: '/Home/EmployeeActiveHR', exact: true, name: 'Employee Active HR', component: EmployeeActiveHR },
  { path: '/OnlinePreTest/:id/:emId/:tslno/:qcount', exact: true, name: 'Online Pre Test', component: OnlinePreTest },
  { path: '/OnlineTraining/:id/:emId', exact: true, name: 'Online Training', component: QROnlineTraining },
  { path: '/OnlinePostTest/:id/:emId/:tslno/:qcount', exact: true, name: 'Online Post Test', component: OnlinePostTest },
  { path: '/Home/OnlineTraining', exact: true, name: 'Online Training', component: OnlineTraining },
  { path: '/Home/EmpDashboardPage', exact: true, name: 'Employee Dashboard', component: EmployeeDashboard },
  { path: '/OnlineReTest/:slno/:emId/:tslno/:qcount', exact: true, name: 'Online Retest', component: OnlineRetest },
  { path: '/Home/DepartmentalTrainingReport', exact: true, name: 'Departmental Training Report', component: DepartmentalTrainingReport },
  { path: '/Home/DepartmentalCalender', exact: true, name: 'Monthly Report', component: DepartmentalCalender },
  { path: '/Home/DepartmentalTrainingReportDetails', exact: true, name: 'Departmental Training Report Details', component: DepartmentalTrainingReportDetails },
  { path: '/Home/LeaveReports', exact: true, name: 'Leave Reports', component: LeaveReports },
  { path: '/Home/TrainingAllotedEmpReport', exact: true, name: 'Departmental Training Alloted Emp Reports', component: TrainingAllotedEmpReport },
  { path: '/Home/TrainingCompletionEmpReport', exact: true, name: 'Departmental Training Completion Employee Reports', component: TrainingCompletionEmpReport },
  { path: '/Home/TrainingPendingReport', exact: true, name: 'Departmental Training Pending Employee Reports', component: TrainingPendingReport },
  { path: '/Home/TrainingRetestEmpReport', exact: true, name: 'Departmental Training Retest Employee Reports', component: TrainingRetestEmpReport },
  { path: '/Home/CommonPreTestPage', exact: true, name: 'Common PreTest', component: CommonPreTestPage },
  { path: '/PreLogInpage/:topic_slno/:slno', exact: true, name: 'PreTest LogIn', component: PreLogInpage },
  { path: '/Home/CommonPostTestPage', exact: true, name: 'Common PostTest', component: CommonPostTestPage },
  { path: '/RetestEmpDetails/:emId/:tslno', exact: true, name: 'Retest Emp Detailst', component: RetestEmpDetails },
  { path: '/Home/InductionTraining', exact: true, name: 'Induction Training', component: InductionTraining },
  { path: '/Home/SalaryReport', exact: true, name: 'Salery Report', component: SalaryReport },
  //Induction Training
  { path: '/Home/InductionCalender', exact: true, name: 'Induction Calender', component: InductionCalender },
  { path: '/Home/InductionTest', exact: true, name: 'Induction Test', component: InductionTest },
  //Induction Process
  { path: '/Home/InductionProcess', exact: true, name: 'Induction Process', component: InductionProcess },
  { path: '/InductLogInpage/:topic_slno/:slno', exact: true, name: 'Induction LogIn', component: InductLogInpage },
  { path: '/InductionPreTest/:id/:emId/:tslno/:qcount', exact: true, name: 'induction PreTest', component: InductionPreTest },
  { path: '/InductionPostTest/:id/:emId/:tslno/:qcount', exact: true, name: 'Induction Post Test', component: InductionPostTest },
  { path: '/OnlineInductReTest/:slno/:emId/:tslno/:qcount', exact: true, name: 'Online Induction Retest', component: OnlineInductReTest },
  { path: '/InductQREmpDetails/:emId/:tslno', exact: true, name: 'InductQREmpDetails', component: InductQREmpDetails },
  { path: '/Home/OnlineTrainings', exact: true, name: 'Online Training', component: OnlineTrainings },
  { path: '/InductOnlineTraining/:id/:emId', exact: true, name: 'ORInduction Training', component: ORInductionTraining },
  { path: '/Home/InductionCalenderReport', exact: true, name: 'Induction Calender Report', component: InductionCalenderReport },
  //TrainingDetails
  { path: '/Home/TrainingDetails', exact: true, name: 'Induction Calender Report', component: TrainingDetails },
  { path: '/Home/TrainerApprovals', exact: true, name: 'TrainerApprovals', component: TrainerApprovals },
  { path: '/Home/HODApprovals', exact: true, name: 'HOD Approvals', component: HODApprovals },
  { path: '/Home/SalaryReport', exact: true, name: 'Retest Emp Detailst', component: SalaryReport },
  { path: '/Home/EmpPunchReport', exact: true, name: 'Employee Wise Punch Report', component: EmpPunchReport },
  { path: '/Home/EmpPreviouspunchreport', exact: true, name: 'Previous Month Punch Data', component: EmpPreviouspunchreport },
  { path: '/Home/EmpSaleryReport', exact: true, name: 'EmpSaleryReport', component: EmpSaleryReport },
  { path: '/Home/EmpRightBasedLogin', exact: true, name: 'EmpRightBasedLogin', component: EmpRightBasedLogin },
  { path: '/Home/TNDdashboardViewPage', exact: true, name: 'TNDdashboardViewPage', component: TNDdashboardViewPage },
  { path: '/Home/SalaryProcess', exact: true, name: 'Salary Process', component: SalaryProcessReports },
  { path: '/Home/CompensatoryRequest', exact: true, name: 'Compensatory Off Request', component: CompensatoryRequest },
  { path: '/Home/AttendenceReports', exact: true, name: 'Attendence Reports', component: AttendenceReports },
  { path: '/Home/DayWiseAttendence', exact: true, name: 'Day Wise Attendence Reports', component: DayWiseAttendenceReports },
  { path: '/Home/TDVerification', exact: true, name: 'T and D Verification', component: TDVerification },
  { path: '/Home/TopicQuestionMaster', exact: true, name: 'Topic Question Master', component: TopicQuestionMaster },
  { path: '/Home/TrainingInductionCalender', exact: true, name: 'Training Induction Calender', component: TrainingInductionCalender },
  { path: '/Home/OnObservationRequest', exact: true, name: 'On Observation Request', component: OnObservationRequest },
  { path: '/Home/DutyplanforIncharge', exact: true, name: 'Dutyplan for Incharge', component: DutyplanforIncharge },
  { path: '/Home/DutyplanReport', exact: true, name: 'Dutyplan Report', component: DutyplanReport },
  { path: '/Home/DeptTrainingCalendar', exact: true, name: 'Departmental Training Calendar', component: DeptTrainingCalendar },
  { path: '/FeedbackPage/:topic_no/:schedule_no/:EmId', exact: true, name: 'Feedback Page', component: FeedbackPage },
  { path: '/FeedbackPageWithoutTest/:topic_no/:schedule_no/:EmId', exact: true, name: 'Feedback Page Without Test', component: FeedbackPageWithoutTest },
  { path: '/Home/OndutyReport', exact: true, name: 'On Duty Report', component: OndutyReport },
  { path: '/Home/ManualRequest', exact: true, name: 'Manual Request', component: ManualRequest },
  { path: '/Home/CreditedLeaveCount', exact: true, name: 'Credited Leave Count Report', component: CreditedLeaveCount },
  { path: '/Home/ApprovedLeaveCancel', exact: true, name: 'Approved Leave Cancel By HR', component: ApprovedLeaveCancel },
  { path: '/Home/DoffRequest', exact: true, name: 'DOFF Request', component: OffRequest },
  { path: '/Home/FullandFinal/:id', exact: true, name: 'Full and Final Settlement', component: FullandFinal },

]

export default routes
