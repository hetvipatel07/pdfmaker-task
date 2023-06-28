const express = require('express');
const pdfMake = require('pdfmake');

const app = express();
const port = 3030;

app.get('/generate-pdf', (req, res) => {
  // Define the font definition
  const fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Bold.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-BoldItalic.ttf',
    },
  };

  // Define the document definition
  const documentDefinition = {
    content: [
      { text: 'This is a dummy PDF generated using pdfmake!', font: 'Roboto' },
      { text: 'You can add more text, images, tables, and other elements to customize it.', font: 'Roboto' },
    ],
    defaultStyle: {
      font: 'Roboto',
    },
  };

  // Create a PDF instance
  const printer = new pdfMake(fonts);

  // Generate the PDF
  const pdfDoc = printer.createPdfKitDocument(documentDefinition);

  // Set the appropriate headers for PDF response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf');

  // Stream the PDF directly to the response
  pdfDoc.pipe(res);
  pdfDoc.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
