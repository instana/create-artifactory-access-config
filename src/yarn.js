const { safeLoad, safeDump } = require("js-yaml");
const fs = require("fs").promises;
const chalk = require("chalk");
const path = require("path");

const { isPreferringLocalConfigurationFiles } = require("./env");
const { abortScriptExecution } = require("./abort");

const fullyQualifiedPathToGlobalYarnRc = path.join(
  isPreferringLocalConfigurationFiles ? process.cwd() : process.env.HOME,
  ".yarnrc.yml"
);

exports.writeToYarnConfig = async (opts) => {
  const config = await loadGlobalRcFile();
  addAuthenticationInformation(config, opts);
  await writeGlobalRcFile(config);
  console.log(
    chalk.green(`✅ Successfully updated ${fullyQualifiedPathToGlobalYarnRc}`)
  );
};

async function loadGlobalRcFile() {
  let fileContent;

  try {
    fileContent = await fs.readFile(fullyQualifiedPathToGlobalYarnRc, {
      encoding: "utf8",
    });
  } catch (e) {
    if (e.code === "ENOENT") {
      return {};
    } else {
      console.error(
        chalk.red(
          `Failed to read Yarn 2 configuration file at '${fullyQualifiedPathToGlobalYarnRc}'`
        ),
        e
      );
      return abortScriptExecution({
        exitCode: 1,
      });
    }
  }

  try {
    return safeLoad(fileContent) || {};
  } catch (e) {
    console.error(
      chalk.red(
        `Failed to parse Yarn 2 configuration file at '${fullyQualifiedPathToGlobalYarnRc}'`
      ),
      e
    );
    return abortScriptExecution({
      exitCode: 1,
    });
  }
}

async function writeGlobalRcFile(config) {
  await fs.writeFile(fullyQualifiedPathToGlobalYarnRc, safeDump(config));
}

function addAuthenticationInformation(config, { resolvedRegistry, authIdent, authToken }) {
  if (!config.npmRegistries) {
    config.npmRegistries = {};
  }

  if (!config.npmRegistries[resolvedRegistry]) {
    config.npmRegistries[resolvedRegistry] = {};
  }

  config.npmRegistries[resolvedRegistry].npmAlwaysAuth = true;
  if (authIdent) {
    config.npmRegistries[resolvedRegistry].npmAuthIdent = authIdent;
  }
  if (authToken) {
    config.npmRegistries[resolvedRegistry].npmAuthToken = authToken;
  }
};