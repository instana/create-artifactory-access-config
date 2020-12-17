const inquirer = require('inquirer');

exports.prompt = async () => {
  const environmentVariableValues = {
    registry: process.env.REGISTRY,
    repositoryKey: process.env.REPOSITORY_KEY,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  };

  if (process.env.NON_INTERACTIVE === 'true') {
    return environmentVariableValues;
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'registry',
      message: 'Registry URL',
      default: environmentVariableValues.registry
    },
    {
      type: 'input',
      name: 'repositoryKey',
      message: 'Repository Key',
      default: environmentVariableValues.repositoryKey
    },
    {
      type: 'input',
      name: 'username',
      message: 'Username',
      default: environmentVariableValues.username
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password / API Key',
      mask: '*',
      default: environmentVariableValues.password
    }
  ]);
};