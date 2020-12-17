const fs = require("fs").promises;
const chalk = require("chalk");
const path = require("path");

const { isPreferringLocalConfigurationFiles } = require("./env");
const { abortScriptExecution } = require("./abort");

const fullyQualifiedPathToGlobalNpmRc = path.join(
  isPreferringLocalConfigurationFiles ? process.cwd() : process.env.HOME,
  ".npmrc"
);

exports.writeToNpmConfig = async (opts) => {
  let config = await loadGlobalRcFile();
  config = addAuthenticationInformation(config, opts);
  await writeGlobalRcFile(config);
  console.log(
    chalk.green(`✅ Successfully updated ${fullyQualifiedPathToGlobalNpmRc}`)
  );
};

async function loadGlobalRcFile() {
  try {
    return await fs.readFile(fullyQualifiedPathToGlobalNpmRc, {
      encoding: "utf8",
    });
  } catch (e) {
    if (e.code === "ENOENT") {
      return '';
    } else {
      console.error(
        chalk.red(
          `Failed to read global NPM configuration file at '${fullyQualifiedPathToGlobalNpmRc}'`
        ),
        e
      );
      return abortScriptExecution({
        exitCode: 1,
      });
    }
  }
}

async function writeGlobalRcFile(config) {
  await fs.writeFile(fullyQualifiedPathToGlobalNpmRc, config);
}

function addAuthenticationInformation(config, { resolvedRegistry, authIdent, authToken }) {
  const address = resolvedRegistry.replace(/^https?:/, '');
  // Remove existing config line
  config = config.split('\n')
    .filter(l => !l.startsWith(address))
    .join('\n');

  let newConfigLine = address;
  if (authIdent) {
    newConfigLine += `:_auth=${authIdent}`;
  }
  if (authToken) {
    newConfigLine += `:_authToken=${authToken}`;
  }
  return `${config}\n${newConfigLine}`;
};