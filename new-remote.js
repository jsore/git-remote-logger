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

// notesApp-node/app.js

const fs = require('fs');
const remotesLog = './git-remotes.txt';
const trigger = './new-remote.txt';
const yargs = require('yargs');
/**
 * makes JavaScript easier by taking the hassle out of working
 * with arrays, numbers, objects, strings, etc.
 *
 * Lodash’s modular methods are great for:
 *
 *      Iterating arrays, objects, & strings
 *      Manipulating & testing values
 *      Creating composite functions
 */
const _ = require('lodash');

// $ git remote add origin git@github.com-jsore:jsore/git-remote-logger.git

const defaultBranch = 'origin';
const sshHostArg = {
    describe: 'Which SSH Host to use ( see ~/.ssh/config for options )',
    demand: true,
    alias: 'h'
};
const remoteArg = {
    describe: 'Remote SSH Address',
    demand: true,
    alias: 'r'
};

const argv = yargs
    .command('add', 'Add a new remote', {
        host: sshHostArg,
        remote: remoteArg
    })
    .command('view-all', 'View all connected SSH remotes')
    /** make available at comman runtime */
    .help()
    /** call argv on return of command() for yarg to store its args */
    .argv;

/** the command provided to program github-remotes */
var command = argv._[0];
// console.log('Command: ', command);
// console.log('raw process.argv version: ', process.argv);
// console.log('raw lodash + yargs version:', argv);


//if (!logfile) {
//    return console.log('log not found');
//};
//
//fs.readFile(logfile, 'utf-8', (err, data) => {
//    if (err) return console.error(`oops: ${err}`);
//
//    let logs = data.toString();
//    console.log('Your logger found the following active remotes:\n');
//});

