import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { logo, NABH } from "src/views/Constant/Static";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const PdfInductionTrannings = (selected, ShowData) => {
    const doc = {
        // header: {
        //     margin: [10, 10, 10, 20],
        //     columns: [
        //         {
        //             stack: [
        //                 { image: 'logo', fit: [150, 150] }
        //             ],
        //             width: '*',
        //             alignment: 'left'
        //         }
        //     ],
        //     columns: [
        //         {
        //             stack: [
        //                 { image: 'NABH', fit: [100, 100] }
        //             ],
        //             width: '*',
        //             alignment: 'right'
        //         }
        //     ]

        // },
        // header: [


        //     { image: 'logo', width: 80 },
        //     { image: 'NABH', width: 80, },


        // ],



        // header: {
        //     margin: [10, 10, 10, 10],
        //     columns: [
        //         {
        //             image: 'logo',
        //             fit: [80, 80],
        //             alignment: 'left',
        //             width: 'auto'
        //         },
        // {
        //     text: 'INDUCTION TRAINING RECORD',
        //     alignment: 'center',
        //     fontSize: 16,
        //     bold: true,
        //     margin: [0, 30, 0, 0],
        //     width: '*'
        // },
        //         {
        //             image: 'NABH',
        //             fit: [60, 60],
        //             alignment: 'right',
        //             width: 'auto'
        //         }
        //     ]
        // }
        // ,

        content: [
            {
                columns: [
                    {
                        image: 'logo',
                        fit: [100, 100],
                        alignment: 'left',
                        flex: 1,

                    },
                    {
                        image: 'NABH',
                        fit: [60, 60],
                        alignment: 'right',
                        width: 'auto'
                    }
                ]
            },
            {
                text: 'INDUCTION TRAINING RECORD',
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 50, 0, 10]
            },
            {
                text: 'Employee Details',
                fontSize: 14,
                bold: true,
                margin: [0, 30, 0, 10]
            },
            {
                table: {
                    widths: ['25%', '75%'],
                    body: [
                        ['Name:', selected?.em_name || ''],
                        ['Employee ID:', selected?.em_no || ''],
                        ['Designation:', selected?.desg_name || ''],
                        ['Department:', selected?.dept_name || ''],
                        ['Name of the HOD:', selected?.hod || '']
                    ]
                },
                layout: {
                    hLineWidth: () => 0,
                    vLineWidth: () => 0,
                    paddingLeft: () => 10,
                    paddingRight: () => 10,
                    paddingTop: () => 5,
                    paddingBottom: () => 5
                }
            },
            {
                text: 'Training Details',
                fontSize: 14,
                bold: true,
                margin: [0, 30, 0, 10]
            },
            {
                style: 'tableExample',
                table: {
                    widths: [25, 50, 110, 40, 50, 50, '*'],
                    body: [
                        [
                            { text: 'Sl No', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Date', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Training Topic', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Duration', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Pre-Test Mark', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Post-Test Mark', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Trainer', bold: true, fontSize: 10, alignment: 'center' }
                        ],
                        ...ShowData.map((val, idx) => ([
                            { text: idx + 1, fontSize: 10, alignment: 'center' },
                            { text: val.date || '', fontSize: 10, alignment: 'center' },
                            { text: val.training_topic_name || '', fontSize: 10, alignment: 'center' },
                            { text: val.hours || '', fontSize: 10, alignment: 'center' },
                            { text: val.induct_pre_mark !== undefined ? val.induct_pre_mark : 'NA', fontSize: 10, alignment: 'center' },
                            { text: val.induct_post_mark !== undefined ? val.induct_post_mark : 'NA', fontSize: 10, alignment: 'center' },
                            { text: val.trainer_name || '', fontSize: 10, alignment: 'center' }
                        ]))
                    ]
                },
                layout: {
                    paddingTop: () => 4,
                    paddingBottom: () => 4
                }
            }
        ],

        // styles: {
        //     header: {
        //         fontSize: 12,
        //         bold: true,

        //     },
        //     tableExample: {
        //         margin: [0, 5, 0, 15]
        //     }
        // },

        images: {
            logo: logo,
            NABH: NABH
        },

        // footer: {
        //     columns: [
        //         '',
        //         { alignment: 'right', text: '*NA: Not attended', fontSize: 9 }
        //     ],
        //     margin: [10, 5]
        // }
    };

    pdfMake.createPdf(doc).open();
};





// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// export const PdfInductionTrannings = (selected, ShowData) => {


//     var doc = {
//         header: {
//             margin: [10, 10, 10, 20],
//             columns: [
//                 {
//                     stack: [
//                         { image: 'logo', fit: [150, 150] },

