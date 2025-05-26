
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownlod = (deduction, earnings, em_no, em_id, desg_name,
    attendance_marking_month, em_doj, em_name,
    em_esi_no, em_uan_no) => {

    var doc = {
        background: function (currentPage, pageSize) {
            return {
                table: {
                    widths: [pageSize.width - 70],
                    heights: [pageSize.height - 60],
                    body: [['']]
                },
                margin: 30
            };
        },
        pageMargins: [50, 150, 50, 40],

        header: {
            margin: 15,
            columns: [
                {
                    table: {
                        widths: ['55%', 'auto'],
                        heights: ['auto'],
                        body: [
                            [
                                {
                                    image: 'snow', fit: [150, 150],

                                    margin: [25, 20, 10, 15],
                                },
                                {
                                    margin: [2, 50, 10, 20],
                                    table: {
                                        headerRows: 1,
                                        body: [
                                            [{ text: 'Travancore Medical College Hospital', fontSize: 14 }],
                                        ]
                                    },
                                    layout: 'noBorders'
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                }
            ]
        },
        footer: function (currentPage, pageCount) {
            return {
                margin: 0,
                columns: [
                    {
                        fontSize: 9,
                        text: [
                            {
                                text: currentPage.toString() + ' of ' + pageCount,
                            }
                        ],
                        alignment: 'center'
                    }
                ]
            };
        },
        content: [
            {
                text: [{ text: ' N H bypass Mylapore, Thattamala, P. O, Kollam, Kerala 691020', fontSize: 11 }],
                style: 'header',
                alignment: 'center',
            },
            {
                text: [{ text: ' ', fontSize: 11 }],
                style: 'header',
                alignment: 'center',
            },
            {
                text: [{ text: ' Wages Slip - (Form XIII) for the month of April 2023', fontSize: 11 }],
                style: 'header',
                alignment: 'center',
            },
            {
                text: [{ text: ' ', fontSize: 11 }],
                style: 'header',
                alignment: 'center',
            },
            {
                text: [{ text: ' EMPLOYEE PAY SUMMARY', fontSize: 11 }],
                style: 'header',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [250, 'auto', 'auto'],
                    body: [
                        [{ text: 'Employee ID', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: em_no, fontSize: 10, font: 'Roboto' }],
                        [{ text: 'Employee Name', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: em_name, fontSize: 10, }],
                        [{ text: 'Designation', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: desg_name, fontSize: 10, }],
                        [{ text: 'Date of Joining', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: em_doj, fontSize: 10, }],
                        [{ text: 'Pay Period', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: attendance_marking_month, fontSize: 10, }],
                        [{ text: 'IP Number', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: em_esi_no, fontSize: 10, }],
                        [{ text: 'UAN', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: em_uan_no, fontSize: 10, }],
                        [{ text: 'Branch', fontSize: 10, }, { text: ':', fontSize: 10, }, { text: ' Travancore Medical College Hospital', fontSize: 10, }],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [400, 'auto'],
                    body: [
                        [{ text: 'EARNINGS', fontSize: 10 }, { text: 'AMOUNT(INR)', fontSize: 10, }],
                    ].concat(earnings && earnings.map((val) => [
                        { text: val.earnded_name, fontSize: 10, },
                        { text: val.worked_amount, fontSize: 10, },
                    ]))
                },
                layout: 'headerLineOnly'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [400, 'auto', 'auto'],
                    body: [
                        [{ text: 'Gross Earnings ', fontSize: 10, }, { text: ':', fontSize: 10 }, { text: '0.00', fontSize: 10 },],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [400, 'auto'],
                    body: [
                        [{ text: 'DEDUCTIONS', fontSize: 10, }, { text: 'AMOUNT(INR)', fontSize: 10, }],
                    ].concat(deduction && deduction.map((val) => [
                        { text: val.earnded_name, fontSize: 10, },
                        { text: val.worked_amount, fontSize: 10, },
                    ]))
                },
                layout: 'headerLineOnly'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [400, 'auto', 'auto'],
                    body: [
                        [{ text: 'Total Deductions', fontSize: 10, }, { text: ':', fontSize: 10 }, { text: '0.00', fontSize: 10 },],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [400, 'auto'],
                    body: [
                        [{ text: 'Other Earnings', fontSize: 10, }, { text: 'AMOUNT(INR)', fontSize: 10, }],
                    ]
                },
                layout: 'headerLineOnly'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [450, 'auto'],
                    body: [
                        [{ text: 'Total Other Earnings ', fontSize: 10, fillColor: '#AEE2FF', }, { text: '0.00', fontSize: 10, fillColor: '#AEE2FF' },],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [450, 'auto'],
                    body: [
                        [{ text: 'NET PAY (Gross Eranings-Total Deductions+Other Earnings) ', fontSize: 10 }, { text: '0.00', fontSize: 10, },],
                        [{ text: ' ', fontSize: 10 }, { text: '', fontSize: 10, },],
                    ]
                },
                layout: 'noBorders'
            },

            {
                style: 'tableExample',
                table: {
                    widths: [125, 125, 125, 125],
                    body: [
                        [{ text: '', fontSize: 10, }, { text: '', fontSize: 10, }, { text: 'Pay Incharge(Sign)', fontSize: 10, }, { text: '................ ', fontSize: 10, }],
                        [{ text: ' ', fontSize: 10, }, { text: '', fontSize: 10, }, { text: 'Employee (Sign) ', fontSize: 10, }, { text: '................ ', fontSize: 10, }],
                    ]
                },
                layout: 'noBorders'
            },

        ],

        styles: {
            header: {
                fontSize: 12,
                bold: true
            },
            subheader: {
                fontSize: 11,
                bold: true
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
        },
        images: {
            snow: 'http://192.168.10.170/NAS/logo/logo.png',
        }
    }
    pdfMake.createPdf(doc).open();
}
