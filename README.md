sm.act.github.actions
=====================

Generate **Sourcemint** `snapshot.json` reports for **Github Workflow Jobs**.

Environment Variables
---------------------

Job `step` configuration:

```
- name: "[sm.act] Set env"
  uses: sourcemint/sm.act.github.actions/.github/actions/sm-act-set-env@master

- name: "[sm.act] Show env"
  uses: sourcemint/sm.act.github.actions/.github/actions/sm-act-show-env@master
```

Sets and shows the following environment variables:

```
SM_ACT_REPO_GUID=3-02453f6-7-136
SM_ACT_REPO_URI=github.com/sourcemint/sm.act.github.actions
SM_ACT_GIT_REMOTE=git@github.com:sourcemint/sm.act.github.actions.git
SM_ACT_GIT_REF=refs/heads/dev
SM_ACT_GIT_SHA=bcf6f97fc37728a6a6ea83e919d53bce33024d39
SM_ACT_GIT_SHA7=bcf6f97
SM_ACT_GIT_SHA3=bcf
SM_ACT_RUN_ID=github-actions-266374575
SM_ACT_NAME=Snapshot
SM_ACT_ACTOR_URI=github.com/cadorn
SM_ACT_TRIGGER_EVENT=push
SM_ACT_COMPONENT_ID=/
SM_ACT_GIT_BRANCH=dev
SM_ACT_GIT_COMMIT_AUTHOR=Christoph Dorn <christoph@christophdorn.com>
SM_ACT_GIT_COMMIT_DATE=Mon Sep 21 23:02:52 2020 -0700
SM_ACT_GIT_COMMIT_MESSAGE=wip
SM_ACT_ID=3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot
SM_ACT_FSID=3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot
SM_ACT_SNAPSHOT_ID=20-09-22:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:bcf6f97:dev:0603-14:github.com/cadorn:github-actions-266374575
SM_ACT_SNAPSHOT_ID7=32a4465
SM_ACT_SNAPSHOT_HID=20-09-22:78ae465:e9a0cb3:42099b4:b08ae37:bcf6f97:34c6fce:0603-14:57e542e:70e4a0a
SM_ACT_SNAPSHOT_FSID=20-09-22/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/bcf6f97/dev/0603-14/github.com~cadorn/github-actions-266374575
SM_ACT_SNAPSHOT_ASPECT=Snapshot
SM_ACT_SNAPSHOT_ASPECT_OF=3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/
```

Snapshot Report
---------------

Job `step` configuration:

```
- name: "[sm.act] Write snapshot report"
  uses: sourcemint/sm.act.github.actions/.github/actions/sm-act-write-snapshot@master
```

Reports are written to a `_/gi0.Sourcemint.org-sm.act/snapshots` branch and stored at:

 * `._/gi0.Sourcemint.org~sm.act/snapshots/<SM_ACT_SNAPSHOT_FSID>.json`
   * The actual JSON report shown below.
 * Relative path mappings to `<SM_ACT_SNAPSHOT_FSID>.json`:
    * `._/gi0.Sourcemint.org~sm.act/snapshots-latest/<SM_ACT_FSID>`
    * `._/gi0.Sourcemint.org~sm.act/snapshots-id/<SM_ACT_SNAPSHOT_ID>`
    * `._/gi0.Sourcemint.org~sm.act/snapshots-hid/<SM_ACT_SNAPSHOT_HID>`
    * `._/gi0.Sourcemint.org~sm.act/snapshots-id7/<SM_ACT_SNAPSHOT_ID7>`

