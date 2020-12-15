const fetch = require('node-fetch');
const chalk = require('chalk');

const {abortScriptExecution} = require('./abort');

exports.getAuthenticationCredentials = async ({registry, repositoryKey, username, password}) => {
  const url = `${registry}/artifactory/api/npm/auth`;
  let response;
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(username + ":" + password).toString('base64')}`
      }
    });
  } catch (e) {
    console.error(chalk.red(`Failed to authenticate via '${url}'. Got error: ${e.message}`));
    return abortScriptExecution({
      exitCode: 1
    });
  }

  const body = await response.text();

  if (!response.ok) {
    console.error(chalk.red(`Failed to authenticate via '${url}'. Got status code: ${response.status}. Response body:`));
    console.error(chalk.red(body));
    return abortScriptExecution({
      exitCode: 1
    });
  }

  const match = body.match(/^_auth *=(.+)$/im);

  if (!match) {
    console.error(chalk.red(`Failed to authenticate via '${url}'. Response did not contain an auth token. Response body:`));
    console.error(chalk.red(body));
    return abortScriptExecution({
      exitCode: 1
    });
  }

  const authIdent = match[1].trim();
  return {authIdent, resolvedRegistry: `${registry}/artifactory/api/npm/${repositoryKey}/`};
};