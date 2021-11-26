import React, { Fragment, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import GroupSelection from 'src/views/CommonCode/GroupSelection'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
// import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ModuleNameSelection from 'src/views/CommonCode/ModuleNameSelection'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router'
import MaterialTable from 'material-table'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'

const GrouprightsMast = () => {
    const classess = useStyles()
    const history = useHistory()
    const [tableData, setTableData] = useState([])

    const {
        selectModuleNameList, updateSelectedModuleList,
        selectGroupName, updateGroupNameList
    } = useContext(PayrolMasterContext)


    const title = [
        {
            title: '#', field: 'group_rights_slno'
        },
        {
            title: 'Menu Name', field: 'menu_name'
        },
    ]

    const postData = {
        user_group_slno: selectGroupName,
        module_slno: selectModuleNameList
    }

    const submitGroupRightMast = async (e) => {
        e.preventDefault();
        if (selectModuleNameList === 0 || selectGroupName === 0) {
            infoNofity("Select Group Name & Module Name")
        } else {
            const getModuleMenuList = async () => {
                const result = await axioslogin.post('/grprights', postData)
                // console.log(result)
                const { success, data } = result.data

                if (success === 1) {
                    setTableData(data)
                } else {
                    warningNofity("Menus Not Available")
                }
                // console.log(success, data, message);
            }
            getModuleMenuList()
        }
    }

    useEffect(() => {
        return (
            updateSelectedModuleList(0),
            updateGroupNameList(0)
        )
    }, [updateGroupNameList, updateSelectedModuleList])


    const groupRightUpdateDetl = async (rowdata) => {
        const { group_rights_slno, menu_view } = rowdata
        const postData = {
            group_rights_slno,
            menu_view: menu_view === 0 ? 1 : 0,
            user_group_slno: selectGroupName,
            module_slno: selectModuleNameList
        }
        const result = await axioslogin.patch('/grprights', postData)
        const { success, message, data } = result.data
        if (success === 1) {
            succesNofity(message)
            setTableData(data)
        }
    }

    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Group Rights</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 ">
                            <form className={classess.root} onSubmit={submitGroupRightMast}  >
                                <div className="col-md-12 row">
                                    <div className="col-md-4">
                                        <GroupSelection />
                                    </div>
                                    <div className="col-md-4">
                                        <ModuleNameSelection />
                                    </div>
                                    <div className="col-md-2">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            type="Submit"
                                            className="ml-2 mt-2"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                    <div className="col-md-2">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            className="ml-2 mt-2"
                                            onClick={toSettings}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                                {/* <CheckCircleOutlinedIcon color="secondary" /> */}
                                <div className="col-md-12 mt-2">
                                    <MaterialTable
                                        data={tableData}
                                        columns={title}
                                        icons={tableIcons}
                                        actions={[
                                            row => {
                                                if (row.menu_view === 0) {
                                                    return {
                                                        icon: () => <CheckCircleOutlinedIcon color="disabled" />,
                                                        tooltip: "Click here to Update Rights",
                                                        onClick: (e, data) => groupRightUpdateDetl(data)
                                                    }
                                                } else {
                                                    return {
                                                        icon: () => <CheckCircleOutlinedIcon color="secondary" />,
                                                        tooltip: "Click here to Update Rights",
                                                        onClick: (e, data) => groupRightUpdateDetl(data)
                                                    }
                                                }
                                            }
                                        ]}
                                        options={{
                                            paging: false,
                                            showFirstLastPageButtons: false,
                                            padding: "dense",
                                            actionsColumnIndex: -1,
                                            toolbar: false,
                                            tableLayout: "auto",
                                            // selection: true
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default GrouprightsMast
