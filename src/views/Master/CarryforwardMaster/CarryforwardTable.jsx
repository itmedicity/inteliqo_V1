import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const CarryforwardTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();
    //Table
    const title = [
        {
            title: "SlNo", field: "carry_slno"
        },
        {
            title: "Department Section", field: "sect_name", cellStyle: { minWidth: 50, maxWidth: 400 }
        },
        {
            title: "Emp Type", field: "emptype_name"
        },
        {
            title: "NH", field: "carry_hl"
        },
        {
            title: "CL", field: "carry_cl"
        },
        {
            title: "EL", field: "carry_el"
        },
        {
            title: "SL", field: "carry_sl"
        },
    ]
    //GetData
    useEffect(() => {
        const getCarryForward = async () => {
            const result = await axioslogin.get('/carryforward')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getCarryForward();
    }, [update]);

    //For Editing
    const getDataTable = (data) => {
        const { carry_slno } = data
        history.push(`/Home/CarryforwardEdit/${carry_slno}`)
    }


    return (
        <Fragment>
            <MaterialTable
                title="Carry Forward Leave Setting"
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

export default memo(CarryforwardTable)