import React from 'react'

const HomePage = React.lazy(() => import('./views/Home/Home'))
const ManpowerRequest = React.lazy(() => import('./views/recruitment/manpowerRequest/ManpowerRequest'));
const Vacancy = React.lazy(() => import('./views/recruitment/VacancyAnounce/Vacancy'));
const Settings = React.lazy(() => import('./Menus/Settings'));
const Departmentmaster = React.lazy(() => import('./views/Master/Departmentmaster'));
const DepatmentEdit = React.lazy(() => import('./views/Master/DepartmentMaster/DeptEdit'));
const DepartmentSectionMast = React.lazy(() => import('./views/Master/DepartmentSection/DepartmentSectionMast'));
const DepartmentSectionEdit = React.lazy(() => import('./views/Master/DepartmentSection/DepartmentSecEdit'));
const EmployeeTypeMast = React.lazy(() => import('./views/Master/EmployeeType/EmployeeTypeMast'));
const DesignatoionType = React.lazy(() => import('./views/Master/DesignationType/DesignationTypeMast'));
const Designation = React.lazy(() => import('./views/Master/Designation/DesignationMast'));
const Qualification = React.lazy(() => import('./views/Master/Qualification/QualificationMast'));
const Empdesignationtype = React.lazy(() => import('./views/Master/EmpDesignationType/EmpDesignationtype'))
const BranchMast = React.lazy(() => import('./views/Master/BranchMaster/BranchMast'))
const BankMaster = React.lazy(() => import('./views/Master/BankMaster/BankMaster'));
const RegionMaster = React.lazy(() => import('./views/Master/Region/RegionMast'));
const EmployeeRecrd = React.lazy(() => import('./views/EmployeeRecord/EmployeeRegister/EmployeeRecord'));
const EmployeeFile = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFile'));
const EmploymentType = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypeMast'));
const EmploymentTypeList = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypetable'));
const EmploymentTypetable = React.lazy(() => import('./views/Master/EmploymentType/EmploymentTypeEdit'));
const ModulegroupMaster = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMast'))
const ModulegroupMasterEdit = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMastEdit'))
const ModuleUserRights = React.lazy(() => import('./views/Master/ModuleUserRights/MdleUserRightMast'))
const ModuleUserRightsEdit = React.lazy(() => import('./views/Master/ModuleUserRights/ModuleUserRightEdit'))
const UserGroupMaster = React.lazy(() => import('./views/Master/GroupMaster/Groupmaster'))
const UserGroupMasterEdit = React.lazy(() => import('./views/Master/GroupMaster/GroupmasterEdit'))
const GroupRights = React.lazy(() => import('./views/Master/GroupRights/GrouprightsMast'))
const EmployeeProfile = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeProfile'))
const Grade = React.lazy(() => import('./views/Master/GradeMaster/GradeMaster'))
const GradeEdit = React.lazy(() => import('./views/Master/GradeMaster/GradeMastEdit'))
const EarnType = React.lazy(() => import('./views/Master/EarnTypeMaster/EarntypeMast'))
const EarnDeduction = React.lazy(() => import('./views/Master/EarningDeductionMaster/EarnDectmast'))
const EarnDectEdit = React.lazy(() => import('./views/Master/EarningDeductionMaster/EarnDectEdit'))
const ReligionMaster = React.lazy(() => import('./views/Master/ReligionMaster/ReligionMast'))
const ReligionMastEdit = React.lazy(() => import('./views/Master/ReligionMaster/ReligionMastEdit'))
const LeaveTypeMaster = React.lazy(() => import('./views/Master/LeaveTypeMaster/LeaveTypeMast'))
const LeaveTypeMastEdit = React.lazy(() => import('./views/Master/LeaveTypeMaster/LeaveTypeMastEdit'))
const YearlyLeaveCount = React.lazy(() => import('./views/Master/YearlyLeaveCount/YearlyLeaveCountMast'))
const YearlyLeaveCountMastEdit = React.lazy(() => import('./views/Master/YearlyLeaveCount/YearlyLeaveCountMastEdit'))
const YearlyLeaveCalendar = React.lazy(() => import('./views/Master/YearlyLeaveCalendar/YearlyLeaveCalendarMast'))
const YearlyLeaveCalendarEdit = React.lazy(() => import('./views/Master/YearlyLeaveCalendar/YearlyLeaveCalendarEdit'))
const ApplicationForm = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/ApplicationForm'))
const PersonalInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/PersonalInformation'))
const DoctorType = React.lazy(() => import('./views/Master/DoctorType/DoctorMaster'))
const DoctorMastEdit = React.lazy(() => import('./views/Master/DoctorType/DoctorMastEdit'))
const Nation = React.lazy(() => import('./views/CommonCode/NationSlnoSelection'))
const State = React.lazy(() => import('./views/Master/State/StateMaster'))
const StateMastEdit = React.lazy(() => import('./views/Master/State/StateMastEdit'))
const StateSelection = React.lazy(() => import('./views/CommonCode/StateSelect'))
const District = React.lazy(() => import('./views/Master/District/DistrictMaster'))
const DistrictMastEdit = React.lazy(() => import('./views/Master/District/DistrictMastEdit'))
const University = React.lazy(() => import('./views/Master/University/UniversityMast'));
const EducationMaster = React.lazy(() => import('./views/Master/EducationMaster/EducationMaster'))
const EducationTableEdit = React.lazy(() => import('./views/Master/EducationMaster/EducationTableEdit'))
const CourseMaster = React.lazy(() => import('./views/Master/CourseMaster/CourseMaster'))
const CourseTableEdit = React.lazy(() => import('./views/Master/CourseMaster/CourseMastTableEdit'))
const UniversityTableEdit = React.lazy(() => import('./views/Master/University/UniversityMastEdit'))
const SpecializationMaster = React.lazy(() => import('./views/Master/Specialization/SpecializationMaster'))
const SpecializationTableEdit = React.lazy(() => import('./views/Master/Specialization/SpecializationTableEdit'))
const RegistrationType = React.lazy(() => import('./views/Master/RegistrationType/RegistrationMaster'))
const RegistrationTableEdit = React.lazy(() => import('./views/Master/RegistrationType/RegistrationTableEdit'))
const EmployeeQualification = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeQualification'))
const EmpQualificationEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/QualificationTableEdit'))
const EmployeeExperience = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeExperience'))
const EmployeeExperienceEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeFileEdit/EmployeeExperienceEdit'))
const StatutoryInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/StatutoryInformation'))
const ContractInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/ContractInformation'))
const EmployeeCompany = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeCompany'))
const SalaryInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/SalaryInformation'))
const EmployeeAllowance = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeAllowance'))
const AnnualLeaveSettings = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/AnnualLeaveSettings'))
const EmployeeTraining = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeTraining'))
const SalaryIncrement = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/SalaryIncrement'))
const EmployeeDocumentChecklist = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeDocumentChecklist'))
const VaccinationInformation = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/VaccinationInformation'))
const FineorDeduction = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/FineorDeduction'))
const EmployeeEndofService = React.lazy(() => import('./views/EmployeeRecord/EmployeeFile/EmployeeEndofService'))
const EmployeeRecordEdit = React.lazy(() => import('./views/EmployeeRecord/EmployeeRegister/EmployeeRecordEdit'))
const QualificationMastTableEdit = React.lazy(() => import('./views/Master/Qualification/QualificationMastTableEdit'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: HomePage },
  { path: '/Home/ManpowerRequest', exact: true, name: 'Manpower Request', component: ManpowerRequest },
  { path: '/Home/Vacancy', exact: true, name: 'Vacancy', component: Vacancy },
  { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings },
  { path: '/Home/DepartmentMaster', exact: true, name: 'DeptMasrter', component: Departmentmaster },
  { path: '/Home/EditDepartment/:id', exact: true, name: 'EditDepartment', component: DepatmentEdit },
  { path: '/Home/DeptSection', exact: true, name: 'Department Section', component: DepartmentSectionMast },
  { path: '/Home/SectionEdit/:id', exact: true, name: 'Department Section Edit', component: DepartmentSectionEdit },
  { path: '/Home/EmployeeType', exact: true, name: 'Employee Type', component: EmployeeTypeMast },
  { path: '/Home/DesignationType', exact: true, name: 'Designation Type', component: DesignatoionType },
  { path: '/Home/Designation', exact: true, name: 'Designation', component: Designation },
  { path: '/Home/Qualification', exact: true, name: 'Qualification', component: Qualification },
  { path: '/Home/University', exact: true, name: 'University', component: University },
  { path: '/Home/EmpDesignationType', exact: true, name: 'Empdesignationtype', component: Empdesignationtype },
  { path: '/Home/Branch', exact: true, name: 'Branch Master', component: BranchMast },
  { path: '/Home/Bank', exact: true, name: 'Bank Master', component: BankMaster },
  { path: '/Home/Region', exact: true, name: 'Region Master', component: RegionMaster },
  { path: '/Home/EmployeeRecord', exact: true, name: 'Employee Records', component: EmployeeRecrd },
  { path: '/Home/EmployeeFile', exact: true, name: 'Employee File', component: EmployeeFile },
  { path: '/Home/EmploymentType', exact: true, name: 'Employment Type', component: EmploymentType },
  { path: '/Home/EmploymentTypeList', exact: true, name: 'Employment Type List', component: EmploymentTypeList },
  { path: '/Home/EmploymentTypeEdit/:id', exact: true, name: 'Employment Type Edit', component: EmploymentTypetable },
  { path: '/Home/ModuleGroupMaster', exact: true, name: 'Module Group Master', component: ModulegroupMaster },
  { path: '/Home/MdulGrpMastEdit/:id', exact: true, name: 'Module Group Master Edit', component: ModulegroupMasterEdit },
  { path: '/Home/ModuleUserRights', exact: true, name: 'Module User Rights', component: ModuleUserRights },
  { path: '/Home/ModuleUserRightEdit/:id', exact: true, name: 'Module User Rights Master Edit', component: ModuleUserRightsEdit },
  { path: '/Home/UserGroup', exact: true, name: 'User Group Master', component: UserGroupMaster },
  { path: '/Home/UserGroupEdit/:id', exact: true, name: 'User Group Master Edit', component: UserGroupMasterEdit },
  { path: '/Home/GroupRights', exact: true, name: 'Group Rights', component: GroupRights },
  { path: '/Home/DoctorType', exact: true, name: 'Doctor Type', component: DoctorType },
  { path: '/Home/DoctorMastEdit/:id', exact: true, name: 'Doctor Type Master Edit', component: DoctorMastEdit },
  { path: '/Home/CommonCode', exact: true, name: 'Nation', component: Nation },
  { path: '/Home/State', exact: true, name: 'State', component: State },
  { path: '/Home/StateMastEdit/:id', exact: true, name: 'State Master Edit', component: StateMastEdit },
  { path: '/Home/StateSelection', exact: true, name: 'State select', component: StateSelection },
  { path: '/Home/District', exact: true, name: 'District', component: District },
  { path: '/Home/DistrictMastEdit/:id', exact: true, name: 'District Master Edit', component: DistrictMastEdit },
  { path: '/Home/Profile/:id/:no', exact: true, name: 'Employee Profile ', component: EmployeeProfile },
  { path: '/Home/Grade', exact: true, name: 'Grade', component: Grade },
  { path: '/Home/GradeTableEdit/:id', exact: true, name: 'GradeEdit', component: GradeEdit },
  { path: '/Home/EarnType', exact: true, name: 'EarnType', component: EarnType },
  { path: '/Home/EarnDeduct', exact: true, name: 'EarnDeduction', component: EarnDeduction },
  { path: '/Home/EarnDectEdit/:id', exact: true, name: 'EarnDectEdit', component: EarnDectEdit },
  { path: '/Home/ReligionMaster', exact: true, name: 'Religion Master', component: ReligionMaster },
  { path: '/Home/ReligionMastEdit/:id', exact: true, name: 'Religion Edit', component: ReligionMastEdit },
  { path: '/Home/LeaveTypeMaster', exact: true, name: 'Leave Type', component: LeaveTypeMaster },
  { path: '/Home/LeaveTypeMastEdit/:id', exact: true, name: 'Leave Type Edit', component: LeaveTypeMastEdit },
  { path: '/Home/YearlyLeaveCount', exact: true, name: 'Yearly Leave Count', component: YearlyLeaveCount },
  { path: '/Home/YearlyLeaveCountMastEdit/:id', exact: true, name: 'Leave Count Edit', component: YearlyLeaveCountMastEdit },
  { path: '/Home/YearlyLeaveCalendar', exact: true, name: 'Yearly Leave Calendar', component: YearlyLeaveCalendar },
  { path: '/Home/YearlyLeaveCalendarEdit/:id', exact: true, name: 'Yearly Leave Calendar Edit', component: YearlyLeaveCalendarEdit },
  { path: '/Home/ApplicationForm/:id', exact: true, name: 'Application Form', component: ApplicationForm },
  { path: '/Home/PersonalInformation/:id', exact: true, name: 'Personal Information', component: PersonalInformation },
  { path: '/Home/EmployeeExperience/:id/:no', exact: true, name: 'Experience', component: EmployeeExperience },
  { path: '/Home/EmployeeExperienceEdit/:id/:no', exact: true, name: 'Experience Edit', component: EmployeeExperienceEdit },
  { path: '/Home/EarnDectEdit/:id', exact: true, name: 'EarnDectEdit', component: EarnDectEdit },
  { path: '/Home/EducationMaster', exact: true, name: 'Education', component: EducationMaster },
  { path: '/Home/EducationTableEdit/:id', exact: true, name: 'Education Table Edit', component: EducationTableEdit },
  { path: '/Home/CourseMaster', exact: true, name: 'Education', component: CourseMaster },
  { path: '/Home/CourseMastTableEdit/:id', exact: true, name: 'Course Table Edit', component: CourseTableEdit },
  { path: '/Home/UniversityMastEdit/:id', exact: true, name: 'University Table Edit', component: UniversityTableEdit },
  { path: '/Home/Specialization', exact: true, name: "Specialization Master", component: SpecializationMaster },
  { path: '/Home/SpecializationTableEdit/:id', exact: true, name: "Specialization Table Edit", component: SpecializationTableEdit },
  { path: '/Home/RegistrationType', exact: true, name: "Registration Type", component: RegistrationType },
  { path: '/Home/QualificationTableEdit/:id/:no', exact: true, name: "Emp Qualification Table Edit", component: EmpQualificationEdit },
  { path: '/Home/RegistrationTableEdit/:id', exact: true, name: "Registration table Edit", component: RegistrationTableEdit },
  { path: '/Home/EmployeeQualification/:id/:no', exact: true, name: 'Qualification', component: EmployeeQualification },
  { path: '/Home/RegistrationTableEdit/:id', exact: true, name: "Registration table Edit", component: RegistrationTableEdit },
  { path: '/Home/EmployeeExperience/:id', exact: true, name: 'Experience', component: EmployeeExperience },
  { path: '/Home/StatutoryInformation/:id/:no', exact: true, name: 'Statutory information', component: StatutoryInformation },
  { path: '/Home/ContractInformation/:id/:no', exact: true, name: 'Contract Information', component: ContractInformation },
  { path: '/Home/EmployeeCompany/:id', exact: true, name: 'Employee Company', component: EmployeeCompany },
  { path: '/Home/SalaryInformation/:id', exact: true, name: 'Salary Information', component: SalaryInformation },
  { path: '/Home/EmployeeAllowance/:id', exact: true, name: 'Employee Allowance', component: EmployeeAllowance },
  { path: '/Home/AnnualLeaveSettings/:id', exact: true, name: 'Annual Leave Settings', component: AnnualLeaveSettings },
  { path: '/Home/EmployeeTraining/:id', exact: true, name: 'Employee Training', component: EmployeeTraining },
  { path: '/Home/SalaryIncrement/:id', exact: true, name: 'Salary Increment', component: SalaryIncrement },
  { path: '/Home/EmployeeDocumentChecklist/:id', exact: true, name: 'Employee Document Checklist', component: EmployeeDocumentChecklist },
  { path: '/Home/VaccinationInformation/:id', exact: true, name: 'Vaccination Information', component: VaccinationInformation },
  { path: '/Home/FineorDeduction/:id', exact: true, name: 'Fine or Other Deduction', component: FineorDeduction },
  { path: '/Home/EmployeeEndofService/:id', exact: true, name: 'End of service', component: EmployeeEndofService },
  { path: '/Home/EmployeeRecordEdit/:id', exact: true, name: 'End of service', component: EmployeeRecordEdit },
  { path: '/Home/QualificationMastTableEdit/:id', exact: true, name: 'Qualification  Table Edit', component: QualificationMastTableEdit },

]


// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/Home/TestOne', name: 'Test Component', component: TestComponent },
//   { path: '/Home/Test', name: 'Test Component', component: TestTwo },
//   { path: '/Home/Settings', name: 'Settings', component: Settings },
// ]

export default routes
