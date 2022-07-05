
import React, { Fragment, useState } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { IconButton } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import DistRegionSelect from './DistRegionSelect '
import EmployeeDistrictSelect from './EmployeeDistrictSelect '

const RegionReport = () => {

    const history = useHistory()

    const [region, setRegion] = useState(0);
    const [district, setDistrict] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [data, setData] = useState(0)

    const RedirectToProfilePage = async () => {
        history.push(`/Home/Reports`)
    }

    const handleChange = async (e) => {
        setDistrict(e)
    }

    const handleChangeReg = async (e) => {
        setRegion(e)
    }

    const postData = {
        region: region,
        district: district
    }

    const getEmployeeDitrict = async () => {
        //to get district wise report only
        if (district !== 0 && region === 0) {
            const result = await axioslogin.get(`/reports/district/byid/${district}`)
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
        //to get district wise region report
        else if (district !== 0 && region !== 0) {
            const result = await axioslogin.post('/reports/distreg/byregion', postData)
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
                heading="Employee Religion Report"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12 ">
                    <div className="row g-1 ">
                        <div className="col-md-2 ">
                            <EmployeeDistrictSelect style={SELECT_CMP_STYLE} onChange={handleChange} />
                        </div>
                        <div className="col-md-2">
                            <DistRegionSelect style={SELECT_CMP_STYLE} onChange={handleChangeReg} district={district} />
                        </div>
                        <div className="col-md-1">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                //onClick={getEmployeeRegion}
                                onClick={getEmployeeDitrict}
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

export default RegionReport