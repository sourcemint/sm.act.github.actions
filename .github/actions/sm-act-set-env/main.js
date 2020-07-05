
const MOMENT = require('./moment');
const CHILD_PROCESS = require('child_process');
const CRYPTO = require('crypto');

function getEnv (name) {
    return process.env[name] || '';
}
function setEnv (name, value) {
    process.env[name] = value;
    process.stdout.write(`::set-env name=${name}::${value}\n`);
}


const MIN_COMMIT_COUNT = 3;
const STABLE_COMMIT_COUNT = 7;
const REPO_GUID = [];
const commits = CHILD_PROCESS.execSync(`git rev-list --topo-order master | tail -n ${STABLE_COMMIT_COUNT}`).toString().replace(/\n$/, '').split('\n');
const minCommits = commits.slice(0, MIN_COMMIT_COUNT);
const stableCommits = commits.slice(0, STABLE_COMMIT_COUNT);
if (minCommits.length === MIN_COMMIT_COUNT) {
    REPO_GUID.push(MIN_COMMIT_COUNT + '-' + CRYPTO.createHash('sha1').update(minCommits.join(':')).digest('hex').substr(0, 7));
}
if (stableCommits.length === STABLE_COMMIT_COUNT) {
    REPO_GUID.push(STABLE_COMMIT_COUNT + '-' + CRYPTO.createHash('sha1').update(stableCommits.join(':')).digest('hex').substr(0, 3));
}


setEnv('SM_ACT_REPO_GUID', REPO_GUID.join('-'));
setEnv('SM_ACT_REPO_URI', `github.com/${getEnv('GITHUB_REPOSITORY')}`);
setEnv('SM_ACT_GIT_REMOTE', `git@github.com:${getEnv('GITHUB_REPOSITORY')}.git`);
setEnv('SM_ACT_GIT_REF', getEnv('GITHUB_REF'));
setEnv('SM_ACT_GIT_SHA', getEnv('GITHUB_SHA'));
setEnv('SM_ACT_GIT_SHA7', getEnv('GITHUB_SHA').substr(0, 7));
setEnv('SM_ACT_RUN_ID', `github-actions-${getEnv('GITHUB_RUN_ID')}`);
setEnv('SM_ACT_NAME', getEnv('GITHUB_JOB'));

setEnv('SM_ACT_ACTOR_URI', `github.com/${getEnv('GITHUB_ACTOR')}`);
setEnv('SM_ACT_TRIGGER_EVENT', getEnv('GITHUB_JOB'));

setEnv('SM_ACT_COMPONENT_ID', `/`);     // '/' denotes repository-wide component (otherwise a path to root of component)

if (/^refs\/tags\//.test(getEnv('GITHUB_REF'))) {
    setEnv('SM_ACT_GIT_TAG', getEnv('GITHUB_REF').replace(/^refs\/tags\//, ''));
} else
if (/^refs\/heads\//.test(getEnv('GITHUB_REF'))) {
    setEnv('SM_ACT_GIT_BRANCH', getEnv('GITHUB_REF').replace(/^refs\/heads\//, ''));

}

const response = CHILD_PROCESS.execSync('git log -1').toString();
const parts = response.split("\n");
setEnv('SM_ACT_GIT_COMMIT_AUTHOR', parts[1].replace(/^Author: /, ''));
setEnv('SM_ACT_GIT_COMMIT_DATE', parts[2].replace(/^Date:   /, ''));
setEnv('SM_ACT_GIT_COMMIT_MESSAGE', parts[4].replace(/^\s+/, ''));

const time = MOMENT();
setEnv('SM_ACT_SNAPSHOT_ID', [
    time.format('YY-MM-DD'),
    getEnv('SM_ACT_REPO_GUID'),
    getEnv('SM_ACT_REPO_URI'),
    getEnv('SM_ACT_COMPONENT_ID'),
    getEnv('SM_ACT_GIT_SHA7'),
    time.format('DD-HHmm-ss'),
    getEnv('SM_ACT_GIT_BRANCH'),
    getEnv('SM_ACT_NAME'),
    getEnv('SM_ACT_ACTOR_URI'),
    getEnv('SM_ACT_RUN_ID')
].join(':'));
