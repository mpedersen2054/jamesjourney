
var slugify = function(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g,      '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '')  // Remove all non-word chars
    .replace(/\-\-+/g,    '-') // Replace -- with -
    .replace(/^-+/,       '')  // Trim - from start of text
    .replace(/-+$/,       ''); // Trim - from end of text
}

module.exports = slugify;