#!/usr/bin/env node

const chalk = require('chalk');

const {getAuthenticationCredentials} = require('./artifactory');
const {isErrorLoggingSurpressed} = require('./abort');
const {writeToYarnConfig} = require('./yarn');
const {prompt} = require('./prompt');

(async () => {
  const options = await prompt();
  const artifactoryConfiguration = await getAuthenticationCredentials(options);
  await writeToYarnConfig(artifactoryConfiguration);

  console.log(chalk.green('Global yarn configuration file successfully extended ✅!'));
})().catch(err => {
  if (!isErrorLoggingSurpressed(err)) {
    console.error('An uncaught error occurred', err);
  }
  process.exit(err.exitCode || 0);
});