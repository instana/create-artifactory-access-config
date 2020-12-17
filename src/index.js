#!/usr/bin/env node

const chalk = require('chalk');

const {getAuthenticationCredentials} = require('./artifactory');
const {isErrorLoggingSurpressed} = require('./abort');
const {writeToYarnConfig} = require('./yarn');
const {writeToNpmConfig} = require('./npm');
const {prompt} = require('./prompt');

(async () => {
  console.log('\nThis script will update your NPM/Yarn configuration');
  console.log('files with Artifactory authentication configuration.');
  console.log();
  console.log('Please answer the following questions to provide necessary');
  console.log('authentication information. Press return to confirm');
  console.log('or to select the shown default.');
  console.log();

  const options = await prompt();
  console.log();
  const artifactoryConfiguration = await getAuthenticationCredentials(options);
  await writeToNpmConfig(artifactoryConfiguration);
  await writeToYarnConfig(artifactoryConfiguration);

  console.log(chalk.green('Done!'));
  console.log();
  console.log('Please do not forget to enable authentication for every request');
  console.log('if necessary for your registry. You can do so in the following way');
  console.log('within your project:');
  console.log();
  console.log(` - .npmrc (NPM / Yarn 1):      ${chalk.green('always-auth=true')}`);
  console.log(` - .yarnrc.yml  (Yarn 2):      ${chalk.green('npmAlwaysAuth: true')}`);
})().catch(err => {
  if (!isErrorLoggingSurpressed(err)) {
    console.error('An uncaught error occurred', err);
  }
  process.exit(err.exitCode || 0);
});