```
{
     "aspect": "Snapshot",
     "aspectOf": "3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/",
     "id": "20-09-22:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:bcf6f97:dev:0603-14:github.com/cadorn:github-actions-266374575",
     "id7": "32a4465",
     "hid": "20-09-22:78ae465:e9a0cb3:42099b4:b08ae37:bcf6f97:34c6fce:0603-14:57e542e:70e4a0a",
     "fsid": "20-09-22/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/bcf6f97/dev/0603-14/github.com~cadorn/github-actions-266374575",
     "logs": {
          "url": "https://api.github.com/repos/sourcemint/sm.act.github.actions/actions/runs/266374575/logs"
     },
     "artifacts": {
          "url": "https://api.github.com/repos/sourcemint/sm.act.github.actions/actions/runs/266374575/artifacts"
     },
     "meta": {
          "REPO_GUID": "3-02453f6-7-136",
          "REPO_URI": "github.com/sourcemint/sm.act.github.actions",
          "GIT_REMOTE": "git@github.com:sourcemint/sm.act.github.actions.git",
          "GIT_REF": "refs/heads/dev",
          "GIT_SHA": "bcf6f97fc37728a6a6ea83e919d53bce33024d39",
          "GIT_SHA7": "bcf6f97",
          "GIT_SHA3": "bcf",
          "RUN_ID": "github-actions-266374575",
          "NAME": "Snapshot",
          "ACTOR_URI": "github.com/cadorn",
          "TRIGGER_EVENT": "push",
          "COMPONENT_ID": "/",
          "GIT_BRANCH": "dev",
          "GIT_COMMIT_AUTHOR": "Christoph Dorn <christoph@christophdorn.com>",
          "GIT_COMMIT_DATE": "Mon Sep 21 23:02:52 2020 -0700",
          "GIT_COMMIT_MESSAGE": "wip",
          "ID": "3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot",
          "FSID": "3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot",
          "SNAPSHOT_ID": "20-09-22:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:bcf6f97:dev:0603-14:github.com/cadorn:github-actions-266374575",
          "SNAPSHOT_ID7": "32a4465",
          "SNAPSHOT_HID": "20-09-22:78ae465:e9a0cb3:42099b4:b08ae37:bcf6f97:34c6fce:0603-14:57e542e:70e4a0a",
          "SNAPSHOT_FSID": "20-09-22/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/bcf6f97/dev/0603-14/github.com~cadorn/github-actions-266374575",
          "SNAPSHOT_ASPECT": "Snapshot",
          "SNAPSHOT_ASPECT_OF": "3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/"
     },
     "env": {}
}
```

Activate Snapshot
-----------------

Snapshots are activated on **Named Streams** using `./bin/activate [--local]`.

Active snapshot references are written to a `_/gi0.Sourcemint.org-sm.act/snapshots-active` branch and stored at:

  * `._/gi0.Sourcemint.org~sm.act/snapshots-active/<SM_ACT_COMPONENT_ID>/<SM_ACT_NAME>/snapshotId`

Upon activation a git tag is set at `_/gi0.Sourcemint.org-sm.act/snapshots-active/<SM_ACT_COMPONENT_ID>/<SM_ACT_NAME>/<StreamName>/<Date>-<Time>-<SM_ACT_GIT_SHA7>` and the following job `step` configuration runs:

```
- name: "[sm.act] Activate snapshot"
  uses: sourcemint/sm.act.github.actions/.github/actions/sm-act-activate-snapshot@master
```

This `step` activates the snapshot using `./#!/gi0.Sourcemint.org/#!sm.act.activate.inf.json`.


Tests
=====

  * **01-TestEnvironment**

    * ![[sm] 01 - Test env](https://github.com/sourcemint/sm.act.github.actions/workflows/%5Bsm%5D%2001%20-%20Test%20env/badge.svg)

  * **02-WriteSnapshot**

    * ![[sm] 02 - Write Snapshot](https://github.com/sourcemint/sm.act.github.actions/workflows/%5Bsm%5D%2002%20-%20Write%20Snapshot/badge.svg)

  * **03-ActivateSnapshot**

    * ![[sm] 03 - Activate Snapshot](https://github.com/sourcemint/sm.act.github.actions/workflows/%5Bsm%5D%2003%20-%20Activate%20Snapshot/badge.svg)

Run tests:

  npm install
  npm test


Development
===========

  1. `git checkout -b dev`
  2. Make changes & push to github
  3. Wait for github actions to complete running
  4. `./bin/activate --local`


License
=======

Copyright &copy; 2020 Christoph Dorn. Licensed under the OSL License.
