
exports['gi0.PINF.it/build/v0'] = async function (LIB, CLASSES) {

    const ACT_LIB = require('../../.github/actions/_/lib');

    async function getSnapshotIds () {
        if (!process.env.SM_ACT_SNAPSHOT_ID) {
            // If 'SM_ACT_SNAPSHOT_ID' is not set, we use latest paths for each component and 'SM_ACT_NAME'.
            // This is only used when running 'pinf.it ./#!/gi0.PINF.it/#!activate.inf.json' directly. 

            const {
                baseDir,
                branchName
            } = await ACT_LIB.ensureTemporaryDirClone('snapshots-active');

            const activeDirPrefix = ACT_LIB.makeActingDirectoryPrefix('snapshots-active');

            if (!(await LIB.FS.exists(LIB.PATH.join(baseDir, activeDirPrefix)))) {
                return [];
            }

            const filenames = await LIB.GLOB.async('**/snapshotId', {
                cwd: LIB.PATH.join(baseDir, activeDirPrefix)
            });

            return Promise.all(filenames.map(async function (filename) {
                return await LIB.FS.readFile(LIB.PATH.join(baseDir, activeDirPrefix, filename), 'utf8');
            }));
        } else {
            return [
                process.env.SM_ACT_SNAPSHOT_ID
            ];
        }                
    }

    class BuildStep extends CLASSES.BuildStep {

        async onEveryBuild (result, build, target, instance, home, workspace) {

            const snapshotIds = await getSnapshotIds();

            const {
                baseDir,
                branchName
            } = await ACT_LIB.ensureTemporaryDirClone('snapshots');

            const snapshotPaths = snapshotIds.map(function (snapshotId) {

                const snapshotFsId = snapshotId.replace(/\//g, '~').replace(/:/g, '\/');
                const snapshotDirPrefix = ACT_LIB.makeActingDirectoryPrefix('snapshots');
                const reportPath = LIB.PATH.join(baseDir, snapshotDirPrefix, `${snapshotFsId}.json`);
                
                return reportPath;
            });

            await LIB.Promise.mapSeries(snapshotPaths, async function (snapshotPath) {

                if (!(await LIB.FS.exists(snapshotPath))) {
                    throw new Error(`'snapshotPath' not found '${snapshotPath}'!`);
                }

                LIB.console.info(`Using snapshot report:`, snapshotPath);

                let snapshot = JSON.parse(await LIB.FS.readFile(snapshotPath, 'utf8'));

                let code = build.config.onActivate;
                if (LIB.CODEBLOCK.isCodeblock(code)) {

                    let runHandler = await LIB.CODEBLOCK.thawFromJSON(code).runAsync({
                        process: process,
                        require: function (uri) {
                            return require(LIB.RESOLVE.sync(uri, {
                                basedir: build.path
                            }));
                        }
                    }, {
                        sandbox: {}
                    });

                    LIB.console.info(`Running activation code >>>`);

                    const previousCwd = process.cwd();
                    process.chdir(build.path);

                    let result = null;

                    try {
                        result = await runHandler(snapshot);
                        process.chdir(previousCwd);
                    } catch (err) {
                        process.chdir(previousCwd);
                        throw err;
                    }

                    LIB.console.info(`<<<`);

                    // TODO: Record activation result and log along with environment identifier
                    //       so that multiple activations for the same snapshot release can be tracked.

                }
            });
        }
    }

    return BuildStep;
}
