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
//const remotesLog = './git-remotes.txt';
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
const source = process.cwd();

/** what to do with those parameters */



const argv = yargs
  .command('add', 'Add a new remote', {
    r: {
      alias: 'remote',
      describe: 'Remote URL or SSH address to use',
      demandOption: true,
    },
    h: {
      alias: 'host',
      describe: 'Optional custom SSH Host to use'
    },
    o: {
      alias: 'origin',
      describe: 'Specify a reference to this repo',
      default: 'origin'
    },
    b: {
      alias: 'branch',
      describe: 'Specify a parent branch for this repo',
      default: 'master'
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

const command = argv._[0];
// if (command === 'add') { parse.addition(argv) }
console.log(argv);
if (command === 'add') {
  //const logfile = fs.readFileSync('notes-data.json');
  let remote = parse.addition(argv, source);
  if (remote) { console.log(remote, 'added succesfully'); }
  //else {  }
}

// $ git remote add origin git@github.com-jsore:jsore/git-remote-logger.git
// github-remotes add -r https://github.com/jsore/git-remote-logger.git
// github-remotes add -r git@github.com:jsore/git-remote-logger.git
// github-remotes add -r git@github.com:jsore/git-remote-logger.git -h jsore
// github-remotes add -h jsore
// git remote add ${origin} ${arr.join(':')}


/** the command provided to program github-remotes */


// from NodeBasics/notesApp-node/app.js
//if (command === 'add') {
//
//  var note = notes.addNote(argv.title, argv.body);
//  if (note) { notes.logNoteSuccess(note, 'added successfuly');
//  } else { notes.logNoteAlt('Note title taken'); }
//
//} else if (command === 'view-all') {
//
//  var allNotes = notes.getAll();
//  var allBoolean = true;
//  allNotes.forEach((note) => notes.logNoteSucces(note, 'retrieved', allBoolean));
//
//} else if (command === 'push') {
//
//  var noteRemoved = notes.removeNote(argv.title);
//  var message = noteRemoved ? 'Note removed' : 'Note not found';
//  notes.logNoteAlt(message);
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

