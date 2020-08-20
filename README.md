
# Markdown document generator

This project provides an easy boilerplate to create pdf documents from
markdown files (for example for invoices or proposals).

As the pdf gets rendered by leveraging puppeteer it can easily be extended and
it's styling changed by altering the css and (nunjucks) template files.

## Features

  * Markdown includes to be able to split your document into reusable snippets.
  * Complex layouts through the usage of markdown extensions.
  * Chart rendering with Apexcharts (see examples/example-charts.md)

## Benefits

  * Easy to keep consistency in your organization's documents.
  * Easy collaboration and revisioning through source-control.
  * Separation of content and styling.
  * Cross-Platform

## Usage

Check out the examples/example.md file for a basic reference document.

  * Create PDF document: ```npm run pdf examples/example.md```
  * Create HTML document: ```npm run html examples/example.md```

Files will be created in a Subfolder (HTML / PDF). HTML file/folder always
gets created (as this is the base for PDF rendering).
