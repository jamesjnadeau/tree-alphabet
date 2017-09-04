// see http://kottke.org/17/09/the-tree-alphabet

var pageWidth = 24;
var pageHeight = 36;
var fs = require('fs');
var svg = require('svg-builder')
  .width(pageWidth + 'in')
  .height(pageHeight + 'in');

// add in tree font style
svg.root += fs.readFileSync('./tree-font.style');

var lettersMapping = require('./letters.js');
var letters = Object.keys(lettersMapping);

var perRow = 4;
var rowPos = 0;
var margin = 1.5;
var rowHeight = (pageHeight - (2*margin)) / Math.round(letters.length / perRow);
var letterWidth = (pageWidth - (2*margin)) / perRow;
var x = margin;
var y = margin + (rowHeight/2);
var rowPos = 0;
console.log('test', Math.round(letters.length / perRow));
console.log('rowHeight', rowHeight);
console.log('letterWidth', letterWidth);


letters.forEach(function(letter) {
  var tree = lettersMapping[letter];
  console.log(rowPos, x, y);
  svg.text({
    x: x + (letterWidth/4) + 'in',
    y: y + 'in',
    'font-family': 'Trees',
    'font-size': letterWidth - (letterWidth/6) + 'in',
    'text-anchor': 'right',
    stroke : '#000',
    fill: '#000',
  }, letter);
  svg.text({
    x: x + (letterWidth / 2) + 'in',
    y: y + .5 + 'in',
    'font-family': "'Permanent Marker', serif",
    'font-size': '28px',
    'text-anchor': 'middle',
    stroke : '#000',
    fill: '#000',
  }, tree);
  
  x += letterWidth;
  rowPos++;
  if (rowPos === perRow) {
    rowPos = 0;
    x = margin;
    y += rowHeight;
  }
});





fs.writeFile('output.svg', svg.render(), function(err) {
  if (err) return console.error(err);
  console.log('file saved');
});

