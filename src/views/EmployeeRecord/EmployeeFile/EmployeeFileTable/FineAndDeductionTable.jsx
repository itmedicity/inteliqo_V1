import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory, useParams } from 'react-router';

const FineAndDeductionTable = ({ update, collected }) => {
    const history = useHistory();
    const [data, setTableData] = useState();
    const { id, no } = useParams()
    const postdata = {
        id: id,
        collected: collected
    }

    //Table
    const title = [
        {
            title: "SlNo", field: "fine_slno", cellStyle: { minWidth: 1, maxWidth: 10 }
        },
        {
            title: "Fine Type", field: "fine_desc", cellStyle: { minWidth: 200, maxWidth: 280 }
        },
        {
            title: "Description", field: "fine_descp", cellStyle: { minWidth: 300, maxWidth: 500 }
        },
        {
            title: "Amount", field: "fine_amount", cellStyle: { minWidth: 150, maxWidth: 200 }
        },

        {
            title: "Remark", field: "fine_remark", cellStyle: { minWidth: 350, maxWidth: 450 }
        },
        {
            title: "Status", field: "fine_status", cellStyle: { minWidth: 50, maxWidth: 200 }
        },
    ]

    //Get Data
    useEffect(() => {
        const getFineDeduction = async () => {
            const result = await axioslogin.post('/empfinededuction/dispaly', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                infoNofity("No Fine/Deduction is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getFineDeduction();
    }, [id, update, collected]);

    //For Edit
    const getDataTable = (data) => {
        const { fine_slno } = data
        history.push(`/Home/FineAndDeductionTableEdit/${fine_slno}/${id}/${no}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Fines And Other Deducation Information"
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
                    //showTitle: false,
                }}
            />
        </Fragment>
    )
}

export default memo(FineAndDeductionTable)
