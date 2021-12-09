import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory, useParams } from 'react-router';

const QualificationTable = ({ update }) => {
    const history = useHistory();
    const [data, setTableData] = useState();
    const { no } = useParams()

    //Table
    const title = [
        {
            title: "SlNo", field: "emqual_slno",
            cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Education", field: 'edu_desc',
            cellStyle: { minWidth: 250, maxWidth: 400 }
        },
        {
            title: "Course", field: "em_course",
            cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: "Specialization", field: "spec_desc",
            cellStyle: { minWidth: 250, maxWidth: 400 }
        },
    ]

    //Get Data
    useEffect(() => {
        const getQualification = async () => {
            const result = await axioslogin.get('/qualify')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getQualification();
    }, [update]);

    //For Edit
    const getDataTable = (data) => {
        const { emqual_slno } = data
        history.push(`/Home/QualificationTableEdit/${emqual_slno}/${no}`)
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

export default memo(QualificationTable)
