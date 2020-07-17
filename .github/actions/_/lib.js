
const PATH = require('path');
const FS = require('fs');
const CHILD_PROCESS = require('child_process');


if (!process.env.SM_ACT_SNAPSHOT_ID) {
    throw new Error(`'SM_ACT_SNAPSHOT_ID' not set!`);
}


exports.writeFile = function (path, content) {
    console.log('[sm.act] Writing file to:', path);
    if (!FS.existsSync(PATH.dirname(path))) FS.mkdirSync(PATH.dirname(path), { recursive: true });
    FS.writeFileSync(path, content, 'utf8');
}

exports.runCommand = function (command, options) {
    console.log('[sm.act] Running:', command);
    const result = CHILD_PROCESS.execSync(command, options || {});
    console.log(result.toString());
    return result;
}
function makeRunCommand (baseDir) {
    return function (command) {
        return exports.runCommand(command, {
            cwd: baseDir
        });
    }
}

async function ensureGitConfig () {

    let author = process.env.SM_ACT_GIT_COMMIT_AUTHOR.match(/^([^<]+)\s*<([^>]*)>$/);
    if (author) {
        author[1] = author[1] || process.env.SM_ACT_ACTOR_URI;
        author[2] = author[2] || 'unknown';
    } else {
        author = [null, process.env.SM_ACT_ACTOR_URI, 'unknown'];
    }
    runCommand(`git config user.name "${author[1]}"`);
    runCommand(`git config user.email "${author[2]}"`);
    runCommand(`git config pull.rebase false`);
}

exports.getSourceBranchName = async function () {
    const sourceBranchName = runCommand(`git rev-parse --abbrev-ref HEAD`).toString().replace(/\n$/, '');

    console.log(`[sm.act] Source branch name:`, sourceBranchName);

    return sourceBranchName;
}

async function getOrigin () {
    const origin = runCommand(`git config --get remote.origin.url`).toString().replace(/\n$/, '');

    console.log(`[sm.act] Origin:`, origin);

    return origin;
}

function makeActingBranchName (type) {
    const branchName = PATH.join('_', 'gi0.Sourcemint.org-sm.act', type);

    console.log(`[sm.act] Acting branch name:`, branchName);

    return branchName;
}

function makeActingTemporaryDirectory (type) {
    const baseDir = PATH.join('.~', 'gi0.Sourcemint.org~sm.act', type);

    console.log(`[sm.act] Acting base directory:`, baseDir);

    return baseDir;
}

async function ensureBranch (baseDir, branchName) {

    console.log(`[sm.act] Ensure branch '${branchName}' at:`, baseDir);

    const runCommand = makeRunCommand(baseDir);
    // const sourceBranchName = await getSourceBranchName();

    if (!FS.existsSync(baseDir)) {
        FS.mkdirSync(baseDir, {
            recursive: true
        });

        runCommand(`git init`);

        const origin = await getOrigin();

        runCommand(`git remote add origin ${origin}`);
        runCommand(`git fetch origin ${branchName}`);

    } else {

        // Remove all changes from the repository.
        // TODO: Store modification summary in report and upload diff as artifact.
        runCommand(`git reset --hard`);
    }

    try {
        runCommand(`git checkout -t origin/${branchName}`);
    } catch (err) {
        // Branch does not exist so we create it.
        runCommand(`git checkout --orphan ${branchName}`);
        runCommand(`git rm -rf .`);
    
        runCommand(`touch README.md`);
        runCommand(`git add README.md`);
        runCommand(`git commit -m "[sm.act] Initial commit"`);
    
        // try {
            runCommand(`git push -u origin ${branchName}`);
        // } catch (err) {
        //     // Another process beat us to it so we use what already exists.
        //     runCommand(`git checkout ${sourceBranchName}`);
        //     runCommand(`git branch -D ${branchName}`);
        //     runCommand(`git fetch origin/${branchName}`);
        //     runCommand(`git checkout -t origin/${branchName}`);
        // }
    }
    
    // // @source https://stackoverflow.com/a/3364506
    // runCommand(`git merge -X theirs ${sourceBranchName} || true`);
    
    runCommand(`git fetch origin ${branchName} || true`);
    
    try {
        runCommand(`git merge -X theirs origin/${branchName}`);
    } catch (err) {
        if (/refusing to merge unrelated histories/.test(err.message)) {
            // Assuming we are running on github actions.
            console.error(`\n\n\n[sm.act] ERROR: It appears we are not dealing with a complete git history. Make sure 'actions/checkout@v2' is configured with 'fetch-depth: 0'.\n\n\n`);
            throw err;
        }
    }

    runCommand(`git status`);    
}

exports.ensureWorkingDirClone = async function (type) {

    await ensureGitConfig();

    const baseDir = process.cwd();
    const branchName = makeActingBranchName(type);

    await ensureBranch(baseDir, branchName);

    return {
        baseDir,
        branchName
    };
}

exports.ensureTemporaryDirClone = async function (type) {

    await ensureGitConfig();

    const baseDir = makeActingTemporaryDirectory(type);
    const branchName = makeActingBranchName(type);
    
    await ensureBranch(baseDir, branchName);

    return {
        baseDir,
        branchName
    };
}

exports.pushChanges = async function (baseDir, branchName, type) {

    const runCommand = makeRunCommand(baseDir);

    runCommand(`git status`);

    runCommand(`git commit -m "[gi0.Sourcemint.org/sm.act.github.actions] New ${type}: ${process.env.SM_ACT_SNAPSHOT_ID}"`);

    runCommand(`git status`);

    await new Promise (function (resolve, reject) {

        let retryCount = 0;
        let maxRetries = 5;
        function push () {
        
            try {
                runCommand(`git push origin ${branchName}`);

                resolve();
            } catch (err) {
                if (/failed to push some refs to/.test(err.stderr.toString())) {
        
                    retryCount += 1;
                    if (retryCount <= maxRetries) {
        
                        runCommand(`git pull origin ${branchName} || true`);
        
                        console.error(`Error pushing changes. Re-trying (${retryCount}/${maxRetries}).`);
        
                        setTimeout(push, Math.round(Math.random() * 1000) * 3);
                        return;
                    }
                    console.error(`Error pushing changes. Not re-trying again.`);
                }
                reject(err);
            }
        }
        
        push();
    });
}
