
const PATH = require('path');
const FS = require('fs').promises;
const LIB = require("../_/lib");

LIB.main(async function () {

console.log('TODO: Activate snapshot ...LLLLL');

    const {
        baseDir,
        branchName
    } = await LIB.ensureTemporaryDirClone('snapshots-active');

console.error("baseDir::", baseDir);
console.error("branchName::", branchName);

//    const branchName = LIB.makeActingBranchName('snapshots-active');

    // '_/gi0.Sourcemint.org-sm.act/snapshots-active/_/Snapshot/release/200718-230743-7259c9d'
    let tagName = process.env.SM_ACT_GIT_TAG;

console.log("tagName::", tagName);

    if (tagName.substring(0, branchName.length + 1) === `${branchName}/`) {
        tagName = tagName.substring(branchName.length + 1);
    }

    const tagParts = tagName.split('/');
    const compId = tagParts[0].replace(/_/g, '/');
    const actName = tagParts[1];
    const streamName = tagParts[2];

console.log('tagName:', tagName);
console.log('tagParts:', tagParts);
console.log('compId:', compId);
console.log('actName:', actName);
console.log('streamName:', streamName);

    const activeDirPrefix = LIB.makeActingDirectoryPrefix('snapshots-active');

//    const runCommand = LIB.makeRunCommand(baseDir);

    const activePath = PATH.join(activeDirPrefix, compId.replace(/\//g, '~'), actName, streamName, 'snapshotId');

console.log("activePath:", activePath);

    const snapshotId = await FS.readFile(activePath, 'utf8');

console.log("snapshotId:", snapshotId);

    console.log(`[sm.act] Activating snapshot with id:`, snapshotId);


});
