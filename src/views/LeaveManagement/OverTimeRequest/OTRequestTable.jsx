import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState, useContext } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { format } from 'date-fns'
import { HiTrash } from "react-icons/hi";

const OTRequestTable = ({ update, setTableData, setrequest, setflag }) => {
    const [data, setData] = useState();
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [count, setCount] = useState(0)

    // table
    const title = [
        {
            title: "SlNo", field: "ot_slno", cellStyle: { minWidth: 100, maxWidth: 250 }
        },
        {
            title: "OT date", field: "ot_days", cellStyle: { minWidth: 10, maxWidth: 300 }
        },
        {
            title: "Requested date", field: "ot_date", cellStyle: { minWidth: 10, maxWidth: 300 }
        },
        {
            title: "Shift Code", field: "shft_code", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "Over time", field: "over_time", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "OT Reson", field: "ot_reson", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "OT Remarks", field: "ot_remarks", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
    ]

    //Get Data
    useEffect(() => {
        const getBoard = async () => {
            const result = await axioslogin.get(`/overtimerequest/${em_id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
            } else if (success === 0) {
                infoNofity("No Over Time requested to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getBoard();
    }, [update, em_id, count]);


    const getData = async (tabledata) => {
        const { ot_slno } = tabledata
        const result = await axioslogin.get(`/overtimerequest/select/${ot_slno}`)
        const { success, data } = result.data;
        if (success === 1) {
            const { ot_days, shft_code, shft_slno, shft_chkin_time, shft_chkout_time, check_in, check_out, ot_reson, ot_remarks } = data[0]
            const frmdata = {
                date: ot_days,
                shift: shft_code,
                shft_slno: shft_slno,
                shift_Start: format(new Date(shft_chkin_time), "HH:mm:ss"),
                shift_end: format(new Date(shft_chkout_time), "HH:mm:ss"),
                in_time: format(new Date(check_in), "HH:mm:ss"),
                out_time: format(new Date(check_out), "HH:mm:ss")
            }
            const set = {
                otDate: '',
                ot_reson: ot_reson,
                ot_remarks: ot_remarks,
                shft_slno: shft_slno,
                checkin: check_in,
                checkout: check_out,
                shiftcheckout: shft_chkout_time,
                shiftcheckin: shft_chkin_time,
                ot_slno: ot_slno
            }
            setTableData(frmdata);
            setrequest(set)
            setflag(1)
        } else {
            warningNofity(" Error occured contact EDP")
        }
    }

    const deletOTRequest = async (getdata) => {
        const { ot_slno } = getdata
        const result = await axioslogin.delete(`/overtimerequest/delete/${ot_slno}`)
        const { message, success } = result.data;
        if (success === 1) {
            setCount(count - 1)
            succesNofity(message);
        } else {
            warningNofity(" Error occured contact EDP")
        }
    }


    return (
        < Fragment >
            <MaterialTable
                title="OT Request Table"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getData(data)
                    },
                    {
                        icon: () => <HiTrash size={24} color='success' />,
                        tooltip: "Click here to Delete",
                        onClick: (e, data) => deletOTRequest(data)
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1
                }}
            />
        </Fragment >
    )
}

export default memo(OTRequestTable)
