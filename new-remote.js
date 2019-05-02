#!/usr/bin/env node

/**
 * make this executable first
 *
 *      $ chmod +x new-remote.js
 *
 * then add a symlink globally with npm, from this directory
 *
 *      $ sudo npm link
 *
 * now, commands names listed in package.json.bin are global
 *
 * to undo that
 *
 *      $ sudo npm link
 */
'use strict';


/** node modules */
const fs = require('fs');
const path = require('path');

/** 3rd party modules */
const yargs = require('yargs');   // parse CLI arguments
const _ = require('lodash');      // array iteration, testing, manipulation

/** custom modules */
const parse = require('./lib/parser.js');

/** other globals */
const source = process.cwd();          // where commands originate
const home = path.resolve(__dirname);  // where this package/data are installed
const data = path.resolve(__dirname, '/remotes-data.json');

/** settings for CLI environment when program is executed */
const argv = yargs
  .command('add', 'Add a new remote', {
    r: { alias: 'remote', describe: 'Remote URL or SSH address to use',
         demandOption: true },
    h: { alias: 'host', describe: 'Optional: Specify a custom SSH Host' },
    o: { alias: 'repo', describe: 'Optional: Name for this repo',
         default: 'origin' },
    b: { alias: 'branch', describe: 'Optional: Parent branch for this repo',
         default: 'master' }
  })
  .command('view-all', 'View all connected SSH remotes')
  .command('remove', 'Remove a remote', {
    o: { alias: 'origin', describe: 'Specify a reference other than "origin"',
         default: 'origin' }
  })
  /** future features */
  //.command('pull', 'Pull down files from current remote', {
  //  o: { alias: 'origin', describe: 'Specify a reference other than "origin"',
  //       default: 'origin' },
  //  b: { alias: 'branch', describe: 'Specify a branch other than "master"',
  //       default: 'master' }
  //})
  //.command('push', 'Push staged files to the remote branch', {
  //  o: { alias: 'origin', describe: 'Specify a reference other than "origin"',
  //       default: 'origin' },
  //  b: { alias: 'branch', describe: 'Specify a branch other than "master"',
  //       default: 'master' }
  //})
  .demandCommand(1, 'Use --help options for guidance')
  .help('help', 'Show usage information')
  .example('$0 --help', 'General usage')
  .example('$0 add --help', 'Command-specific usage')
  /** call home to wrap up yargs storage into argv */
  .argv;

/** the command this program is called with */
const command = argv._[0];

if (command === 'add') {
  try {
    let remote = parse.addition(argv, source, home, data)
    .then((remote) => {
      if (remote) {
        console.log(`\n  Remote added to logger successfully`);
      } else {
        console.log('The remote you tried adding already exists here\n' +
          'You can confirm this with "git remotes -v"')
      }
    }).catch(err => console.log(err));
  } catch (e) { console.error(e); }

} else if (command === 'view-all') {
  try {
    let remotes = parse.view(home, data)
    .then((remotes) => {
      remotes.forEach((remote) =>
        console.log(`Remote:    ${remote.remote}\nFound at:  ${remote.source}\n`))
    });
  } catch (e) { console.error(e); }
} else { console.log(`Command '${command}' not recognized`); }

// $ git remote add origin git@github.com-jsore:jsore/git-remote-logger.git
// remotes add -r https://github.com/jsore/git-remote-logger.git
// remotes add -r git@github.com:jsore/git-remote-logger.git
// remotes add -r git@github.com:jsore/git-remote-logger.git -h jsore
// remotes add -h jsore
// git remote add ${origin} ${arr.join(':')}
