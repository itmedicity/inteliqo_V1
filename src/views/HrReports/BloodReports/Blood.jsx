import MaterialTable from 'material-table'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';


const Blood = ({ onSelectionChange, getEmployeeBlood }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBloodgrp())
    }, [])

    const history = useHistory();
    //  for blood group name list
    const empBloodgrp = useSelector((state) => {
        return state.getEmployeeBloodgrp.empBlood
    })
    const title = [
        {
            title: "Select All", field: "group_name",
        }
    ]

    const toSetting = async () => {
        history.push(`/Home/Reports`)
    }
    // const height = 10;
    return (
        <MaterialTable
            title="Handling Selection Changes Preview"
            columns={title}
            icons={tableIcons}
            data={empBloodgrp}
            options={{
                selection: true,
                showTitle: false,
                search: false,
                paging: false,
                actionsColumnIndex: 0,
                padding: "dense",
                // maxBodyHeight: 300,
                header: true,
                showSelectAllCheckbox: true,
                showTextRowsSelected: false,
                tableLayout: 'auto',
                draggable: true,
                toolbar: true,
                paginationType: "stepped",
                toolbarButtonAlignment: "left"
            }}
            actions={[
                {
                    icon: () => <SearchIcon sx={{
                        padding: 0,
                        "& MuiIconButton-root": {
                            padding: 0
                        },
                        "&:hover": {
                            backgroundColor: "red",
                            paddingBlock: 0
                        }
                    }} fontSize="large" />,
                    tooltip: 'Search',
                    isFreeAction: true,
                    //disableFocusRipple: true,
                    onClick: getEmployeeBlood
                    // onClick: (event) => alert("You want to add a new row")

                },
                {
                    icon: () => <HighlightOffTwoToneIcon sx={{ padding: 0 }} fontSize="large" />,
                    tooltip: 'back to Homepage',
                    isFreeAction: true,
                    onClick: toSetting
                }
            ]}

            onSelectionChange={(rows) => onSelectionChange(rows)}
        />
    )
}

export default Blood