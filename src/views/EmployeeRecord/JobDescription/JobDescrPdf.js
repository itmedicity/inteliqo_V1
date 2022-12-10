
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownlod = (objective, desig, scope,
    branch_name, working_hour, reporting_dept,
    equipment_used, dept, sect, date, revisiondate,
    docno, jDuty, jPerformance, jCompetency, jQualify,
    experience_year, is_female, is_male, age_from, age_to) => {

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
                                    margin: [5, 25, 10, 15],
                                    table: {
                                        widths: [90, 100],
                                        body: [
                                            [{ text: 'Doc No', fontSize: 10, font: 'Roboto' }, { text: '', fontSize: 10, font: 'Roboto' }],
                                            [{ text: 'Date', fontSize: 10, font: 'Roboto' }, { text: '', fontSize: 10, font: 'Roboto' }],
                                            [{ text: 'Issue Status', fontSize: 10, font: 'Roboto' }, { text: '', fontSize: 10, font: 'Roboto' }],
                                            [{ text: 'Revision Status', fontSize: 10, font: 'Roboto' }, { text: '', fontSize: 10, font: 'Roboto' }]
                                        ], alignment: 'right'
                                    },
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
                text: [{ text: 'JOB DESCRIPTION - ', fontSize: 11, bold: true, font: 'Roboto' }, { text: desig.toUpperCase(), fontSize: 11, bold: true, font: 'Roboto' }],
                style: 'header',
                alignment: 'center',
            },
            { text: '\n\nJob Summary\n\n', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline' },
            {
                style: 'tableExample',
                table: {
                    widths: [150, 'auto'],
                    body: [
                        [{ text: 'Objectives', fontSize: 10, bold: true }, [{ text: objective, fontSize: 10, font: 'Roboto' },],],
                        [{ text: 'Scope', fontSize: 10, bold: true }, [{ text: scope, fontSize: 10, font: 'Roboto' },],],
                        [{ text: 'Designation', fontSize: 10, bold: true }, [{ text: desig, fontSize: 10, font: 'Roboto' },],],
                        [{ text: 'Department', fontSize: 10, bold: true }, [{ text: dept, fontSize: 10, font: 'Roboto' },],],
                        [{ text: 'Department Section', fontSize: 10, bold: true }, [{ text: sect, fontSize: 10, font: 'Roboto' },],],
                        [{ text: 'Location/Work Place', fontSize: 10, bold: true }, [{ text: branch_name, fontSize: 10, font: 'Roboto' },],],
                        [{ text: 'Equipments to be used', fontSize: 10, bold: true }, [{ text: equipment_used, fontSize: 10, font: 'Roboto' },],],
                        [{ text: 'Working hours', fontSize: 10, bold: true }, [{ text: working_hour, fontSize: 10, font: 'Roboto' },],]
                    ]
                }
            },

            { text: '\n\nDuties & Responsibilties', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline' },

            {
                style: 'tableExample',
                table: {
                    widths: ['auto', 'auto'],
                    heights: 20,
                    body: [
                        [{ text: '', fontSize: 10, bold: true, font: 'Roboto' },
                        { text: '', fontSize: 10, bold: true, font: 'Roboto' }]
                    ].concat(jDuty && jDuty.map((val) =>
                        [{ text: val.slno, fontSize: 10, font: 'Roboto' },
                        { text: val.duties_and_resp, fontSize: 10, font: 'Roboto' },
                        ]
                    )
                    )
                }, layout: 'noBorders'
            },

            { text: '\n\nJob Specification : Performance\n', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline' },

            {
                style: 'tableExample',
                table: {
                    widths: [20, 100, 310, 30],
                    body: [
                        [{ text: 'Slno', fontSize: 10, bold: true, font: 'Roboto' },
                        { text: 'Key Result Areas', fontSize: 10, bold: true, font: 'Roboto' },
                        { text: 'Key Performance Indicators', fontSize: 10, bold: true, font: 'Roboto' },
                        { text: 'Score', fontSize: 10, bold: true, font: 'Roboto' }]
                    ].concat(jPerformance && jPerformance.map((val) => [
                        { text: val.slno, fontSize: 10, font: 'Roboto' },
                        { text: val.kra_desc, fontSize: 10, font: 'Roboto' },
                        //{ text: val.kpi, fontSize: 10, font: 'Roboto' },
                        val.kpi.split(",") && val.kpi.split(",").map((id) => [
                            { ul: [{ text: id, fontSize: 10, font: 'Roboto' }] }]),
                        { text: val.kpi_score, fontSize: 10, font: 'Roboto' }
                    ]))
                }
            },

            { text: '\n\nJob Specification : Competency\n', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline' },

            {
                style: 'tableExample',
                table: {
                    widths: [20, 110, 340],
                    body: [
                        [{ text: 'Slno', fontSize: 10, bold: true, font: 'Roboto' },
                        { text: 'Key Result Areas', fontSize: 10, bold: true, font: 'Roboto' },
                        { text: 'Competency', fontSize: 10, bold: true, font: 'Roboto' }]
                    ].concat(jCompetency && jCompetency.map((val) =>
                        [{ text: val.slno, fontSize: 10, font: 'Roboto' },
                        { text: val.kra_desc, fontSize: 10, font: 'Roboto' },
                        val.competency_desc.split(",") && val.competency_desc.split(",").map((id) =>
                            [{ ul: [{ text: id, fontSize: 10, font: 'Roboto' }] }]),
                        ]))
                }
            },

            { text: '\n\nJob Specification : Generic\n', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline' },

            {
                style: 'tableExample',
                table: {
                    widths: [100, 380],
                    body: [
                        [{ text: 'Experience', fontSize: 10, bold: true, font: 'Roboto' }, { text: [{ text: experience_year, fontSize: 10, font: 'Roboto' }, { text: 'Year', fontSize: 10, font: 'Roboto' },] }],
                        [{ text: 'Qualification', fontSize: 10, bold: true, font: 'Roboto' }, [{
                            table: {
                                headerRows: 1,
                                body: [
                                    [jQualify && jQualify.map((val) => [{ text: val.spec_desc, fontSize: 10, font: 'Roboto' }]), jQualify && jQualify.map((val) => [{ text: val.cour_desc, fontSize: 10, font: 'Roboto' }])],
                                ]
                            },
                            layout: 'noBorders'
                        }
                        ],],
                        [{ text: 'Age', fontSize: 10, bold: true }, { text: [{ text: age_from, fontSize: 10, font: 'Roboto' }, '-', { text: age_to, fontSize: 10, font: 'Roboto' }] }],
                        [{ text: 'Gender', fontSize: 10, bold: true }, { text: [{ text: is_female, fontSize: 10, font: 'Roboto' }, '-', { text: is_male, fontSize: 10, font: 'Roboto' }] }],
                    ]
                }
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
            snow: 'http://192.168.10.170/NAS/logo/logo.png'
        }
    }
    pdfMake.createPdf(doc).open();
}
