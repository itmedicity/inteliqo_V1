import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const BoardMastTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    // table
    const title = [
        {
            title: "SlNo", field: "board_slno", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Board", field: "board_name", cellStyle: { minWidth: 198, maxWidth: 250 }
        },
        {
            title: "Education", field: 'edu_desc', cellStyle: { minWidth: 1, maxWidth: 3 }
        },
        {
            title: "Status", field: "board_status", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Create User", field: "create_user"
        },
    ]

    //Get Data
    useEffect(() => {
        const getBoard = async () => {
            const result = await axioslogin.get('/boardEdu')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getBoard();
    }, [update]);

    //for edit
    const getDataTable = (data) => {
        const { board_slno } = data
        history.push(`/Home/BoardMastEdit/${board_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Board"
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

export default memo(BoardMastTable)
