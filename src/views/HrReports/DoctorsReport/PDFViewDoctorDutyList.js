
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createDepartmentSection = (departmentName, rows) => {
  return [
    {
      text: departmentName.toUpperCase(),
      style: "deptHeader"
    },
    {
      table: {
        widths: ["*", 100,100,"*"],
        body: [
          [
            { text: "Doctor Name", style: "tableHeader" },
            { text: "Time", style: "tableHeader" },
             { text: "Duty", style: "tableHeader" },
            { text: "Remarks", style: "tableHeader" },
          ],
          ...rows.map(row =>
            row.map(cell => ({ text: cell, style: "tableCell" }))
          )
        ]
      },
      layout: {
        hLineWidth: () => 0.7,
        vLineWidth: () => 0.7
      }
    }
  ];
};

const generateDepartmentContent = (data = []) => {
  return data.reduce((acc, dept) => {
    if (!dept || !dept.doctors) return acc;

    const rows = dept.doctors.map(doc => [
      doc.sal_name +" "+ doc.em_name || "",
      doc.shiftName || "",
      doc.dutyName || " ",
      "",
      
    ]);
    return acc.concat(createDepartmentSection(dept.dept_name || "", rows));
  }, []);
};

const getCurrentDateWithDay = (fromdate) => {
  const now = new Date(fromdate);

  const day = now.toLocaleDateString("en-GB", { weekday: "long" });
  const date = now.toLocaleDateString("en-GB"); // DD/MM/YYYY

  return `${day}, ${date}`;
};


export const pdfDoctordownlod = (scheduleData,fromdate) => {

  const docDefinition = {
    pageSize: "A4",
    pageMargins: [20, 60, 20, 40],

    header: {
      text: "DOCTOR CONSULTATION SCHEDULE",
      alignment: "center",
      fontSize: 14,
      bold: true,
      margin: [0, 20, 0, 10]
    },

    footer: (currentPage, pageCount) => ({
      text: `Page ${currentPage} of ${pageCount}`,
      alignment: "right",
      margin: [0, 0, 20, 0],
      fontSize: 9
    }),

    content: [
      {
        text: `Duty Day: ${getCurrentDateWithDay(fromdate)}`,
        alignment: "right",
        fontSize: 9,
        margin: [0, 0, 0, 10]
      },

      ...generateDepartmentContent(scheduleData)
    ],

    styles: {
      deptHeader: {
        fillColor: "#eeeeee",
        bold: true,
        fontSize: 11,
        margin: [0, 10, 0, 4]
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        alignment: "center"
      },
      tableCell: {
        fontSize: 9
      }
    }
  };
  
    pdfMake.createPdf(docDefinition).open();
}