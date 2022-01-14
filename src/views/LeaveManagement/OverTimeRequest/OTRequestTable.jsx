import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState, useContext } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { format } from 'date-fns'

const OTRequestTable = ({ update, setTableData, setrequest, setflag }) => {
    const [data, setData] = useState();
    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    const { em_no } = employeedetails


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
            const result = await axioslogin.get(`/overtimerequest/${em_no}`)
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getBoard();
    }, [update]);


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
                out_time: format(new Date(check_out), "HH:mm:ss"),

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

                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0
                }}
            />
        </Fragment >
    )
}

export default memo(OTRequestTable)
