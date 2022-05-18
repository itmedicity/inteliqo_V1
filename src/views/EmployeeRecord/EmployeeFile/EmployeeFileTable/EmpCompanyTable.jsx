import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useParams } from 'react-router';

const EmpCompanyTable = ({ update }) => {
    const [data, setTableData] = useState();
    const { id } = useParams()

    //Table
    const title = [
        {
            title: "Update Date", field: "update_date", cellStyle: { minWidth: 1, maxWidth: 2 }, defaultSort: "desc"
        },
        {
            title: "Category", field: "ecat_name", cellStyle: { minWidth: 250, maxWidth: 400 }
        },
        {
            title: "Update User", field: "edit_user", cellStyle: { minWidth: 250, maxWidth: 400 }
        },
    ]

    //Get Data
    useEffect(() => {
        const getQualification = async () => {
            const result = await axioslogin.get(`/common/getcompanylog/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No update is done against this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getQualification();
    }, [id, update]);


    return (
        <Fragment>
            <MaterialTable
                title="Company Information Update Details"
                data={data}
                columns={title}
                icons={tableIcons}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0,

                }}
            />
        </Fragment>
    )
}

export default memo(EmpCompanyTable)
