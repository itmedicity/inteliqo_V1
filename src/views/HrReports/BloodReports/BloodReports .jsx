
import React, { useState } from 'react'
import PageLayoutReports from 'src/views/CommonCode/PageLayoutReports'
import BloodgrpSelect from './BloodgrpSelect'
import BloodgrpTable from './BloodgrpTable'

const BloodReports = () => {

    const [bloodgrp, Setbloodgrp] = useState([]);
    const getDetails = async (e) => {
        console.log(e.target.value);
        Setbloodgrp([...bloodgrp, e.target.value])
    }
    console.log(bloodgrp);
    return (
        <PageLayoutReports
            heading="Employee BloodGroup Report">

            <div className='col-md-12'>
                <div className='row'>
                    <div className='col-md-4'>
                        <h5>Blood Groups</h5>
                        {/* <div className="col-md-1 ">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                //onClick={getEmployeeReligion}
                                sx={{ color: "#37575f" }}
                            >
                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                            </IconButton>
                        </div> */}
                        <div className='card'>
                            <BloodgrpSelect onChange={getDetails} />
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='card'>
                            <BloodgrpTable />
                        </div>
                    </div>
                </div>
            </div>
        </PageLayoutReports>
    )

}

export default BloodReports