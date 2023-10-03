
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownlod = (formdata, Performance,
    given_score, max_score, perfscore,
    grade, description, compData,
    traininData, lastdata, src, inchargesig,
    hodsig, ceosig, ceo_date,
    hod_date, incharge_date, hrdate,
    ceo_name, hod_name, incharge_name, hrsig,
    loginData, designation) => {
    // {val.esc_activity.charAt(0).toUpperCase() + val.esc_activity.slice(1).toLowerCase()}  
    const value = loginData.em_name.charAt(0).toUpperCase() + loginData.em_name.slice(1).toLowerCase()
    const desgvalue = loginData.desg_name.charAt(0).toUpperCase() + loginData.desg_name.slice(1).toLowerCase()


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
            {
                style: 'tableExample',
                table: {
                    widths: [115, 115, 115, 115],
                    body: [
                        [{ text: 'Name', fontSize: 10, bold: true }, [{ text: formdata.name, fontSize: 10, font: 'Roboto' },],
                        { text: 'Emp.ID', fontSize: 10, bold: true }, { text: formdata.emp_id, fontSize: 10, font: 'Roboto' }
                        ],
                        [{ text: 'Department', fontSize: 10, bold: true }, { text: formdata.department_name, fontSize: 10, font: 'Roboto' },
                        { text: 'Department Section', fontSize: 10, bold: true }, { text: formdata.section_name, fontSize: 10, font: 'Roboto' }
                        ],
                        [{ text: 'Designation', fontSize: 10, bold: true }, { text: formdata.designation_name, fontSize: 10, font: 'Roboto' },
                        { text: 'Qualification', fontSize: 10, bold: true }, lastdata && lastdata.map((val) => [{ text: val.cour_desc, fontSize: 10, font: 'Roboto' }, { text: val.spec_desc, fontSize: 10, font: 'Roboto' }])
                        ],
                        [{ text: 'Previous Exp in Years', fontSize: 10, bold: true }, { text: formdata.experience, fontSize: 10, font: 'Roboto' },
                        { text: 'Date of Joining', fontSize: 10, bold: true }, { text: formdata.date_of_joining, fontSize: 10, font: 'Roboto' }
                        ],
                        [{ text: 'Present Salary in Rs.', fontSize: 10, bold: true }, { text: formdata.salary, fontSize: 10, font: 'Roboto' },
                        { text: 'Date of Last Appraisal', fontSize: 10, bold: true }, { text: formdata.appraisal_date, fontSize: 10, font: 'Roboto' }
                        ],
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (columnIndex % 2 === 0) ? '#eeeeee' : null;
                    }
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [100, 365],
                    headerRows: 1,
                    body: [
                        [{ text: 'RATING SCALE:', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline', italics: true },
                        { text: '(5) Exceptionally Meets the Indicator, (4) Satisfactorily Meets the Indicastor, (3) Partially Meets the Indicator, (2) Require Assistance to Meet the Indicator, (1) Fails to Meet the Indicator.', fontSize: 10 }],
                    ]
                },
                layout: 'noBorders'
            },

            {
                style: 'tableExample',
                table: {
                    widths: [30, 100, 180, 40, 100],
                    body: [
                        [
                            {
                                colSpan: 5,
                                text: 'Performance Assessment',
                                alignment: 'center',
                                fillColor: '#eeeeee',
                                fontSize: 10
                            },
                            '',
                            '',
                            '',
                            ''
                        ],

                        [{ text: 'Sl no', fontSize: 10, bold: true },
                        { text: 'Key Result Areas', fontSize: 10, bold: true },
                        { text: 'Key Performance Indicators', fontSize: 10, bold: true },
                        { text: 'Score', fontSize: 10, bold: true },
                        { text: 'Justification of Score', fontSize: 10, bold: true }]
                    ].concat(Performance && Performance.map((val) => [
                        { text: val.slno, fontSize: 10 },
                        { text: val.kra_desc, fontSize: 10 },
                        val.kpi.split(",") && val.kpi.split(",").map((id) => [
                            { text: id, fontSize: 10 }]),
                        { text: val.kpi_score, fontSize: 10 },
                        { text: val.justitfication_score, fontSize: 10 }
                    ]))
                }
            },


            {
                style: 'tableExample',
                table: {
                    widths: [155, 155, 158],
                    body: [
                        [
                            {
                                colSpan: 3,
                                text: 'Performance Grade Scale',
                                alignment: 'center',
                                fillColor: '#eeeeee',
                                fontSize: 10
                                //border: [false, false, false, false]
                            },
                            '',
                            ''
                        ],
                        [{ text: 'Grade O', fontSize: 8, bold: true },
                        { text: '100%', fontSize: 8, font: 'Roboto' },
                        { text: 'Key Performer', fontSize: 8, bold: true },
                        ],
                        [{ text: 'Grade A', fontSize: 8, bold: true },
                        { text: '91-99%', fontSize: 8, font: 'Roboto' },
                        { text: 'Star Performer', fontSize: 8, bold: true },
                        ],
                        [{ text: 'Grade B', fontSize: 8, bold: true },
                        { text: '81-90%', fontSize: 8, font: 'Roboto' },
                        { text: 'Good Performer', fontSize: 8, bold: true },
                        ],
                        [{ text: 'Grade C', fontSize: 8, bold: true },
                        { text: '71-80%', fontSize: 8, font: 'Roboto' },
                        { text: 'Potential Performer', fontSize: 8, bold: true },
                        ],
                        [{ text: 'Grade D', fontSize: 8, bold: true },
                        { text: '61-70%', fontSize: 8, font: 'Roboto' },
                        { text: 'General Performer', fontSize: 8, bold: true },
                        ],
                    ]
                },
            },


            {
                text: [
                    { text: 'Max Score\t\t\t\t\t :', fontSize: 10, bold: true }, { text: max_score, fontSize: 10, font: 'Roboto' }]
            },
            {
                text: [
                    { text: 'Score\t\t\t\t\t\t\t :', fontSize: 10, bold: true }, { text: given_score, fontSize: 10, font: 'Roboto' }]
            },
            {
                text: [
                    { text: 'Performance Score\t :', fontSize: 10, bold: true }, { text: perfscore, fontSize: 10, font: 'Roboto' }]
            },
            {
                text: [
                    { text: 'Performance Grade\t :', fontSize: 10, bold: true }, { text: grade, fontSize: 10, font: 'Roboto' }]
            },
            {
                text: [
                    { text: 'Category\t\t\t\t\t\t:', fontSize: 10, bold: true }, { text: description, fontSize: 10, font: 'Roboto' }]
            },
            {
                style: 'tableExample',
                table: {
                    widths: [100, 365],
                    headerRows: 1,
                    body: [
                        [{ text: '\nRATING SCALE:', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline', italics: true },
                        { text: '\n(4) Very Competent to Perform independently and drive others to perform, (3) Competenet & can perform independently, (2) Require Assistance to perform independently, (1) Not competent enough to perform task.', fontSize: 10 }],
                    ]
                },
                layout: 'noBorders'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [140, 140, 140, 40],
                    body: [
                        [
                            {
                                colSpan: 4,
                                text: 'Competency Assessment',
                                fillColor: '#eeeeee',
                                alignment: 'center',
                                fontSize: 10
                            },
                            '',
                            '',
                            ''
                        ],
                        [{ text: 'Areas', fontSize: 10, bold: true },
                        { text: 'Expected Competency', fontSize: 10, bold: true },
                        { text: 'Actual Competency', fontSize: 10, bold: true },
                        { text: 'Score', fontSize: 10, bold: true }]
                    ].concat(compData && compData.map((val) => [
                        { text: val.kra_desc, fontSize: 10, },
                        { text: val.competency_desc, fontSize: 10, },
                        { text: val.actual_comp, fontSize: 10, },
                        { text: val.competency_score, fontSize: 10, }
                    ]))
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [110, 320],
                    headerRows: 1,
                    body: [
                        [{ text: 'Training Requirement:', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline', },
                        { text: 'Staffs with 1 & 2 comptence levels should be considered for training', fontSize: 10, bold: true }],
                    ]
                },
                layout: 'noBorders'
            },

            {
                style: 'tableExample',
                table: {
                    widths: [240, 240,],
                    body: [
                        [
                            {
                                colSpan: 2,
                                text: 'TRAINING NEEDS: Areas identified for training in order to improve performance',
                                fillColor: '#eeeeee',
                                alignment: 'center',
                                fontSize: 10
                            },
                            '',
                        ],
                        [{ text: 'Areas', fontSize: 10, bold: true },
                        { text: 'Expected Competency', fontSize: 10, bold: true }]
                    ].concat(traininData && traininData.map((val) => [
                        { text: val.kra_desc, fontSize: 10, },
                        { text: val.competency_desc, fontSize: 10, }
                    ]))
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [110, 110, 110, 110],
                    heights: [20, 70],
                    body: [
                        [{ text: 'Name:', fontSize: 10, }, { text: formdata.name, fontSize: 10, }, { text: 'Designation:', fontSize: 10, }, { text: formdata.designation_name, fontSize: 10, }],
                        [{ text: 'Date:', fontSize: 10, }, { text: formdata.appraisal_date, fontSize: 10, }, { text: 'Signature:', fontSize: 10, }, {
                            image: 'employee', width: 90,
                            height: 70,
                        }],
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.body.length) ? 1 : 0;
                    },
                    vLineWidth: function (i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 1 : 0;
                    },
                },
            },

            {
                style: 'tableExample',
                table: {
                    widths: [115, 115, 115, 115],
                    heights: [20, 70, 10, 5, 5],
                    body: [
                        [{ text: 'Incharge', alignment: 'center', fontSize: 8 },
                        { text: 'head of the Department', alignment: 'center', fontSize: 8 },
                        { text: 'Human Resource Dept', alignment: 'center', fontSize: 8 },
                        { text: 'Chief executive officer/ Medical Officer', alignment: 'center', fontSize: 8 }],
                        [{
                            image: 'incharge', width: 90,
                            height: 70,
                        },
                        {
                            image: 'hod', width: 90,
                            height: 70,
                        },
                        {
                            image: 'hr', width: 90,
                            height: 70,
                        },
                        {
                            image: 'ceo', width: 90,
                            height: 70,
                        },
                        ],
                        [{ text: incharge_name, alignment: 'center', fontSize: 8 },
                        { text: hod_name, alignment: 'center', fontSize: 8 },
                        { text: value, alignment: 'center', fontSize: 8 },
                        { text: ceo_name, alignment: 'center', fontSize: 8 }],

                        [{ text: designation.incharge_desg, alignment: 'center', fontSize: 6 },
                        { text: designation.hod_desg, alignment: 'center', fontSize: 6 },
                        { text: desgvalue, alignment: 'center', fontSize: 6 },
                        { text: designation.ceo_desg, alignment: 'center', fontSize: 6 }],

                        [{ text: incharge_date, alignment: 'center', fontSize: 4 },
                        { text: hod_date, alignment: 'center', fontSize: 4 },
                        { text: hrdate, alignment: 'center', fontSize: 4 },
                        { text: ceo_date, alignment: 'center', fontSize: 4 }]

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
            snow: 'http://192.168.10.88:9090/Inteliqo/PersonalRecords/logo/logo.png',
            employee: src,
            incharge: inchargesig,
            hod: hodsig,
            ceo: ceosig,
            hr: hrsig
        }
    }
    pdfMake.createPdf(doc).open();
}
