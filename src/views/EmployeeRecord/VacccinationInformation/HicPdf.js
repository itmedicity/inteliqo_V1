
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownlod = (nameList, src, srcsecond, srcthird, srcbooster) => {

    var doc = {
        pageMargins: [50, 50, 50, 50],
        header: {
            margin: [10, 10, 10, 20],
            columns: [
                {
                    stack: [
                        { image: 'logo', fit: [150, 150] },

                    ],
                    width: '*',
                    alignment: 'left'
                },

                {
                    stack: [
                        { image: 'NABH', width: 100, height: 100 },
                        { text: 'NABH Certified', fontSize: 12, bold: true },
                    ],
                    width: '*',
                    alignment: 'right'
                },
            ]
        },

        content: [
            {
                stack: [
                    { text: 'VACCINATION CARD', fontSize: 18, bold: true },

                ],
                width: '*',
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
                        ['Name', nameList.em_name],
                        ['Age', nameList.age],
                        ['Gender', nameList.gender],
                        ['DOB', nameList.dob],
                        ['Blood Group', nameList.blood],
                        ['Date of Joining', nameList.doj],
                        ['Emp ID', nameList.em_no],
                        ['Department', nameList.dept_name],
                        ['Designation', nameList.desgn],
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) { return 0; },
                    vLineWidth: function (i, node) { return 0; },
                    paddingLeft: function (i, node) { return 10; },
                    paddingRight: function (i, node) { return 10; },
                    paddingTop: function (i, node) { return 5; },
                    paddingBottom: function (i, node) { return 5; },
                }
            },
            {
                stack: [
                    {
                        text: 'Vaccination Details',
                        fontSize: 14,
                        bold: true,
                        margin: [0, 10, 0, 10]
                    },
                    {

                        table: {
                            heights: 20,
                            widths: [100, 88, 88, 88, 88],
                            body: [
                                [
                                    [{
                                        text: 'Vaccination', fontSize: 10, font: 'Roboto', bold: true,
                                    },
                                    ],
                                    [{ text: 'First Dose', fontSize: 10, font: 'Roboto', bold: true, },],
                                    [{ text: 'Second Dose', fontSize: 10, font: 'Roboto', bold: true, },],
                                    [{ text: 'Third Dose', fontSize: 10, font: 'Roboto', bold: true, },],
                                    [{ text: 'Booster Dose', fontSize: 10, font: 'Roboto', bold: true, },]

                                ],
                                [
                                    [{ text: 'Hepatitis B', fontSize: 10, font: 'Roboto', bold: true, },],
                                    [{ text: nameList.firstdose_date, fontSize: 12, font: 'Roboto' },],
                                    [{ text: nameList.second_dose_given_date, fontSize: 12, font: 'Roboto' },],
                                    [{ text: nameList.third_dose_given_date, fontSize: 12, font: 'Roboto' },],
                                    [{ text: nameList.booster_dose_given_date, fontSize: 12, font: 'Roboto' },]

                                ],
                                [
                                    [{ text: 'Vaccination Given By', fontSize: 10, font: 'Roboto', bold: true, },],
                                    [{ text: nameList.first_verified, fontSize: 12, font: 'Roboto' },],
                                    [{ text: nameList.second_verified, fontSize: 12, font: 'Roboto' },],
                                    [{ text: nameList.third_verified, fontSize: 12, font: 'Roboto' },],
                                    [{ text: nameList.booster_verified, fontSize: 12, font: 'Roboto' },]

                                ],

                            ]
                        }
                    }
                ],
                margin: [0, 20, 0, 0]
            },
            {
                stack: [
                    {
                        text: 'Verified by Hic',
                        fontSize: 14,
                        bold: true,
                        margin: [0, 10, 0, 10]
                    },
                    {
                        table: {
                            widths: ['25%', '25%', '25%', '25%'],
                            body: [


                                [
                                    { text: 'First Dose ', bold: true, width: 90, height: 30, },
                                    { text: 'Second Dose ', bold: true, width: 90, height: 30, },
                                    { text: 'Third Dose ', bold: true, width: 90, height: 30, },
                                    { text: 'Booster Dose ', bold: true, width: 90, height: 30, },],

                                [
                                    { image: 'employee', width: 60, height: 40 },
                                    { image: 'employeesec', width: 60, height: 40 },
                                    { image: 'employeethird', width: 60, height: 40 },
                                    { image: 'empbooster', width: 60, height: 40 }
                                ],
                                [

                                    { text: nameList.em_name_first_verified, width: 90, height: 30, },
                                    { text: nameList.em_name_second_verified, width: 90, height: 30, },
                                    { text: nameList.em_name_third_verified, width: 90, height: 30, },
                                    { text: nameList.em_name_booster_verified, width: 90, height: 30, },
                                ],
                                [
                                    {
                                        text: nameList.firstdesg, width: 90, height: 10, fontSize: 7,
                                    },
                                    { text: nameList.secdesg, width: 90, height: 10, fontSize: 7, },
                                    { text: nameList.thirddesg, width: 90, height: 10, fontSize: 7, },
                                    { text: nameList.boosterdesg, width: 90, height: 10, fontSize: 7, },
                                ],
                                [
                                    { text: nameList.hic_first_dose_date, width: 90, height: 10, fontSize: 7, },
                                    { text: nameList.hic_second_dose_date, width: 90, height: 10, fontSize: 7, },
                                    { text: nameList.hic_thirdt_dose_date, width: 90, height: 10, fontSize: 7, },
                                    { text: nameList.hic_boostert_dose_date, width: 90, height: 10, fontSize: 7, },
                                ],

                            ]
                        },
                        layout: {
                            hLineWidth: function (i, node) { return 0; },
                            vLineWidth: function (i, node) { return 0; },
                            paddingLeft: function (i, node) { return 10; },
                            paddingRight: function (i, node) { return 10; },
                            paddingTop: function (i, node) { return 5; },
                            paddingBottom: function (i, node) { return 5; },
                        }
                    }
                ],
                margin: [0, 20, 0, 0]
            }

        ],

        styles: {
            header: {
                fontSize: 12,
                bold: true
            },
        },
        images: {
            logo: 'http://192.168.10.88:9090/Inteliqo/PersonalRecords/logo/logo.png',
            NABH: 'http://192.168.22.170/NAS/logo/NABH.png',
            employee: src,
            employeesec: srcsecond,
            employeethird: srcthird,
            empbooster: srcbooster,
        }
    };

    pdfMake.createPdf(doc).open();
}
