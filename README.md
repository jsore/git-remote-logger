# Log Every Git Remote

When a new remote is created, log it in a running list of active repos.

<br>

# Install

> These steps will change if I figure out how to publish this to npm properly.

### Install Node.js and give npm global access

Recomend using the LTS version, currently 10.x, instead of 12.x

Easiest method for macOS, via Homebrew
```
$ brew install node
```

Or using MacPorts
```
$ port install nodejs10
```

Or download Node's `.dmg` direct from their website and use it to install<br>
https://nodejs.org/en/download/


If you're installing on any system other than macOS, go to the download's page
for install instructions

After installing Node, you can verify the installation with
```
$ node -v
$ npm -v
```

<br>

If you're new to Node, the installation is bundled with npm, Node's package manager,
which is where 3rd party Node-based projects are managed

For this program to be used easily from anywhere on your machine, npm needs global access
```
$ sudo npm i -g npm
```

This is altering npm's global config file, not any of your OS's, it's safe


<br>

### Pull down this repo's files

In your terminal, navigate to where you want the `git-remote-logger` folder to live, then
```
$ git clone https://github.com/jsore/git-remote-logger.git
```

<br>

### Tell your system this is an executable program

Move into the project folder then make `new-remote.js` executable
```
$ cd ~/your/path/to/git-remote-logger
$ chmod +x new-remote.js
```

<br>

If you didn't follow the Node.js install steps listed here and are getting an `EACCES` error:<br>
https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

<br>

### Initialize the package with npm

Because I haven't bundled this with npm, you need to tell npm this is a new package
```
$ npm init -y
```

The `-y` flag sets the `package.json` file this command creates to its defaults

You'll be changing this after the next step

<br>

Install this program's dependencies
```
$ npm i --save lodash
$ npm i --save yargs
```

<br>

I have custom SSH Hosts set so I've purposefully not included a pre-configured `package.json`

Open yours in your text editor and alter it to match this:
```
{
  "name": "git-remote-logger",
  "version": "1.0.2",
  "description": "Establishes and tracks Git/GitHub Remotes",
  "main": "new-remote.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/jsore/git-remote-logger"
  },
  "author": "Justin Sorensen",
  "license": "ISC",
  "bin": {
    "remotes": "./new-remote.js"
  },
  "dependencies": {
    "lodash": "^4.17.11",       <-- your version may differ, that's fine
    "yargs": "^13.2.2"          <-- your version may differ, that's fine
  }
}
```

An important thing to note before moving forward is the `"bin": { }` option `"remotes"`

Whatever you enter for that field will be the name of the command you run to use this program

<br>

### Add a global symlink to the program

The whole point of this repo is to build an OS-wide command, like `cd`, `ls`, `ping`, etc

While still in the project folder, add a global symlink to this package with npm
```
$ sudo npm link
```

<br>

# Usage

### Add remotes

From anywhere on your create a new directory named after a project (new or existing)

```
$ git init

( add or change some files in the project directory )

$ git add -A
$ git commit -m "First commit"
```

For new projects, create a new repo on GitHub and give the program it's remote addreess

> SSH example
```
$ remotes add git@github.com:username/some-project.git
```

> HTTPS example
```
$ remotes add https://github.com/username/some-project.git
```

Or if you're wanting to add an existing GitHub project, add its remote then pull down its files
```
$ remotes add https://github.com/username/some-project.git
$ remotes pull origin master
```

<br>

### View remotes

This program logs all your remotes automatically

To see all active remotes
```
$ remotes view-all
```

<br>

### Remove remotes

```
$ remotes remove
```

<br>

### Push commits to a remote

```
$ remotes push
```

<br>

### Help

```
$ remotes help
```

<br><br>

### For more GitHub fun

https://github.com/jsore/multi-github-ssh-keys