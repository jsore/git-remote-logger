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

const view = async (home, data) => {
  /** sanitize paths when called */
  const dataFile = home + data;
  const remotes = await fetchRemotes(dataFile);
  const plural = remotes.length === 1 ? 'remote' : 'remotes';
  console.log(`\n  Retrieved ${remotes.length} ${plural}, printing now...\n`);
  return remotes;
}

const addition = async (argv, source, home, data) => {

  const host = argv.host;
  let remote = argv.remote;
  const repo = argv.repo;
  const branch = argv.branch;
  const command = argv._[0];
  /** sanitize paths when called */
  const dataFile = home + data;

  /** determine what kind of remote we're using (SSH/SSH+Host/HTTPS) */
  let type = argv.remote.split(':');
  let str = type[0].toString();

  /** handle scenario where a -hostname needs to be added to SSH address */
  if (host) {
    // use keys set in ~/.ssh/config for auth w/o using password, example:
    //   Host github.com-jsore
    //   HostName github.com
    //   User git
    //   IdentityFile /path/to/secret/key
    str += `-${host}`;
    type[0] = str;
    remote = type.join(':');
    console.info('\n' + `You hit '${command}' from '${source}'\n\n `,
      `Adding SSH remote with custom Host '${remote}'`);
  } else {
    /** str will default to 'https' if not an SSH remote */
    if (str !== 'https') { str = 'ssh' }
    console.info('\n' + `You hit '${command}' from '${source}'\n\n `,
      `Adding ${str.toUpperCase()} remote '${remote}'`);
  }

  const remotes = fetchRemotes(dataFile);         /** array of logged remotes */
  const log = { remote, source, repo, branch };   /** format a new logline */
  const duplicateRemote = remotes                 /** return any matching remote */
    .filter((log) => log.remote === remote);

  let fail;
  if (duplicateRemote.length === 0) {
    try {
      require('child_process').execSync(
        `git remote add ${repo} ${remote}`,
        {stdio: 'inherit'}, (error, stdout, stderr) => {
          if (error) {
            fail = error;
            return fail;
          }
          if (stderr) {
            fail = 'error';
            return fail;
          }
      });
    } catch (e) {
      console.log(`Failed: ${e}`);
      fail = e;
      return fail;
    }
  } else {
    // search for matching source?
    console.error(`  Remote already exists here: '${source}'\n`);
    return;
  }

  remotes.push(log);
  const done = await saveRemotes(remotes, dataFile);
  console.log(`\n  Remote added to logger successfully`);
  console.log(`\n  Verify your remote with 'git remote -v'`);
  console.log(`\n  Get existing repo files with 'git pull origin master'`);
};

const fetchRemotes = (dataFile) => {
  try {
    console.info(`\n  Fetching remaining remotes...`);
    const remoteStr = fs.readFileSync(dataFile);
    return JSON.parse(remoteStr);
  } catch (e) { return []; }
};

const saveRemotes = (remotes, dataFile) => {
  fs.writeFileSync(dataFile, JSON.stringify(remotes));
};

module.exports = { addition, view };


    // fetchRemotes()
    // look for duplicate remote IDs
    // if duplicate, try to match ${source} to ${source} under the stored remote ID
    // if duplicate IDs + ${source}, fail
    // if ${source}'s don't match, ask user if should continue with addition
    // if no duplicates, $ cd ${source}, $ git remote add, $ cd -
    // if successfully added, store using full remote as ID
