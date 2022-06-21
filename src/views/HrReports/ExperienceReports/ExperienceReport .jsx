import React, { Fragment, useContext, useState, useEffect } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import DeptSectionSelect from './DeptSectionSelect'
import EmployeeExperienceTable from './EmployeeExperienceTable'
import DepartmentSelect from './DepartmentSelect';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import EmpNameSelect from './EmpNameSelect'
import SearchIcon from '@mui/icons-material/Search';


const ExperienceReport = () => {

    const history = useHistory()

    const [dept, setDepartment] = useState(0);
    const [sect, setSection] = useState(0);
    const [name, setName] = useState(0);

    const [tableData, setTableData] = useState([]);
    const [data, setData] = useState(0)

    const RedirectToProfilePage = async () => {
        history.push(`/Home/Reports`)
    }
    const handleChange = async (e) => {
        setDepartment(e)
    }
    const handleChangeSect = async (e) => {
        setSection(e)
    }
    const handleChangeName = async (e) => {
        setName(e)
    }


    const postData = {
        dept_id: dept,
        sect_id: sect

    }

    const postDatas = {
        dept_id: dept,
        sect_id: sect,
        em_name: name
    }

    const getEmployeeDepartment = async () => {
        //selected department employee report
        if (dept !== 0 && sect === 0 && name === 0) {
            const result = await axioslogin.get(`/reports/expemployee/${dept}`)
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
                setData(1)
            }
            else {
                setTableData([])
                setData(1)
            }
        }

        //selected department section wise employee list
        else if (dept !== 0 && sect !== 0 && name === 0) {
            const result = await axioslogin.post('/reports/deptsect', postData)
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
                setData(1)
            }
            else {
                setTableData([])
                setData(1)
            }
        }
        //employee name experience list
        else if (dept !== 0 && sect !== 0 && name !== 0) {
            const result = await axioslogin.post('/reports/sectempname', postDatas)
            const { success, data } = result.data;

            if (success === 1) {
                setTableData(data)
                setData(1)
            }
            else {
                setTableData([])
                setData(1)
            }
        }
        else {
            warningNofity("Please Select Any DIstrict!")
        }

    }

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee Experience Report"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-3">
                            <DepartmentSelect style={SELECT_CMP_STYLE} onChange={handleChange} />
                        </div>
                        <div className="col-md-3">
                            <DeptSectionSelect style={SELECT_CMP_STYLE} onChange={handleChangeSect} dept={dept} />
                        </div>
                        <div className="col-md-3">
                            <EmpNameSelect style={SELECT_CMP_STYLE} onChange={handleChangeName} sect={sect} />
                        </div>
                        <div className="col-md-1">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={getEmployeeDepartment}
                                sx={{ color: "#37575f" }}
                            >
                                <SearchIcon className="text-info" size={30} />
                            </IconButton>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {
                            data === 1 ? <EmployeeExperienceTable
                                tableData={tableData}
                            /> : null
                        }
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default ExperienceReport