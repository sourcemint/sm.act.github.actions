
const PATH = require('path');
const LIB = require("../_/lib");

LIB.main(async function () {

    const meta = {};
    Object.keys(process.env).forEach(function (name) {
        if (!/^SM_ACT_/.test(name)) return;
        meta[name.replace(/^SM_ACT_/, '')] = process.env[name];
    });


    // '._' is for 100% auto-generated and managed files.
    // These paths are cross-clone merge safe. They are also globally unique and thus cross-repository collation safe.

    // The report that identifies the snapshot.
    const reportPath = PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots', `${process.env.SM_ACT_SNAPSHOT_FSID}.json`);
    // An easy to poll path to hold a referenace to the latest snapshot.
    const latestPath = PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-latest', `${process.env.SM_ACT_FSID}`);
    const mappingPaths = [
        // A mapping to resolve id to fsid.
        PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-id', `${process.env.SM_ACT_SNAPSHOT_ID}`),
        // A mapping to resolve hashid to fsid.
        PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-hid', `${process.env.SM_ACT_SNAPSHOT_HID}`),
        // A mapping to resolve short id to fsid.
        PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-id7', `${process.env.SM_ACT_SNAPSHOT_ID7}`)
    ];


    const sourceBranchName = await LIB.getSourceBranchName();

    const {
        baseDir,
        branchName
    } = await LIB.ensureWorkingDirClone('snapshots');


    LIB.writeFile(reportPath, JSON.stringify({
        aspect: process.env.SM_ACT_SNAPSHOT_ASPECT,
        aspectOf: process.env.SM_ACT_SNAPSHOT_ASPECT_OF,
        id: process.env.SM_ACT_SNAPSHOT_ID,
        id7: process.env.SM_ACT_SNAPSHOT_ID7,
        hid: process.env.SM_ACT_SNAPSHOT_HID,
        fsid: process.env.SM_ACT_SNAPSHOT_FSID,
        logs: {     // The logs that lead to the generation of the snapshot.
            url: `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/logs`
        },
        artifacts: {    // The content of the snapshot
            url: `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/artifacts`
        },
        meta: meta,
        env: process.env
    }, null, 4));

    LIB.writeFile(latestPath, PATH.relative(PATH.dirname(latestPath), reportPath));
    mappingPaths.forEach(function (path) {
        LIB.writeFile(path, PATH.relative(PATH.dirname(path), reportPath));
    });

    LIB.runCommand(`git add "${reportPath}"`);
    LIB.runCommand(`git add "${latestPath}"`);
    mappingPaths.forEach(function (path) {
        LIB.runCommand(`git add "${path}"`);
    });


    await LIB.pushChanges(baseDir, branchName, 'snapshots');

    LIB.runCommand(`git checkout ${sourceBranchName}`);


    console.log(`Snapshot ID: ${process.env.SM_ACT_SNAPSHOT_ID}`);


    console.log(`::set-output name=reportPath::${reportPath}`);
    console.log(`::set-output name=latestPath::${latestPath}`);
    console.log(`::set-output name=branchName::${branchName}`);

});
