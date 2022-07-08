import React, { Fragment, useContext, useState, useEffect } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import ReligionSelect from './ReligionSelect '

const ReligionReport = () => {
    const history = useHistory()

    const [rel, setReligion] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [data, setData] = useState(0)

    const RedirectToProfilePage = async () => {
        history.push(`/Home/Reports`)
    }

    const handleChange = async (e) => {
        setReligion(e)
    }

    //selected religion employees
    const getEmployeeReligion = async () => {
        const getEmployeeReligion = async () => {

            const result = await axioslogin.get(`/reports/religion/byid/${rel}`)
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
        getEmployeeReligion()
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Employee Religion Report"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-2">
                            <ReligionSelect style={SELECT_CMP_STYLE} onChange={handleChange} />
                        </div>
                        <div className="col-md-1 ">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={getEmployeeReligion}
                                sx={{ color: "#37575f" }}
                            >
                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                            </IconButton>
                        </div>
                    </div>
                    <div className="col-md-12">
                        {/* {
                            data === 1 ? <EmployeeRegionTable
                                tableData={tableData}
                            /> : null
                        } */}
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default ReligionReport