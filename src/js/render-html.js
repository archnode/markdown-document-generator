const fs = require("fs");
const path = require('path');
const mdAttrs = require('markdown-it-attrs');
const mdFrontMatter = require('markdown-it-front-matter');
const mdContainer = require('markdown-it-container');
const mdTableMultiMD = require('markdown-it-multimd-table');
const mdInclude = require('markdown-it-include');
const nunjucks = require('nunjucks');
const { writeResultFile } = require('./util.js');
const yaml = require('yaml');

let frontmatter = "";

const ApexPlugIn = (md, opts) => {
  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const code = `${token.info} \n ${token.content.trim()}`;
    const tmp = token.content.trim();
    if (token.info === "apex") {
      try {
        const json = JSON.parse(tmp);
        var ApexChartsId = "Apex" + Math.floor(Math.random() * 100) + 1;
        return `<div ${self.renderAttrs(
          token
        )} type="apexChart" data-options=${JSON.stringify(
          json
        )}  id=${ApexChartsId}  ></div>`;
      } catch (err) {
        return `<pre>${err}</pre>`;
      }
    }

    return defaultRenderer(tokens, idx, opts, env, self);
  };
};

const md = require('markdown-it')({
  'linkify': true
})
    .use(mdAttrs)
    .use(mdFrontMatter, function(fm) {
      frontmatter = fm;
    })
    .use(mdContainer, 'grid-2col')
    .use(mdContainer, 'grid-item')
    .use(mdContainer, 'dl', {
      render: function (tokens, idx) {
        return renderDl(tokens, idx, 'dl');
      }
    })
    .use(mdContainer, 'dl--numbered', {
      render: function (tokens, idx) {
        return renderDl(tokens, idx, 'dl--numbered');
      }
    })
    .use(mdContainer, 'dl-row', {
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^dl-row\s+(.*)$/);
        var label = '';
        if (m) {
          label = md.utils.escapeHtml(m[1]);
        }
        // opening tag
        if (tokens[idx].nesting === 1) {
          return '<div class="dl-row"><div class="dl-title">' + label + '</div><div class="dl-content">';
        }
        // closing tag
        else {
          return '</div></div>\n';
        }
      }
    })
    .use(mdContainer, 'list-pos', {
      render: function (tokens, idx) {
        // opening tag
        if (tokens[idx].nesting === 1) {
          var output = `<div class="dl">`;
          output += '<div class="dl-header"><div class="dl-header-row"><div>Pos</div><div>Ergebnis</div><div>Bereich</div></div></div>\n';
          output += '<div class="dl-rows">\n';
          return output;
        }
        // closing tag
        else {
          return '</div></div>\n';
        }
      }
    })
    .use(mdContainer, 'list-pos-row', {
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^list-pos-row\s+(.*)$/);
        var alertClass = 'info';
        var posText = '';
        if (m) {
          labelArray = md.utils.escapeHtml(m[1]).split('|');
          posText = labelArray[0];
          if (labelArray.length > 1) {
            alertClass = labelArray[1];
          }
        }
        // opening tag
        if (tokens[idx].nesting === 1) {
          return '<div class="list-pos-row"><div class="list-pos-pos">' + posText + '</div><div class="list-pos-result list-pos-result--' + alertClass + '"><i class="icon-' + alertClass + '"></i></div><div class="list-pos-content">';
        }
        // closing tag
        else {
          return '</div></div>\n';
        }
      }
    })
    .use(mdTableMultiMD, {
      multiline:  true,
      rowspan: true
    })
    .use(mdInclude, path.resolve('components/'))
    .use(ApexPlugIn);

function renderDl(tokens, idx, dlClass) {
  // opening tag
  if (tokens[idx].nesting === 1) {
    var output = `<div class="${dlClass}">`;
    output += '<div class="dl-header"><div class="dl-header-row"><div>Titel</div><div>Beschreibung</div></div></div>\n';
    output += '<div class="dl-rows">\n';
    return output;
  }
  // closing tag
  else {
    return '</div></div>\n';
  }
}

function getMarkdownContent(fileContent) {
  const markdownHtml = md.render(fileContent);

  if (frontmatter) {
    frontmatter = yaml.parse(frontmatter);
  }

  return {
    html: markdownHtml,
    frontmatter: frontmatter
  }
}

function addDocumentWrapper(fileContent, frontmatter) {
  const srcPath = path.resolve('src');
  const modulesPath = path.resolve("node_modules");
  const templatePagePath = path.resolve('templates/page.html');
  const today = new Date();
  // Create date.
  const date = new Date(Date.parse(frontmatter.date));
  const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  // Render to nunjucks.
  return nunjucks.render(templatePagePath, {
    'src_path': srcPath,
    'modules_path': modulesPath,
    'page_content': fileContent,
    'frontmatter': frontmatter,
    'date': dateString,
    'print_date': today.toLocaleDateString("de-AT")
  })
}

let createHtmlFile = async (filepathFrom, filepathTo) => {
    // Parse the file content.
  const fileContent = fs.readFileSync(filepathFrom, "utf8");
  const { html, frontmatter } = getMarkdownContent(fileContent);
  const htmlContent = addDocumentWrapper(html, frontmatter);
  await writeResultFile(filepathTo, htmlContent);
};

module.exports = createHtmlFile;
