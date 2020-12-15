const inquirer = require('inquirer');

exports.prompt = async () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'registry',
      message: 'Registry URL',
      default: process.env.REGISTRY
    },
    {
      type: 'input',
      name: 'repositoryKey',
      message: 'Repository Key',
      default: process.env.REPOSITORY_KEY
    },
    {
      type: 'input',
      name: 'username',
      message: 'Username'
    },
    {
      type: 'input',
      name: 'password',
      message: 'Password / API Key'
    }
  ]);
};