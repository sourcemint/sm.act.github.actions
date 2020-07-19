
const PATH = require('path');
const LIB = require("../_/lib");

LIB.main(async function () {

console.log('TODO: Activate snapshot ...', process.env);

    const branchName = LIB.makeActingBranchName('snapshots-active');

    // '_/gi0.Sourcemint.org-sm.act/snapshots-active/_/Snapshot/release/200718-230743-7259c9d'
    let tagName = process.env.SM_ACT_GIT_TAG;

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


});
