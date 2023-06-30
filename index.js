const express = require("express");
const pdfMake = require("pdfmake");

const app = express();
const port = 3030;

app.get("/generate-pdf", (req, res) => {
  const fonts = {
    Roboto: {
      normal: "fonts/Roboto-Regular.ttf",
      bold: "fonts/Roboto-Bold.ttf",
      italics: "fonts/Roboto-Italic.ttf",
      bolditalics: "fonts/Roboto-BoldItalic.ttf",
    },
  };

  const documentDefinition = {
    content: [
      {
        image: "download.png",
        width: 375,
      },

      {
        style: "tableExample",
        width: "auto",
        table: {
          body: [
            ["PAY SLIP", " ", "PAY MONTH", "MARCH_2023"],
            ["Employee Name", " ", "Casual Leave", "6"],
            ["Designation", " ", "Sick Leave", "1"],
            ["Working Days", "31", "Used Leave", "1"],
            ["Worked days", " ", "Total Balance Leave", "6"],
            ["CTC", "15000.00", " ", " "],
          ],
        },
      },
      {
        text: "\n",
      },

      {
        style: "tableExample",
        width: "*",
        table: {
          body: [
            ["Earnings", "Amount", "Deduction", "Amount"],
            ["Basic", "9000.00", "LWP (Leave Without Pay)", "0.00"],
            ["HRA", "4500.00", " ", " "],
            ["Conveyance", "300.00", "", ""],
            ["Medical", "600.00", " ", " "],
            ["Insurance", "600.00", " ", " "],
            ["Total Earning", "15000.00", "Total Deduction", "0.00"],
          ],
        },
      },

      {
        text: "\n",
      },
      {
        text: "\n",
      },
      {
        text: "\n",
      },

      {
        style: "tableExample",
        table: {
          body: [[" CTC ", " 15000"]],
        },
      },

      {
        text: "\n",
      },

      {
        style: "tableExample",
        table: {
          body: [
            ["Basic 60%", "9000"],
            ["Hra 30% of CTC", "9000"],
            ["Conveyane 2% of CTC", "4500"],
            ["Medical 4% of CTC", "600"],
            ["Insurance 4% of CTC", "600"],
            [" ", "15000"],
          ],
        },
      },
    ],

    defaultStyle: {
      font: "Roboto",
    },
  };

  const printer = new pdfMake(fonts);

  const pdfDoc = printer.createPdfKitDocument(documentDefinition);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=dummy.pdf");

  pdfDoc.pipe(res);
  pdfDoc.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
