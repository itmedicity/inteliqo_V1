import { differenceInDays, getDaysInMonth, startOfMonth, subDays } from "date-fns";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ToWords } from 'to-words';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownlod = (details, src, hrsig, prepard, lop, calcLop, holiday) => {
    const { dept_name, em_no, em_name, request_date, em_doj, relieving_date,
        desg_name, gross_salary, resignation_type, } = details;


    const wokeddays = differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date)))
    const days = getDaysInMonth(new Date(relieving_date));
    const workedSalary = (gross_salary / days) * wokeddays

    // const roundValue = Math.round(workedSalary / 10) * 10

    const tot = Math.round(workedSalary / 10) * 10 - gross_salary


    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: { // can be used to override defaults for the selected locale
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            }
        }
    });
    var numstring = toWords?.convert(Math.abs(tot))
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
        pageMargins: [50, 50, 50, 40],
        content: [
            {
                text: 'TRAVANCORE MEDICAL COLLEGE HOSPITAL',
                style: 'header',
                alignment: 'center',
            },
            {
                text: 'FULL AND FINAL SETTLEMENT NOTE',
                style: 'header',
                alignment: 'center',
            },
            {
                table: {
                    headerRows: 1,
                    widths: [500],
                    body: [
                        [''],
                        ['']
                    ]
                },
                layout: 'headerLineOnly'
            },
            {
                style: 'tableExample',
                table: {
                    widths: [125, 125, 125, 125],
                    body: [
                        [{ text: 'EMP ID', fontSize: 10, bold: true }, [{ text: em_no, fontSize: 10, font: 'Roboto' },],
                        { text: 'DOJ', fontSize: 10, bold: true }, { text: moment(em_doj).format('DD-MM-YYYY'), fontSize: 10, font: 'Roboto' }
                        ],
                        [{ text: 'EMP NAME', fontSize: 10, bold: true }, { text: em_name, fontSize: 10, font: 'Roboto' },
                        { text: 'NOTICE DATE', fontSize: 10, bold: true }, { text: moment(request_date).format('DD-MM-YYYY'), fontSize: 10, font: 'Roboto' }
                        ],
                        [{ text: 'DEPARTMENT', fontSize: 10, bold: true }, { text: dept_name, fontSize: 10, font: 'Roboto' },
                        { text: 'CALC LWD', fontSize: 10, bold: true }, { text: moment(subDays(new Date(relieving_date), 1)).format('DD-MM-YYYY'), fontSize: 10, font: 'Roboto' }
                        ],
                        [{ text: 'DESIGNATION', fontSize: 10, bold: true }, { text: desg_name, fontSize: 10, font: 'Roboto' },
                        { text: 'ACTUAL LWD', fontSize: 10, bold: true }, { text: moment(relieving_date).format('DD-MM-YYYY'), fontSize: 10, font: 'Roboto' }
                        ],
                        [{ text: 'SALARY (GROSS)', fontSize: 10, bold: true }, { text: gross_salary, fontSize: 10, font: 'Roboto' },
                        { text: '', fontSize: 10, bold: true }, { text: '', fontSize: 10, font: 'Roboto' }
                        ],
                    ]
                },
                layout: 'noBorders'
            },
            { text: '\nDETAILS OF DAYS WORKED\n', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', decoration: 'underline' },
            {
                style: 'tableExample',
                table: {
                    widths: [240, 'auto', 230],
                    body: [
                        [{ text: 'Total number of days', fontSize: 10, font: 'Roboto' }, { text: ':', fontSize: 10, font: 'Roboto' }, { text: differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date))), fontSize: 10, font: 'Roboto' }],
                        [{ text: 'Less: LOP & HLP', fontSize: 10, font: 'Roboto' }, { text: ':', fontSize: 10, font: 'Roboto' }, { text: lop, fontSize: 10, font: 'Roboto' }],
                        [{ text: 'Calculated LOP', fontSize: 10, font: 'Roboto' }, { text: ':', fontSize: 10, font: 'Roboto' }, { text: calcLop, fontSize: 10, font: 'Roboto' }],
                        [{ text: 'No of days worked', fontSize: 10, font: 'Roboto', border: [false, true, false, true] }, { text: ':', fontSize: 10, font: 'Roboto', border: [false, true, false, true] }, { text: differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date))) - lop - calcLop, fontSize: 10, font: 'Roboto', border: [false, true, false, true] }]
                    ]
                }, layout: {
                    defaultBorder: false,
                }
            },
            { text: '\n' },

            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [240, 240],
                    body: [
                        [{ text: 'EARNINGS', style: 'tableHeader', alignment: 'center', }, { text: 'DEDUCTIONS', style: 'tableHeader', alignment: 'center', }],
                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [74, 74, 74, 74, 74, 74],
                    body: [
                        [{ text: '', border: [true, false, false, false] }, 'No of days', { text: '', border: [true, false, true, false] }, '', 'No of days', { text: '', border: [true, false, true, false] }],
                        [{ text: 'Salary Due', border: [true, false, false, false] }, { text: differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date))), fontSize: 10, font: 'Roboto' }, { text: Math.round(workedSalary / 10) * 10, fontSize: 10, font: 'Roboto', border: [true, false, true, false] }, 'Notice Pay', { text: resignation_type === '2' ? getDaysInMonth(new Date(relieving_date)) : 0, fontSize: 10, font: 'Roboto' }, { text: resignation_type === '2' ? gross_salary : 0, fontSize: 10, font: 'Roboto', border: [true, false, true, false] }],
                        [{ text: 'Duty Off', border: [true, false, false, false] }, ': 0', { text: '', border: [true, false, true, false] }, 'KSWF', '0', { text: '', border: [true, false, true, false] }],
                        [{ text: 'Holiday Wage', border: [true, false, false, false] }, ': 0', { text: '', border: [true, false, true, false] }, 'PF', '0', { text: '', border: [true, false, true, false] }],
                        [{ text: 'Arear', border: [true, false, false, false] }, ': 0', { text: '', border: [true, false, true, false] }, 'ESI', '0', { text: '', border: [true, false, true, false] }],
                        [{ text: 'Comp Off', border: [true, false, false, false] }, ': 0', { text: '', border: [true, false, true, false] }, 'Prof. Tax', '0', { text: '', border: [true, false, true, false] }],
                        [{ text: 'Earned Leave', border: [true, false, false, false] }, ': 0', { text: '', border: [true, false, true, false] }, '', '', { text: '', border: [true, false, true, false] }],
                        [{ text: 'Caution Deposit', border: [true, false, false, false] }, ': 0', { text: '', border: [true, false, true, false] }, '', '', { text: '', border: [true, false, true, false] }],

                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [157, 74, 157, 74],
                    body: [
                        [
                            { text: 'TOTAL EARNINGS', border: [true, true, false, true], }, { text: Math.round(workedSalary / 10) * 10, border: [true, true, false, true], }, { text: 'TOTAL DEDUCTION', border: [true, true, false, true], }, { text: resignation_type === '2' ? gross_salary : 0, border: [true, true, true, true], },],
                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [240, 240],
                    body: [
                        [
                            { text: '', style: 'tableHeader', alignment: 'center', border: [true, false, false, true], }, { text: '.', fontSize: 10, font: 'Roboto', border: [false, false, true, true], },],
                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [240, 240],
                    body: [
                        [
                            { text: resignation_type === '2' ? 'NET AMOUNT PAYABLE' : 'NET AMOUNT RECEIVABLE', style: 'tableHeader', alignment: 'center', border: [true, false, true, false], },
                            { text: tot, fontSize: 10, font: 'Roboto', border: [false, false, true, false], },],
                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            },
            {
                style: 'tableExample',
                table: {
                    headerRows: 1,
                    widths: [240, 240],
                    body: [
                        [{ text: 'In Words', style: 'tableHeader', alignment: 'center', }, { text: numstring, fontSize: 10, font: 'Roboto' },],
                    ]
                }
            },
            {
                text: '\n',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [480],
                    headerRows: 1,
                    body: [
                        [{ text: 'Remarks, If any', style: 'subheader', fontSize: 11, font: 'Roboto' }],
                        [{ text: 'I here by agree to the above amount against my full and final settlement for the period I have work which will be credicted to my bank account within 3 bank working days and I will not make any further claims against the same', fontSize: 10, italics: true }],
                    ]
                },
                layout: 'noBorders'
            },
            {
                text: '\n',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [100, 365],
                    headerRows: 1,
                    body: [
                        [{ text: 'Date', style: 'subheader', fontSize: 11, bold: true, font: 'Roboto', },
                        { text: moment(new Date()).format('DD-MM-YYYY'), fontSize: 10 }],
                    ]
                },
                layout: 'noBorders'
            },
            {
                text: '\n',
            },
            {
                style: 'tableExample',
                table: {
                    widths: [240, 240],
                    // heights: [50, 70, 10, 5, 5],
                    body: [
                        [{ text: 'Prepared By', alignment: 'center', fontSize: 8 },
                        { text: 'Approved By', alignment: 'center', fontSize: 8 },
                        ],
                        [{

                            image: 'login', width: 90,
                            height: 70, style: 'rightme'
                        },
                        {
                            image: 'hr', width: 90,
                            height: 70, style: 'rightme'
                        },

                        ],
                    ]
                },
                layout: 'noBorders'
            },
        ],
        styles: {
            header: {
                fontSize: 15,
                bold: true
            },
            subheader: {
                fontSize: 15,
                bold: true
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            rightme: {
                alignment: 'center'
            }
        },
        images: {
            snow: 'http://192.168.22.170/NAS/logo/logo.png',
            employee: src,
            hr: hrsig,
            login: prepard

        }
    }
    pdfMake.createPdf(doc).open();
}