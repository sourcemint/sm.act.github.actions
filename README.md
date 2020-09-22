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
SM_ACT_GIT_SHA=6a422689edf9d3e087fc3f072ccb57ed8a88e012
SM_ACT_GIT_SHA7=6a42268
SM_ACT_GIT_SHA3=6a4
SM_ACT_RUN_ID=github-actions-258758954
SM_ACT_NAME=Snapshot
SM_ACT_ACTOR_URI=github.com/cadorn
SM_ACT_TRIGGER_EVENT=push
SM_ACT_COMPONENT_ID=/
SM_ACT_GIT_BRANCH=dev
SM_ACT_GIT_COMMIT_AUTHOR=Christoph Dorn <christoph@christophdorn.com>
SM_ACT_GIT_COMMIT_DATE=Wed Sep 16 22:18:06 2020 -0700
SM_ACT_GIT_COMMIT_MESSAGE=fix
SM_ACT_ID=3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot
SM_ACT_FSID=3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot
SM_ACT_SNAPSHOT_ID=20-09-17:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:6a42268:dev:0518-38:github.com/cadorn:github-actions-258758954
SM_ACT_SNAPSHOT_ID7=b986814
SM_ACT_SNAPSHOT_HID=20-09-17:78ae465:e9a0cb3:42099b4:b08ae37:6a42268:34c6fce:0518-38:57e542e:103a6c0
SM_ACT_SNAPSHOT_FSID=20-09-17/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/6a42268/dev/0518-38/github.com~cadorn/github-actions-258758954
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
     "id": "20-09-17:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:6a42268:dev:0518-38:github.com/cadorn:github-actions-258758954",
     "id7": "b986814",
     "hid": "20-09-17:78ae465:e9a0cb3:42099b4:b08ae37:6a42268:34c6fce:0518-38:57e542e:103a6c0",
     "fsid": "20-09-17/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/6a42268/dev/0518-38/github.com~cadorn/github-actions-258758954",
     "logs": {
          "url": "https://api.github.com/repos/sourcemint/sm.act.github.actions/actions/runs/258758954/logs"
     },
     "artifacts": {
          "url": "https://api.github.com/repos/sourcemint/sm.act.github.actions/actions/runs/258758954/artifacts"
     },
     "meta": {
          "REPO_GUID": "3-02453f6-7-136",
          "REPO_URI": "github.com/sourcemint/sm.act.github.actions",
          "GIT_REMOTE": "git@github.com:sourcemint/sm.act.github.actions.git",
          "GIT_REF": "refs/heads/dev",
          "GIT_SHA": "6a422689edf9d3e087fc3f072ccb57ed8a88e012",
          "GIT_SHA7": "6a42268",
          "GIT_SHA3": "6a4",
          "RUN_ID": "github-actions-258758954",
          "NAME": "Snapshot",
          "ACTOR_URI": "github.com/cadorn",
          "TRIGGER_EVENT": "push",
          "COMPONENT_ID": "/",
          "GIT_BRANCH": "dev",
          "GIT_COMMIT_AUTHOR": "Christoph Dorn <christoph@christophdorn.com>",
          "GIT_COMMIT_DATE": "Wed Sep 16 22:18:06 2020 -0700",
          "GIT_COMMIT_MESSAGE": "fix",
          "ID": "3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot",
          "FSID": "3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot",
          "SNAPSHOT_ID": "20-09-17:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:6a42268:dev:0518-38:github.com/cadorn:github-actions-258758954",
          "SNAPSHOT_ID7": "b986814",
          "SNAPSHOT_HID": "20-09-17:78ae465:e9a0cb3:42099b4:b08ae37:6a42268:34c6fce:0518-38:57e542e:103a6c0",
          "SNAPSHOT_FSID": "20-09-17/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/6a42268/dev/0518-38/github.com~cadorn/github-actions-258758954",
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

License
=======

Copyright &copy; 2020 Christoph Dorn. Licensed under the OSL License.
