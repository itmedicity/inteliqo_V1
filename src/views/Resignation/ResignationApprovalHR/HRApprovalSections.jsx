import { FormControl, MenuItem, Select } from "@material-ui/core";
import { CommentSharp } from "@material-ui/icons";
import React, { Fragment, useDebugValue, useEffect } from "react";
import { axioslogin } from "src/views/Axios/Axios";

const HRApprovalSections = ({ name, select, style, onChange, DeptSect, updateDeptSect }) => {
    useEffect(() => {
        const getHRsections = async () => {
            const result = await axioslogin.get('/section/select/all')
            const { success, data } = result.data;
            if (success === 1) {
                updateDeptSect(data)
            }
        }
        getHRsections()
    }, [])
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0}>
                        All Department Section
                    </MenuItem>
                    {
                        DeptSect && DeptSect.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
};

export default HRApprovalSections;
