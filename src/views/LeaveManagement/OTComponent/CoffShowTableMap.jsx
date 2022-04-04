import React, { Fragment, useState, memo } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Checkbox } from '@mui/material'

const CoffShowTableMap = ({ value, setarraydata, arraydata, setnewottime, setOtAdd, overtime }, key) => {
    const [select, setSelect] = useState({ check: false })
    const updateSelect = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setSelect({ ...select, [e.target.name]: value })
    }
    const getOttime = (val) => {
        if (val === true) {
            const otdata = {
                coff_slno: value.coff_slno,
                ot_time: value.ot_time,
                ot_slno: value.ot_slno
            }
            setnewottime({
                over_time: value.ot_time + overtime
            })
            setOtAdd({
                totalot: value.ot_time + overtime
            })
            const newarry = ([...arraydata, otdata])
            setarraydata(newarry)
        }
        if (val === false) {
            const delet = {
                coff_slno: value.coff_slno,
                ot_time: value.ot_time,
                ot_slno: value.ot_slno
            }
            setnewottime({
                over_time: overtime - value.ot_time
            })
            setOtAdd({
                totalot: value.ot_time + overtime
            })
            const FineArry = arraydata.filter((val) => {
                return val.coff_slno !== delet.coff_slno
            })
            setarraydata(FineArry)
        }
    }
    return (
        <Fragment>
            <TableRow
                key={value.coff_slno}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center">{value.coff_slno}</TableCell>
                <TableCell align="center">{value.ot_days}</TableCell>
                <TableCell align="center">{value.ot_time}</TableCell>
                <TableCell align="center">{
                    <Checkbox
                        name="check"
                        color="primary"
                        checked={value.check === 1 ? true : select.check}
                        className="py-0 px-5"
                        onChange={(e) => {
                            updateSelect(e)
                            getOttime(e.target.checked)
                        }}
                    />
                }
                </TableCell>
            </TableRow>
        </Fragment >
    )
}

export default memo(CoffShowTableMap)