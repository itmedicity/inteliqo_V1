import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const pdfdownlod = (tableData) => {

    var doc = {
        pageMargins: [30, 30, 30, 30],
        header: {
            margin: [10, 10, 10, 20],
            columns: [
                {
                    stack: [
                        // { image: 'logo', fit: [150, 150] },
                    ],
                    width: '*',
                    alignment: 'left'
                },
            ]
        },
        content: [
            {
                stack: [
                    { text: 'PUNCH REPORT', fontSize: 18, bold: true },
                ],
                width: '*',
                alignment: 'center',
                margin: [30, 30, 0, 10]
            },
            // Add the PunchTable component here
            {
                style: 'tablecontent',
                table: {
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*'],
                    headerRows: 1,
                    body: [
                        ['Id', 'Name', 'dep name', 'sec name', 'shift in', 'shift out', 'Punch'],
                        ...tableData.map((row) => [
                            row?.em_no,
                            row?.em_name,
                            row?.dept_name,
                            row?.sect_name,
                            row?.shift_in,
                            row?.shift_out,
                            row.new_field && row.new_field.length > 0 ? (
                                row?.new_field.map((punch) => punch)
                            ) : (
                                'No Punch'
                            )
                        ])
                    ],
                },
                margin: [0, 20, 0, 0],
            },
        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true
            },
            tablecontent: {
                fontSize: 8
            }
        },
    };

    pdfMake.createPdf(doc).open();
}
