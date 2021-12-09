import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory, useParams } from 'react-router';

const WagesInfoTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();
    const { id, no } = useParams()

    // table
    const title = [
        {
            title: "SlNo", field: "ernded_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Wage Description", field: "earnded_name", cellStyle: { minWidth: 100, maxWidth: 150 }
        },
        {
            title: "Wage Type", field: "earning_type_name", cellStyle: { minWidth: 180, maxWidth: 250 }
        },
        {
            title: "Amount", field: 'em_amount', cellStyle: { minWidth: 250, maxWidth: 260 }
        },

    ]
    //Get Data
    useEffect(() => {
        const getCourse = async () => {
            const result = await axioslogin.get(`/empearndeduction/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            }
            else if (success === 0) {
                infoNofity("No Allowance is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getCourse();
    }, [update]);

    //For Edit
    const getDataTable = (data) => {
        const { ernded_slno } = data
        history.push(`/Home/EmpAllowanceTableEdit/${ernded_slno}/${id}/${no}`)
    }


    return (
        <Fragment>
            <MaterialTable
                title="Earning-Deduction"
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

export default memo(WagesInfoTable)
