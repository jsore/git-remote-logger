/**
 * git-remote-logger/lib/parser.js
 */
'use strict';

/** need to require() this file to use any exports */

//const addition = (str, type) => {
const addition = (str, type) => {
    str += `-${argv.host}`;
    type[0] = str;
    console.log(`SSH remote with custom Host:\n  ${type.join(':')}`);
};

const remotes = () => {
    console.log('got here');
};
module.exports = addition, remotes;