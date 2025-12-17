
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfDoctordownlod = () => {


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
                                // {
                                //     image: 'snow', fit: [150, 150],

                                //     margin: [25, 20, 10, 15],

                                // },
                                {
                                    margin: [5, 25, 10, 15],
                                    table: {
                                        headerRows: 1,
                                        body: [
                                            [{ text: 'A unit of Quilon Medical Trust', italics: true }],
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
                fontSize: 15,
                text: [{ text: 'PERFORMANCE APPRAISAL', fontSize: 11, bold: true, font: 'Roboto' }],
                style: 'header',
                alignment: 'center',
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
        // images: {
        //     snow: 'http://192.168.10.88:9090/Inteliqo/PersonalRecords/logo/logo.png',
        //     employee: src,
        //     incharge: inchargesig,
        //     hod: hodsig,
        //     ceo: ceosig,
        //     hr: hrsig
        // }
    }
    pdfMake.createPdf(doc).open();
}