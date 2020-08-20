const fs = require('fs');
const path = require('path');

let writeResultFile = async (filepathTo, content) => {
  fs.exists(filepathTo, function (exists) {
    if (!exists) {
      const htmlFilepathParsed = path.parse(filepathTo);
      fs.mkdir(htmlFilepathParsed.dir, function () {
        fs.writeFile(filepathTo, content, (err) => {
          if(!err) console.log('Data written');
        });
      });
    }
    else {
      fs.writeFile(filepathTo, content, (err) => {
        if(!err) console.log('Data written');
      });
    }
  });
};

module.exports = {
  writeResultFile: writeResultFile
};
