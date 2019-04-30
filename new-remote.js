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

const origin = 'origin';

/** command parameters */
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
const branchArg = {
    describe: 'Optional branch to push staged files to',
    demand: false,
    alias: 'b'
}

/** what to do with those parameters */
const argv = yargs
    .command('add', 'Add a new remote', {
        host: sshHostArg,
        remote: remoteArg
    })
    .command('view-all', 'View all connected SSH remotes')
    .command('push', 'Push staged files to the remote branch', {
        branch: branchArg
    })
    /** make available at comman runtime */
    .help()
    /** call argv on return of command() for yarg to store its args */
    .argv;

/** the command provided to program github-remotes */
var command = argv._[0];
// console.log('Command: ', command);
// console.log('raw process.argv version: ', process.argv);
// console.log('raw lodash + yargs version:', argv);


// from NodeBasics/notesApp-node/app.js
if (command === 'add') {
    // add a remote and log the addition

    var note = notes.addNote(argv.title, argv.body);
    if (note) { notes.logNoteSuccess(note, 'added successfuly');
    } else { notes.logNoteAlt('Note title taken'); }

} else if (command === 'view-all') {
    // view all remotes logged with add

    var allNotes = notes.getAll();
    var allBoolean = true;
    allNotes.forEach((note) => notes.logNoteSucces(note, 'retrieved', allBoolean));

} else if (command === 'push') {
    // push commits to origin <branch>

    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note removed' : 'Note not found';
    notes.logNoteAlt(message);

} else { notes.logNoteAlt(`COmmand \"${command}\" not recognized`); }




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

