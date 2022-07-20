import React, { Fragment } from 'react'
import {
    Avatar,
    Box,
    Card,
    Divider,
    Typography,
    Paper
} from "@mui/material";

const Widjet = ({ avatarIcons, widgetName, count }) => {

    return (
        <Fragment>
            <Paper elevation={3} >
                <Card
                    sx={{
                        // p: 0.2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                        // boxShadow: 5,
                        // marginY: 0.3,
                        // marginX: 0.3
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            //   backgroundColor: "lightcoral",
                        }}
                    >
                        <Box
                            sx={{
                                width: "20%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                // backgroundColor: "Background",
                            }}
                        >
                            <Box
                                sx={{
                                    // backgroundColor:"ButtonHighlight",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <Avatar
                                    variant="rounded"
                                    // src={icons}
                                    sx={{
                                        // padding:0
                                        // paddingX : "25%",
                                        // paddingY:"2%",
                                        // height:"100%",
                                        // width:"80%",
                                        bgcolor: "blueviolet"
                                    }}
                                >
                                    {avatarIcons}
                                </Avatar>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                width: "80%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box sx={{ textAlign: "center" }} >
                                <Typography variant="caption" fontWeight={750}  >{widgetName}</Typography>
                            </Box>
                            <Divider variant="middle" />
                            <Box sx={{ textAlign: "center" }} >
                                <Typography fontWeight={800} >{count}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* <Avatar variant="rounded" src={icons} />
              <Typography fontWeight={700}>Michael Scott</Typography>
              <Typography variant="body2" color="text.secondary">
                sadasdasdas
              </Typography> */}
                </Card>
            </Paper>
        </Fragment>
    )
}

export default Widjet