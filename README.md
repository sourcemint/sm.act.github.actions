sm.act.github.actions
=====================

Generate **Sourcemint** `snapshot.json` reports for **Github Workflow Jobs**.

Workflow Configuration
----------------------

```
jobs:
  Snapshot:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0

      - name: "[sm.act] Set env"
        uses: sourcemint/sm.act.github.actions/.github/actions/sm-act-set-env@master

      - name: "[sm.act] Write snapshot report"
        uses: sourcemint/sm.act.github.actions/.github/actions/sm-act-write-snapshot@master
```

Snapshot Reports
----------------

Are written to a `sm.act/snapshots` branch and stored at:

 * `._/gi0.Sourcemint.org~sm.act/snapshots/<SM_ACT_SNAPSHOT_FSID>.json` - The actual JSON report shown below.
 * `._/gi0.Sourcemint.org~sm.act/snapshots-latest/<SM_ACT_FSID>` - A relative path mapping to `<SM_ACT_SNAPSHOT_FSID>.json`.
 * `._/gi0.Sourcemint.org~sm.act/snapshots-id/<SM_ACT_SNAPSHOT_ID>` - A relative path mapping to `<SM_ACT_SNAPSHOT_FSID>.json`.
 * `._/gi0.Sourcemint.org~sm.act/snapshots-hid/<SM_ACT_SNAPSHOT_HID>` - A relative path mapping to `<SM_ACT_SNAPSHOT_FSID>.json`.
 * `._/gi0.Sourcemint.org~sm.act/snapshots-id7/<SM_ACT_SNAPSHOT_ID7>` - A relative path mapping to `<SM_ACT_SNAPSHOT_FSID>.json`.

```
{
    "aspect": "Snapshot",
    "aspectOf": "3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/",
    "id": "20-07-05:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:0bf68dc:master:05-0937-52:github.com/cadorn:github-actions-158185816",
    "id7": "c344fdd",
    "hid": "20-07-05:78ae465:e9a0cb3:42099b4:b08ae37:0bf68dc:4f26aea:05-0937-52:57e542e:8d04c05",
    "fsid": "20-07-05/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/0bf68dc/master/05-0937-52/github.com~cadorn/github-actions-158185816",
    "logs": {
        "url": "https://api.github.com/repos/sourcemint/sm.act.github.actions/actions/runs/158185816/logs"
    },
    "artifacts": {
        "url": "https://api.github.com/repos/sourcemint/sm.act.github.actions/actions/runs/158185816/artifacts"
    },
    "meta": {
        "REPO_GUID": "3-02453f6-7-136",
        "REPO_URI": "github.com/sourcemint/sm.act.github.actions",
        "GIT_REMOTE": "git@github.com:sourcemint/sm.act.github.actions.git",
        "GIT_REF": "refs/heads/master",
        "GIT_SHA": "0bf68dcb0e52d59a8abb4971e895147f9ee16882",
        "GIT_SHA7": "0bf68dc",
        "RUN_ID": "github-actions-158185816",
        "NAME": "Snapshot",
        "ACTOR_URI": "github.com/cadorn",
        "TRIGGER_EVENT": "Snapshot",
        "COMPONENT_ID": "/",
        "GIT_BRANCH": "master",
        "GIT_COMMIT_AUTHOR": "Christoph Dorn <christoph@christophdorn.com>",
        "GIT_COMMIT_DATE": "Sun Jul 5 02:37:27 2020 -0700",
        "GIT_COMMIT_MESSAGE": "more mapping paths",
        "ID": "3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot",
        "FSID": "3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot",
        "SNAPSHOT_ID": "20-07-05:3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/:Snapshot:0bf68dc:master:05-0937-52:github.com/cadorn:github-actions-158185816",
        "SNAPSHOT_ID7": "c344fdd",
        "SNAPSHOT_HID": "20-07-05:78ae465:e9a0cb3:42099b4:b08ae37:0bf68dc:4f26aea:05-0937-52:57e542e:8d04c05",
        "SNAPSHOT_FSID": "20-07-05/3-02453f6-7-136/github.com~sourcemint~sm.act.github.actions/~/Snapshot/0bf68dc/master/05-0937-52/github.com~cadorn/github-actions-158185816",
        "SNAPSHOT_ASPECT": "Snapshot",
        "SNAPSHOT_ASPECT_OF": "3-02453f6-7-136:github.com/sourcemint/sm.act.github.actions:/"
    },
    "env": {
        ...
    }
}
```

Tests
=====

  * ![[sm] 01 - Test env](https://github.com/sourcemint/sm.act.github.actions/workflows/%5Bsm%5D%2001%20-%20Test%20env/badge.svg)
  * ![[sm] 02 - Write Snapshot](https://github.com/sourcemint/sm.act.github.actions/workflows/%5Bsm%5D%2002%20-%20Write%20Snapshot/badge.svg)

License
=======

Copyright &copy; 2020 Christoph Dorn. Licensed under the MIT License.
