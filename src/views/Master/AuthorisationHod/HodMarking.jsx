import { Checkbox, FormControlLabel, IconButton } from '@mui/material'
import MaterialTable from 'material-table'
import React from 'react'
import { FcPlus } from 'react-icons/fc'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'

const HodMarking = () => {
    const title = [
        {
            title: '#', field: 'bank_slno'
        },
        {
            title: 'Department Section', field: 'bank_name'
        },
        {
            title: 'HOD', field: 'bank_ifsc'
        },
        {
            title: 'Department', field: 'status'
        },
        {
            title: 'Incharge', field: 'status'
        },
    ]

    return (
        <div>
            <SessionCheck />
            <ToastContainer />
            <PageLayoutProcess heading="Department HOD and Incharge Assign" >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-3">
                            <TestSelectComponent select="Department Section Name" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-1 text-center">
                            <FormControlLabel
                                className="pb-0 mb-0"
                                control={
                                    <Checkbox
                                        name="board_status"
                                        color="primary"
                                        // value={board_status}
                                        checked={true}
                                        className="py-0 px-3"
                                    // onChange={(e) => updateBoard(e)}
                                    />
                                }
                                label="HOD"
                            />
                        </div>
                        <div className="col-md-2 text-center ">
                            <FormControlLabel
                                className="pb-0 mb-0 noWrap"
                                control={
                                    <Checkbox
                                        name="board_status"
                                        color="primary"
                                        // value={board_status}
                                        checked={true}
                                        className="py-0 pl-3 "
                                    // onChange={(e) => updateBoard(e)}
                                    />
                                }
                                label="Incharge"
                            />
                        </div>
                        <div className="col-md-3">
                            <TestSelectComponent select="Department Name" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <TestSelectComponent select="Employee Name" style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-1 text-center">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                            >
                                <FcPlus className="text-info" size={30} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <MaterialTable
                        title="Department Wise HOD and Incharge"
                        // data={data}
                        columns={title}
                        icons={tableIcons}
                        actions={[
                            {
                                icon: () => <EditOutlinedIcon />,
                                tooltip: "Click here to Edit",
                                onClick: (e, data) => null
                            }
                        ]}
                        options={{
                            paginationType: "stepped",
                            showFirstLastPageButtons: false,
                            padding: "dense",
                            actionsColumnIndex: -1
                        }}
                    />
                </div>
            </PageLayoutProcess>
        </div>
    )
}

export default HodMarking
