// Forked from: https://github.com/Quramy/typed-css-modules/blob/master/src/cli.js

const path = require('path');
const gaze = require('gaze');
const glob = require('glob');
const yargs = require('yargs');
const chalk = require('chalk');
const DtsCreator = require('typed-css-modules');
const fs = require('fs');
const sass = require('node-sass');

const yarg = yargs
  .usage('Create .scss.d.ts from CSS modules *.scss files.\nUsage: $0 [options] <input directory>')
  .example('$0 src/styles')
  .example('$0 src -o dist')
  .example('$0 -p styles/**/*.scss -w')
  .demand(['_'])
  .alias('o', 'outDir')
  .describe('o', 'Output directory')
  .alias('p', 'pattern')
  .describe('p', 'Glob pattern with scss files')
  .alias('w', 'watch')
  .describe('w', "Watch input directory's css files or pattern")
  .boolean('w')
  .alias('h', 'help')
  .help('h');
const argv = yarg.argv;
let creator;

const writeFile = function(f) {
  console.log(`Loading ${f}`);

  sass.render({ file: f }, function(err, css) {
    if (err) {
      console.log(chalk.red(`[Error] ${err.stack}`));
      return;
    }

    const cssFile = `${f}.css`;
    console.log(`Writing ${cssFile}`);

    fs.writeFile(cssFile, css.css, 'utf-8', function(err) {
      if (err) {
        console.log(`[Error] ${err}`);
        return;
      }
      console.log(`Extracting ${cssFile}`);
      creator
        .create(cssFile, null, !!argv.w)
        .then(function(content) {
          const outFile = `${f}.d.ts`;
          content.messageList.forEach(function(message) {
            console.log(`[Warn] ${chalk.red(message)}`);
          });
          fs.writeFile(outFile, content.formatted, 'utf-8', function(err) {
            if (err) {
              console.log(`[Error] ${err}`);
            }
            console.log(`Wrote ${chalk.green(outFile)}`);
          });
          fs.unlink(cssFile, function(err) {
            if (err) {
              console.log(`[Error] ${err}`);
            }
          });
        })
        .catch(function(reason) {
          console.log(`[Error] ${reason}`);
        });
    });
  });
};

const main = function() {
  let rootDir;
  if (argv.h) {
    yarg.showHelp();
    return;
  }

  let searchDir = './';
  if (argv._ && argv._[0]) {
    searchDir = argv._[0];
  }

  console.log(`Search dir${searchDir}`);

  const filesPattern = path.join(searchDir, argv.p || '**/*.scss');

  console.log(`Files pattern ${filesPattern}`);

  rootDir = process.cwd();
  creator = new DtsCreator({ rootDir, searchDir, outDir: argv.o });

  if (!argv.w) {
    glob(filesPattern, null, function(err, files) {
      if (err) {
        console.error(err);
        return;
      }
      if (!files || !files.length) return;
      console.log(`Found ${files.length} files`);
      files.forEach(writeFile);
    });
  } else {
    console.log(`Watch ${filesPattern}...`);
    gaze(filesPattern, function(err, files) {
      this.on('changed', writeFile);
      this.on('added', writeFile);
    });
  }
};

main();
