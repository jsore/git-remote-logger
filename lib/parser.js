/**
 * git-remote-logger/lib/parser.js
 *
 * does the work of adding remotes, logging them and
 * supplying the log when requested
 */
'use strict';

/** require() this file to use any exports */

const fs = require('fs');
const path = require('path');



const addition = async (argv, source, home, data) => {
//  try {
    const host = argv.host;
    let remote = argv.remote;
    const repo = argv.repo;
    const branch = argv.branch;
    const command = argv._[0];
    console.log(home);

    /** determine what kind of remote we're using (SSH/SSH+Host/HTTPS) */
    let type = argv.remote.split(':');
    let str = type[0].toString();

    /** handle scenario where a -hostname needs to be added to SSH address */
    if (host) {
      /**
       * review your ~/.ssh/config for Host settings, example:
       *
       *    Host github.com-jsore
       *    HostName github.com
       *    User git
       *    IdentityFile /path/to/secret/key
       *
       * now I can push/pull with SSH key auth, no passwords
       */
      str += `-${host}`;
      type[0] = str;
      remote = type.join(':');

      /** logs for sanity check */
      console.info('\n' + `You hit '${command}' from '${source}'\n\n `,
        `Adding SSH remote with custom Host '${remote}'`);

    } else {
      /** str will default to 'https' if not an SSH remote */
      if (str !== 'https') { str = 'ssh' }

      /** logs for sanity check */
      console.info('\n' + `You hit '${command}' from '${source}'\n\n `,
        `Adding ${str.toUpperCase()} remote '${remote}'`);
    }

    /** get an array of all current remotes logged */
    const remotes = fetchRemotes(home);
    //console.log('\nCurrent remotes:\n', remotes);

    /** format a new logline */
    const log = { remote, source, repo, branch };

    /** return any matching remote */
    const duplicateRemote = remotes.filter((log) => log.remote === remote);

    if (duplicateRemote.length === 0) {
      /** rebuild .json DB and return the addition */
      remotes.push(log);
      const done = await saveRemotes(remotes, data);
      return log;
    } else {
      // search for matching source?
      console.error(`  Remote already exists here: '${source}'\n`);
    }

//  } catch (e) { console.error(e) }
};

//const remotes = async () => {};

const fetchRemotes = () => {
  try {
    console.info(`  Fetching remaining remotes...`);
    //const remoteStr = fs.readFileSync('/Users/justin/Core/Dev/Pub/git-remote-logger/remotes-data.json');
    //const remoteStr = fs.readFileSync(home, '/remotes-data.json');
    const remoteStr = fs.readFileSync(data);
    // console.log(remoteStr);

    return JSON.parse(remoteStr);
  } catch (e) { return []; }
};

const saveRemotes = (remotes, data) => {
  //fs.writeFileSync('/Users/justin/Core/Dev/Pub/git-remote-logger/remotes-data.json', JSON.stringify(remotes));
  fs.writeFileSync(data, JSON.stringify(remotes));
  //fs.appendFile('/Users/justin/Core/Dev/Pub/git-remote-logger/remotes-data.json', )
};

module.exports = { addition };


    // fetchRemotes()
    // look for duplicate remote IDs
    // if duplicate, try to match ${source} to ${source} under the stored remote ID
    // if duplicate IDs + ${source}, fail
    // if ${source}'s don't match, ask user if should continue with addition
    // if no duplicates, $ cd ${source}, $ git remote add, $ cd -
    // if successfully added, store using full remote as ID
