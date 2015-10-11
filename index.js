'use strict';

var fs = require('fs');
var glob = require('glob');
var html2js = require('angular-html2js');
var minify = require('html-minifier').minify;
var uglify = require('uglify-js');

var outfile, replace, replacement;

function transform(data) {
  if (replace) {
    var pattern = new RegExp('(\\$templateCache\\.put\\()("|\')(' + replace + ')(.*)', 'g');
    var r = '$1$2' + (replacement ? replacement + '$4' : '$4');
    data  = data.replace(pattern, r);
  }

  var uglified, stream;

  uglified = uglify.minify(data, {
    fromString: true,
    mangle: true,
    optimize: 'uglify2',
    compress: {warnings: false},
    uglify2: {output: {beautify: false}}
  });

  // strip out whitespace from minified code
  uglified.code = uglified.code.replace(/\\n\s+/gm, '')

  stream = fs.createWriteStream(outfile);
  stream.write(uglified.code);
  stream.end();

  console.log('templates created @', outfile);

  return stream;
}

// usage for this example-app
// require('./').compileTemplates('src/app/templates.js', 'app', 0, 'src/app/', null, './src/**/*.html');
exports.compileTemplates = function (p_outfile,
                                     p_modulename,
                                     p_standalone,
                                     p_replace,
                                     p_replacement,
                                     p_inputfiles)  {


  outfile = p_outfile;
  var modulename =  p_modulename ? p_modulename : 'templates';
  var standalone =  !!p_standalone;
  replace = p_replace;
  replacement = p_replacement;

  if (p_inputfiles) {

    glob(p_inputfiles, function (err, files) {
      if (err) throw err;

      console.info('found %d template files:\n%s\n', files.length, files);

      html2js({
        entries: files,
        standalone: standalone,
        module: modulename,
        replace: replace || '',
        transform: function (html, callback) {
          html = minify(html, {removeComments: true});
          callback(html);
        }
      }).bundle(transform);

    });
  }
};
