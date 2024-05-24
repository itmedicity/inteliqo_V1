const PdfContent = ({ details, data, date, item }) => {
    return [
        {
            columns: [
                {
                    stack: [
                        { text: 'TMCH/HRD/OL/MM/YY/REF: NO', fontSize: 8, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [30, 0, 0, 0],
                },

                {
                    stack: [
                        { text: 'DATE:', fontSize: 8, bold: true },
                    ],
                    width: '*',
                    alignment: 'right',
                    margin: [0, 0, 50, 0],
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'PROVISIONAL OFFER LETTER', fontSize: 11, bold: true },
                    ],
                    width: '100%',
                    alignment: 'center',
                    margin: [30, 50, 0, 30],
                },
            ],
        },
        {
            columns: [
                {
                    table: {
                        widths: ['25%', '75%'],
                        body: [
                            [{ text: 'Name:', fontSize: 10, bold: true }, details?.first_name + ' ' + details?.last_name],
                            [{ text: 'Address:', fontSize: 10, bold: true }, details?.address1 + ' ,' + details?.address2],
                            // [{ text: 'Nationality:', fontSize: 10, bold: true }, '1996-02-01'],
                            // [{ text: 'State:', fontSize: 10, bold: true }, 'Male'],
                            [{ text: 'Gender :', fontSize: 10, bold: true }, details?.gender],
                            [{ text: 'Tel.No:', fontSize: 10, bold: true }, details?.mobile_num],
                            [{ text: 'Email.Id:', fontSize: 10, bold: true }, details?.email],
                            // [{ text: 'Qualification:', fontSize: 10, bold: true }, 'HR'],
                            [{ text: 'Designation Offered:', fontSize: 10, bold: true }, data?.designation_name],
                            [{ text: 'Department:', fontSize: 10, bold: true }, item?.dept_name],
                            [{ text: 'Expected DOJ:', fontSize: 10, bold: true }, date],
                        ],
                    },
                    layout: {
                        hLineWidth: function (i, node) { return 0; },
                        vLineWidth: function (i, node) { return 0; },
                        paddingLeft: function (i, node) { return 15; },
                        paddingRight: function (i, node) { return 10; },
                        paddingTop: function (i, node) { return 2; },
                        paddingBottom: function (i, node) { return 2; },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'Dear Mr/Ms', fontSize: 10, bold: true },
                        { text: details?.first_name + ',', fontSize: 10, bold: true },
                        // { text: ',', fontSize: 10, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 20, 0, 10],
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'Further to the interview and discussions you had with us, we are pleased to offer you the post of ' + data?.designation_name + ' in the Department of ' + item?.dept_name + ' Travancore Medical College Hospital,Kollam, Kerala  ', fontSize: 11, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 10, 0, 10],
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'It is prerequisite that you have to be medically fit during the medical checkup to be held at the timeof your joining. Please note that this is Provisional Offer Letter. The Company’s standard Appointment Letter containing terms &amp; conditions and duties &amp; responsibilities will be issued to you on your joining the Company.  ', fontSize: 11, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 10, 0, 10],
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'This offer is subject to submission of following original documents along with copies on your joining ', fontSize: 10, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 2, 0, 10],

                },
            ],
        },
        {
            columns: [
                {
                    table: {
                        widths: ['100%', '75%'],
                        body: [
                            [{ text: '1. 3 passport size photographs, Aadhaar Card &amp; PAN Card.', fontSize: 10, bold: true },],
                            [{ text: '2. Age proof and all Academic Certificates', fontSize: 10, bold: true },],
                            [{ text: '3. Experience Certificates and reference certificates/letters.', fontSize: 10, bold: true },],
                            [{ text: '4. Relieving order from previous employer.', fontSize: 10, bold: true },],

                        ],
                    },
                    layout: {
                        hLineWidth: function (i, node) { return 0; },
                        vLineWidth: function (i, node) { return 0; },
                        paddingLeft: function (i, node) { return 15; },
                        paddingRight: function (i, node) { return 10; },
                        paddingTop: function (i, node) { return 2; },
                        paddingBottom: function (i, node) { return 2; },
                    },
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'We are looking forward to a long and mutually promising association.', fontSize: 10, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 10, 0, 10],
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'For Travancore Medical College Hospital,', fontSize: 10, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 20, 0, 10],
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'G  Ganesh Potti', fontSize: 10, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 50, 0, 10],
                },
            ],
        },
        {
            columns: [
                {
                    stack: [
                        { text: 'General Manager– HR', fontSize: 10, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [15, 0, 0, 10],
                },
            ],
        },




    ];
}

export default PdfContent;