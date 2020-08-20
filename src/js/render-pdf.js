const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const { writeResultFile } = require("./util.js");

let createPdfFile = async (filepathFrom, filepathTo) => {
  // Launch the browser and render pdf.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("file:///" + filepathFrom, { waitUntil: 'networkidle2' });
  // Construct PDF Assets
  const headerFilepath = path.resolve('templates/header.html');
  const headerHtml = fs.readFileSync(headerFilepath, 'utf8');
  const footerFilepath = path.resolve('templates/footer.html');
  const footerHtml = fs.readFileSync(footerFilepath, 'utf8');

  // Create PDF
  await page.pdf({
    format: 'A4',
    margin: {
      bottom: 70, // minimum required for footer msg to display
      left: 0,
      right: 0,
      top: 30,
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: headerHtml,
    footerTemplate: footerHtml
  }).then(function(pdf) {
    writeResultFile(filepathTo, pdf);
  },
  function(error) {
    console.log(error);
  });
  await browser.close();
};

module.exports = createPdfFile;
