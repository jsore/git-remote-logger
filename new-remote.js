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



// NOTE
// should I change the main access point in package.json?
// if I do be sure to update README



// notesApp-node/app.js

const fs = require('fs');
const remotesLog = './git-remotes.txt';
const trigger = './new-remote.txt';
const yargs = require('yargs');

//const dir = require('node-dir');
const parse = require('./lib/parser.js');
//import * as parsers from './lib/parser.js';


const _ = require('lodash');
    /**
     * - Iterating arrays, objects, & strings
     * - Manipulating & testing values
     * - Creating composite functions
     */

const path = require('path');
const cwd = process.cwd();

/** what to do with those parameters */

const argv = yargs
    .command('add', 'Add a new remote', {
        remote: {
            alias: 'r',
            describe: 'Remote URL or SSH address to use',
            demandOption: true,
        },
        host: {
            alias: 'h',
            describe: 'Optional custom SSH Host to use'
        },
        origin: {
            alias: 'o',
            describe: 'A name for the remote repository',
            default: 'origin'
        },
    }, (argv) => {
        const host = argv.host;
        const remote = argv.remote;
        const origin = argv.origin;
        //const command = argv._[0];
        const command = argv._[0];

        console.log(
            `You hit '${command}' from: ${cwd}\n `,
            `host:      ${host}\n `,
            `remote:    ${remote}\n `,
            `origin:    ${origin}\n `,
            ``);

        let type = argv.remote.split(':');
        let str = type[0].toString();

        if (argv.host) {  // ssh with custom remote

            //parse.addition(str, type);
            parse.addition({str, type});

        } else if (str === 'https') {  // https remote

            console.log(`HTTPS remote: ${remote}`);

        } else {  // ssh without custom host

            console.log(`SSH remote: ${remote}`);

        }
    })
    .command('view-all', 'View all connected SSH remotes', (argv) => {
        parse.remotes();
    })
    //.command('pull', 'Grab an files for an existing project')
    //.command('remove', 'Remove a remote')
    .command('push', 'Push staged files to the remote branch', {
        //branch: branchArg
    })
    .demandCommand(1, 'Use --help options for guidance')
    .help('help', 'Show usage information')
    .example('$0 --help', 'General usage')
    .example('$0 add --help', 'Command-specific usage')
    // .coerce(['src', 'dest'], path.resolve)
    /** call argv on return of command() for yarg to store its args */
    .argv;

//if (command === 'view-all') {
//    //(argv) => {
//        const host = argv.host;
//        const remote = argv.remote;
//        const origin = argv.origin;
//        //const command = argv._[0];
//        const command = argv._[0];
//
//        console.log(
//            `You hit '${command}' from: ${cwd}\n `,
//            `host:      ${host}\n `,
//            `remote:    ${remote}\n `,
//            `origin:    ${origin}\n `,
//            ``);
//
//        let type = argv.remote.split(':');
//        let str = type[0].toString();
//
//        if (argv.host) {  // ssh with custom remote
//
//            //parse.addition(str, type);
//            parse.addition({str, type});
//
//        } else if (str === 'https') {  // https remote
//
//            console.log(`HTTPS remote: ${remote}`);
//
//        } else {  // ssh without custom host
//
//            console.log(`SSH remote: ${remote}`);
//
//        }
//};
// $ git remote add origin git@github.com-jsore:jsore/git-remote-logger.git
// github-remotes add -r https://github.com/jsore/git-remote-logger.git
// github-remotes add -r git@github.com:jsore/git-remote-logger.git
// github-remotes add -r git@github.com:jsore/git-remote-logger.git -h jsore
// github-remotes add -h jsore
// git remote add ${origin} ${arr.join(':')}


/** the command provided to program github-remotes */

//console.log('Command: ', command);

// console.log('raw process.argv version: ', process.argv);
//console.log('raw lodash + yargs version:\n', argv);
//console.log('source dir: ', cwd);



// from NodeBasics/notesApp-node/app.js
//if (command === 'add') {
//    // add a remote and log the addition
//
//
//    // console.log(`Adding ${remote} with SSH Host '${host}'`);
//    // console.log(`Adding ${remoteArg} with SSH Host '${sshHost}'`);
//    console.log(`Adding ${argv.remote} with SSH Host '${argv.host}'`);
//
//
//    // var note = notes.addNote(argv.title, argv.body);
//    // if (note) { notes.logNoteSuccess(note, 'added successfuly');
//    // } else { notes.logNoteAlt('Note title taken'); }
//
//} else if (command === 'view-all') {
//    // view all remotes logged with add
//
//    // var allNotes = notes.getAll();
//    // var allBoolean = true;
//    // allNotes.forEach((note) => notes.logNoteSucces(note, 'retrieved', allBoolean));
//
//} else if (command === 'push') {
//    // push commits to origin <branch>
//
//    // var noteRemoved = notes.removeNote(argv.title);
//    // var message = noteRemoved ? 'Note removed' : 'Note not found';
//    // notes.logNoteAlt(message);
//
//} else { notes.logNoteAlt(`COmmand \"${command}\" not recognized`); }




/**
 * lodash utility isString
 * -- returns true if thing is a string
 * -- returns false if thing isn't a string
 */
//console.log(_.isString(true));  // false
//console.log(_.isString('gary'));  // true

/**
 * lodash utility uniq
 * -- take an array, return it with duplicates removed
 */
//var filteredArray = _.uniq(['name', 1, 'name', 1, 2, 3, 4]);
//var filteredArray = _.uniq(['Mike']);
//console.log(filteredArray);



/** basic usage of appendFile(): */
//fs.appendFile('greetings.txt', 'Hello World!');  // Hello World!
/** concat'ing a variable: */
//fs.appendFile('greetings.txt', 'Hello' + user.username +'!');  // Helloroot!
/** using ES6 template strings (`string ${variable} more string`): */
//fs.appendFile('greetings.txt', `Hello ${user.username}!`);  // Hello root!
/** template strings and usage of exports from note.js: */
//fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`);  // Hello root! You are 25.




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