//                     ],
//                     width: '*',
//                     alignment: 'left'
//                 },
//             ]
//         },

//         content: [
//             {
//                 stack: [
//                     { text: 'INDUCTION TRAINING RECORD', fontSize: 18, bold: true },

//                 ],
//                 width: '*',
//                 alignment: 'center',
//                 margin: [0, 50, 0, 10]

//             },
//             {
//                 text: 'Employee Details',
//                 fontSize: 14,
//                 bold: true,
//                 margin: [0, 30, 0, 10]
//             },

//             {
//                 table: {
//                     widths: ['25%', '75%'],
//                     body: [
//                         ['Name:', selected?.em_name],
//                         ['Employee ID:', selected?.em_no],
//                         ['Designation:', selected?.desg_name],
//                         ['Department:', selected?.dept_name],
//                         ['Name of the HOD:', selected?.hod],
//                     ]
//                 },
//                 layout: {
//                     hLineWidth: function (i, node) { return 0; },
//                     vLineWidth: function (i, node) { return 0; },
//                     paddingLeft: function (i, node) { return 10; },
//                     paddingRight: function (i, node) { return 10; },
//                     paddingTop: function (i, node) { return 5; },
//                     paddingBottom: function (i, node) { return 5; },
//                 }
//             },

//             {
//                 stack: [

//                     {
//                         style: 'tableExample',
//                         table: {
//                             widths: [20, 45, 90, 40, 40, 40, 90, 40, 40,],
//                             body: [
//                                 [{ text: 'Slno', fontSize: 10, bold: true, alignment: 'center', font: 'Roboto' },
//                                 { text: 'Date', fontSize: 10, bold: true, font: 'Roboto', alignment: 'center' },
//                                 { text: 'Training Topic', fontSize: 10, bold: true, font: 'Roboto', alignment: 'center' },
//                                 { text: 'Duration', fontSize: 10, bold: true, font: 'Roboto', alignment: 'center' },
//                                 { text: 'PreTest Mark', fontSize: 10, bold: true, font: 'Roboto', alignment: 'center' },
//                                 { text: 'PostTest Mark', fontSize: 10, bold: true, font: 'Roboto', alignment: 'center' },
//                                 { text: 'Trainers', fontSize: 10, bold: true, font: 'Roboto', alignment: 'center' },
//                                     // { text: 'HOD (sign)', fontSize: 10, bold: true, font: 'Roboto', alignment: 'center' },
//                                     // { text: 'Remark', fontSize: 10, font: 'Roboto', bold: true, alignment: 'center' },
//                                 ],
//                             ].concat(ShowData && ShowData.map((val, ndx) => [
//                                 { text: ndx + 1, fontSize: 10, font: 'Roboto', alignment: 'center' },
//                                 { text: val.date, fontSize: 10, font: 'Roboto', alignment: 'center' },
//                                 { text: val.training_topic_name, fontSize: 10, font: 'Roboto', alignment: 'center' },
//                                 { text: val.hours, fontSize: 10, font: 'Roboto', alignment: 'center' },
//                                 { text: val.induct_pre_mark, fontSize: 10, font: 'Roboto', alignment: 'center' },
//                                 { text: val.induct_post_mark, fontSize: 10, font: 'Roboto', alignment: 'center' },
//                                 { text: val.trainer_name, fontSize: 10, font: 'Roboto', alignment: 'center' },
//                                 // {
//                                 //     // image: val.induct_post_mark >= 2 && val.training_induct_hod_aprvl_status === 1 ? 'picUrl' : 'Nosign', alignment: 'center', fit: [45, 60]
//                                 //     image: val.induct_post_mark >= 2 && val.training_iduct_tnd_verify_status === 1 ? 'picUrl' : 'Nosign', alignment: 'center', fit: [45, 60]

//                                 // },
//                                 // { text: val.Remark, fontSize: 10, font: 'Roboto', alignment: 'center' },

//                             ]))
//                         }
//                     },
//                 ],
//                 margin: [0, 20, 0, 0]
//             },

//         ],

//         styles: {
//             header: {
//                 fontSize: 12,
//                 bold: true
//             },
//         },
//         images: {
//             logo: 'http://192.168.10.88:9090/Inteliqo/PersonalRecords/logo/logo.png',
//             // NABH: 'http://192.168.22.170/NAS/logo/NABH.png',
//             // // picUrl: HODSign,
//             // Nosign: 'http://192.168.22.3/notApproved/notApproved.jpg',

//         },
//         footer: {
//             columns: [
//                 '',
//                 {
//                     alignment: 'right',
//                     text: '*NA: Not attended '
//                 }
//             ],
//             margin: [10, 0]
//         }
//     };

//     pdfMake.createPdf(doc).open();
// }
