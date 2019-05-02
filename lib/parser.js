/**
 * git-remote-logger/lib/parser.js
 */
'use strict';

const fs = require('fs');

/** need to require() this file to use any exports */

// let remotes = [];
//const addition = async (argv, source) => {
const addition = async (argv, source) => {
//  try {
    const host = argv.host;
    let remote = argv.remote;
    const repo = argv.origin;
    const branch = argv.branch;
    const command = argv._[0];

    let type = argv.remote.split(':');
    let str = type[0].toString();

    // handle scenario where a -host needs to be added to SSH cmd
    if (host) {  // ssh with custom remote
      str += `-${host}`;
      type[0] = str;
      remote = type.join(':');

      console.info('\n' + `You hit '${command}' from '${source}'\n\n `,
        `host:    ${host}\n  remote:  ${remote}\n  repo:  ${repo}\n` +
        '\nAdding SSH remote with custom Host...');

    } else {
      if (str !== 'https') { str = 'ssh' }

      console.info('\n' + `You hit '${command}' from '${source}'\n\n `,
        `remote:  ${remote}\n  repo:  ${repo}\n` +
        `\nAdding ${str.toUpperCase()} remote...`);
    }

    // fetchRemotes()
    // look for duplicate remote IDs
    // if duplicate, try to match ${source} to ${source} under the stored remote ID
    // if duplicate IDs + ${source}, fail
    // if ${source}'s don't match, ask user if should continue with addition
    // if no duplicates, $ cd ${source}, $ git remote add, $ cd -
    // if successfully added, store using full remote as ID

    //const remotes = fetchRemotes(logfile);
    const remotes = fetchRemotes();

    const log = {
      remote,
      source,
      repo,
      branch
    };
    console.log(remotes);
    const duplicateRemote = remotes.filter((log) => log.remote === remote);

    if (duplicateRemote.length === 0) {
      // search for matching source?
      remotes.push(log);
      saveRemotes(remotes);
      return log;
    } else {
      console.error(`Remote already exists in ${source}\n${duplicateRemote}`);
    }

//  } catch (e) { console.error(e) }
};

//const remotes = async () => {};

const fetchRemotes = () => {
  try {
    console.log('fetching');
    const remoteStr = fs.readFileSync('/Users/justin/Core/Dev/Pub/git-remote-logger/remotes-data.json');
    console.log(remoteStr);

    return JSON.parse(remoteStr);
  } catch (e) { return []; }
};

const saveRemotes = (remotes) => {
  fs.writeFileSync('/Users/justin/Core/Dev/Pub/git-remote-logger/remotes-data.json', JSON.stringify(remotes));
};

module.exports = { addition };