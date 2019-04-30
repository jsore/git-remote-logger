/**
 * Pub/git-remote-logger/snippets.js
 */
'use strict';

const fs = require('fs');

/** grab the spawn method from child_process Node.js module */
const spawn = require('child_process').spawn;


/**
 * access argument vector array (passed CLI arguments)
 * argv[0] = node               // the first argument entered when running a node app
 * argv[1] = path/to/script.js  // 2nd argument, what app node is to run
 * argv[2] =                    // 1st argument supplied after telling node to run app
 */
//const filename = process.argv[2];
const logFile = './active-remotes.txt';


// watcher-spawn.js
if (!logFile) {
    throw Error('log not found');
}


// fs.writeFile()      create file or overwrite
// fs.readFile()
// fs.watch('target.txt', (err, data) => { console.log(data.toString) });


// read-stream.js
/** returns a module, works with it using EventEmitter */
require('fs').createReadStream(process.argv[2])
    .on('data', chunk => process.stdout.write(chunk))  /** data already contains \n's */
    .on('error', err => process.stderr.write(`Error: ${err.message}\n`));



// watcher.js
/** method watch() takes target path and a callback to call when file changes */
fs.watch('target.txt', () => console.log('File changed'));



// watcher-spawn.js
fs.watch(logFile, () => {
    /**
     * send spawn name of program to execute (ls) and array
     * of arguments and the program's target
     */
    const ls = spawn('ls', ['-l', '-h', logFile]);

    /** pipe stdout stream from child process into our stdout */
    ls.stdout.pipe(process.stdout);
});
console.log(`Watching ${logFile} for changes...`);



// watcher-spawn-parse.js
fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename]);
    let output = '';

    /** event listener listening for stdout from stream */
    ls.stdout.on('data', chunk => output += chunk);
    /**
     * 'data' events pass Buffer objects to whatever callback
     * specified, which are inherently toString(), as chunk
     */

    /** stores stdout from string */
    ls.on('close', () => {
        /** parse and split on whitespace */
        const parts = output.split(/\s+/);
        /** report permissions, size, filename indexes to log */
        console.log([parts[0], parts[4], parts[8]]);
    })
});
console.log(`Watching ${filename} for changes...`);