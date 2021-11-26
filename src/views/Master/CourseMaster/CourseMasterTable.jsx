import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const CourseMasterTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    // table
    const title = [
        {
            title: "SlNo", field: "cour_slno", cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        },
        {
            title: "Course", field: "cour_desc", cellStyle: {
                minWidth: 198,
                maxWidth: 250
            }
        },
        {
            title: "Education", field: 'edu_slno', cellStyle: {
                minWidth: 1,
                maxWidth: 3
            }
        },
        {
            title: "Status", field: "cour_status", cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        },
        {
            title: "User ID", field: "cour_created"
        },
    ]

    //Get Data
    useEffect(() => {
        const getCourse = async () => {
            const result = await axioslogin.get('/course')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getCourse();
    }, [update]);

    //for edit
    const getDataTable = (data) => {
        const { cour_slno } = data
        history.push(`/Home/CourseMastTableEdit/${cour_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Course"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getDataTable(data)
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0
                }}
            />
        </Fragment>
    )
}

export default memo(CourseMasterTable)
