
const PATH = require('path');
const FS = require('fs').promises;
const LIB = require("../_/lib");

LIB.main(async function () {
    
    async function getSnapshotIdForTag(tagName) {

        const {
            baseDir,
            branchName
        } = await LIB.ensureTemporaryDirClone('snapshots-active');
    
        // '_/gi0.Sourcemint.org-sm.act/snapshots-active/_/Snapshot/release/200718-230743-7259c9d'
        if (tagName.substring(0, branchName.length + 1) === `${branchName}/`) {
            tagName = tagName.substring(branchName.length + 1);
        }
        const tagParts = tagName.split('/');
        const compId = tagParts[0].replace(/_/g, '/');
        const actName = tagParts[1];
        const streamName = tagParts[2];

        const activeDirPrefix = LIB.makeActingDirectoryPrefix('snapshots-active');
        const activePath = PATH.join(baseDir, activeDirPrefix, compId.replace(/\//g, '~'), actName, streamName, 'snapshotId');
        const snapshotId = await FS.readFile(activePath, 'utf8');

        return snapshotId;
    }

    async function getSnapshotForTag (snapshotId) {

        const {
            baseDir,
            branchName
        } = await LIB.ensureTemporaryDirClone('snapshots');

        const snapshotFsId = snapshotId.replace(/\//g, '~').replace(/:/g, '\/');
        const snapshotDirPrefix = LIB.makeActingDirectoryPrefix('snapshots');
        const reportPath = PATH.join(baseDir, snapshotDirPrefix, `${snapshotFsId}.json`);
        const snapshot = await FS.readFile(reportPath, 'utf8');
        return JSON.parse(snapshot);
    }

    const snapshotId = await getSnapshotIdForTag(process.env.SM_ACT_GIT_TAG);

    console.log(`[sm.act] Activating snapshot with id:`, snapshotId);

    // const snapshot = await getSnapshotForTag(snapshotId);
    // delete snapshot.env;

    // console.log(`[sm.act] Activating snapshot:`, snapshot);
    if (!(await FS.access(PATH.join(__dirname, '../../../node_modules'), FS.constants.F_OK))) {

console.error('install deps');        
        await require("child_process").execSync('npm install', {
            cwd: PATH.join(__dirname, '../../..'),
            stdio: [ null, 'inherit', 'inherit']
        });
    }

console.error('run pinf.it');        

    process.env.SM_ACT_SNAPSHOT_ID = snapshotId;
    LIB.runCommand(`pinf.it './#!/gi0.Sourcemint.org/#!sm.act.activate.inf.json'`);

}, module);
