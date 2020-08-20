const path = require('path');
const createHtmlFile = require('./src/js/render-html.js');
// Construct MD Paths
const mdFilepathFrom = path.resolve(process.argv[2]);
const mdFilepathParsed = path.parse(mdFilepathFrom);
// Construct HTML Paths
const htmlFilepathToDir = mdFilepathParsed.dir + '/HTML/';
const htmlFilepathTo = htmlFilepathToDir + mdFilepathParsed.name + '.html';
// Create files
(async () => {
  // Create the html file.
  await createHtmlFile(mdFilepathFrom, htmlFilepathTo);
})();
