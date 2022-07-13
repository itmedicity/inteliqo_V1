import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory, useParams } from 'react-router';
import { DeleteForever, DeleteOutlineOutlined } from '@material-ui/icons';

const QualificationTable = ({ update, setcount }) => {
    const history = useHistory();
    const [data, setTableData] = useState();
    const { id, no } = useParams()

    //Table
    const title = [
        {
            title: "SlNo", field: "emqual_slno"
        },
        {
            title: "Education", field: 'edu_desc'
        },
        {
            title: "Course", field: "cour_desc"
        },
        {
            title: "Specialization", field: "spec_desc"
        },
    ]

    //Get Data
    useEffect(() => {
        const getQualification = async () => {
            const result = await axioslogin.get(`/qualify/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No Qualification is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getQualification();
    }, [id, update]);

    //For Edit
    const getDataTable = (data) => {
        const { emqual_slno } = data
        history.push(`/Home/QualificationTableEdit/${emqual_slno}/${id}/${no}`)
    }
    const InactiveData = async (data) => {
        const result = await axioslogin.delete(`/qualify/${data.emqual_slno}`)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setcount(update + 1)
        }
        else {
            errorNofity("Error Occured!!!Please Contact EDP")
        }

    }

    return (
        <Fragment>
            <MaterialTable
                title="Qualification"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getDataTable(data)
                    },
                    {
                        icon: () => <DeleteOutlineOutlined />,
                        tooltip: "Click here to Delete",
                        onClick: (e, data) => InactiveData(data)
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
