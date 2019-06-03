Installation
============

This project uses npm for package management, so after cloning the repository, install all of the dependent packages with npm. Note that you must have Python 2.7 in PATH in order for the install to work.

```
npm install
```


Developers
==========


Server
------

To start the project for the purpose of testing or adding features, use the npm command to start a development server.  The port that the application runs on can be changed, but the default port is 4200.

```
npm start
```

Environment
-----------

Each developer should manage their own `.env` file in the root of the project. The file should not be checked into version control.  A default `.env` file is provide as `.env-default`.  Please copy that into place before starting development. The `.env` file should contain the following:

```
WEBEX_TOKEN = [YOUR TOKEN HERE]
API_URI = http://localhost:7150/assistant-nlp/api/v1/parse
```

Lint
----

It is recommended that developers configure their editors to support [editorconfig](http://editorconfig.org/#download) and [eslint](http://eslint.org/docs/user-guide/integrations).  These will be used to make sure that all of the contributors are creating similar code.  The rules are fairly loose, but I suspect that as we learn more about what works and what does not, we will tighten them up. You can run eslint from command line using the following command.

```
npm run lint
```

Tests
-----

A test harness has been configured to help in testing project code.  The tests are run using [jest](https://facebook.github.io/jest/index.html).  Use the following command to run the tests.

```
npm test
```

If you want the tests to rerun when a file is change, you can run the test watcher.

```
npm run watch
```

Deploy
------

Run `deploy.sh`.

```
$ cd ui
$ ./deploy.sh
```

This will clone the personnel repo and check out the `gh-pages` branch, then add the built application to the content in the branch.

If you set your git committer and author per-repo rather than globally, you may encounter errors running the script and commiting the changes on the `gh-pages` branch. To get around this, set the `GIT_AUTHOR_EMAIL` and `GIT_COMMITTER_EMAIL` environment variables.

```
$ GIT_AUTHOR_EMAIL=myemail@cisco.com GIT_COMMITTER_EMAIL=myemail@cisco.com ./deploy.sh
```
