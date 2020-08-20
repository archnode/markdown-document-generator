const fs = require("fs");
const path = require('path');
const matter = require('gray-matter');
const createHtmlFile = require('./src/js/render-html.js');
const createPdfFile = require("./src/js/render-pdf.js");
// Construct MD Paths
const mdFilepathFrom = path.resolve(process.argv[2]);
const mdFilepathParsed = path.parse(mdFilepathFrom);
// Construct HTML Paths
const htmlFilepathToDir = mdFilepathParsed.dir + '/HTML/';
const htmlFilepathTo = htmlFilepathToDir + mdFilepathParsed.name + '.html';
// Construct PDF Paths
const pdfFilepathToDir = mdFilepathParsed.dir + '/PDF/';
// We parse the frontmatter for filepath override.
const frontmatter = matter.read(mdFilepathFrom);
let nameParts = [];
if (frontmatter.data.date) {
  const date = new Date(Date.parse(frontmatter.data.date));
  const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-`;
  nameParts.push(dateString);
}
nameParts.push("Signal-");
if (frontmatter.data.title) {
  nameParts.push(frontmatter.data.title);
}
nameParts.push(mdFilepathParsed.name);
const pdfFilepathTo = pdfFilepathToDir + nameParts.join("-") + '.pdf';
// Create files
(async () => {
  // Create the html file.
  await createHtmlFile(mdFilepathFrom, htmlFilepathTo);
  // Create the pdf file.
  await createPdfFile(htmlFilepathTo, pdfFilepathTo);
})();
